import * as fs from 'fs';

import fetch, {Response} from 'node-fetch';
import * as rimraf from 'rimraf';
import * as simplegit from 'simple-git/promise';

import {GitHubForkResponse} from './github';

export class FilsatGithub {

    // https://github.com/settings/tokens

    // curl -u username:token https://api.github.com/user
    // https://developer.github.com/v3/auth/

    private githubToken: string = '';
    private githubApiV3: string = 'https://api.github.com/repos';

    // Authorization: bearer token
    private githubApiV4: string = 'https://api.github.com/graphql';

    private workingDirectory: string = '/tmp';

    // Prototype values
    private branchName: string = 'dsyntdocs';
    private fileName: string = 'DOCUMENTATION.md';
    private message: string = 'doc: dsyntdocs prototype';

    async createPR(pathname: string, taskId: string, docContent: string) {
        // NOTE: Note: Forking a Repository happens asynchronously. You may have to wait a short period of time before you can access the git objects. If this takes longer than 5 minutes, be sure to contact GitHub Support.
        // See https://developer.github.com/v3/repos/forks/#create-a-fork
        const fork: GitHubForkResponse = await this.forkRepo(pathname);

        await this.clone(fork.clone_url, fork.name);

        const branchName: string = `${this.branchName}-${taskId}`;

        await this.createBranch(fork.name, branchName);

        await this.createDocumentationContentFile(fork.name, this.fileName, docContent);

        await this.add(fork.name, this.fileName);
        await this.commit(fork.name, this.message);
        await this.push(fork.clone_url, fork.name, branchName);

        const nodeId: string = fork.parent ? fork.parent.node_id : fork.node_id;

        await this.createPullRequest(branchName, nodeId, fork.owner.login, this.message, taskId);
    }

    private forkRepo(pathname: string): Promise<GitHubForkResponse> {
        return new Promise<GitHubForkResponse>(async (resolve, reject) => {
            try {
                const rawResponse: Response = await fetch(`${this.githubApiV3}${pathname}/forks`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `token ${this.githubToken}`
                    }
                });

                if (!rawResponse || !rawResponse.ok) {
                    console.error(rawResponse);
                    reject(new Error('Error forking the repo.'));
                    return;
                }

                const results: GitHubForkResponse = await rawResponse.json();

                console.log('Repo forked.');

                if (!results) {
                    reject(new Error('Error no response when forking.'));
                    return;
                }

                resolve(results);
            } catch (err) {
                console.error('Unexpected error forking the repo.');
                reject(err);
            }
        });
    }

    private clone(url: string, projectName: string): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const localPath: string = `${this.workingDirectory}/${projectName}`;

                await this.deleteDir(localPath);

                const git = simplegit();

                await git.clone(url, localPath);

                resolve();
            } catch (err) {
                reject(err);
            }
        })
    }

    private deleteDir(path: string): Promise<void> {
        return new Promise<void>((resolve) => {
            rimraf(path, () => {
                resolve();
            });
        });
    }

    private createDocumentationContentFile(projectName: string, fileName: string, content: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            try {
                fs.appendFile(`${this.workingDirectory}/${projectName}/${fileName}`, content, (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    console.log(fileName + ' file created.');

                    resolve();
                });

            } catch (err) {
                reject(err);
            }
        })
    }

    private add(projectName: string, fileName: string): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const git = simplegit(`${this.workingDirectory}/${projectName}`);

                await git.add(fileName);

                console.log('File added to Git.');

                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }

    private commit(projectName: string, msg: string): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const git = simplegit(`${this.workingDirectory}/${projectName}`);

                await git.commit(msg);

                console.log('File(s) committed.');

                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }

    private createBranch(projectName: string, branchName: string): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const git = simplegit(`${this.workingDirectory}/${projectName}`);

                await git.checkoutLocalBranch(branchName);

                console.log('Local branch checked out.');

                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }

    private push(url: string, projectName: string, branchName: string): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const git = simplegit(`${this.workingDirectory}/${projectName}`);

                await git.push(url, branchName);

                console.log('Push to Git done.');

                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }

    private createPullRequest(branchName: string, nodeId: string, username: string, title: string, taskId: string): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const query = `
                  mutation {
                    createPullRequest(input:{baseRefName: "master", body: "", title: "${title}", clientMutationId: "${taskId}", headRefName: "${username}:${branchName}", maintainerCanModify: true, repositoryId: "${nodeId}"}) {
                        clientMutationId
                        pullRequest {
                          merged
                        }
                    }
                  }
                `;

                const rawResponse: Response = await fetch(`${this.githubApiV4}`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.githubToken}`
                    },
                    body: JSON.stringify({query})
                });

                if (!rawResponse || !rawResponse.ok) {
                    console.error(rawResponse);
                    reject(new Error('Error while creating the PR.'));
                    return;
                }

                const results = await rawResponse.json();

                console.log('PR created', JSON.stringify(results));

                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }
}
