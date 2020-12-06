const { getDataWithEmpty } = require('../utils/get-data');
const { deepEqual } = require('assert');
const { createGroups, aggregateAnswersForGroup, countAllAnswers } = require('./6');

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
            ['b'],
            ['a', 'a', 'a', 'a'],
            ['a', 'b', 'a', 'c'],
            ['a', 'b', 'c'],
            ['a', 'b', 'c'],
        ];
        deepEqual(Array.from(createGroups(data)), expected);
    });

    it('aggregateAnswersForGroup', () => {
        const data = ['a', 'b', 'c'];
        const expected = [{ a: true, b: true, c: true }];
        deepEqual(Array.from(aggregateAnswersForGroup(data)), expected);
    });

    it('countAllAnswers testData', () => {
        const data = getDataWithEmpty(6, testData);
        const expected = [11];
        deepEqual(Array.from(countAllAnswers(data)), expected);
    });

    it('countAllAnswers', () => {
        const data = getDataWithEmpty(6);
        const expected = [6534];
        deepEqual(Array.from(countAllAnswers(data)), expected);
    });
});
