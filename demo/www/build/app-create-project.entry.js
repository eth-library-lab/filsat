import { r as registerInstance, h } from './core-0a0592d1.js';
import './api.service-1a8caa03.js';
import { P as ProjectService } from './project.service-cd4241a5.js';

const AppCreateProject = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.saving = false;
        this.projectService = ProjectService.getInstance();
    }
    async createProject($event) {
        $event.preventDefault();
        const project = {
            repoName: this.projectRepoName,
            verNum: this.projectVerNum,
            link: this.projectLink,
            repoSize: this.projectRepoSize,
            progLang: this.projectProgLang,
            description: this.projectDescription
        };
        this.saving = true;
        try {
            this.project = await this.projectService.createProject(project);
            this.saving = false;
        }
        catch (err) {
            console.error(err);
            this.saving = false;
        }
    }
    async createTask() {
        if (!this.project || !this.project.id) {
            return;
        }
        const modalController = document.querySelector('ion-modal-controller');
        await modalController.componentOnReady();
        const modal = await modalController.create({
            component: 'app-create-task',
            componentProps: {
                project: this.project
            }
        });
        modal.onDidDismiss().then(async (detail) => {
            if (detail && detail.data) {
                if (!this.tasks) {
                    this.tasks = [];
                }
                this.tasks = [...this.tasks, detail.data];
            }
        });
        await modal.present();
    }
    render() {
        return [
            h("ion-header", null, h("ion-toolbar", { color: "secondary" }, h("ion-buttons", { slot: "start" }, h("ion-menu-toggle", null, h("ion-button", null, h("ion-icon", { slot: "icon-only", name: "menu" })))), h("ion-title", null, "Create a project"))),
            h("ion-content", { class: "ion-padding" }, this.renderProject())
        ];
    }
    renderProject() {
        console.log(this.project);
        if (this.project) {
            return [
                h("app-project-details", { project: this.project }),
                h("app-tasks-panel", { project: this.project, tasks: this.tasks }),
                h("ion-button", { class: "ion-margin-top", color: "tertiary", fill: "outline", shape: "round", onClick: () => this.createTask() }, h("ion-label", null, "Create a task"))
            ];
        }
        else {
            return this.renderCreateProjectForm();
        }
    }
    renderCreateProjectForm() {
        return h("form", { onSubmit: (e) => this.createProject(e) }, h("ion-list", { class: "inputs-list" }, h("ion-item", null, h("ion-label", null, "Name of the project")), h("ion-item", null, h("ion-input", { debounce: 500, "input-mode": "text", disabled: this.saving, onIonInput: ($event) => this.projectRepoName = $event.target.value })), h("ion-item", null, h("ion-label", null, "Description")), h("ion-item", null, h("ion-textarea", { rows: 3, debounce: 500, "input-mode": "text", disabled: this.saving, onIonInput: ($event) => this.projectDescription = $event.target.value })), h("ion-item", null, h("ion-label", null, "Version number")), h("ion-item", null, h("ion-input", { debounce: 500, "input-mode": "text", disabled: this.saving, onIonInput: ($event) => this.projectVerNum = $event.target.value })), h("ion-item", null, h("ion-label", null, "Link")), h("ion-item", null, h("ion-input", { debounce: 500, "input-mode": "text", disabled: this.saving, onIonInput: ($event) => this.projectLink = $event.target.value })), h("ion-item", null, h("ion-label", null, "Repo size")), h("ion-item", null, h("ion-input", { debounce: 500, type: "number", disabled: this.saving, onIonInput: ($event) => this.projectRepoSize = $event.target.value })), h("ion-item", null, h("ion-label", null, "Language")), h("ion-item", null, h("ion-input", { debounce: 500, "input-mode": "text", disabled: this.saving, onIonInput: ($event) => this.projectProgLang = $event.target.value }))), h("ion-button", { type: "submit", class: "ion-margin-top", disabled: !this.projectRepoName || !this.projectLink || !this.projectProgLang || this.saving, color: "secondary", shape: "round" }, h("ion-label", null, "Create")));
    }
    static get style() { return ""; }
};

export { AppCreateProject as app_create_project };
