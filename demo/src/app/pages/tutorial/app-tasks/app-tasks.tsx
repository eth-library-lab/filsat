import {Component, h, Prop, State} from '@stencil/core';

import {Project} from '../../../models/project';
import {Task} from '../../../models/task';

import {ProjectService} from '../../../services/project/project.service';

@Component({
  tag: 'app-tasks',
  styleUrl: 'app-tasks.scss'
})
export class AppTasks {

  @Prop()
  projectId: string;

  @State()
  private project: Project;

  @State()
  private tasks: Task[];

  private projectService: ProjectService;

  constructor() {
    this.projectService = ProjectService.getInstance();
  }

  async componentWillLoad() {
    await this.init();
  }

  private async init() {
    if (!this.projectId) {
      return;
    }

    try {
      this.project = await this.projectService.getPopulatedProject(this.projectId);

      if (this.project) {
        this.tasks = this.project.taskSet;


      }
    } catch (err) {
      console.error(err);
      this.project = undefined;
      this.tasks = [];
    }
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/"/>
          </ion-buttons>
          <ion-title>{this.project ? this.project.repoName : undefined}</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <main>
          <app-project-details project={this.project}></app-project-details>

          <app-tasks-panel project={this.project} tasks={this.tasks}></app-tasks-panel>
        </main>
      </ion-content>
    ];
  }

}
