const { lazy } = require('./lazy');
const { getData } = require('./advent-utils');

const example = `1721
979
366
299
675
1456`;
const data = getData(1).map((d) => parseInt(d, 10));

const chain = lazy.chain(
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
const result = Array.from(chain(data));
console.log(result);
