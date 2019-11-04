export interface Doc {
    id: string;
    content: string;
    rating: number;
}

export enum TaskState {
    CREATION,
    OPTIMIZATION,
    SUBMISSION,
    COMPLETE
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
