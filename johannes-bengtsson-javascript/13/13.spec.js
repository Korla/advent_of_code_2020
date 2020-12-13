const { getDataWithEmpty } = require('../utils/get-data');
const { deepEqual } = require('assert');
const { findTime, getNextBusTime, findSequence } = require('./13');

const example = `939
7,13,x,x,59,x,31,19`;

describe.only('Day 13 tests', () => {
    it('getNextBusTime', () => {
        const sut = getNextBusTime(4, 1, 5);
        deepEqual(sut.next().value, false);
        deepEqual(sut.next(4).value, false);
        deepEqual(sut.next(7).value, true);
        deepEqual(sut.next(13).value, false);
        deepEqual(sut.next(15).value, true);
    });

    it('findTime example single generator', () => {
        const data = getDataWithEmpty(
            13,
            `
3,5`
        );
        const expected = 9;
        deepEqual(findTime(data), expected);
    });

    it('findTime example double generator', () => {
        const data = getDataWithEmpty(
            13,
            `
3,5,x,x,7`
        );
        const expected = 24;
        deepEqual(findTime(data), expected);
    });

    it('findTime example 2', () => {
        const data = getDataWithEmpty(
            13,
            `
17,x,13,19`
        );
        const expected = 3417;
        deepEqual(findTime(data), expected);
    });

    it('findTime example 3', () => {
        const data = getDataWithEmpty(
            13,
            `
67,7,59,61`
        );
        const expected = 754018;
        deepEqual(findTime(data), expected);
    });

    it('findTime example 4', () => {
        const data = getDataWithEmpty(
            13,
            `
67,x,7,59,61`
        );
        const expected = 779210;
        deepEqual(findTime(data), expected);
    });

    it('findTime example 5', () => {
        const data = getDataWithEmpty(
            13,
            `
67,7,x,59,61`
        );
        const expected = 1261476;
        deepEqual(findTime(data), expected);
    });

    it('findTime example 6', () => {
        const data = getDataWithEmpty(
            13,
            `
1789,37,47,1889`
        );
        const expected = 1202161486;
        deepEqual(findTime(data), expected);
    });

    it('findTime example', () => {
        const data = getDataWithEmpty(13, example);
        const expected = 1068781;
        deepEqual(findTime(data), expected);
    });

    it.only('findTime', () => {
        const data = getDataWithEmpty(13);
        const expected = 1068781;
        deepEqual(findTime(data), expected);
    });
});
