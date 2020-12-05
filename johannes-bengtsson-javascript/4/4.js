const { lazy } = require('../utils/lazy');

const isBetween = (a, b, c) => b <= a && a <= c;
exports.getValidPassports = lazy.chain(
    lazy.reduce((passports, row) => {
        if (!row) {
            passports = [[], ...passports];
        } else {
            passports[0] = [...(passports[0] || []), ...row.split(' ')];
        }
        return passports;
    }, []),
    lazy.takeLast(),
    lazy.flatMap(p => p),
    lazy.map((passport) =>
        passport
            .map((field) => field.match(/([a-z][a-z][a-z])(:)(.*)/))
            .map(([, code, , value]) => ({ code, value }))
            .filter((b) => b.code !== 'cid')
    ),
    lazy.filter((passport) => passport.length === 7),
    lazy.map((passport) =>
        passport.reduce((prev, curr) => {
            prev[curr.code] = curr.value;
            return prev;
        }, {})
    ),
    lazy.map(({ byr, iyr, eyr, hgt, hcl, ecl, pid }) => ({
        byr: Number(byr),
        iyr: Number(iyr),
        eyr: Number(eyr),
        hgt: hgt.match(/([0-9]+)([a-z][a-z])/),
        hcl: hcl.match(/(#)(([a-z]|[0-9]){6})$/),
        ecl,
        pid: pid.match(/^(\d{9})$/),
    })),
    lazy.filter(
        ({ byr, iyr, eyr, hgt, hcl, ecl, pid }) =>
            isBetween(byr, 1920, 2002) &&
            isBetween(iyr, 2010, 2020) &&
            isBetween(eyr, 2020, 2030) &&
            hgt &&
            ((hgt[2] === 'cm' && isBetween(hgt[1], 150, 193)) ||
                (hgt[2] === 'in' && isBetween(hgt[1], 59, 76))) &&
            hcl &&
            {
                amb: true,
                blu: true,
                brn: true,
                gry: true,
                grn: true,
                hzl: true,
                oth: true,
            }[ecl] &&
            pid
    )
);
