import { r as registerInstance, h } from './core-0a0592d1.js';
import { T as TaskState } from './task-7dc16fd7.js';

const AppTasksPanel = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    async componentWillLoad() {
        await this.filterAllTasks();
    }
    async onTaksUpdate() {
        await this.filterAllTasks();
    }
    async filterAllTasks() {
        this.tasksStatusCreation = await this.filterTasks(TaskState.CREATION);
        this.tasksStatusOptimization = await this.filterTasks(TaskState.OPTIMIZATION);
        this.tasksStatusSubmission = await this.filterTasks(TaskState.SUBMISSION);
        this.tasksStatusComplete = await this.filterTasks(TaskState.COMPLETE);
    }
    filterTasks(state) {
        return new Promise((resolve) => {
            if (!this.tasks || this.tasks.length <= 0) {
                resolve([]);
                return;
            }
            const results = this.tasks.filter((task) => {
                return state === task.state;
            });
            resolve(results);
        });
    }
    render() {
        return h("div", { class: "tasks-container" }, this.renderTasksColumn(this.tasksStatusCreation, TaskState.CREATION), this.renderTasksColumn(this.tasksStatusOptimization, TaskState.OPTIMIZATION), this.renderTasksColumn(this.tasksStatusSubmission, TaskState.SUBMISSION), this.renderTasksColumn(this.tasksStatusComplete, TaskState.COMPLETE));
    }
    renderTasksColumn(tasks, state) {
        return h("div", { class: `tasks-column ${TaskState[state].toLowerCase()}` }, h("h3", { class: "ion-margin" }, TaskState[state].toLowerCase()), this.renderTasks(tasks));
    }
    renderTasks(tasks) {
        if (!this.project) {
            return undefined;
        }
        if (tasks && tasks.length > 0) {
            return (tasks.map((task) => {
                return h("ion-card", { class: "ion-margin", key: task.id, href: `/tasks/${this.project.id}/${task.id}` }, h("ion-card-content", null, decodeURI(task.description)));
            }));
        }
        else {
            return undefined;
        }
    }
    static get watchers() { return {
        "tasks": ["onTaksUpdate"]
    }; }
    static get style() { return "app-tasks-panel div.tasks-container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));\n  grid-gap: 8px;\n}\napp-tasks-panel div.tasks-container div.tasks-column {\n  display: block;\n  background: var(--ion-color-light);\n}\napp-tasks-panel div.tasks-container div.tasks-column:first-of-type {\n  margin-left: 0;\n}\napp-tasks-panel div.tasks-container div.tasks-column:last-of-type {\n  margin-right: 0;\n}\napp-tasks-panel div.tasks-container div.tasks-column.creation {\n  border-top: 2px solid var(--ion-color-tertiary);\n}\napp-tasks-panel div.tasks-container div.tasks-column.optimization {\n  border-top: 2px solid var(--ion-color-secondary);\n}\napp-tasks-panel div.tasks-container div.tasks-column.submission {\n  border-top: 2px solid var(--ion-color-quaternary);\n}\napp-tasks-panel div.tasks-container div.tasks-column.complete {\n  border-top: 2px solid var(--ion-color-primary);\n}\napp-tasks-panel div.tasks-container div.tasks-column ion-card {\n  background: white;\n}"; }
};

export { AppTasksPanel as app_tasks_panel };
