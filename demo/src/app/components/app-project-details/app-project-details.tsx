import {Component, h, Prop} from '@stencil/core';
import {Project} from '../../models/project';

@Component({
  tag: 'app-project-details',
  styleUrl: 'app-project-details.scss',
  shadow: true
})
export class AppProjectDetails {

  @Prop()
  project: Project;

  render() {
    if (!this.project) {
      return undefined;
    }

    return [
      <app-language language={this.project.progLang}></app-language>,
      <h1>{this.project.repoName}</h1>,
      <p>{this.project.description && this.project.description !== undefined && this.project.description !== '' ? decodeURI(this.project.description) : undefined}</p>
    ]
  }

}
