const { getDataWithEmpty } = require('../utils/get-data');
const { deepEqual } = require('assert');
const {
    createBagSpecs,
    getShinyContainers,
    getNumberOfBagsInShiny,
} = require('./7');

const testData = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`;

const testData2 = `shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`;

const bagSpecs = [
    ['light red', 'bright white'],
    ['light red', 'muted yellow'],
    ['light red', 'muted yellow'],
    ['dark orange', 'bright white'],
    ['dark orange', 'bright white'],
    ['dark orange', 'bright white'],
    ['dark orange', 'muted yellow'],
    ['dark orange', 'muted yellow'],
    ['dark orange', 'muted yellow'],
    ['dark orange', 'muted yellow'],
    ['bright white', 'shiny gold'],
    ['muted yellow', 'shiny gold'],
    ['muted yellow', 'shiny gold'],
    ['muted yellow', 'faded blue'],
    ['muted yellow', 'faded blue'],
    ['muted yellow', 'faded blue'],
    ['muted yellow', 'faded blue'],
    ['muted yellow', 'faded blue'],
    ['muted yellow', 'faded blue'],
    ['muted yellow', 'faded blue'],
    ['muted yellow', 'faded blue'],
    ['muted yellow', 'faded blue'],
    ['shiny gold', 'dark olive'],
    ['shiny gold', 'vibrant plum'],
    ['shiny gold', 'vibrant plum'],
    ['dark olive', 'faded blue'],
    ['dark olive', 'faded blue'],
    ['dark olive', 'faded blue'],
    ['dark olive', 'dotted black'],
    ['dark olive', 'dotted black'],
    ['dark olive', 'dotted black'],
    ['dark olive', 'dotted black'],
    ['vibrant plum', 'faded blue'],
    ['vibrant plum', 'faded blue'],
    ['vibrant plum', 'faded blue'],
    ['vibrant plum', 'faded blue'],
    ['vibrant plum', 'faded blue'],
    ['vibrant plum', 'dotted black'],
    ['vibrant plum', 'dotted black'],
    ['vibrant plum', 'dotted black'],
    ['vibrant plum', 'dotted black'],
    ['vibrant plum', 'dotted black'],
    ['vibrant plum', 'dotted black'],
    ['faded blue'],
    ['dotted black'],
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

    it('getNumberOfBagsInShiny example', () => {
        const data = getDataWithEmpty(7, testData2);
        const expected = [126];
        deepEqual(Array.from(getNumberOfBagsInShiny(data)), expected);
    });

    it.only('getNumberOfBagsInShiny', () => {
        const data = getDataWithEmpty(7);
        const expected = [12];
        deepEqual(Array.from(getNumberOfBagsInShiny(data)), expected);
    });
});
