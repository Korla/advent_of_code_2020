const { lazy } = require('../lazy');

const parseSpec = (trueCase) => (spec) =>
    [...spec]
        .map((s) => s === trueCase)
        .reduce(
            (prev, curr, i) =>
                curr ? prev + Math.pow(2, spec.length - i - 1) : prev,
            0
        );
const getRow = (exports.getRow = parseSpec('B'));
const getColumn = (exports.getColumn = parseSpec('R'));
const splitInputs = (exports.splitInputs = ([
    r1,
    r2,
    r3,
    r4,
    r5,
    r6,
    r7,
    ...column
]) => [[r1, r2, r3, r4, r5, r6, r7], column]);
const calculateRowAndColumn = (exports.calculateRowAndColumn = ([
    rowSpec,
    colSpec,
]) => [getRow(rowSpec), getColumn(colSpec)]);
const calculateProduct = (exports.calculateProduct = ([row, column]) =>
    row * 8 + column);

const getProducts = (exports.getProducts = lazy.chain(
    lazy.map(splitInputs),
    lazy.map(calculateRowAndColumn),
    lazy.map(calculateProduct)
));

exports.getHighestProduct = lazy.chain(
    getProducts,
    lazy.reduce(Math.max),
    lazy.takeLast()
);