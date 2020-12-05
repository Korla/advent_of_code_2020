const lazy = {
    chain: (...fns) =>
        function* chain(res) {
            yield* fns.reduce((res, fn) => fn(res), res);
        },
    iterate: (iterator) =>
        function* iterate(seq) {
            yield* iterator(seq);
        },
    reduce: (fn, start) =>
        function* reduce(seq) {
            let next = start !== undefined ? start : seq.next().value;
            let i = 0;
            for (let value of seq) {
                i++;
                next = fn(next, value, i);
                yield next;
            }
        },
    filter: (fn) =>
        function* filter(seq) {
            let i = 0;
            for (let value of seq) {
                i++;
                if (fn(value, i)) {
                    yield value;
                }
            }
        },
    map: (fn) =>
        function* map(seq) {
            let i = 0;
            for (let value of seq) {
                i++;
                yield fn(value, i);
            }
        },
    flatMap: (fn) =>
        function* flatMap(seq) {
            for (let value of seq) {
                yield* lazy.map(fn)(value);
            }
        },
    loop: () =>
        function* loop(seq) {
            yield* seq;
            yield* lazy.loop()(seq);
        },
    take: (number) =>
        function* take(seq) {
            for (let value of seq) {
                yield value;
                if (--number === 0) {
                    return;
                }
            }
        },
    takeWhile: (fn) =>
        function* takeWhile(seq) {
            let i = 0;
            for (let value of seq) {
                i++;
                const val = fn(value, i);
                if (!val) {
                    return;
                }
                yield value;
            }
        },
    takeLast: () =>
        function* take(seq) {
            const all = Array.from(seq);
            yield all[all.length - 1];
        },
    log: (prefix) =>
        function* take(seq) {
            for (let value of seq) {
                console.log(prefix, value);
                yield value;
            }
        },
};

exports.lazy = lazy;
