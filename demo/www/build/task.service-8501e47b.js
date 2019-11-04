import { A as ApiService } from './api.service-1a8caa03.js';

class TaskService {
    constructor() {
        // Private constructor, singleton
        this.apiService = ApiService.getInstance();
    }
    static getInstance() {
        if (!TaskService.instance) {
            TaskService.instance = new TaskService();
        }
        return TaskService.instance;
    }
    getTask(taskId) {
        return new Promise(async (resolve, reject) => {
            try {
                const query = `
          query {
            task(id: ${taskId}) {
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
        `;
                const rawResponse = await this.apiService.post(query);
                const result = await rawResponse.json();
                resolve(result && result.data ? result.data.task : undefined);
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
                const rawResponse = await this.apiService.post(query);
                const result = await rawResponse.json();
                resolve(result && result.data && result.data.updateTask ? result.data.updateTask.task : undefined);
            }
            catch (err) {
                reject(err);
            }
        });
    }
    createTask(projectId, task) {
        return new Promise(async (resolve, reject) => {
            try {
                const query = `
          mutation {
            createTask(input: {
              description: "${encodeURI(task.description)}",
              state: ${task.state}
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
              }
            }
          }
        `;
                const rawResponse = await this.apiService.post(query);
                const result = await rawResponse.json();
                resolve(result && result.data && result.data.createTask ? result.data.createTask.task : undefined);
            }
            catch (err) {
                reject(err);
            }
        });
    }
}

export { TaskService as T };
