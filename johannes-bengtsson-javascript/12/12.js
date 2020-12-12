const { lazy } = require('../utils/lazy');

const moveIndexes = ['N', 'E', 'S', 'W', 'L', 'R', 'F'];
const moves = [
    ([l, n, d]) => [0, n, 0],
    ([l, n, d]) => [n, 0, 0],
    ([l, n, d]) => [0, -n, 0],
    ([l, n, d]) => [-n, 0, 0],
    ([l, n, d]) => [0, 0, -n / 90],
    ([l, n, d]) => [0, 0, n / 90],
    ([l, n, d]) => moves[d]([l, n]),
];

const parseData = lazy.chain(
    lazy.map((a) => a.match(/([A-Z])(.*)/)),
    lazy.map(([_, l, n]) => [l, Number(n)])
);
exports.runShip = lazy.chain(
    parseData,
    lazy.reduce(
        (prev, [l, n]) =>
            moves[moveIndexes.indexOf(l)]([l, n, prev[2]]).map((delta, i) =>
                i !== 2 ? prev[i] + delta : (prev[i] + delta + 4) % 4
            ),
        [0, 0, 1]
    ),
    lazy.takeLast(),
    lazy.map(([x, y]) => Math.abs(x) + Math.abs(y))
);

const rotate = (x, y, times) =>
    times > 1 ? rotate(y, -x, times - 1) : [y, -x];
const move2 = [
    ([l, n, x, y, dx, dy]) => [x, y, dx + n, dy],
    ([l, n, x, y, dx, dy]) => [x, y, dx, dy + n],
    ([l, n, x, y, dx, dy]) => [x, y, dx - n, dy],
    ([l, n, x, y, dx, dy]) => [x, y, dx, dy - n],
    ([l, n, x, y, dx, dy]) => [x, y, ...rotate(dx, dy, n / 90)],
    ([l, n, x, y, dx, dy]) => [x, y, ...rotate(dx, dy, 360 - n / 90)],
    ([l, n, x, y, dx, dy]) => [x + n * dx, y + n * dy, dx, dy],
];

exports.runShipTowards = lazy.chain(
    parseData,
    lazy.reduce(
        (prev, [l, n]) =>
            move2[moveIndexes.indexOf(l)]([l, n, ...prev, prev[3]]),
        [0, 0, 1, 10]
    ),
    lazy.takeLast(),
    lazy.map(([x, y]) => Math.abs(x) + Math.abs(y))
);
