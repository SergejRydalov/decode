const encode = input => [...input]
    .map((x, i) => [x.charCodeAt(0), i])
    .sort()
    .flat()
    .join('.')
    .match(/./g)
    .flatMap((x, i) => new Array(x == '.' ? 1 : 2 + x * 2).fill((1 + i) % 2))
    .join('')

const decode = code => [...code]
    .reduce((p, c, i) => {
        if (p[p.length-1][0] !== c && i !== 0) {
            p.push([]);
        }
        p[p.length-1].push(c);
        return p;
    }, [[]])
    .flatMap((x, i) => new Array(1).fill(x.length == 1 ? '.' : (x.length - 2)/2))
    .join('')
    .split('.')
    .reduce((p, c, i) => {
        if ((i + 1) % 2) {
            p.push([]);
        }
        p[p.length-1].push(c);
        return p;
    }, [])
    .sort( (a, b) => +a[a.length-1] - b[b.length-1])
    .flat()
    .filter((x, i) => !(i % 2))
    .map(x => String.fromCharCode(x))
    .join('')

const code = '1111001111011111111111101111001111111111110111100000000001000011000000000000000000100000010000111100001000000001000011110000001000011111111111101111000011111111110111100000000100001111000000000000001000011111111111111011110000111111111111111111011111111110111100001111111111111111110111111111111111111110111111110000001000010000000011111101111111111111101111111111111111000000001001000000000000000011111111110111111111111111101111111111111111110000000010000111101111111111111111111100000000000000001000011011111111111111111111000000000000000010000000000000000001000000000000000000001111111111111111111101111000000'

console._log = console.log;
console.log = function() {
  document.querySelector('p').innerText = arguments[0];
  console._log.apply(null, arguments);
}

console.log(decode(code) === decode(encode('I love JavaScript')))
console.log(decode(code))