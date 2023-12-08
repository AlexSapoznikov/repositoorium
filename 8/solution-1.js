const input = require('./input').trim();

// const input = `
// RL

// AAA = (BBB, CCC)
// BBB = (DDD, EEE)
// CCC = (ZZZ, GGG)
// DDD = (DDD, DDD)
// EEE = (EEE, EEE)
// GGG = (GGG, GGG)
// ZZZ = (ZZZ, ZZZ)
// `.trim();

// const input = `
// LLR

// AAA = (BBB, BBB)
// BBB = (AAA, ZZZ)
// ZZZ = (ZZZ, ZZZ)
// `.trim();

let [steps, map] = input.split('\n\n').map(n => n.trim());

steps = steps.split('');
map = map.split('\n').map(m => {
  m = m.split(' = ');

  m[1] = m[1].replace(/\(|\)/gim, '').split(',').map(n => n.trim());

  return m;
});

map = map.reduce((refMap, line) => {
  refMap[line[0]] = line[1];

  return refMap;
}, {});

console.log('map', map)

// process.exit(0);
// {
//   AAA: [ 'BBB', 'CCC' ],
//   BBB: [ 'DDD', 'EEE' ],
//   CCC: [ 'ZZZ', 'GGG' ],
//   DDD: [ 'DDD', 'DDD' ],
//   EEE: [ 'EEE', 'EEE' ],
//   GGG: [ 'GGG', 'GGG' ],
//   ZZZ: [ 'ZZZ', 'ZZZ' ]
// }

let loc = 'AAA';
let stepI = 0;

let count = 0;

while (loc !== 'ZZZ') {
  const direction = steps[stepI];

  loc = direction === 'L' ? map[loc][0] : map[loc][1];

  if (stepI < steps.length - 1) {
    stepI++;
  } else {
    stepI = 0;
  }
  count++;
}

console.log('c', count);

