"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
const api_1 = require("./api");
class FilsatApi {
    constructor() {
        this.graphQL = 'http://localhost:8000/graphql/';
    }
    getTasksInSubmission() {
        return new Promise(async (resolve, reject) => {
            try {
                const query = `
                  query {
                    tasks(search: ${api_1.TaskState.SUBMISSION}) {
                        id
                        description
                        state
                        complexity
                        docSet {
                          id
                          content
                          rating
                        }
                        project {
                            id
                            repoName
                            link
                        }
                      }
                  }
                `;
                const rawResponse = await this.post(query);
                const results = await rawResponse.json();
                resolve(results && results.data ? results.data.tasks : undefined);
            }
            catch (err) {
                reject(err);
            }
        });
    }
    post(query) {
        return new Promise(async (resolve, reject) => {
            try {
                const rawResponse = await node_fetch_1.default(`${this.graphQL}`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ query })
                });
                if (!rawResponse || !rawResponse.ok) {
                    console.error(rawResponse);
                    reject(new Error('Error while querying the API.'));
                    return;
                }
                resolve(rawResponse);
            }
            catch (err) {
                reject(err);
            }
        });
    }
    updateTaskState(projectId, task, state) {
        return new Promise(async (resolve, reject) => {
            try {
                const query = `
                  mutation {
                    updateTask(id: ${task.id}, input: {
                      description: "${task.description}"
                      state: ${state}
                      complexity: ${task.complexity}
                      project: { 
                        id: "${projectId}"
                      }
                    }) {
                      task {
                        id
                        description
                        state
                        complexity
                        docSet {
                          id
                          content
                          rating
                        }
                      }
                    }
                  }
                `;
                const rawResponse = await this.post(query);
                const result = await rawResponse.json();
                console.log('Task state completed.');
                resolve(result && result.data && result.data.updateTask ? result.data.updateTask.task : undefined);
            }
            catch (err) {
                reject(err);
            }
        });
    }
}
exports.FilsatApi = FilsatApi;
