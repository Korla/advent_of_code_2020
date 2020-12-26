const { getDataWithEmpty } = require('../utils/get-data');
const { deepEqual } = require('assert');
const {
    runProgram,
    generatePermutations,
    maskValue,
    runProgram2,
} = require('./14');

const example = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`;

const example2 = `mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1`;

describe('Day 14 tests', () => {
    it('runProgram example', () => {
        const data = getDataWithEmpty(14, example);
        deepEqual(Array.from(runProgram(data)), [165]);
    });

    it('runProgram', () => {
        const data = getDataWithEmpty(14);
        deepEqual(Array.from(runProgram(data)), [13556564111697]);
    });

    it('generatePermutations', () => {
        const data = '000000000000000000000000000000X1101X';
        const expected = [
            '000000000000000000000000000000011010',
            '000000000000000000000000000000011011',
            '000000000000000000000000000000111010',
            '000000000000000000000000000000111011',
        ];
        deepEqual(generatePermutations(data), expected);
    });

    it('generatePermutations 2', () => {
        const data = '00000000000000000000000000000001X0XX';
        const expected = [
            '000000000000000000000000000000010000',
            '000000000000000000000000000000010001',
            '000000000000000000000000000000010010',
            '000000000000000000000000000000010011',
            '000000000000000000000000000000011000',
            '000000000000000000000000000000011001',
            '000000000000000000000000000000011010',
            '000000000000000000000000000000011011',
        ];
        deepEqual(generatePermutations(data), expected);
    });

    it('maskValue', () => {
        const value = 42;
        const mask = [...'000000000000000000000000000000X1001X'];
        const expected = '000000000000000000000000000000X1101X';
        deepEqual(maskValue(value, mask), expected);
    });

    it('runProgram2 example', () => {
        const data = getDataWithEmpty(14, example2);
        deepEqual(Array.from(runProgram2(data)), [208]);
    });

    it('runProgram2', () => {
        const data = getDataWithEmpty(14);
        deepEqual(Array.from(runProgram2(data)), [4173715962894]);
    });
});
