const input = require('./input').trim();

// const input = `
// LR

// 11A = (11B, XXX)
// 11B = (XXX, 11Z)
// 11Z = (11B, XXX)
// 22A = (22B, XXX)
// 22B = (22C, 22C)
// 22C = (22Z, 22Z)
// 22Z = (22B, 22B)
// XXX = (XXX, XXX)
// `.trim();


let [steps, map] = input.split('\n\n').map(n => n.trim());

steps = steps.split('');
map = map.split('\n').map(m => {
  m = m.split(' = ');

  m[1] = m[1].replace(/\(|\)/gim, '').split(',').map(n => n.trim());

  return m;
});

let startingLocs = [];

map = map.reduce((refMap, line) => {
  refMap[line[0]] = line[1];

  if (line[0].endsWith('A')) {
    startingLocs.push(line[0]);
  }

  return refMap;
}, {});

// console.log('map', map);
// console.log('startingLocs', startingLocs);

let locs = [...startingLocs];

// let count = 0;
// let stepI = 0;
// while (!locs.every(loc => loc.endsWith('Z'))) {
//   locs.forEach((loc, locI) => {
//     const direction = steps[stepI];
//     locs[locI] = direction === 'L' ? map[loc][0] : map[loc][1];
//   });

//   if (stepI < steps.length - 1) {
//     stepI++;
//   } else {
//     stepI = 0;
//   }
//   count++;
// }

// ^ NAHHHH THIS TAKES FOREVER!

// 1 matches - 13939            / 263 = 53
// 2 matches - 599377           / 263 = 2279
// 3 matches - 47350783         / 263 = 180041
// 4 matches - 2793696197       / 263 = 10622419
// 5 matches - ?
// 6 matches - ?

// loc 0 13939   / 263 = 53
// loc 1 11309   / 263 = 43
// loc 2 20777   / 263 = 79
// loc 3 15517   / 263 = 59
// loc 4 17621   / 263 = 67
// loc 5 18673   / 263 = 71

// 53 * 43 = 2279
// 53 * 43 * 79 = 180041
// AHHAA TRA!!!!

// 50530847183 = 50530847183
// 6 ---> 50530847183 * 263

// Now let's turn this shit into an implementation... 

const total = locs.reduce((totalCount, loc, locI) => {
  let stepI = 0;
  let count = 0;
  while (!loc.endsWith('Z')) {
    const direction = steps[stepI];
  
    loc = direction === 'L' ? map[loc][0] : map[loc][1];
  
    if (stepI < steps.length - 1) {
      stepI++;
    } else {
      stepI = 0;
    }
    count++;
  }

  const placement = count / steps.length;
  
  totalCount *= placement;
  return totalCount;
}, steps.length);
 
console.log('total', total); // 13289612809129
