const { lazy } = require('../utils/lazy');

const moveIndexes = ['N', 'E', 'S', 'W', 'L', 'R', 'F'];
const moves = [
    ([l, n, d]) => [0, n, 0],
    ([l, n, d]) => [n, 0, 0],
    ([l, n, d]) => [0, -n, 0],
    ([l, n, d]) => [-n, 0, 0],
    ([l, n, d]) => [0, 0, -n/90],
    ([l, n, d]) => [0, 0, n/90],
    ([l, n, d]) => moves[d]([l, n]),
];

exports.runShip = lazy.chain(
    lazy.map((a) => a.match(/([A-Z])(.*)/)),
    lazy.map(([_, l, n]) => [l, Number(n)]),
    lazy.log(0),
    lazy.reduce(
        (prev, [l, n]) =>
            moves[moveIndexes.indexOf(l)]([l, n, prev[2]]).map((delta, i) =>
                i !== 2 ? prev[i] + delta : (prev[i] + delta + 4) % 4
            ),
        [0, 0, 1]
    ),
    lazy.log(1),
    lazy.takeLast(),
    lazy.map(([x, y]) => Math.abs(x) + Math.abs(y))
);
