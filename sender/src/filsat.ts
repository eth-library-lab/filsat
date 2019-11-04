import {FilsatGithub} from './filsat-github';

import {FilsatApi} from './filsat-api';
import {Doc, Task, TaskState} from './api';

export class Filsat {

    private processing: boolean = false;

    async run() {
        try {
            console.log('Start');

            if (this.processing) {
                return;
            }

            this.processing = true;

            const filsatApi: FilsatApi = new FilsatApi();
            const tasks: Task[] = await filsatApi.getTasksInSubmission();

            if (tasks && tasks.length > 0) {
                console.log(`${tasks.length} tasks fetched.`);

                for (const task of tasks) {
                    const doc: Doc | undefined = task.docSet && task.docSet.length > 0 ? task.docSet[0] : undefined;

                    if (doc) {
                        const pathname: string = new URL(task.project.link).pathname;

                        const filsatGithub: FilsatGithub = new FilsatGithub();
                        await filsatGithub.createPR(pathname, task.id, decodeURI(doc.content));

                        await filsatApi.updateTaskState(task.project.id, task, TaskState.COMPLETE);
                    }
                }
            }

            this.processing = false;

            console.log('Done.');
        } catch (err) {
            this.processing = false;
            console.error(err);
        }
    }

}
