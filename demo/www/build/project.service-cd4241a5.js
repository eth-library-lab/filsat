import { A as ApiService } from './api.service-1a8caa03.js';

class ProjectService {
    constructor() {
        // Private constructor, singleton
        this.apiService = ApiService.getInstance();
    }
    static getInstance() {
        if (!ProjectService.instance) {
            ProjectService.instance = new ProjectService();
        }
        return ProjectService.instance;
    }
    getProject(projectId) {
        return new Promise(async (resolve, reject) => {
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
                const rawResponse = await this.apiService.post(query);
                const result = await rawResponse.json();
                resolve(result && result.data ? result.data.project : undefined);
            }
            catch (err) {
                reject(err);
            }
        });
    }
    getPopulatedProject(projectId) {
        return new Promise(async (resolve, reject) => {
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
                const rawResponse = await this.apiService.post(query);
                const result = await rawResponse.json();
                resolve(result && result.data ? result.data.project : undefined);
            }
            catch (err) {
                reject(err);
            }
        });
    }
    getProjects() {
        return new Promise(async (resolve, reject) => {
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
                const rawResponse = await this.apiService.post(query);
                const results = await rawResponse.json();
                resolve(results && results.data ? results.data.projects : undefined);
            }
            catch (err) {
                reject(err);
            }
        });
    }
    createProject(project) {
        return new Promise(async (resolve, reject) => {
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
                const rawResponse = await this.apiService.post(query);
                const result = await rawResponse.json();
                resolve(result && result.data && result.data.createProject ? result.data.createProject.project : undefined);
            }
            catch (err) {
                reject(err);
            }
        });
    }
}

export { ProjectService as P };
