const { lazy } = require('./lazy');
const { deepEqual, strictEqual } = require('assert');

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

    describe('takeLast', () => {
        it('Takes the last item', () => {
            const takeLast = lazy.takeLast();
            const data = [1, 3, 5, 2, 7];
            const expected = [7];
            deepEqual(Array.from(takeLast(data)), expected);
        });
    });

    describe('runGenerator', () => {
        it('Runs a generator for every element of the sequence', () => {
            const runGenerator = lazy.runGenerator(function* (seq) {
                for (let value of seq) {
                    yield value;
                    yield value + 1;
                }
            });
            const data = [1, 3, 5, 2, 7];
            const expected = [1, 2, 3, 4, 5, 6, 2, 3, 7, 8];
            deepEqual(Array.from(runGenerator(data)), expected);
        });
    });

    describe('takeWhile', () => {
        it('Takes until a condition is met', () => {
            const takeWhile = lazy.takeWhile((a) => a < 4);
            const data = [1, 3, 5, 2, 7];
            const expected = [1, 3];
            deepEqual(Array.from(takeWhile(data)), expected);
        });

        it('Calls the callback until the condition is met', () => {
            let i = 0;
            const takeWhile = lazy.takeWhile((a) => {
                i++;
                return a < 4;
            });
            const data = [1, 3, 5, 2, 7];
            Array.from(takeWhile(data));
            strictEqual(i, 3);
        });
    });
});
