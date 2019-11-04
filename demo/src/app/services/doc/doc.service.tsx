import {ApiService} from '../api/api.service';

import {Doc} from '../../models/doc';

interface DocResponseData {
  doc: Doc;
}

interface PostDocResponseData {
  createDoc?: DocResponseData;
  updateDoc?: DocResponseData;
}

interface DocResponse {
  data: PostDocResponseData;
}

export class DocService {

  private static instance: DocService;

  private apiService: ApiService;

  private constructor() {
    // Private constructor, singleton
    this.apiService = ApiService.getInstance();
  }

  static getInstance() {
    if (!DocService.instance) {
      DocService.instance = new DocService();
    }
    return DocService.instance;
  }

  createOrUpdateDoc(taskId: string, docId: string, content: string): Promise<Doc> {
      if (!docId || docId === undefined || docId === '') {
        return this.createDoc(taskId, content);
      } else {
        return this.updateDoc(taskId, docId, content);
      }
  }

  private createDoc(taskId: string, content: string): Promise<Doc> {
    return new Promise<Doc>(async (resolve, reject) => {
      try {
        const query = `
          mutation {
            createDoc(input: {
              content: "${encodeURI(content)}"
              rating: 0
              task: { 
                id: "${taskId}"
              }
            }) {
              doc {
                id
                content
                rating
              }
            }
          }
        `;

        const rawResponse: Response = await this.apiService.post(query);

        const result: DocResponse = await rawResponse.json();

        resolve(result && result.data && result.data.createDoc ? result.data.createDoc.doc : undefined);
      } catch (err) {
        reject(err);
      }
    });
  }

  private updateDoc(taskId: string, docId: string, content: string): Promise<Doc> {
    return new Promise<Doc>(async (resolve, reject) => {
      try {
        const query = `
          mutation {
            updateDoc(id: ${docId}, input: {
              content: "${encodeURI(content)}",
              rating: 0
              task: { 
                id: "${taskId}"
              }
            }) {
              doc {
                id
                content
                rating
              }
            }
          }
        `;

        const rawResponse: Response = await this.apiService.post(query);

        const result: DocResponse = await rawResponse.json();

        resolve(result && result.data && result.data.updateDoc ? result.data.updateDoc.doc : undefined);
      } catch (err) {
        reject(err);
      }
    });
  }
}
