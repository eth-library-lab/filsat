import { r as registerInstance, h, c as getElement } from './core-0a0592d1.js';
import './api.service-1a8caa03.js';
import { T as TaskState } from './task-7dc16fd7.js';
import { T as TaskService } from './task.service-8501e47b.js';

const AppCreateTask = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.saving = false;
        this.taskService = TaskService.getInstance();
    }
    async componentDidLoad() {
        history.pushState({ modal: true }, null);
    }
    async handleHardwareBackButton(_e) {
        await this.closeModal();
    }
    async closeModal() {
        await this.el.closest('ion-modal').dismiss();
    }
    async createTask($event) {
        $event.preventDefault();
        if (!this.project || !this.project.id) {
            return;
        }
        const task = {
            description: this.taskDescription,
            state: TaskState.CREATION,
            complexity: this.taskComplexity
        };
        this.saving = true;
        try {
            const createdTask = await this.taskService.createTask(this.project.id, task);
            await this.el.closest('ion-modal').dismiss(createdTask);
            this.saving = false;
        }
        catch (err) {
            console.error(err);
            this.saving = false;
        }
    }
    render() {
        return [
            h("ion-header", null, h("ion-toolbar", { color: "tertiary" }, h("ion-buttons", { slot: "start" }, h("ion-button", { onClick: () => this.closeModal(), disabled: this.saving }, h("ion-icon", { name: "close" }))), h("ion-title", { class: "ion-text-uppercase" }, "Create a task"))),
            h("ion-content", { class: "ion-padding" }, h("form", { onSubmit: (e) => this.createTask(e) }, h("h3", { class: "ion-padding-top" }, "Add a project's task"), h("ion-list", { class: "inputs-list" }, h("ion-item", null, h("ion-label", null, "Description of the task")), h("ion-item", null, h("ion-textarea", { rows: 3, debounce: 500, "input-mode": "text", disabled: this.saving, value: this.taskDescription, onIonInput: ($event) => this.taskDescription = $event.target.value })), h("ion-item", null, h("ion-label", null, "Complexity")), h("ion-item", null, h("ion-input", { debounce: 500, type: "number", disabled: this.saving, onIonInput: ($event) => this.taskComplexity = $event.target.value }))), h("ion-button", { type: "submit", class: "ion-margin-top", disabled: !this.taskDescription || this.saving, color: "tertiary", shape: "round" }, h("ion-label", null, "Create"))))
        ];
    }
    get el() { return getElement(this); }
    static get style() { return ""; }
};

export { AppCreateTask as app_create_task };
