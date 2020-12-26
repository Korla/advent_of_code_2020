const { getDataWithEmpty } = require('../utils/get-data');
const { deepEqual } = require('assert');
const { runProgram } = require('./14');

const example = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`;

describe('Day 14 tests', () => {
    it('parseData', () => {
        const data = getDataWithEmpty(14, example);
        deepEqual(Array.from(runProgram(data)), [165]);
    });

    it('parseData', () => {
        const data = getDataWithEmpty(14);
        deepEqual(Array.from(runProgram(data)), [13556564111697]);
    });
});
