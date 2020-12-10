const { lazy } = require('../utils/lazy');

exports.parseAndSort = lazy.chain(
    lazy.map(Number),
    lazy.sort((a, b) => (a > b ? 1 : -1))
);

exports.countDifferences = lazy.chain(
    exports.parseAndSort,
    lazy.runGenerator(function* (seq) {
        let last = 0;
        for (let value of seq) {
            yield [last, value];
            last = value;
        }
        yield [last, last + 3];
    }),
    lazy.map(([a, b]) => b - a),
    lazy.reduce(
        ([one, three], delta) => [
            delta === 1 ? one + 1 : one,
            delta === 3 ? three + 1 : three,
        ],
        [0, 0]
    ),
    lazy.takeLast(),
    lazy.map(([a, b]) => a * b)
);

exports.countJumps = lazy.chain(
    exports.parseAndSort,
    lazy.reduce(
        (prev, curr) => {
            const candidates = prev.filter(([value]) => curr - value <= 3);
            const pathsToCurr = candidates.reduce(
                (sum, [_, paths]) => sum + paths,
                0
            );
            return [...prev, [curr, pathsToCurr]];
        },
        [[0, 1]]
    ),
    lazy.takeLast(),
    lazy.map((paths) => paths[paths.length - 1][1])
);
