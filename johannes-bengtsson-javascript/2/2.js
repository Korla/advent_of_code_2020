const { lazy } = require('../utils/lazy');

exports.getValidPasswords = lazy.chain(
    lazy.map((i) => i.match(/([0-9]+)-([0-9]+) ([a-z]+): ([a-z]+)/)),
    lazy.map(([, low, high, letter, password]) => ({
        low: parseInt(low, 10) - 1,
        high: parseInt(high, 10) - 1,
        letter,
        password,
    })),
    lazy.filter(
        ({ low, high, letter, password }) =>
            password[low] === letter ^ password[high] === letter
    )
);
