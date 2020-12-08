const { lazy } = require('../utils/lazy');

exports.parseData = lazy.chain(
    lazy.map((row) => row.split(' ')),
    lazy.map(([inst, value]) => [inst, Number(value)])
);

const instructions = {
    acc: (accumulator, current, value) => [accumulator + value, current + 1],
    jmp: (accumulator, current, value) => [accumulator, current + value],
    nop: (accumulator, current, value) => [accumulator, current + 1],
};

exports.runProgram = lazy.chain(
    exports.parseData,
    lazy.concat(),
    lazy.takeLast(),
    lazy.loop(),
    lazy.reduce(
        ({ accumulator, current, visited }, program) => {
            const [inst, value] = program[current];
            const newVisited = [...visited, current];
            const [newAccumulator, newCurrent] = instructions[inst](
                accumulator,
                current,
                value
            );
            return {
                accumulator: newAccumulator,
                current: newCurrent,
                visited: newVisited,
            };
        },
        {
            accumulator: 0,
            current: 0,
            visited: [],
        }
    ),
    lazy.takeWhile(({ visited, current }) => !visited.includes(current)),
    lazy.map(({ accumulator }) => accumulator),
    lazy.takeLast()
);
