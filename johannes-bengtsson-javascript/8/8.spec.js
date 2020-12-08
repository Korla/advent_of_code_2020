const { getDataWithEmpty } = require('../utils/get-data');
const { deepEqual } = require('assert');
const { parseData, runProgram } = require('./8');

const testData = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;

describe('Day 8 tests', () => {
    it('parseData', () => {
        const data = getDataWithEmpty(8, testData);
        const expected = [
            ['nop', +0],
            ['acc', +1],
            ['jmp', +4],
            ['acc', +3],
            ['jmp', -3],
            ['acc', -99],
            ['acc', +1],
            ['jmp', -4],
            ['acc', +6],
        ];
        deepEqual(Array.from(parseData(data)), expected);
    });

    it('runProgram example', () => {
        const data = getDataWithEmpty(8, testData);
        const expected = [5];
        deepEqual(Array.from(runProgram(data)), expected);
    });

    it('runProgram', () => {
        const data = getDataWithEmpty(8);
        const expected = [1671];
        deepEqual(Array.from(runProgram(data)), expected);
    });
});
