const { getValidPasswords } = require('./2');
const { getData } = require('../utils/get-data');
const { deepEqual } = require('assert');

describe('Day 2 tests', () => {
    it('getValidPasswords testdata', () => {
        const data = getData(
            2,
            `1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`
        );
        const expected = 1;
        deepEqual(Array.from(getValidPasswords(data)).length, expected);
    });

    it('getValidPasswords', () => {
        const data = getData(2);
        const expected = 588;
        deepEqual(Array.from(getValidPasswords(data)).length, expected);
    });
});
