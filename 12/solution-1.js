let input = require('./input').trim();

// input = `
// ???.### 1,1,3
// .??..??...?##. 1,1,3
// ?#?#?#?#?#?#?#? 1,3,1,6
// ????.#...#... 4,1,1
// ????.######..#####. 1,6,5
// ?###???????? 3,2,1
// `.trim();

// input = `
// ?###???????? 3,2,1
// `.trim();

// // 506250

// input = `
// .# 1
// `.trim();

const inputLines = input.trim().split('\n').map(line => {
  const [springs, info] = line.split(' ');
  
  let infoArr = info.split(',').map(e => +e);

  return {
    springs,
    infoArr,
  };
});

const getAllWays = (springsRow, infoArr) => {
  const allWays = [
    springsRow
  ];

  for (let i = 0; i < allWays.length; i++) {
    const springs = allWays[i];

    const q = springs.indexOf('?');

    if (q >= 0) {
      allWays.push(allWays[i].slice(0, q) + '.' + allWays[i].slice(q + 1));
      allWays.push(allWays[i].slice(0, q) + '#' + allWays[i].slice(q + 1));
    }
  }

  return allWays.filter(e => !e.includes('?'));
}

const getValidWays = (ways, infoArr) => {
  return ways.map(way => {
    return way.split('.').filter(e => !!e.trim()).map(group => group.length);
  }).filter(g => g.join('-') === infoArr.join('-'));
}

let sum = 0;
inputLines.forEach(({ springs, infoArr }, i) => {
  const ways = getAllWays(springs, infoArr);
  const validWays = getValidWays(ways, infoArr); 

  sum += validWays?.length || 0;

  // console.log('ways', springs, infoArr, '->', ways/* , '->', validWays */);
});

console.log('sum', sum);
