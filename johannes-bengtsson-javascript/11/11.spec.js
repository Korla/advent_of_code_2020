const { getDataWithEmpty } = require('../utils/get-data');
const { deepEqual } = require('assert');
const { parseData, single, all } = require('./11');

describe('Day 11 tests', () => {
    it('single.runGeneration example', () => {
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
            Array.from(single.runGeneration(parseData(data))),
            parseData(expected)
        );
    });

    it('single.runWhileChanging example', () => {
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
        deepEqual(single.runWhileChanging(parseData(data)), expected);
    });

    it('single.runWhileChanging example', () => {
        const data = getDataWithEmpty(11);
        const expected = 2470;
        deepEqual(single.runWhileChanging(parseData(data)), expected);
    });

    it('all.getOccupied example1', () => {
        const data = getDataWithEmpty(
            11,
            `.......#.
...#.....
.#.......
.........
..#L....#
....#....
.........
#........
...#.....`
        );
        const expected = 8;
        deepEqual(all.getOccupied(parseData(data), 3, 4).filter((a) => a === '#').length, expected);
    })

    it('all.getOccupied example2', () => {
        const data = getDataWithEmpty(
            11,
            `.............
.L.L.#.#.#.#.
.............`
        );
        const expected = 0;
        deepEqual(all.getOccupied(parseData(data), 1, 1).filter((a) => a === '#').length, expected);
    })

    it('all.getOccupied example3', () => {
        const data = getDataWithEmpty(
            11,
            `.##.##.
#.#.#.#
##...##
...L...
##...##
#.#.#.#
.##.##.`
        );
        const expected = 0;
        deepEqual(all.getOccupied(parseData(data), 3, 3).filter((a) => a === '#').length, expected);
    });

    it('all.runGeneration example', () => {
        const data = getDataWithEmpty(
            11,
            `#.LL.LL.L#
#LLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLL#
#.LLLLLL.L
#.LLLLL.L#`
        );
        const expected = getDataWithEmpty(
            11,
            `#.L#.##.L#
#L#####.LL
L.#.#..#..
##L#.##.##
#.##.#L.##
#.#####.#L
..#.#.....
LLL####LL#
#.L#####.L
#.L####.L#`
        );
        deepEqual(
            Array.from(all.runGeneration(parseData(data))),
            parseData(expected)
        );
    });

    it('all.runWhileChanging example', () => {
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
        const expected = 26;
        deepEqual(all.runWhileChanging(parseData(data)), expected);
    });

    it('all.runWhileChanging', () => {
        const data = getDataWithEmpty(11);
        const expected = 2259;
        deepEqual(all.runWhileChanging(parseData(data)), expected);
    });
});
