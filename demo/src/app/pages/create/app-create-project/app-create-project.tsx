import {Component, h, State} from '@stencil/core';
import {OverlayEventDetail} from '@ionic/core';

import {Project} from '../../../models/project';
import {Task} from '../../../models/task';

import {ProjectService} from '../../../services/project/project.service';

@Component({
  tag: 'app-create-project',
  styleUrl: 'app-create-project.scss'
})
export class AppCreateProject {

  @State()
  private saving: boolean = false;

  @State()
  private projectRepoName: string;

  @State()
  private projectVerNum: string;

  @State()
  private projectLink: string;

  @State()
  private projectRepoSize: number;

  @State()
  private projectProgLang: string;

  @State()
  private projectDescription: string;

  @State()
  private project: Project;

  @State()
  private tasks: Task[];

  private projectService: ProjectService;

  constructor() {
    this.projectService = ProjectService.getInstance();
  }

  private async createProject($event: Event) {
    $event.preventDefault();

    const project: Project = {
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
    } catch (err) {
      console.error(err);
      this.saving = false;
    }

  }

  private async createTask() {
    if (!this.project || !this.project.id) {
      return;
    }

    const modalController: HTMLIonModalControllerElement = document.querySelector('ion-modal-controller');
    await modalController.componentOnReady();

    const modal: HTMLIonModalElement = await modalController.create({
      component: 'app-create-task',
      componentProps: {
        project: this.project
      }
    });

    modal.onDidDismiss().then(async (detail: OverlayEventDetail) => {
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
      <ion-header>
        <ion-toolbar color="secondary">
          <ion-buttons slot="start">
            <ion-menu-toggle>
              <ion-button>
                <ion-icon slot="icon-only" name="menu"></ion-icon>
              </ion-button>
            </ion-menu-toggle>
          </ion-buttons>

          <ion-title>Create a project</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        {this.renderProject()}
      </ion-content>
    ];
  }

  private renderProject() {

    console.log(this.project);

    if (this.project) {
      return [
        <app-project-details project={this.project}></app-project-details>,
        <app-tasks-panel project={this.project} tasks={this.tasks}></app-tasks-panel>,
        <ion-button class="ion-margin-top"
                    color="tertiary" fill="outline"
                    shape="round" onClick={() => this.createTask()}>
          <ion-label>Create a task</ion-label>
        </ion-button>
      ];
    } else {
      return this.renderCreateProjectForm();
    }
  }

  private renderCreateProjectForm() {
    return <form onSubmit={(e: Event) => this.createProject(e)}>
      {/* Project name */}
      <ion-list class="inputs-list">
        <ion-item>
          <ion-label>Name of the project</ion-label>
        </ion-item>

        <ion-item>
          <ion-input debounce={500} input-mode="text" disabled={this.saving}
                     onIonInput={($event: CustomEvent<KeyboardEvent>) => this.projectRepoName = ($event.target as any).value}></ion-input>
        </ion-item>

        {/* Project description */}
        <ion-item>
          <ion-label>Description</ion-label>
        </ion-item>

        <ion-item>
          <ion-textarea rows={3} debounce={500} input-mode="text" disabled={this.saving}
                     onIonInput={($event: CustomEvent<KeyboardEvent>) => this.projectDescription = ($event.target as any).value}></ion-textarea>
        </ion-item>

        {/* Version number */}
        <ion-item>
          <ion-label>Version number</ion-label>
        </ion-item>

        <ion-item>
          <ion-input debounce={500} input-mode="text" disabled={this.saving}
                     onIonInput={($event: CustomEvent<KeyboardEvent>) => this.projectVerNum = ($event.target as any).value}></ion-input>
        </ion-item>

        {/* Link */}
        <ion-item>
          <ion-label>Link</ion-label>
        </ion-item>

        <ion-item>
          <ion-input debounce={500} input-mode="text" disabled={this.saving}
                     onIonInput={($event: CustomEvent<KeyboardEvent>) => this.projectLink = ($event.target as any).value}></ion-input>
        </ion-item>

        {/* Repo size */}
        <ion-item>
          <ion-label>Repo size</ion-label>
        </ion-item>

        <ion-item>
          <ion-input debounce={500} type="number" disabled={this.saving}
                     onIonInput={($event: CustomEvent<KeyboardEvent>) => this.projectRepoSize = ($event.target as any).value}></ion-input>
        </ion-item>

        {/* Language */}
        <ion-item>
          <ion-label>Language</ion-label>
        </ion-item>

        <ion-item>
          <ion-input debounce={500} input-mode="text" disabled={this.saving}
                     onIonInput={($event: CustomEvent<KeyboardEvent>) => this.projectProgLang = ($event.target as any).value}></ion-input>
        </ion-item>
      </ion-list>

      <ion-button type="submit" class="ion-margin-top"
                  disabled={!this.projectRepoName || !this.projectLink || !this.projectProgLang || this.saving}
                  color="secondary"
                  shape="round">
        <ion-label>Create</ion-label>
      </ion-button>
    </form>;
  }

}
