"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filsat_github_1 = require("./filsat-github");
const filsat_api_1 = require("./filsat-api");
const api_1 = require("./api");
class Filsat {
    constructor() {
        this.processing = false;
    }
    async run() {
        try {
            console.log('Start');
            if (this.processing) {
                return;
            }
            this.processing = true;
            const filsatApi = new filsat_api_1.FilsatApi();
            const tasks = await filsatApi.getTasksInSubmission();
            if (tasks && tasks.length > 0) {
                console.log(`${tasks.length} tasks fetched.`);
                for (const task of tasks) {
                    const doc = task.docSet && task.docSet.length > 0 ? task.docSet[0] : undefined;
                    if (doc) {
                        const pathname = new URL(task.project.link).pathname;
                        const filsatGithub = new filsat_github_1.FilsatGithub();
                        await filsatGithub.createPR(pathname, task.id, decodeURI(doc.content));
                        await filsatApi.updateTaskState(task.project.id, task, api_1.TaskState.COMPLETE);
                    }
                }
            }
            this.processing = false;
            console.log('Done.');
        }
        catch (err) {
            this.processing = false;
            console.error(err);
        }
    }
}
exports.Filsat = Filsat;
