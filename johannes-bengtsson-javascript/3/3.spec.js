const { getTreeCountProduct } = require('./3');
const { getData } = require('../utils/get-data');
const { deepEqual } = require('assert');

describe('Day 3 tests', () => {
    it('getTreeCountProduct testdata', () => {
        const data = getData(
            3,
            `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`
        ).map((row) => Array.from(row));
        const expected = 336;
        deepEqual(getTreeCountProduct(data), expected);
    });

    it('getTreeCountProduct', () => {
        const data = getData(3).map((row) => Array.from(row));
        const expected = 5007658656;
        deepEqual(getTreeCountProduct(data), expected);
    });
});
