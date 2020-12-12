const { lazy } = require('../utils/lazy');

exports.parseData = (a) => a.map((b) => Array.from(b));

const getCell = (rows, y, x) => rows[y] && rows[y][x];

const base = {
    runWhileChanging: (runGeneration) => (rows) => {
        let finished = false;
        while (!finished) {
            const newRows = runGeneration(rows);
            finished =
                newRows.flatMap((b) => b).join('') ===
                rows.flatMap((b) => b).join('');
            rows = newRows;
        }
        return rows.flatMap((a) => a).filter((a) => a === '#').length;
    },
    runGeneration: (getOccupied, runRules) => (rows) =>
        rows.map((r, y) =>
            r
                .map((c, x) => [
                    c,
                    getOccupied(rows, x, y).filter((i) => i === '#').length,
                ])
                .map(runRules)
        ),
};

const single = {
    getOccupied: (rows, x, y) =>
        [
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [0, -1],
            [0, 1],
            [1, -1],
            [1, 0],
            [1, 1],
        ].map(([dy, dx]) => getCell(rows, y + dy, x + dx)),
    runRules: ([c, o]) =>
        c === 'L' && o === 0 ? '#' : c === '#' && o >= 4 ? 'L' : c,
    runGeneration: (rows) =>
        base.runGeneration(single.getOccupied, single.runRules)(rows),
    runWhileChanging: (rows) =>
        base.runWhileChanging(single.runGeneration)(rows),
};

exports.single = single;

const all = {
    getOccupied: (rows, x, y) =>
        Array.from(
            lazy.chain(
                lazy.runGenerator(function* (seq) {
                    for (let [dx, dy] of seq) {
                        let finished = false;
                        let current = [y, x];
                        while (!finished) {
                            current = [current[0] + dy, current[1] + dx];
                            const nextCell = getCell(rows, ...current);

                            if (!nextCell) {
                                finished = true;
                            } else if (nextCell !== '.') {
                                finished = true;
                                yield nextCell;
                            }
                        }
                    }
                })
            )([
                [-1, -1],
                [-1, 0],
                [-1, 1],
                [0, -1],
                [0, 1],
                [1, -1],
                [1, 0],
                [1, 1],
            ])
        ),
    runRules: ([c, o]) =>
        c === 'L' && o === 0 ? '#' : c === '#' && o >= 5 ? 'L' : c,
    runGeneration: (rows) =>
        base.runGeneration(all.getOccupied, all.runRules)(rows),
    runWhileChanging: (rows) => base.runWhileChanging(all.runGeneration)(rows),
};

exports.all = all;
