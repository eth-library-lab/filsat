import {Project} from '../../models/project';

import {ApiService} from '../api/api.service';

interface CreateDocResponseData {
  project: Project;
}

interface ProjectResponseData {
  projects?: Project[];
  project?: Project;
  createProject?: CreateDocResponseData;
}

interface ProjectResponse {
  data: ProjectResponseData;
}

export class ProjectService {

  private static instance: ProjectService;

  private apiService: ApiService;

  private constructor() {
    // Private constructor, singleton
    this.apiService = ApiService.getInstance();
  }

  static getInstance() {
    if (!ProjectService.instance) {
      ProjectService.instance = new ProjectService();
    }
    return ProjectService.instance;
  }

  getProject(projectId: string): Promise<Project> {
    return new Promise<Project>(async (resolve, reject) => {
      try {
        const query = `
          query {
            project(id: ${projectId}) {
              id
              repoName
              verNum
              link
              description
              repoSize
              progLang
              description
            }
          }
        `;

        const rawResponse: Response = await this.apiService.post(query);

        const result: ProjectResponse = await rawResponse.json();

        resolve(result && result.data ? result.data.project : undefined);
      } catch (err) {
        reject(err);
      }
    });
  }

  getPopulatedProject(projectId: string): Promise<Project> {
    return new Promise<Project>(async (resolve, reject) => {
      try {
        const query = `
          query {
            project(id: ${projectId}) {
              id
              repoName
              verNum
              link
              description
              repoSize
              progLang
              description
              taskSet {
                id
                description
                state
                complexity
              }
            }
          }
        `;

        const rawResponse: Response = await this.apiService.post(query);

        const result: ProjectResponse = await rawResponse.json();

        resolve(result && result.data ? result.data.project : undefined);
      } catch (err) {
        reject(err);
      }
    });
  }

  getProjects(): Promise<Project[]> {
    return new Promise<Project[]>(async (resolve, reject) => {
      try {
        const query = `
          query {
            projects {
              id
                repoName
                verNum
                link
                description
                repoSize
                progLang
                description
                taskSet {
                  id
                }
            }
          }
        `;

        const rawResponse: Response = await this.apiService.post(query);

        const results: ProjectResponse = await rawResponse.json();

        resolve(results && results.data ? results.data.projects : undefined);
      } catch (err) {
        reject(err);
      }
    });
  }

  createProject(project: Project): Promise<Project> {
    return new Promise<Project>(async (resolve, reject) => {
      try {
        const query = `
          mutation {
            createProject(input: {
              repoName: "${project.repoName}"
              verNum: "${project.verNum}"
              link: "${encodeURI(project.link)}"
              repoSize: ${project.repoSize}
              progLang: "${project.progLang}"
              description: "${project.description ? encodeURI(project.description) : ''}"
            }) {
              project {
                id
                repoName
                verNum
                link
                description
                repoSize
                progLang
                description
              }
            }
          }
        `;

        const rawResponse: Response = await this.apiService.post(query);

        const result: ProjectResponse = await rawResponse.json();

        resolve(result && result.data && result.data.createProject ? result.data.createProject.project : undefined);
      } catch (err) {
        reject(err);
      }
    });
  }
}
