const isIterable = seq => typeof seq[Symbol.iterator] == "function"

const lazy = {
    map: (fn) =>
        function* map(seq) {
            let i = 0;
            for (const value of seq) {
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
            for (const value of seq) {
                accumulated = fn(accumulated, value, i++);
                yield accumulated;
            }
        },
    filter: (fn) =>
        function* filter(seq) {
            let i = 0;
            for (const value of seq) {
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
            for (const value of seq) {
                yield* fn(value);
            }
        },
    takeLast: () =>
        function* takeLast(seq) {
            const all = Array.from(seq);
            yield all[all.length - 1];
        },
    runGenerator: (iterator) =>
        function* iterate(seq) {
            yield* iterator(seq);
        },
    take: (number) =>
        function* take(seq) {
            let left = number;
            for (const value of seq) {
                yield value;
                if (--left === 0) {
                    return;
                }
            }
        },
    takeWhile: (fn) =>
        function* takeWhile(seq) {
            let i = 0;
            for (const value of seq) {
                i++;
                if (!fn(value, i)) {
                    return;
                }
                yield value;
            }
        },
    doTakeWhile: (fn) =>
        function* doTakeWhile(seq) {
            let i = 0;
            for (const value of seq) {
                i++;
                yield value;
                if (!fn(value, i)) {
                    return;
                }
            }
        },
    chain: (...fns) =>
        function* chain(res) {
            yield* fns.reduce((res, fn) => fn(res), res);
        },
    loop: () =>
        function* loop(seq) {
            const loopingItems = [];
            for(const value of seq) {
                loopingItems.push(value);
                yield value;
            }
            yield* loop(loopingItems);
        },
    log: (prefix) =>
        function* log(seq) {
            for (const value of seq) {
                console.log(prefix, value);
                yield value;
            }
        },
};

exports.lazy = lazy;
