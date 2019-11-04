import { Task, TaskState } from './api';
export declare class FilsatApi {
    private graphQL;
    getTasksInSubmission(): Promise<Task[]>;
    private post;
    updateTaskState(projectId: string, task: Task, state: TaskState): Promise<Task>;
}
