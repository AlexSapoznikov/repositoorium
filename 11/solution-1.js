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

// expand vertically
inputLines.forEach((line, i) => {
  expandedGalaxy.push(line.split(''));

  if (!line.includes('#')) {
    expandedGalaxy.push(line.split(''));
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
      expandedGalaxy2[ri][ci] += '.';
    }
  }
}

let galaxy = JSON.parse(JSON.stringify(expandedGalaxy2.map(c => c.join('')).join('\n').split('\n').map(r => (r.split('')))));

const paths = {};

for (let ri = 0; ri < galaxy.length; ri++) {
  for (let ci = 0; ci < galaxy[ri].length; ci++) {
    const mark = galaxy[ri][ci];

    if (mark === '#') {
      paths[`${ri},${ci}`] = {};

      Object.keys(paths).forEach(key => {
        const path = paths[key];
        const [xri, xci] = key.split(',');
  
        if (key !== `${ri},${ci}`) {
          paths[key] = {
            ...path,
            [`${ri},${ci}`]: Math.abs((ri - xri)) + Math.abs((ci - xci)),
          };
        }
      });
    }
  }
}

galaxy = JSON.parse(JSON.stringify(expandedGalaxy2));

// console.log(galaxy.map(c => c.join('')).join('\n'));
console.log(expandedGalaxy2);
console.log('paths', paths);

let sum = 0;
Object.values(paths).forEach(o => {
  Object.values(o).forEach(v => {
    sum += v;
  });
});

console.log('sum', sum);




