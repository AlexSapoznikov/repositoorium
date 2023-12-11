let input = require('./input').trim();

// input = `
// ...#......
// .......#..
// #.........
// ..........
// ......#...
// .#........
// .........#
// ..........
// .......#..
// #...#.....
// `.trim();

const inputLines = input.trim().split('\n');


let expandedGalaxy = [];

let emptyRIs = [];
let emptyCIs = [];

// expand vertically
inputLines.forEach((line, i) => {
  expandedGalaxy.push(line.split(''));

  if (!line.includes('#')) {
    emptyRIs.push(i);
  }
});

let expandedGalaxy2 = [];

// expand horizontally
for (let ri = 0; ri < expandedGalaxy.length; ri++) {
  for (let ci = 0; ci < expandedGalaxy[ri].length; ci++) {
    let verticalLine = Array(expandedGalaxy.length).fill(null).map((_, i) => expandedGalaxy[i][ci]);

    if (!expandedGalaxy2[ri]) {
      expandedGalaxy2[ri] = [];
    }

    expandedGalaxy2[ri][ci] = expandedGalaxy[ri][ci];

    if (!verticalLine.includes('#')) {
      emptyCIs.push(ci);
      emptyCIs = Array.from(new Set(emptyCIs));
    }
  }
}

let galaxy = JSON.parse(JSON.stringify(expandedGalaxy2.map(c => c.join('')).join('\n').split('\n').map(r => (r.split('')))));

const paths = {};

// let EXPANSION_SIZE = 1;  // 374
// let EXPANSION_SIZE = 10; // 1030
// let EXPANSION_SIZE = 100; // 8410
let EXPANSION_SIZE = 1000000;

for (let ri = 0; ri < galaxy.length; ri++) {
  for (let ci = 0; ci < galaxy[ri].length; ci++) {
    const mark = galaxy[ri][ci];

    if (mark === '#') {
      paths[`${ri},${ci}`] = {};

      Object.keys(paths).forEach(key => {
        const path = paths[key];
        const [xri, xci] = key.split(',');
  
        if (key !== `${ri},${ci}`) {
          let [minRi, maxRi] = [ri, xri].sort((a, b) => a - b);
          let [minCi, maxCi] = [ci, xci].sort((a, b) => a - b);

          let crossingEmptyRowTimes = emptyRIs.filter(eri => minRi < eri && eri < maxRi).length;
          let crossingEmptyColTimes = emptyCIs.filter(eci => minCi < eci && eci < maxCi).length;

          paths[key] = {
            ...path,
            [`${ri},${ci}`]:
              Math.abs((ri - xri)) + (crossingEmptyRowTimes * EXPANSION_SIZE - crossingEmptyRowTimes) +
              Math.abs((ci - xci)) + (crossingEmptyColTimes * EXPANSION_SIZE - crossingEmptyColTimes),
          };
        }
      });
    }
  }
}

galaxy = JSON.parse(JSON.stringify(expandedGalaxy2));

let sum = 0;
Object.values(paths).forEach(o => {
  Object.values(o).forEach(v => {
    sum += v;
  });
});

console.log('emptyRIs', emptyRIs);
console.log('emptyCIs', emptyCIs);

console.log('sum', sum);

// 12665654




