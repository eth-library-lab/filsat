import { r as registerInstance, h } from './core-0a0592d1.js';
import './api.service-1a8caa03.js';
import { P as ProjectService } from './project.service-cd4241a5.js';

const AppTasks = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.projectService = ProjectService.getInstance();
    }
    async componentWillLoad() {
        await this.init();
    }
    async init() {
        if (!this.projectId) {
            return;
        }
        try {
            this.project = await this.projectService.getPopulatedProject(this.projectId);
            if (this.project) {
                this.tasks = this.project.taskSet;
            }
        }
        catch (err) {
            console.error(err);
            this.project = undefined;
            this.tasks = [];
        }
    }
    render() {
        return [
            h("ion-header", null, h("ion-toolbar", { color: "primary" }, h("ion-buttons", { slot: "start" }, h("ion-back-button", { defaultHref: "/" })), h("ion-title", null, this.project ? this.project.repoName : undefined))),
            h("ion-content", { class: "ion-padding" }, h("main", null, h("app-project-details", { project: this.project }), h("app-tasks-panel", { project: this.project, tasks: this.tasks })))
        ];
    }
    static get style() { return ""; }
};

export { AppTasks as app_tasks };
