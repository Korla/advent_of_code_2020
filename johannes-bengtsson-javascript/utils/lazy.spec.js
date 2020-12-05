const { lazy } = require('./lazy');
const { deepEqual } = require('assert');

describe.only('lazy', () => {
    describe('map', () => {
        it('projects', () => {
            const addOne = lazy.map((a) => a + 1);
            deepEqual(Array.from(addOne([1, 2])), [2, 3]);
        });

        it('passes id', () => {
            const addOne = lazy.map((a, i) => i);
            deepEqual(Array.from(addOne([1, 2])), [0, 1]);
        });
    });
});
