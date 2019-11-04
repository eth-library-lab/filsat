import fetch, {Response} from 'node-fetch';

import {Task, TaskState} from './api';

interface TaskResponseData {
    tasks?: Task[];
    updateTask?: {task: Task};
}

interface TaskResponse {
    data: TaskResponseData;
}

export class FilsatApi {

    private graphQL: string = 'http://localhost:8000/graphql/';

    getTasksInSubmission(): Promise<Task[]> {
        return new Promise<Task[]>(async (resolve, reject) => {
            try {
                const query = `
                  query {
                    tasks(search: ${TaskState.SUBMISSION}) {
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

                const rawResponse: Response = await this.post(query);

                const results: TaskResponse = await rawResponse.json();

                resolve(results && results.data ? results.data.tasks : undefined);
            } catch (err) {
                reject(err);
            }
        });
    }

    private post(query: string): Promise<Response> {
        return new Promise<Response>(async (resolve, reject) => {
            try {
                const rawResponse: Response = await fetch(`${this.graphQL}`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({query})
                });

                if (!rawResponse || !rawResponse.ok) {
                    console.error(rawResponse);
                    reject(new Error('Error while querying the API.'));
                    return;
                }

                resolve(rawResponse);
            } catch (err) {
                reject(err);
            }
        });
    }

    updateTaskState(projectId: string, task: Task, state: TaskState): Promise<Task> {
        return new Promise<Task>(async (resolve, reject) => {
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

                const rawResponse: Response = await this.post(query);

                const result: TaskResponse = await rawResponse.json();

                console.log('Task state completed.');

                resolve(result && result.data && result.data.updateTask ? result.data.updateTask.task : undefined);
            } catch (err) {
                reject(err);
            }
        });
    }

}
