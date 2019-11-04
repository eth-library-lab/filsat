export interface Doc {
    id: string;
    content: string;
    rating: number;
}
export declare enum TaskState {
    CREATION = 0,
    OPTIMIZATION = 1,
    SUBMISSION = 2,
    COMPLETE = 3
}
export interface Project {
    id: string;
    repoName: string;
    link: string;
}
export interface Task {
    id: string;
    description: string;
    state: TaskState;
    complexity: number;
    docSet?: Doc[];
    project: Project;
}
