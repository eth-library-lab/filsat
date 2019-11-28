/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  Project,
} from './app/models/project';
import {
  Task,
} from './app/models/task';

export namespace Components {
  interface AppCreateProject {}
  interface AppCreateTask {
    'project': Project;
  }
  interface AppHome {}
  interface AppLanguage {
    'language': string;
  }
  interface AppProjectDetails {
    'project': Project;
  }
  interface AppRoot {}
  interface AppTask {
    'projectId': string;
    'taskId': string;
  }
  interface AppTasks {
    'projectId': string;
  }
  interface AppTasksPanel {
    'project': Project;
    'tasks': Task[];
  }
}

declare global {


  interface HTMLAppCreateProjectElement extends Components.AppCreateProject, HTMLStencilElement {}
  const HTMLAppCreateProjectElement: {
    prototype: HTMLAppCreateProjectElement;
    new (): HTMLAppCreateProjectElement;
  };

  interface HTMLAppCreateTaskElement extends Components.AppCreateTask, HTMLStencilElement {}
  const HTMLAppCreateTaskElement: {
    prototype: HTMLAppCreateTaskElement;
    new (): HTMLAppCreateTaskElement;
  };

  interface HTMLAppHomeElement extends Components.AppHome, HTMLStencilElement {}
  const HTMLAppHomeElement: {
    prototype: HTMLAppHomeElement;
    new (): HTMLAppHomeElement;
  };

  interface HTMLAppLanguageElement extends Components.AppLanguage, HTMLStencilElement {}
  const HTMLAppLanguageElement: {
    prototype: HTMLAppLanguageElement;
    new (): HTMLAppLanguageElement;
  };

  interface HTMLAppProjectDetailsElement extends Components.AppProjectDetails, HTMLStencilElement {}
  const HTMLAppProjectDetailsElement: {
    prototype: HTMLAppProjectDetailsElement;
    new (): HTMLAppProjectDetailsElement;
  };

  interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {}
  const HTMLAppRootElement: {
    prototype: HTMLAppRootElement;
    new (): HTMLAppRootElement;
  };

  interface HTMLAppTaskElement extends Components.AppTask, HTMLStencilElement {}
  const HTMLAppTaskElement: {
    prototype: HTMLAppTaskElement;
    new (): HTMLAppTaskElement;
  };

  interface HTMLAppTasksElement extends Components.AppTasks, HTMLStencilElement {}
  const HTMLAppTasksElement: {
    prototype: HTMLAppTasksElement;
    new (): HTMLAppTasksElement;
  };

  interface HTMLAppTasksPanelElement extends Components.AppTasksPanel, HTMLStencilElement {}
  const HTMLAppTasksPanelElement: {
    prototype: HTMLAppTasksPanelElement;
    new (): HTMLAppTasksPanelElement;
  };
  interface HTMLElementTagNameMap {
    'app-create-project': HTMLAppCreateProjectElement;
    'app-create-task': HTMLAppCreateTaskElement;
    'app-home': HTMLAppHomeElement;
    'app-language': HTMLAppLanguageElement;
    'app-project-details': HTMLAppProjectDetailsElement;
    'app-root': HTMLAppRootElement;
    'app-task': HTMLAppTaskElement;
    'app-tasks': HTMLAppTasksElement;
    'app-tasks-panel': HTMLAppTasksPanelElement;
  }
}

declare namespace LocalJSX {
  interface AppCreateProject {}
  interface AppCreateTask {
    'project'?: Project;
  }
  interface AppHome {}
  interface AppLanguage {
    'language'?: string;
  }
  interface AppProjectDetails {
    'project'?: Project;
  }
  interface AppRoot {}
  interface AppTask {
    'projectId'?: string;
    'taskId'?: string;
  }
  interface AppTasks {
    'projectId'?: string;
  }
  interface AppTasksPanel {
    'project'?: Project;
    'tasks'?: Task[];
  }

  interface IntrinsicElements {
    'app-create-project': AppCreateProject;
    'app-create-task': AppCreateTask;
    'app-home': AppHome;
    'app-language': AppLanguage;
    'app-project-details': AppProjectDetails;
    'app-root': AppRoot;
    'app-task': AppTask;
    'app-tasks': AppTasks;
    'app-tasks-panel': AppTasksPanel;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'app-create-project': LocalJSX.AppCreateProject & JSXBase.HTMLAttributes<HTMLAppCreateProjectElement>;
      'app-create-task': LocalJSX.AppCreateTask & JSXBase.HTMLAttributes<HTMLAppCreateTaskElement>;
      'app-home': LocalJSX.AppHome & JSXBase.HTMLAttributes<HTMLAppHomeElement>;
      'app-language': LocalJSX.AppLanguage & JSXBase.HTMLAttributes<HTMLAppLanguageElement>;
      'app-project-details': LocalJSX.AppProjectDetails & JSXBase.HTMLAttributes<HTMLAppProjectDetailsElement>;
      'app-root': LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
      'app-task': LocalJSX.AppTask & JSXBase.HTMLAttributes<HTMLAppTaskElement>;
      'app-tasks': LocalJSX.AppTasks & JSXBase.HTMLAttributes<HTMLAppTasksElement>;
      'app-tasks-panel': LocalJSX.AppTasksPanel & JSXBase.HTMLAttributes<HTMLAppTasksPanelElement>;
    }
  }
}

