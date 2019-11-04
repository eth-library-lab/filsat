import { r as registerInstance, h } from './core-0a0592d1.js';

const AppProjectDetails = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        if (!this.project) {
            return undefined;
        }
        return [
            h("app-language", { language: this.project.progLang }),
            h("h1", null, this.project.repoName),
            h("p", null, this.project.description && this.project.description !== undefined && this.project.description !== '' ? decodeURI(this.project.description) : undefined)
        ];
    }
    static get style() { return ""; }
};

export { AppProjectDetails as app_project_details };
