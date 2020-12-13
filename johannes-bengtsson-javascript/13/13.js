exports.findTime = (data) => {
    const [[firstValue], ...rest] = data[1]
        .split(',')
        .map((v, i) => [Number(v), i])
        .filter(([v]) => !!v);
    return exports.findSequence(firstValue, rest);
};

exports.findSequence = (first, rest) => {
    const generators = rest.map(([value, delta]) =>
        exports.getNextBusTime(value, delta, 0)
    );
    generators.forEach((g) => g.next());
    let curr = first;
    while (
        generators.map((g) => g.next(curr).value).filter((i) => i === false)
            .length > 0
    ) {
        curr += first;
        console.log('curr', curr);
    }
    return curr;
};

exports.getNextBusTime = function* (value, delta, askedFor) {
    let curr = 0;
    while (true) {
        if (curr === askedFor + delta) {
            askedFor = yield true;
        } else if (curr > askedFor) {
            askedFor = yield false;
        } else {
            curr += value;
        }
    }
};
