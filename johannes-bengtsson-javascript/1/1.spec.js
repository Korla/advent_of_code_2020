const { getSumOfEntries } = require('./1');
const { getData } = require('../advent-utils');
const { deepEqual } = require('assert');

describe('Day 1 tests', () => {
    it('Get sum of Entries testdata', () => {
        const data = getData(
            1,
            `1721
979
366
299
675
1456`
        ).map(Number);
        const expected = [241861950];
        deepEqual(Array.from(getSumOfEntries(data)), expected);
    });

    it('Get sum of Entries', () => {
        const data = getData(1).map(Number);
        const expected = [42140160];
        deepEqual(Array.from(getSumOfEntries(data)), expected);
    });
});
