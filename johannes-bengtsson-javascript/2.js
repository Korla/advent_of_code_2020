const { lazy } = require('./lazy');
const { getData } = require('./advent-utils');

const example = `1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`;
const data = getData(2);

const chain = lazy.chain(
    lazy.map((i) => i.match(/([0-9]+)-([0-9]+) ([a-z]+): ([a-z]+)/)),
    lazy.map(([, low, high, letter, password]) => ({
        low: parseInt(low, 10) - 1,
        high: parseInt(high, 10) - 1,
        letter,
        password,
    })),
    lazy.filter(
        ({ low, high, letter, password }) =>
            (password[low] === letter && password[high] !== letter) ||
            (password[low] !== letter && password[high] === letter)
    )
);
const result = Array.from(chain(data)).length;
console.log(result);
