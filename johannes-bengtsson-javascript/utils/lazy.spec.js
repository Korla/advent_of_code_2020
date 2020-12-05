const { lazy } = require('./lazy');
const { deepEqual } = require('assert');

describe.only('lazy', () => {
    describe('map', () => {
        it('projects arrays', () => {
            const addOne = lazy.map((a) => a + 1);
            const data = [1, 2];
            const expected = [2, 3];
            deepEqual(Array.from(addOne(data)), expected);
        });

        it('projects iterators', () => {
            const addOne = lazy.map((a) => a + 1);
            const data = [1, 2];
            const expected = [2, 3];
            deepEqual(Array.from(addOne(data)), expected);
        });

        it('passes id', () => {
            const addOne = lazy.map((a, i) => i);
            const data = [1, 2];
            const expected = [0, 1];
            deepEqual(Array.from(addOne(data)), expected);
        });
    });

    describe('reduce', () => {
        it('reduces', () => {
            const sum = lazy.reduce((sum, term) => sum + term, 0);
            const data = [1, 2, 4, 8];
            const expected = [1, 3, 7, 15];
            deepEqual(Array.from(sum(data)), expected);
        });

        it('handles empty start value', () => {
            const sum = lazy.reduce((sum, term) => sum + term);
            const data = [1, 2, 4, 8];
            const expected = [1, 3, 7, 15];
            deepEqual(Array.from(sum(data)), expected);
        });

        it('passes id', () => {
            const sumIndexes = lazy.reduce((sum, term, i) => sum + i, 0);
            const data = [1, 2, 3, 4];
            const expected = [0, 1, 3, 6];
            deepEqual(Array.from(sumIndexes(data)), expected);
        });
    });
});
