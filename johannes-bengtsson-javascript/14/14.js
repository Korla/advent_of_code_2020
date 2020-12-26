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
        ({ currentMask, accumulated }, [_, targetOrMask, value]) => {
            if (!value) {
                return {
                    currentMask: [...targetOrMask],
                    accumulated,
                };
            } else {
                return {
                    currentMask,
                    accumulated: {
                        ...accumulated,
                        [targetOrMask]: exports.applyMask(value, currentMask),
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

exports.runProgram2 = lazy.chain(
    lazy.map((s) => s.match(/mask = (.*)/) || s.match(/mem\[(.*)\] = (.*)/)),
    lazy.reduce(
        ({ currentMask, accumulated }, [_, targetOrMask, value]) => {
            if (!value) {
                return {
                    currentMask: [...targetOrMask],
                    accumulated,
                };
            } else {
                const maskedValue = exports.maskValue(
                    targetOrMask,
                    currentMask
                );
                const targets = exports.generatePermutations(maskedValue);
                const valueToWrite = Number(value);
                return {
                    currentMask,
                    accumulated: {
                        ...accumulated,
                        ...targets.reduce(
                            (prev, curr) => ({
                                ...prev,
                                [curr]: valueToWrite,
                            }),
                            {}
                        ),
                    },
                };
            }
        },
        { currentMask: null, accumulated: {} }
    ),
    lazy.takeLast(),
    lazy.map(({ accumulated }) =>
        Object.values(accumulated).reduce((a, b) => a + b)
    )
);

exports.generatePermutations = (mask) => {
    const firstX = mask.indexOf('X');
    if (firstX < 0) {
        return [mask];
    }

    return [
        ...exports.generatePermutations(mask.replace('X', 0)),
        ...exports.generatePermutations(mask.replace('X', 1)),
    ];
};

exports.maskValue = (v, mask) => {
    const value = [...Number(v).toString(2).padStart(36, '0')];
    return mask.map((m, i) => (m === '0' ? value[i] : m)).join('');
};
