const { getDataWithEmpty } = require('../utils/get-data');
const { deepEqual } = require('assert');
const {
    createGroups,
    aggregateAnswersForGroup,
    countAllAnswers,
} = require('./6');

const testData = `abc

a
b
c

ab
ac

a
a
a
a

b`;

describe('Day 6 tests', () => {
    it('createGroups', () => {
        const data = getDataWithEmpty(6, testData);
        const expected = [
            [['b']],
            [['a'], ['a'], ['a'], ['a']],
            [
                ['a', 'b'],
                ['a', 'c'],
            ],
            [['a'], ['b'], ['c']],
            [['a', 'b', 'c']],
        ];
        deepEqual(Array.from(createGroups(data)), expected);
    });

    it('aggregateAnswersForGroup', () => {
        const data = [
            ['a', 'b'],
            ['a', 'c'],
        ];
        const expected = [{ a: true }];
        deepEqual(Array.from(aggregateAnswersForGroup(data)), expected);
    });

    it('aggregateAnswersForGroup empty', () => {
        const data = [['a'], ['b'], ['c']];
        const expected = [undefined];
        deepEqual(Array.from(aggregateAnswersForGroup(data)), expected);
    });

    it('countAllAnswers testData', () => {
        const data = getDataWithEmpty(6, testData);
        const expected = [6];
        deepEqual(Array.from(countAllAnswers(data)), expected);
    });

    it('countAllAnswers', () => {
        const data = getDataWithEmpty(6);
        const expected = [3402];
        deepEqual(Array.from(countAllAnswers(data)), expected);
    });
});
