const { lazy } = require('../utils/lazy');

exports.applyMask = (v, mask) => {
    const value = [...Number(v).toString(2)];
    let result = 0;
    for (let i = 0; i < mask.length; i++) {
        const maskValue = mask[mask.length - i - 1];
        if (maskValue === '1') {
            result += Math.pow(2, i);
        } else if (maskValue === 'X') {
            if (value[value.length - i - 1] === '1') {
                result += Math.pow(2, i);
            }
        }
    }
    return result;
};

exports.runProgram = lazy.chain(
    lazy.map((s) => s.match(/mask = (.*)/) || s.match(/mem\[(.*)\] = (.*)/)),
    lazy.reduce(
        ({ currentMask, accumulated }, [_, first, second]) => {
            if (!second) {
                return {
                    currentMask: [...first],
                    accumulated,
                };
            } else {
                return {
                    currentMask,
                    accumulated: {
                        ...accumulated,
                        [first]: exports.applyMask(second, currentMask),
                    },
                };
            }
        },
        { currentMask: null, accumulated: {} }
    ),
    lazy.map(({ accumulated }) => accumulated),
    lazy.takeLast(),
    lazy.map((a) => Object.values(a).reduce((a, b) => a + b))
);
