const { lazy } = require('../lazy');

exports.getTreeCountProduct = (data) => {
    const height = data.length;
    const width = data[0].length;

    const getTreeCount = lazy.chain(
        lazy.loop(),
        lazy.reduce(([x1, y1], [x2, y2]) => [x1 + x2, y1 + y2], [0, 0]),
        lazy.map(([x, y]) => [x % width, y]),
        lazy.takeWhile(([, y]) => y < height),
        lazy.map(([x, y]) => data[y][x]),
        lazy.reduce(
            (treeCount, encounter) =>
                encounter === '#' ? treeCount + 1 : treeCount,
            0
        ),
        lazy.takeLast()
    );

    return [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2],
    ]
        .map((move) => Array.from(getTreeCount([move]))[0])
        .reduce((a, b) => a * b);
};
