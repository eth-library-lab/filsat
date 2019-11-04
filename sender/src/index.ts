import {Filsat} from './filsat';

console.log('Filsat GitHub integration');

(async () => {
    const filsat: Filsat = new Filsat();
    await filsat.run();
})();
