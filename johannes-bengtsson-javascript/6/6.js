const { lazy } = require('../utils/lazy');

exports.createGroups = lazy.chain(
    lazy.reduce(
        ([first, ...answers], row) =>
            !row
                ? [[], first, ...answers]
                : [[...first, [...Array.from(row)]], ...answers],
        [[]]
    ),
    lazy.takeLast(),
    lazy.flatMap((p) => p)
);

exports.aggregateAnswersForGroup = lazy.chain(
    lazy.reduce((allAnswered, oneAnswered) =>
        [...allAnswered, ...oneAnswered].filter(
            (answer) =>
                allAnswered.indexOf(answer) >= 0 &&
                oneAnswered.indexOf(answer) >= 0
        )
    ),
    lazy.takeLast(),
    lazy.flatMap((p) => p),
    lazy.reduce((prev, curr) => ({ ...prev, [curr]: true }), {}),
    lazy.takeLast(),
);

exports.countAllAnswers = lazy.chain(
    exports.createGroups,
    lazy.map(value => Array.from(exports.aggregateAnswersForGroup(value))[0]),
    lazy.filter(a => !!a),
    lazy.map((groupAnswers) => Object.keys(groupAnswers).length),
    lazy.reduce(
        (totalCount, groupAnswerCount) => totalCount + groupAnswerCount,
        0
    ),
    lazy.takeLast()
);
