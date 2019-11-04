import { r as registerInstance, h } from './core-0a0592d1.js';
import { A as ApiService } from './api.service-1a8caa03.js';
import { P as ProjectService } from './project.service-cd4241a5.js';
import { T as TaskState } from './task-7dc16fd7.js';
import { T as TaskService } from './task.service-8501e47b.js';

class DocService {
    constructor() {
        // Private constructor, singleton
        this.apiService = ApiService.getInstance();
    }
    static getInstance() {
        if (!DocService.instance) {
            DocService.instance = new DocService();
        }
        return DocService.instance;
    }
    createOrUpdateDoc(taskId, docId, content) {
        if (!docId || docId === undefined || docId === '') {
            return this.createDoc(taskId, content);
        }
        else {
            return this.updateDoc(taskId, docId, content);
        }
    }
    createDoc(taskId, content) {
        return new Promise(async (resolve, reject) => {
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
                const rawResponse = await this.apiService.post(query);
                const result = await rawResponse.json();
                resolve(result && result.data && result.data.createDoc ? result.data.createDoc.doc : undefined);
            }
            catch (err) {
                reject(err);
            }
        });
    }
    updateDoc(taskId, docId, content) {
        return new Promise(async (resolve, reject) => {
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
                const rawResponse = await this.apiService.post(query);
                const result = await rawResponse.json();
                resolve(result && result.data && result.data.updateDoc ? result.data.updateDoc.doc : undefined);
            }
            catch (err) {
                reject(err);
            }
        });
    }
}

const AppTask = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.saving = false;
        this.taskService = TaskService.getInstance();
        this.projectService = ProjectService.getInstance();
        this.docService = DocService.getInstance();
    }
    async componentWillLoad() {
        await this.init();
    }
    async init() {
        if (!this.projectId) {
            return;
        }
        try {
            const promises = [];
            promises.push(this.projectService.getProject(this.projectId));
            promises.push(this.taskService.getTask(this.taskId));
            const results = await Promise.all(promises);
            if (results && results.length >= 2) {
                this.project = results[0];
                this.task = results[1];
                if (this.task) {
                    this.doc = this.task.docSet && this.task.docSet.length >= 0 ? this.task.docSet[0] : undefined;
                    this.content = this.doc ? decodeURI(this.doc.content) : undefined;
                }
            }
        }
        catch (err) {
            console.error(err);
            this.project = undefined;
            this.task = undefined;
        }
    }
    onDocumentationInput($event) {
        this.content = $event.target.value;
    }
    async handleSubmitForm($event) {
        $event.preventDefault();
        if (!this.content || this.content === '' || this.content === undefined) {
            return;
        }
        try {
            this.saving = true;
            this.doc = await this.docService.createOrUpdateDoc(this.taskId, this.doc ? this.doc.id : undefined, this.content);
            this.content = this.doc ? decodeURI(this.doc.content) : undefined;
            if (this.task.state === TaskState.CREATION) {
                await this.updateTaskState(TaskState.OPTIMIZATION);
            }
            this.saving = false;
        }
        catch (err) {
            console.error(err);
            this.saving = false;
        }
    }
    async submitDoc($event) {
        $event.preventDefault();
        if (this.task.state === TaskState.OPTIMIZATION) {
            await this.updateTaskState(TaskState.SUBMISSION);
        }
    }
    async updateTaskState(state) {
        if (!this.task || !this.projectId) {
            return;
        }
        this.task = await this.taskService.updateTaskState(this.projectId, this.task, state);
    }
    render() {
        return [
            h("ion-header", null, h("ion-toolbar", { color: "primary" }, h("ion-buttons", { slot: "start" }, h("ion-back-button", null)), h("ion-title", null, this.project ? this.project.repoName : undefined))),
            h("ion-content", { class: "ion-padding" }, h("main", null, h("app-project-details", { project: this.project }), this.renderTaskDescription(), this.renderTaskForm()))
        ];
    }
    renderTaskDescription() {
        if (this.task) {
            return [
                h("h2", { class: "ion-padding-top" }, "Task"),
                h("p", null, this.task.description ? decodeURI(this.task.description) : undefined)
            ];
        }
        else {
            return undefined;
        }
    }
    renderTaskForm() {
        if (!this.task) {
            return undefined;
        }
        return h("form", { onSubmit: (e) => this.handleSubmitForm(e) }, h("h2", { class: "ion-padding-top" }, "Documentation ", this.doc ? `(${this.doc.id})` : undefined), h("ion-textarea", { rows: 3, debounce: 500, disabled: this.saving, value: this.content, placeholder: "Please provide your documentation for the specific task and code", onIonInput: (e) => this.onDocumentationInput(e) }), h("ion-button", { type: "submit", class: "ion-margin-top", disabled: !this.content || this.saving || (this.task.state === TaskState.SUBMISSION || this.task.state === TaskState.COMPLETE), color: "primary", shape: "round" }, h("ion-label", null, "Save")), h("ion-button", { fill: "outline", class: "ion-margin-top", disabled: !this.content || this.saving || !this.doc || (this.task.state === TaskState.SUBMISSION || this.task.state === TaskState.COMPLETE), color: "primary", shape: "round", onClick: ($event) => this.submitDoc($event) }, h("ion-label", null, "Submit")));
    }
    static get style() { return ""; }
};

export { AppTask as app_task };
