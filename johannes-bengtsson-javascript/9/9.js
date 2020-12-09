const { lazy } = require('../utils/lazy');

exports.getInGroups = (count) =>
    lazy.chain(
        lazy.map(Number),
        lazy.runGenerator(function* (seq) {
            let previousGroup = [];
            for (let value of seq) {
                if (previousGroup.length !== count) {
                    previousGroup.push(value);
                } else {
                    let [, ...previous] = previousGroup;
                    previousGroup = [...previous, value];
                }
                if (previousGroup.length === count) {
                    yield previousGroup;
                }
            }
        })
    );

const sum = (value) => lazy.map((a) => a + value);

exports.createAllSums = lazy.chain(
    lazy.runGenerator(function* (seq) {
        let iteratedValues = [seq.next().value];
        for (let value of seq) {
            const sums = sum(value)(iteratedValues);
            iteratedValues = [...iteratedValues, value];
            yield* sums;
        }
    })
);

exports.isMatchingSum = (number) =>
    lazy.chain(
        exports.createAllSums,
        lazy.doTakeWhile((sum) => sum !== number),
        lazy.filter((sum) => sum === number)
    );

exports.findNumberWhichDoesntSum = (number) =>
    lazy.chain(
        exports.getInGroups(number + 1),
        lazy.runGenerator(function* (seq) {
            for (let value of seq) {
                const first = value.slice(0, number);
                const [last] = value.slice(-1);
                let match = [...exports.isMatchingSum(last)(first)];
                if (!match.length) {
                    yield last;
                }
            }
        })
    );
