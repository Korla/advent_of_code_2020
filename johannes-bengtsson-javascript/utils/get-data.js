const fs = require('fs');

const getData = (...args) => getDataWithEmpty(...args).filter((a) => a);
exports.getData = getData;

const getDataWithEmpty = (day, data) =>
    (data || fs.readFileSync(`${day}/${day}.txt`, 'utf8')).split('\n');
exports.getDataWithEmpty = getDataWithEmpty;

