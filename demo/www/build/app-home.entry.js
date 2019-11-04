import { r as registerInstance, h } from './core-0a0592d1.js';
import './api.service-1a8caa03.js';
import { P as ProjectService } from './project.service-cd4241a5.js';

const AppHome = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.projectService = ProjectService.getInstance();
    }
    async componentWillLoad() {
        try {
            this.projects = await this.projectService.getProjects();
        }
        catch (err) {
            console.error(err);
            this.projects = [];
        }
    }
    render() {
        return [
            h("ion-header", null, h("ion-toolbar", { color: "primary" }, h("ion-buttons", { slot: "start" }, h("ion-menu-toggle", null, h("ion-button", null, h("ion-icon", { slot: "icon-only", name: "menu" })))), h("ion-title", null, "Coding tutorial"))),
            h("ion-content", { class: "ion-padding" }, this.renderContent())
        ];
    }
    renderContent() {
        if (!this.projects) {
            return h("div", { class: "spinner" }, h("ion-spinner", { color: "primary" }));
        }
        else {
            return h("main", null, this.renderProjects());
        }
    }
    renderProjects() {
        return (this.projects.map((project) => {
            return h("ion-card", { class: "item ion-no-margin", key: project.id, href: `/tasks/${project.id}` }, h("ion-card-header", null, h("app-language", { language: project.progLang }), h("ion-card-title", null, project.repoName)), h("ion-card-content", null, this.renderProjectDescription(project), this.renderProjectTasks(project)));
        }));
    }
    renderProjectDescription(project) {
        return project && project.description ? h("p", null, decodeURI(project.description)) : undefined;
    }
    renderProjectTasks(project) {
        if (!project || !project.taskSet || project.taskSet.length <= 0) {
            return undefined;
        }
        return h("p", { class: "ion-padding-top" }, h("strong", null, project.taskSet.length), " tasks.");
    }
    static get style() { return "app-home main {\n  display: grid;\n  grid-gap: 16px;\n  grid-template-columns: repeat(auto-fill, 1fr);\n}\napp-home main ion-card.item {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  min-height: 24vh;\n  cursor: pointer;\n}\napp-home main ion-card.item a {\n  height: 100%;\n}\n\@media screen and (min-width: 540px) {\n  app-home main ion-card.item {\n    min-height: 38vh;\n  }\n}\n\@media screen and (min-width: 540px) {\n  app-home main {\n    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));\n  }\n}"; }
};

export { AppHome as app_home };
