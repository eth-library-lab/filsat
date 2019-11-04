import {Task, TaskState} from '../../models/task';

import {ApiService} from '../api/api.service';

interface TaskResponseData {
  tasks?: Task[];
  task?: Task;
  updateTask?: {task: Task};
  createTask?: {task: Task};
}

interface TaskResponse {
  data: TaskResponseData;
}

export class TaskService {

  private static instance: TaskService;

  private apiService: ApiService;

  private constructor() {
    // Private constructor, singleton
    this.apiService = ApiService.getInstance();
  }

  static getInstance() {
    if (!TaskService.instance) {
      TaskService.instance = new TaskService();
    }
    return TaskService.instance;
  }

  getTask(taskId: string): Promise<Task> {
    return new Promise<Task>(async (resolve, reject) => {
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

        const rawResponse: Response = await this.apiService.post(query);

        const result: TaskResponse = await rawResponse.json();

        resolve(result && result.data ? result.data.task : undefined);
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

        const rawResponse: Response = await this.apiService.post(query);

        const result: TaskResponse = await rawResponse.json();

        resolve(result && result.data && result.data.updateTask ? result.data.updateTask.task : undefined);
      } catch (err) {
        reject(err);
      }
    });
  }

  createTask(projectId: string, task: Task): Promise<Task> {
    return new Promise<Task>(async (resolve, reject) => {
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

        const rawResponse: Response = await this.apiService.post(query);

        const result: TaskResponse = await rawResponse.json();

        resolve(result && result.data && result.data.createTask ? result.data.createTask.task : undefined);
      } catch (err) {
        reject(err);
      }
    });
  }
}
