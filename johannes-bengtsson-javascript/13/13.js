exports.parseData = (data) => {
    const [[value, delta], ...rest] = data[1]
        .split(',')
        .map((v, i) => [Number(v), i])
        .filter(([v]) => !!v)
        .sort(([v], [v2]) => v2 - v);
    return [[value, delta], rest.map(([v, d]) => [v, d - delta])];
};

exports.findTime = (data) => exports.findSequence(...exports.parseData(data));

exports.findSequence = ([value, delta], rest) => {
    // console.log('value', value);
    // console.log('delta', delta);
    // console.log('rest', rest);
    let curr = 0;
    while (
        rest
            .map(([value, delta]) => {
                // console.log('curr', curr);
                // console.log('value', value);
                // console.log('delta', delta);
                // console.log('curr - delta', curr - delta);
                // console.log('(curr + delta) % value', (curr + delta) % value);
                return (curr + delta) % value === 0;
            })
            .filter((i) => i === false).length > 0
    ) {
        curr += value;
    }
    return curr - delta;
};
