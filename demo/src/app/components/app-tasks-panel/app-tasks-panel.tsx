import {Component, h, Prop, State, Watch} from '@stencil/core';

import {Task, TaskState} from '../../models/task';
import {Project} from '../../models/project';

@Component({
  tag: 'app-tasks-panel',
  styleUrl: 'app-tasks-panel.scss'
})
export class AppTasksPanel {

  @Prop()
  project: Project;

  @Prop()
  tasks: Task[];

  @State()
  private tasksStatusCreation: Task[];

  @State()
  private tasksStatusOptimization: Task[];

  @State()
  private tasksStatusSubmission: Task[];

  @State()
  private tasksStatusComplete: Task[];

  async componentWillLoad() {
    await this.filterAllTasks();
  }

  @Watch('tasks')
  async onTaksUpdate() {
    await this.filterAllTasks();
  }

  private async filterAllTasks() {
    this.tasksStatusCreation = await this.filterTasks(TaskState.CREATION);
    this.tasksStatusOptimization = await this.filterTasks(TaskState.OPTIMIZATION);
    this.tasksStatusSubmission = await this.filterTasks(TaskState.SUBMISSION);
    this.tasksStatusComplete = await this.filterTasks(TaskState.COMPLETE);
  }

  private filterTasks(state: TaskState): Promise<Task[]> {
    return new Promise<Task[]>((resolve) => {
      if (!this.tasks || this.tasks.length <= 0) {
        resolve([]);
        return;
      }

      const results: Task[] = this.tasks.filter((task: Task) => {
        return state === task.state;
      });

      resolve(results);
    });
  }

  render() {
    return <div class="tasks-container">
      {this.renderTasksColumn(this.tasksStatusCreation, TaskState.CREATION)}
      {this.renderTasksColumn(this.tasksStatusOptimization, TaskState.OPTIMIZATION)}
      {this.renderTasksColumn(this.tasksStatusSubmission, TaskState.SUBMISSION)}
      {this.renderTasksColumn(this.tasksStatusComplete, TaskState.COMPLETE)}
    </div>
  }

  private renderTasksColumn(tasks: Task[], state: TaskState) {
    return <div class={`tasks-column ${TaskState[state].toLowerCase()}`}>
      <h3 class="ion-margin">{TaskState[state].toLowerCase()}</h3>
      {this.renderTasks(tasks)}
    </div>
  }

  private renderTasks(tasks: Task[]) {
    if (!this.project) {
      return undefined;
    }

    if (tasks && tasks.length > 0) {
      return (
        tasks.map((task: Task) => {
          return <ion-card class="ion-margin" key={task.id} href={`/tasks/${this.project.id}/${task.id}`}>
            <ion-card-content>
              {decodeURI(task.description)}
            </ion-card-content>
          </ion-card>
        })
      );
    } else {
      return undefined;
    }
  }
}
