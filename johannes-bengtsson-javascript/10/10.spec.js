const { getDataWithEmpty } = require('../utils/get-data');
const { deepEqual } = require('assert');
const { countDifferences, countJumps } = require('./10');

const testData = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`;

describe('Day 10 tests', () => {
    it('countDifferences example', () => {
        const data = getDataWithEmpty(10, testData);
        const expected = [220];
        deepEqual(Array.from(countDifferences(data)), expected);
    });

    it('countDifferences', () => {
        const data = getDataWithEmpty(10);
        const expected = [2482];
        deepEqual(Array.from(countDifferences(data)), expected);
    });

    it('countJumps testdata', () => {
        const data = getDataWithEmpty(
            10,
            `16
10
15
5
1
11
7
19
6
12
4`
        );
        const expected = [8];
        deepEqual(Array.from(countJumps(data)), expected);
    });

    it('countJumps example', () => {
        const data = getDataWithEmpty(10, testData);
        const expected = [19208];
        deepEqual(Array.from(countJumps(data)), expected);
    });

    it('countJumps', () => {
        const data = getDataWithEmpty(10);
        const expected = [96717311574016];
        deepEqual(Array.from(countJumps(data)), expected);
    });
});
