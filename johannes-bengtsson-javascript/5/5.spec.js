const { getData } = require('../advent-utils');
const { strictEqual, deepEqual } = require('assert');
const { getProducts, getRow, getColumn, splitInputs, getHighestProduct } = require('./5');

describe('Day 5 tests', () => {
    it('splitInputs', () => {
        deepEqual(splitInputs('BFFFBBFRRR'), [
            Array.from('BFFFBBF'),
            Array.from('RRR'),
        ]);
        deepEqual(splitInputs('FFFBBBFRRR'), [
            Array.from('FFFBBBF'),
            Array.from('RRR'),
        ]);
        deepEqual(splitInputs('BBFFBBFRLL'), [
            Array.from('BBFFBBF'),
            Array.from('RLL'),
        ]);
    });

    it('getRow', () => {
        strictEqual(getRow(Array.from('BFFFBBF')), 70);
        strictEqual(getRow(Array.from('FFFBBBF')), 14);
        strictEqual(getRow(Array.from('BBFFBBF')), 102);
    });

    it('getCol', () => {
        strictEqual(getColumn(Array.from('RRR')), 7);
        strictEqual(getColumn(Array.from('RRR')), 7);
        strictEqual(getColumn(Array.from('RLL')), 4);
    });

    it('getProducts', () => {
        const data = ['BFFFBBFRRR', 'FFFBBBFRRR', 'BBFFBBFRLL'];
        const expected = [70 * 8 + 7, 14 * 8 + 7, 102 * 8 + 4];
        deepEqual(Array.from(getProducts(data)), expected);
    });

    it('Get highest product', () => {
        const data = getData(5);
        const expected = [813];
        deepEqual(Array.from(getHighestProduct(data)), expected);
    });
});
