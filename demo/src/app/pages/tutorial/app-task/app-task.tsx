import {Component, h, Prop, State} from '@stencil/core';

import {Task, TaskState} from '../../../models/task';
import {Project} from '../../../models/project';
import {Doc} from '../../../models/doc';

import {TaskService} from '../../../services/task/task.service';
import {ProjectService} from '../../../services/project/project.service';
import {DocService} from '../../../services/doc/doc.service';

@Component({
  tag: 'app-task',
  styleUrl: 'app-task.scss'
})
export class AppTask {

  @Prop()
  projectId: string;

  @Prop()
  taskId: string;

  @State()
  private project: Project;

  @State()
  private task: Task;

  @State()
  private doc: Doc;

  @State()
  private saving: boolean = false;

  @State()
  private content: string;

  private projectService: ProjectService;
  private taskService: TaskService;
  private docService: DocService;

  constructor() {
    this.taskService = TaskService.getInstance();
    this.projectService = ProjectService.getInstance();
    this.docService = DocService.getInstance();
  }

  async componentWillLoad() {
    await this.init();
  }

  private async init() {
    if (!this.projectId) {
      return;
    }

    try {
      const promises = [];
      promises.push(this.projectService.getProject(this.projectId));
      promises.push(this.taskService.getTask(this.taskId));

      const results: (Project | Task)[] = await Promise.all(promises);

      if (results && results.length >= 2) {
        this.project = results[0] as Project;
        this.task = results[1] as Task;

        if (this.task) {
          this.doc = this.task.docSet && this.task.docSet.length >= 0 ? this.task.docSet[0] : undefined;
          this.content = this.doc ? decodeURI(this.doc.content) : undefined;
        }
      }

    } catch (err) {
      console.error(err);
      this.project = undefined;
      this.task = undefined;
    }
  }

  private onDocumentationInput($event: CustomEvent<KeyboardEvent>) {
    this.content = ($event.target as any).value;
  }

  private async handleSubmitForm($event: Event) {
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
    } catch (err) {
      console.error(err);

      this.saving = false;
    }
  }

  private async submitDoc($event: UIEvent) {
    $event.preventDefault();

    if (this.task.state === TaskState.OPTIMIZATION) {
      await this.updateTaskState(TaskState.SUBMISSION);
    }
  }

  private async updateTaskState(state: TaskState) {
    if (!this.task || !this.projectId) {
      return;
    }

    this.task = await this.taskService.updateTaskState(this.projectId, this.task, state);
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button/>
          </ion-buttons>
          <ion-title>{this.project ? this.project.repoName : undefined}</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content class="ion-padding">
        <main>
          <app-project-details project={this.project}></app-project-details>

          {this.renderTaskDescription()}

          {this.renderTaskForm()}
        </main>
      </ion-content>
    ]
  }

  private renderTaskDescription() {
    if (this.task) {
      return [
        <h2 class="ion-padding-top">Task</h2>,
        <p>{this.task.description ? decodeURI(this.task.description) : undefined}</p>
      ]
    } else {
      return undefined;
    }
  }

  private renderTaskForm() {
    if (!this.task) {
      return undefined;
    }

    return <form onSubmit={(e: Event) => this.handleSubmitForm(e)}>
      <h2 class="ion-padding-top">Documentation {this.doc ? `(${this.doc.id})` : undefined}</h2>

      <ion-textarea rows={3} debounce={500} disabled={this.saving} value={this.content}
                    placeholder="Please provide your documentation for the specific task and code"
                    onIonInput={(e: CustomEvent<KeyboardEvent>) => this.onDocumentationInput(e)}></ion-textarea>

      <ion-button type="submit" class="ion-margin-top" disabled={!this.content || this.saving || (this.task.state === TaskState.SUBMISSION || this.task.state === TaskState.COMPLETE)} color="primary" shape="round">
        <ion-label>Save</ion-label>
      </ion-button>

      <ion-button fill="outline" class="ion-margin-top" disabled={!this.content || this.saving || !this.doc || (this.task.state === TaskState.SUBMISSION || this.task.state === TaskState.COMPLETE)} color="primary" shape="round" onClick={($event: UIEvent) => this.submitDoc($event)}>
        <ion-label>Submit</ion-label>
      </ion-button>
    </form>
  }
}
