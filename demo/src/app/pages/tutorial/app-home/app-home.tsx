import {Component, h, State} from '@stencil/core';

import {Project} from '../../../models/project';

import {ProjectService} from '../../../services/project/project.service';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss'
})
export class AppHome {

  @State()
  private projects: Project[];

  private projectService: ProjectService;

  constructor() {
    this.projectService = ProjectService.getInstance();
  }

  async componentWillLoad() {
    try {
      this.projects = await this.projectService.getProjects();
    } catch (err) {
      console.error(err);
      this.projects = [];
    }
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-menu-toggle>
              <ion-button>
                <ion-icon slot="icon-only" name="menu"></ion-icon>
              </ion-button>
            </ion-menu-toggle>
          </ion-buttons>

          <ion-title>Coding tutorial</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        {this.renderContent()}
      </ion-content>
    ];
  }

  private renderContent() {
    if (!this.projects) {
      return <div class="spinner">
        <ion-spinner color="primary"></ion-spinner>
      </div>;
    } else {
      return <main>
        {this.renderProjects()}
      </main>
    }
  }

  private renderProjects() {
    return (
      this.projects.map((project: Project) => {
        return <ion-card class="item ion-no-margin" key={project.id} href={`/tasks/${project.id}`}>
          <ion-card-header>
            <app-language language={project.progLang}></app-language>
            <ion-card-title>{project.repoName}</ion-card-title>
          </ion-card-header>

          <ion-card-content>
            {this.renderProjectDescription(project)}
            {this.renderProjectTasks(project)}
          </ion-card-content>
        </ion-card>;
      })
    );
  }

  private renderProjectDescription(project: Project) {
      return project && project.description? <p>{decodeURI(project.description)}</p> : undefined;
  }

  private renderProjectTasks(project: Project) {
    if (!project || !project.taskSet || project.taskSet.length <= 0) {
      return undefined;
    }

    return <p class="ion-padding-top">
      <strong>{project.taskSet.length}</strong> tasks.
    </p>
  }
}
