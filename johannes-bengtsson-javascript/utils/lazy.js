const lazy = {
    map: (fn) =>
        function* map(seq) {
            let i = 0;
            for (let value of seq) {
                yield fn(value, i);
                i++;
            }
        },
    reduce: (fn, start) =>
        function* reduce(seq) {
            let accumulated = start;
            seq = seq[Symbol.iterator]();
            let i = 0;
            if (accumulated === undefined) {
                accumulated = seq.next().value;
                yield accumulated;
                i++;
            }
            for (let value of seq) {
                accumulated = fn(accumulated, value, i++);
                yield accumulated;
            }
        },
    filter: (fn) =>
        function* filter(seq) {
            let i = 0;
            for (let value of seq) {
                if (fn(value, i)) {
                    yield value;
                }
                i++;
            }
        },
    sort: (fn) =>
        function* sort(seq) {
            const all = Array.from(seq);
            yield* all.sort(fn);
        },
    flatMap: (fn) =>
        function* flatMap(seq) {
            for (let value of seq) {
                yield* fn(value);
            }
        },
    chain: (...fns) =>
        function* chain(res) {
            yield* fns.reduce((res, fn) => fn(res), res);
        },
    iterate: (iterator) =>
        function* iterate(seq) {
            yield* iterator(seq);
        },
    loop: () =>
        function* loop(seq) {
            yield* seq;
            yield* lazy.loop()(seq);
        },
    take: (number) =>
        function* take(seq) {
            let left = number;
            for (let value of seq) {
                yield value;
                if (--left === 0) {
                    return;
                }
            }
        },
    takeWhile: (fn) =>
        function* takeWhile(seq) {
            let i = 0;
            for (let value of seq) {
                i++;
                if (!fn(value, i)) {
                    return;
                }
                yield value;
            }
        },
    takeLast: () =>
        function* takeLast(seq) {
            const all = Array.from(seq);
            yield all[all.length - 1];
        },
    log: (prefix) =>
        function* log(seq) {
            for (let value of seq) {
                console.log(prefix, value);
                yield value;
            }
        },
};

exports.lazy = lazy;
