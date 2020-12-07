const { lazy } = require('../utils/lazy');

exports.createBagSpecs = lazy.chain(
    lazy.map((a) => a.split('contain')),
    lazy.map(([a, b]) => [
        a.match(/(.*) bags /)[1],
        b
            .replace(/s\.|\./, '')
            .split(',')
            .map((a) => a.match(/([0-9]) (.*) bag/))
            .filter((a) => !!a)
            .map(([_, b, c]) => [Number(b), c]),
    ])
);

exports.getShinyContainers = lazy.chain(
    lazy.loop(),
    lazy.reduce(
        ({ containers, added }, bagSpecs) => {
            const newAdded = bagSpecs
                .filter(([color, containedBags]) =>
                    added.find((addedColor) =>
                        containedBags.find(([_, color]) => addedColor === color)
                    )
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
    lazy.map(({ containers }) => new Set(containers).size - 1),
    lazy.takeLast()
);
