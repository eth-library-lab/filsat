import {EnvironmentConfigService} from '../environment/environment-config.service';

export class ApiService {

  private static instance: ApiService;

  private graphQL: string = EnvironmentConfigService.getInstance().get('graphQL');

  private constructor() {
    // Private constructor, singleton
  }

  static getInstance() {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  post(query: string): Promise<Response> {
    return new Promise<Response>(async (resolve, reject) => {
      try {
        const rawResponse: Response = await fetch(`${this.graphQL}`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({query})
        });

        if (!rawResponse || !rawResponse.ok) {
          console.error(rawResponse);
          reject(new Error('Error while querying the projects.'));
          return;
        }

        resolve(rawResponse);
      } catch (err) {
        reject(err);
      }
    });
  }
}
