"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filsat_1 = require("./filsat");
console.log('Filsat GitHub integration');
(async () => {
    const filsat = new filsat_1.Filsat();
    await filsat.run();
})();
