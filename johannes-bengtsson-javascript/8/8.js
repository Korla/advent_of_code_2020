const { lazy } = require('../utils/lazy');

exports.parseData = lazy.chain(
    lazy.map((row) => row.split(' ')),
    lazy.map(([inst, value]) => [inst, Number(value)])
);

exports.createMutatedData = lazy.chain(
    exports.parseData,
    lazy.concat(),
    lazy.takeLast(),
    lazy.runGenerator(function* (seq) {
        for (const value of seq) {
            const program = Array.from(value);
            for (let i = 0; i < program.length; i++) {
                const [inst, value] = program[i];
                if (inst !== 'acc') {
                    const flipped = inst === 'nop' ? 'jmp' : 'nop';
                    yield program.map((p, i2) =>
                        i === i2 ? [flipped, value] : p
                    );
                }
            }
        }
    })
);

const instructions = {
    acc: (accumulator, current, value) => [accumulator + value, current + 1],
    jmp: (accumulator, current, value) => [accumulator, current + value],
    nop: (accumulator, current, value) => [accumulator, current + 1],
};

exports.runProgram = lazy.chain(
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
                isLoop: newVisited.includes(newCurrent),
                isComplete: newCurrent >= program.length,
                program,
            };
        },
        {
            accumulator: 0,
            current: 0,
            visited: [],
            isComplete: false,
            isLoop: false,
        }
    ),
    lazy.doTakeWhile(({ isComplete, isLoop }) => !isComplete && !isLoop),
    lazy.takeLast(),
    lazy.map(({ accumulator, isComplete }) => ({ accumulator, isComplete }))
);

exports.runProgramUntilRevisit = lazy.chain(
    exports.parseData,
    exports.runProgram,
    lazy.map(({ accumulator }) => accumulator),
    lazy.takeLast()
);

exports.runProgramUntilFoundSolution = lazy.chain(
    exports.createMutatedData,
    lazy.flatMap((value) => Array.from(exports.runProgram(value))),
    lazy.doTakeWhile(({ isComplete }) => !isComplete),
    lazy.takeLast(),
    lazy.map(({ accumulator }) => accumulator)
);
