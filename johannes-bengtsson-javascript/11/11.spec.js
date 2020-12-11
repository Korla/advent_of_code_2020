const { getDataWithEmpty } = require('../utils/get-data');
const { deepEqual } = require('assert');
const { runGeneration, parseData, runWhileChanging, runGenerationAll } = require('./11');

describe('Day 11 tests', () => {
    it('runGeneration example', () => {
        const data = getDataWithEmpty(
            11,
            `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`
        );
        const expected = getDataWithEmpty(
            11,
            `#.##.##.##
#######.##
#.#.#..#..
####.##.##
#.##.##.##
#.#####.##
..#.#.....
##########
#.######.#
#.#####.##`
        );
        deepEqual(
            Array.from(runGeneration(parseData(data))),
            parseData(expected)
        );
    });

    it('runWhileChanging example', () => {
        const data = getDataWithEmpty(
            11,
            `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`
        );
        const expected = 37;
        deepEqual(runWhileChanging(parseData(data)), expected);
    });

    it('runWhileChanging example', () => {
        const data = getDataWithEmpty(11);
        const expected = 2470;
        deepEqual(runWhileChanging(parseData(data)), expected);
    });
});
