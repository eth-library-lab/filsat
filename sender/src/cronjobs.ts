import * as cron from 'cron';

import {Filsat} from './filsat';

const filsat: Filsat = new Filsat();

new cron.CronJob('*/10 * * * * *', async () => {
        await filsat.run();
    }, () => {
        /* This function is executed when the job stops */
    },
    true, /* Start the job right now */
    'Europe/Paris'
);
