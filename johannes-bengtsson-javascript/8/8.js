const { lazy } = require('../utils/lazy');

exports.parseData = lazy.chain(
    lazy.map((row) => row.split(' ')),
    lazy.map(([inst, value]) => [inst, Number(value)])
);
