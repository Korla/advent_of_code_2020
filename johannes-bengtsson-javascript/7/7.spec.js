const { getDataWithEmpty } = require('../utils/get-data');
const { deepEqual } = require('assert');
const { createBagSpecs, getShinyContainers } = require('./7');

const testData = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`;

const bagSpecs = [
    [
        'light red',
        [
            [1, 'bright white'],
            [2, 'muted yellow'],
        ],
    ],
    [
        'dark orange',
        [
            [3, 'bright white'],
            [4, 'muted yellow'],
        ],
    ],
    ['bright white', [[1, 'shiny gold']]],
    [
        'muted yellow',
        [
            [2, 'shiny gold'],
            [9, 'faded blue'],
        ],
    ],
    [
        'shiny gold',
        [
            [1, 'dark olive'],
            [2, 'vibrant plum'],
        ],
    ],
    [
        'dark olive',
        [
            [3, 'faded blue'],
            [4, 'dotted black'],
        ],
    ],
    [
        'vibrant plum',
        [
            [5, 'faded blue'],
            [6, 'dotted black'],
        ],
    ],
    ['faded blue', []],
    ['dotted black', []],
];

describe('Day 7 tests', () => {
    it('createBagSpecs example', () => {
        const data = getDataWithEmpty(7, testData);
        const expected = bagSpecs;
        deepEqual(Array.from(createBagSpecs(data)), expected);
    });

    it('getShinyContainers example', () => {
        const data = getDataWithEmpty(7, testData);
        const expected = [4];
        deepEqual(Array.from(getShinyContainers(data)), expected);
    });

    it('getShinyContainers', () => {
        const data = getDataWithEmpty(7);
        const expected = [205];
        deepEqual(Array.from(getShinyContainers(data)), expected);
    });
});
