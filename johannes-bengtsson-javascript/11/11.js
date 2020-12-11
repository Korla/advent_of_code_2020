const getOccupied = (rows, x, y) =>
    [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
    ]
        .map(([dy, dx]) => rows[y + dy] && rows[y + dy][x + dx])
        .filter((i) => i === '#').length;

const runRules = ([c, o]) =>
    c === 'L' && o === 0 ? '#' : c === '#' && o >= 4 ? 'L' : c;

exports.parseData = (a) => a.map((b) => Array.from(b));

exports.runGeneration = (rows) =>
    rows.map((r, y) =>
        r.map((c, x) => [c, getOccupied(rows, x, y)]).map(runRules)
    );

exports.runWhileChanging = (rows) => {
    let finished = false;
    while (!finished) {
        const newRows = exports.runGeneration(rows);
        finished =
            newRows.flatMap((b) => b).join('') ===
            rows.flatMap((b) => b).join('');
        rows = newRows;
    }
    return rows.flatMap((a) => a).filter((a) => a === '#').length;
};
