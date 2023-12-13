let input = require('./input').trim();

// // 4, 2500
// input = `
// ????.######..#####. 1,6,5
// `.trim();

// // 1, 16
// input = `
// ????.#...#... 4,1,1
// `.trim();

input = `
???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1
`.trim();

// input = `
// ????.??.??.?????.??.??.?????.??.??. 1,1,1,1,1,1
// `.trim();

const inputLines = input.trim().split('\n').map(line => {
  const [springs, info] = line.split(' ');
  
  let infoArr = info.split(',').map(e => +e);

  return {
    springs1,
    infoArr1,
    springs2: Array(2).fill(springs).join('?'),
    infoArr2: Array(2).fill(infoArr).reduce((i, a) => {
      i.push(...a);
      return i;
    }, []),
  };
});

const getAllWays = (springsRow, infoArr) => {
  let allWays = [
    springsRow
  ];

  for (let i = 0; i < allWays.length; i++) {
    const springs = allWays[i];

    const q = springs.indexOf('?');

    if (q >= 0) {
      allWays.push(allWays[i].slice(0, q) + '.' + allWays[i].slice(q + 1));
      allWays.push(allWays[i].slice(0, q) + '#' + allWays[i].slice(q + 1));
    }

    // allWays = allWays.slice(2);
  }

  return allWays.filter(e => !e.includes('?'));
}

const getValidWays = (ways, infoArr) => {
  return ways.map(way => {
    // console.log(way.split('.').filter(e => !!e.trim()).map(group => group.length).join('-'))
    return way.split('.').filter(e => !!e.trim()).map(group => group.length);
  }).filter(g => g.join('-') === infoArr.join('-'));
}

let sum = 0;
inputLines.forEach(({ springs1, infoArr1, springs2, infoArr2 }, i) => {
  const ways1 = getAllWays(springs1, infoArr1);
  const validWays1 = getValidWays(ways1, infoArr1); 

  const ways2 = getAllWays(springs2, infoArr2);
  const validWays2 = getValidWays(ways2, infoArr2); 

  const uniqueWays = Math.floor((validWays1.length * Math.pow((validWays2.length) / (validWays1.length), 4)));

  console.log(i + 1, 'of', inputLines.length, '=', uniqueWays);

  sum += uniqueWays;

  // sum += validWays1?.length || 0;
});

console.log('sum', sum);
