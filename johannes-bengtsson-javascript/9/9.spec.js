const { getDataWithEmpty } = require('../utils/get-data');
const { deepEqual } = require('assert');
const {
    getInGroups,
    createAllSums,
    findNumberWhichDoesntSum,
    findWeakness,
} = require('./9');

const testData = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`;

describe('Day 9 tests', () => {
    it('getInGroupsOf5', () => {
        const example = `1
2
3
4
5
6
7
8`;
        const data = getDataWithEmpty(9, example);
        const expected = [
            [1, 2, 3, 4, 5, 6],
            [2, 3, 4, 5, 6, 7],
            [3, 4, 5, 6, 7, 8],
        ];
        deepEqual(Array.from(getInGroups(6)(data)), expected);
    });

    it('createAllSums', () => {
        const data = [1, 2, 4, 8];
        const expected = [3, 5, 6, 9, 10, 12];
        deepEqual(Array.from(createAllSums(data)), expected);
    });

    it('findNumberWhichDoesntSum testData', () => {
        const data = getDataWithEmpty(9, testData);
        const expected = [127];
        deepEqual(Array.from(findNumberWhichDoesntSum(5)(data)), expected);
    });

    it('findNumberWhichDoesntSum', () => {
        const data = getDataWithEmpty(9);
        const expected = [466456641];
        deepEqual(Array.from(findNumberWhichDoesntSum(25)(data)), expected);
    });

    it('findWeakness testData', () => {
        const data = getDataWithEmpty(9, testData);
        const expected = [62];
        deepEqual(Array.from(findWeakness(127)(data)), expected);
    });

    it('findWeakness', () => {
        const data = getDataWithEmpty(9);
        const expected = [55732936];
        deepEqual(Array.from(findWeakness(466456641)(data)), expected);
    });
});
