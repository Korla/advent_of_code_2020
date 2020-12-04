const {lazy} = require("./lazy");
const {getData} = require("./advent-utils");

const example =
`..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`;
const data = getData(3)
    .map(row => Array.from(row));

const height = data.length;
const width = data[0].length;
const result = [
    [1,1],
    [3,1],
    [5,1],
    [7,1],
    [1,2],
].map(move => {
    const chain = lazy.chain(
        lazy.loop(),
        lazy.reduce(([x1,y1], [x2, y2]) => [x1 + x2, y1 + y2], [0,0]),
        lazy.map(([x, y]) => [x % width, y]),
        lazy.takeWhile(([,y]) => y < height),
        lazy.map(([x, y]) => data[y][x]),
        lazy.reduce((treeCount, encounter) => encounter === '#' ? treeCount + 1 : treeCount, 0),
        lazy.takeLast(),
    );
    return Array.from(chain([move]))[0];
})
    .reduce((a,b) => a * b);
console.log(result);