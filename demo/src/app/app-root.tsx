import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {

  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <ion-route url="/" component="app-home" />
          <ion-route url="/tasks/:projectId" component="app-tasks" />
          <ion-route url="/tasks/:projectId/:taskId" component="app-task" />
          <ion-route url="/create" component="app-create-project" />
        </ion-router>

        <ion-menu id="ion-menu" side="start" type="overlay" swipeGesture={false} contentId="menu-content">
          <ion-content>
            <ion-menu-toggle autoHide={false}>
              <ion-list>
                <ion-item detail={false} href="/" routerDirection="forward">
                  <ion-icon name="code" slot="start"></ion-icon>
                  <ion-label>Coding tutorial</ion-label>
                </ion-item>

                <ion-item detail={false} href="/create" routerDirection="forward">
                  <ion-icon name="create" ios="md-create" md="md-create" slot="start"></ion-icon>
                  <ion-label>Create a project</ion-label>
                </ion-item>
              </ion-list>
            </ion-menu-toggle>
          </ion-content>
        </ion-menu>

        <ion-nav id="menu-content"/>

        <ion-modal-controller></ion-modal-controller>
      </ion-app>
    );
  }
}
