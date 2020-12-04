const {lazy} = require("./lazy");
const {getDataWithEmpty} = require("./advent-utils");

const example =
`ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`;
const isBetween = (a, b, c) => b <= a && a <= c;
const data = getDataWithEmpty(4, example);
const chain = lazy.chain(
    lazy.reduce((passports, row) => {
        if(!row) {
            passports = [[], ...passports];
        } else {
            passports[0] = [...(passports[0] || []), ...row.split(' ')];
        }
        return passports;
    }, []),
    lazy.takeLast(),
    lazy.iterate(function*(s) {
        console.log('s', Array.from(s)[0])
        yield* Array.from(s)[0];
    }),
    lazy.log(1),
    lazy.map(passport =>
        passport[0]
            .map(field => field.match(/([a-z][a-z][a-z])(:)(.*)/))
            .map(([,code,,value]) => ({code, value}))
            .filter(b => b.code !== 'cid')
    ),
    lazy.filter(passport => passport.length === 7),
    lazy.map(passport =>
        passport
            .reduce((prev, curr) => {
                prev[curr.code] = curr.value;
                return prev;
            }, {})
    ),
    lazy.map(({byr, iyr, eyr, hgt, hcl, ecl, pid}) => ({
        byr: Number(byr),
        iyr: Number(iyr),
        eyr: Number(eyr),
        hgt: hgt.match(/([0-9]+)([a-z][a-z])/),
        hcl: hcl.match(/(#)(([a-z]|[0-9]){6})$/),
        ecl,
        pid: pid.match(/^(\d{9})$/)
    })),
    lazy.filter(({byr, iyr, eyr, hgt, hcl, ecl, pid}) =>
        isBetween(byr, 1920, 2002) &&
        isBetween(iyr, 2010, 2020) &&
        isBetween(eyr, 2020, 2030) &&
        (
            hgt && (
                (hgt[2] === 'cm' && isBetween(hgt[1], 150, 193)) ||
                (hgt[2] === 'in' && isBetween(hgt[1], 59, 76))
            )
        ) &&
        hcl &&
        ({amb: true, blu: true, brn: true, gry: true, grn: true, hzl: true, oth: true}[ecl]) &&
        pid
    )
);
const result = Array.from(chain(data)).length;
console.log(result);