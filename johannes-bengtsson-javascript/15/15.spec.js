const { deepEqual } = require('assert');
const { speakSequence } = require('./15');

describe('Day 15 tests', () => {
    it('speakSequences example', () => {
        deepEqual(speakSequence([0, 3, 6]), 436);
    });

    it('speakSequences', () => {
        deepEqual(speakSequence([2, 15, 0, 9, 1, 20]), 436);
    });
});
