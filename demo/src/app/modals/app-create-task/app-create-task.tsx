import {Component, Element, Listen, Prop, State, h} from '@stencil/core';

import {Task, TaskState} from '../../models/task';
import {Project} from '../../models/project';

import {TaskService} from '../../services/task/task.service';

@Component({
  tag: 'app-create-task',
  styleUrl: 'app-create-task.scss'
})
export class AppCreateTask {

  @Element() el: HTMLElement;

  @Prop()
  project: Project;

  @State()
  private taskDescription: string;

  @State()
  private taskComplexity: number;

  @State()
  private saving: boolean = false;

  private taskService: TaskService;

  constructor() {
    this.taskService = TaskService.getInstance();
  }

  async componentDidLoad() {
    history.pushState({modal: true}, null);
  }

  @Listen('popstate', {target: 'window'})
  async handleHardwareBackButton(_e: PopStateEvent) {
    await this.closeModal();
  }

  async closeModal() {
    await (this.el.closest('ion-modal') as HTMLIonModalElement).dismiss();
  }

  private async createTask($event: Event) {
    $event.preventDefault();

    if (!this.project || !this.project.id) {
      return;
    }

    const task: Task = {
      description: this.taskDescription,
      state: TaskState.CREATION,
      complexity: this.taskComplexity
    };

    this.saving = true;

    try {
      const createdTask: Task = await this.taskService.createTask(this.project.id, task);

      await (this.el.closest('ion-modal') as HTMLIonModalElement).dismiss(createdTask);

      this.saving = false;
    } catch (err) {
      console.error(err);
      this.saving = false;
    }

  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="tertiary">
          <ion-buttons slot="start">
            <ion-button onClick={() => this.closeModal()} disabled={this.saving}>
              <ion-icon name="close"></ion-icon>
            </ion-button>
          </ion-buttons>
          <ion-title class="ion-text-uppercase">Create a task</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content class="ion-padding">
        <form onSubmit={(e: Event) => this.createTask(e)}>
          <h3 class="ion-padding-top">Add a project's task</h3>

          <ion-list class="inputs-list">
            {/* Task description */}
            <ion-item>
              <ion-label>Description of the task</ion-label>
            </ion-item>

            <ion-item>
              <ion-textarea rows={3} debounce={500} input-mode="text" disabled={this.saving} value={this.taskDescription}
                         onIonInput={($event: CustomEvent<KeyboardEvent>) => this.taskDescription = ($event.target as any).value}></ion-textarea>
            </ion-item>

            {/* Complexity */}
            <ion-item>
              <ion-label>Complexity</ion-label>
            </ion-item>

            <ion-item>
              <ion-input debounce={500} type="number" disabled={this.saving}
                         onIonInput={($event: CustomEvent<KeyboardEvent>) => this.taskComplexity = ($event.target as any).value}></ion-input>
            </ion-item>
          </ion-list>

          <ion-button type="submit" class="ion-margin-top"
                      disabled={!this.taskDescription || this.saving} color="tertiary"
                      shape="round">
            <ion-label>Create</ion-label>
          </ion-button>
        </form>
      </ion-content>
    ];
  }

}
