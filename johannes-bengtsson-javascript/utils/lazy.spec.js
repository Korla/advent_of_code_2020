const { lazy } = require('./lazy');
const { deepEqual } = require('assert');

describe('lazy', () => {
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

        it('passes index', () => {
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

        it('passes index', () => {
            const sumIndexes = lazy.reduce((sum, term, i) => sum + i, 0);
            const data = [1, 2, 3, 4];
            const expected = [0, 1, 3, 6];
            deepEqual(Array.from(sumIndexes(data)), expected);
        });

        it('does not mutate start', () => {
            const sumIndexes = lazy.reduce(({ a }) => ({ a: a + 1 }), { a: 0 });
            const data = [1, 2, 3, 4];
            const expected = [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }];
            deepEqual(Array.from(sumIndexes(data)), expected);
            deepEqual(Array.from(sumIndexes(data)), expected);
        });
    });

    describe('filter', () => {
        it('filters', () => {
            const greaterThanThree = lazy.filter((a) => a > 3);
            const data = [1, 3, 5, 2, 7];
            const expected = [5, 7];
            deepEqual(Array.from(greaterThanThree(data)), expected);
        });

        it('passes index', () => {
            const removeFirstTwo = lazy.filter((a, i) => i > 2);
            const data = [1, 3, 5, 2, 7];
            const expected = [2, 7];
            deepEqual(Array.from(removeFirstTwo(data)), expected);
        });
    });

    describe('sort', () => {
        it('sorts', () => {
            const sort = lazy.sort();
            const data = [1, 3, 5, 2, 7];
            const expected = [1, 2, 3, 5, 7];
            deepEqual(Array.from(sort(data)), expected);
        });

        it('sorts with condition', () => {
            const sort = lazy.sort((a, b) => (b > a ? 1 : -1));
            const data = [1, 3, 5, 2, 7];
            const expected = [7, 5, 3, 2, 1];
            deepEqual(Array.from(sort(data)), expected);
        });
    });

    describe('flatMap', () => {
        it('flatMaps', () => {
            const flatMap = lazy.flatMap((a) => a);
            const data = [
                [1, 3],
                [5, 2, 7],
            ];
            const expected = [1, 3, 5, 2, 7];
            deepEqual(Array.from(flatMap(data)), expected);
        });

        it('projects', () => {
            const flatMap = lazy.flatMap(({ a }) => a);
            const data = [{ a: [1, 3] }, { a: [5, 2, 7] }];
            const expected = [1, 3, 5, 2, 7];
            deepEqual(Array.from(flatMap(data)), expected);
        });
    });
});
