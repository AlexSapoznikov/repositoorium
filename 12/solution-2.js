let input = require('./input').trim();

// 4, 2500
input = `
????.######..#####. 1,6,5
`.trim();

// 1, 16
// input = `
// ????.#...#... 4,1,1
// `.trim();


// 23
input = `
????.??.??. 1,1
`.trim();

// 1342
// input = `
// ????.??.??.?????.??.??. 1,1,1,1
// `.trim();

// input = `
// ????.??.??.?????.??.??. 1,1,1,1
// `.trim();

const expand = 1;

const inputLines = input.trim().split('\n').map(line => {
  const [springs, info] = line.split(' ');
  
  let infoArr = info.split(',').map(e => +e);

  return {
    springs: Array(expand).fill(springs).join('?'),
    infoArr: Array(expand).fill(infoArr).reduce((i, a) => {
      i.push(...a);
      return i;
    }, []),
  };
});

let cache = {};
const allQcombinations = (num) => {
  if (cache[num]) {
    return cache[num];
  }

  const conditions = ['#', '.'];
  const combs = [];

  const generateCombinations = (currentCombination, remainingLength) => {
    if (remainingLength === 0) {
      combs.push(currentCombination);
      return;
    }

    for (const condition of conditions) {
      generateCombinations(currentCombination + condition, remainingLength - 1);
    }
  };

  generateCombinations('', num);

  cache[num] = combs;
  return combs;
};

// const getPartWays = (partialSpringRow, num) => {
//   const Qs = Array(num).fill('?').join('');
//   const combinations = allQcombinations(num);
//   const partialSpringRows = [];

//   combinations.forEach(combination => {
//     const newSpringRow = partialSpringRow.replace(Qs, combination);

//     partialSpringRows.push(newSpringRow);
//   });

//   return partialSpringRows;
// }

const getAllWays = (springsRow) => {
  // ['????', '.', '#', '.', '.', '.', '#', '.', '.', '.', '?????', '.', '#', '.', '.', '.', '#', '.', '.', '.', '?????', '.', '#', '.', '.', '.', '#', '.', '.', '.', '?????', '.', '#', '.', '.', '.', '#', '.', '.', '.', '?????', '.', '#', '.', '.', '.', '#', '.', '.', '.']
  const parts = springsRow.split('').reduce((arr, next) => {
    if (['.', '#'].includes(next)) {
       arr.push(next);
    } else {
      if (!arr[arr.length - 1]) {
        arr.push(next)
      } else if (arr[arr.length - 1] !== '.') {
        arr[arr.length - 1] += next;
      } else {
        arr.push(next)
      }
    }
  
    return arr;
  }, []);

  
  // Find parts.
  let partMap = {};

  for (let p = 0; p < parts.length; p++) {
    const part = parts[p];

    if (['.', '#'].includes(part)) continue;

    const combinations = allQcombinations(part.length);
    partMap[p] = combinations;

    for (let c = 0; c < combinations.length; c++) {
      const newWay = [...parts];
      newWay[p] = combinations[c];
    }
  }

  // Combine all
  // let ways = [];
  let springs = [
    ''
  ];

  for (let p = 0; p < parts.length; p++) {
    const part = parts[p];
    const cparts = partMap[p] || [];

    let springsLen = springs.length;
    for (let s = 0; s < springsLen; s++) {
      let springStr = springs[s];

      if (!cparts.length) {
        // springs[s] = springStr + part;
        springs.push(springStr + part);
      } else {
        for (let c = 0; c < cparts.length; c++) {
          const cpart = cparts[c];
          springs.push(springStr + cpart);
        }
      }
    }

    springs = springs.slice(springsLen);

    // console.log('springs>>', springs, springsLen, '->', springs.slice(springsLen), springs.slice(springsLen).length)
    // console.log('springs>>', springsLen - newCount)
  }

  console.log('-RESULT-', springs, springs.length);

  return springs;
}

const getValidWays = (ways, infoArr) => {
  return ways.map(way => {
    return way.split('.').filter(e => !!e.trim()).map(group => group.length);
  }).filter(g => g.join('-') === infoArr.join('-'));
}

let sum = 0;
inputLines.forEach(({ springs, infoArr }, i) => {
  console.log('ways', springs, ' | ', infoArr.join(','));

  const ways = getAllWays(springs);
  const validWays = getValidWays(ways, infoArr); 

  sum += validWays?.length || 0;

  console.log('ways', springs, ' | ', infoArr.join(','));
  console.log('ways', JSON.stringify(ways, null, 2), `\n`);
});

console.log('sum', sum);







