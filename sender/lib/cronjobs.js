"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cron = require("cron");
const filsat_1 = require("./filsat");
const filsat = new filsat_1.Filsat();
new cron.CronJob('*/10 * * * * *', async () => {
    await filsat.run();
}, () => {
}, true, 'Europe/Paris');
