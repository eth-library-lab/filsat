"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const node_fetch_1 = require("node-fetch");
const rimraf = require("rimraf");
const simplegit = require("simple-git/promise");
class FilsatGithub {
    constructor() {
        this.githubToken = '';
        this.githubApiV3 = 'https://api.github.com/repos';
        this.githubApiV4 = 'https://api.github.com/graphql';
        this.workingDirectory = '/tmp';
        this.branchName = 'dsyntdocs';
        this.fileName = 'DOCUMENTATION.md';
        this.message = 'doc: dsyntdocs prototype';
    }
    async createPR(pathname, taskId, docContent) {
        const fork = await this.forkRepo(pathname);
        await this.clone(fork.clone_url, fork.name);
        const branchName = `${this.branchName}-${taskId}`;
        await this.createBranch(fork.name, branchName);
        await this.createDocumentationContentFile(fork.name, this.fileName, docContent);
        await this.add(fork.name, this.fileName);
        await this.commit(fork.name, this.message);
        await this.push(fork.clone_url, fork.name, branchName);
        const nodeId = fork.parent ? fork.parent.node_id : fork.node_id;
        await this.createPullRequest(branchName, nodeId, fork.owner.login, this.message, taskId);
    }
    forkRepo(pathname) {
        return new Promise(async (resolve, reject) => {
            try {
                const rawResponse = await node_fetch_1.default(`${this.githubApiV3}${pathname}/forks`, {
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
                const results = await rawResponse.json();
                console.log('Repo forked.');
                if (!results) {
                    reject(new Error('Error no response when forking.'));
                    return;
                }
                resolve(results);
            }
            catch (err) {
                console.error('Unexpected error forking the repo.');
                reject(err);
            }
        });
    }
    clone(url, projectName) {
        return new Promise(async (resolve, reject) => {
            try {
                const localPath = `${this.workingDirectory}/${projectName}`;
                await this.deleteDir(localPath);
                const git = simplegit();
                await git.clone(url, localPath);
                resolve();
            }
            catch (err) {
                reject(err);
            }
        });
    }
    deleteDir(path) {
        return new Promise((resolve) => {
            rimraf(path, () => {
                resolve();
            });
        });
    }
    createDocumentationContentFile(projectName, fileName, content) {
        return new Promise((resolve, reject) => {
            try {
                fs.appendFile(`${this.workingDirectory}/${projectName}/${fileName}`, content, (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    console.log(fileName + ' file created.');
                    resolve();
                });
            }
            catch (err) {
                reject(err);
            }
        });
    }
    add(projectName, fileName) {
        return new Promise(async (resolve, reject) => {
            try {
                const git = simplegit(`${this.workingDirectory}/${projectName}`);
                await git.add(fileName);
                console.log('File added to Git.');
                resolve();
            }
            catch (err) {
                reject(err);
            }
        });
    }
    commit(projectName, msg) {
        return new Promise(async (resolve, reject) => {
            try {
                const git = simplegit(`${this.workingDirectory}/${projectName}`);
                await git.commit(msg);
                console.log('File(s) committed.');
                resolve();
            }
            catch (err) {
                reject(err);
            }
        });
    }
    createBranch(projectName, branchName) {
        return new Promise(async (resolve, reject) => {
            try {
                const git = simplegit(`${this.workingDirectory}/${projectName}`);
                await git.checkoutLocalBranch(branchName);
                console.log('Local branch checked out.');
                resolve();
            }
            catch (err) {
                reject(err);
            }
        });
    }
    push(url, projectName, branchName) {
        return new Promise(async (resolve, reject) => {
            try {
                const git = simplegit(`${this.workingDirectory}/${projectName}`);
                await git.push(url, branchName);
                console.log('Push to Git done.');
                resolve();
            }
            catch (err) {
                reject(err);
            }
        });
    }
    createPullRequest(branchName, nodeId, username, title, taskId) {
        return new Promise(async (resolve, reject) => {
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
                const rawResponse = await node_fetch_1.default(`${this.githubApiV4}`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.githubToken}`
                    },
                    body: JSON.stringify({ query })
                });
                if (!rawResponse || !rawResponse.ok) {
                    console.error(rawResponse);
                    reject(new Error('Error while creating the PR.'));
                    return;
                }
                const results = await rawResponse.json();
                console.log('PR created', JSON.stringify(results));
                resolve();
            }
            catch (err) {
                reject(err);
            }
        });
    }
}
exports.FilsatGithub = FilsatGithub;
