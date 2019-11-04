import {Doc} from './doc';

export enum TaskState {
  CREATION,
  OPTIMIZATION,
  SUBMISSION,
  COMPLETE
}

export interface Task {
  id?: string;
  description: string;
  state: TaskState;
  complexity: number;
  docSet?: Doc[];
}
