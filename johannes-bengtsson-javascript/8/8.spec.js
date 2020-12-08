const { getDataWithEmpty } = require('../utils/get-data');
const { deepEqual } = require('assert');
const {
    parseData,
    createMutatedData,
    runProgramUntilRevisit,
    runProgramUntilFoundSolution,
} = require('./8');

const testData = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;

const testData2 = `nop +0
acc +1
jmp +4`;

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

    it('runProgramUntilRevisit example', () => {
        const data = getDataWithEmpty(8, testData);
        const expected = [5];
        deepEqual(Array.from(runProgramUntilRevisit(data)), expected);
    });

    it('runProgramUntilRevisit', () => {
        const data = getDataWithEmpty(8);
        const expected = [1671];
        deepEqual(Array.from(runProgramUntilRevisit(data)), expected);
    });

    it('createMutatedData', () => {
        const data = getDataWithEmpty(8, testData2);
        const expected = [
            [
                ['jmp', +0],
                ['acc', +1],
                ['jmp', +4],
            ],
            [
                ['nop', +0],
                ['acc', +1],
                ['nop', +4],
            ],
        ];
        deepEqual(Array.from(createMutatedData(data)), expected);
    });

    it('runProgramUntilFoundSolution example', () => {
        const data = getDataWithEmpty(8, testData);
        const expected = [8];
        deepEqual(Array.from(runProgramUntilFoundSolution(data)), expected);
    });

    it('runProgramUntilFoundSolution', () => {
        const data = getDataWithEmpty(8);
        const expected = [892];
        deepEqual(Array.from(runProgramUntilFoundSolution(data)), expected);
    });
});
