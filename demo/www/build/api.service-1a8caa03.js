class EnvironmentConfigService {
    constructor() {
        // Private constructor, singleton
        this.init();
    }
    static getInstance() {
        if (!EnvironmentConfigService.instance) {
            EnvironmentConfigService.instance = new EnvironmentConfigService();
        }
        return EnvironmentConfigService.instance;
    }
    init() {
        if (!window) {
            return;
        }
        const win = window;
        const DeckGo = win.DeckGo;
        this.m = new Map(Object.entries(DeckGo.config));
    }
    get(key, fallback) {
        const value = this.m.get(key);
        return (value !== undefined) ? value : fallback;
    }
}

class ApiService {
    constructor() {
        this.graphQL = EnvironmentConfigService.getInstance().get('graphQL');
        // Private constructor, singleton
    }
    static getInstance() {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }
    post(query) {
        return new Promise(async (resolve, reject) => {
            try {
                const rawResponse = await fetch(`${this.graphQL}`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ query })
                });
                if (!rawResponse || !rawResponse.ok) {
                    console.error(rawResponse);
                    reject(new Error('Error while querying the projects.'));
                    return;
                }
                resolve(rawResponse);
            }
            catch (err) {
                reject(err);
            }
        });
    }
}

export { ApiService as A };
