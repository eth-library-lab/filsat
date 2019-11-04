import {Task} from './task';

export interface Project {
  id?: string;
  repoName: string;
  description?: string;
  progLang: string;
  verNum: string;
  link: string;
  repoSize: number;
  taskSet?: Task[];
}
