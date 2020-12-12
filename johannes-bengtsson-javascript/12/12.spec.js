const { getDataWithEmpty } = require('../utils/get-data');
const { deepEqual } = require('assert');
const { runShip, runShipTowards } = require('./12');

describe('Day 12 tests', () => {
    it('runShip example', () => {
        const data = getDataWithEmpty(
            11,
            `F10
N3
F7
R90
F11`
        );
        const expected = [25];
        deepEqual(Array.from(runShip(data)), expected);
    });

    it('runShip', () => {
        const data = getDataWithEmpty(12);
        const expected = [1319];
        deepEqual(Array.from(runShip(data)), expected);
    });

    it('runShipTowards example', () => {
        const data = getDataWithEmpty(
            11,
            `F10
N3
F7
R90
F11`
        );
        const expected = [286];
        deepEqual(Array.from(runShipTowards(data)), expected);
    });

    it('runShipTowards', () => {
        const data = getDataWithEmpty(12);
        const expected = [62434];
        deepEqual(Array.from(runShipTowards(data)), expected);
    });
});
