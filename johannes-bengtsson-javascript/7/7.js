const { lazy } = require('../utils/lazy');

exports.createBagSpecs = lazy.chain(
    lazy.map((a) => a.split('contain')),
    lazy.map(([a, b]) => [
        a.match(/(.*) bags /)[1],
        b
            .replace(/s\.|\./, '')
            .split(',')
            .map((a) => a.match(/([0-9]) (.*) bag/)),
    ]),
    lazy.runGenerator(function* (seq) {
        for (const [color, bagSpecs] of seq) {
            for (const match of bagSpecs) {
                if (!match) {
                    yield [color];
                } else {
                    for (let i = 0; i < Number(match[1]); i++) {
                        yield [color, match[2]];
                    }
                }
            }
        }
    })
);

exports.getShinyContainers = lazy.chain(
    lazy.runGenerator(function* (seq) {
        yield Array.from(exports.createBagSpecs(seq));
    }),
    lazy.loop(),
    lazy.reduce(
        ({ containers, added }, bagSpecs) => {
            const newAdded = bagSpecs
                .filter(([color, childColor]) =>
                    added.find((addedColor) => addedColor === childColor)
                )
                .map(([color]) => color);
            return {
                containers: [...containers, ...added],
                added: newAdded,
            };
        },
        {
            containers: [],
            added: ['shiny gold'],
        }
    ),
    lazy.doTakeWhile(({ added }) => added.length > 0),
    lazy.takeLast(),
    lazy.map(({ containers }) => new Set(containers).size - 1)
);

exports.getNumberOfBagsInShiny = lazy.chain(
    lazy.runGenerator(function* (seq) {
        yield Array.from(exports.createBagSpecs(seq)).filter(
            ([color, childColor]) => childColor !== undefined
        );
    }),
    lazy.loop(),
    lazy.reduce(
        ({ count, added }, bagSpecs) => {
            const newAdded = added.reduce((newAdded, addedColor) => [
                ...newAdded,
                ...bagSpecs.filter(
                    ([color, childColor]) => color === addedColor
                ).map(([color, childColor]) => childColor),
            ], []);
            return {
                count: count + newAdded.length,
                added: newAdded,
            };
        },
        {
            count: 0,
            added: ['shiny gold'],
        }
    ),
    lazy.doTakeWhile(({ added }) => added.length > 0),
    lazy.takeLast(),
    lazy.map(({ count }) => count)
);
