const { lazy } = require('../lazy');

exports.getSumOfEntries = lazy.chain(
    lazy.iterate(function* (seq) {
        let i1 = 0;
        for (let v1 of seq) {
            i1++;
            let i2 = 0;
            for (let v2 of seq) {
                i2++;
                let i3 = 0;
                for (let v3 of seq) {
                    i3++;
                    yield [
                        [v1, i1],
                        [v2, i2],
                        [v3, i3],
                    ];
                }
            }
        }
    }),
    lazy.filter(([[, i], [, i2], [, i3]]) => i !== i2 && i !== i3 && i2 !== i3),
    lazy.filter(([[d], [d2], [d3]]) => d + d2 + d3 === 2020),
    lazy.map(([[d], [d2], [d3]]) => d * d2 * d3),
    lazy.take(1)
);
