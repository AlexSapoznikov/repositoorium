const input = require('./input').trim();

const inputLines = input.trim().split('\n');

/*

467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..

*/

const nums = Array(9).fill(0).map((_, i) => `${i + 1}`);

const canGoAroundNum = (num, lineIndex, relevantLinesArr, rowIndex, map) => {
  const [
    previousLine,
    currentLine,
    nextLine,
  ] = relevantLinesArr;

  // All indexes for each placement of number.
  // For top example, 114 indexes are [ 4, 5, 6, 7, 8 ]
  const numIndexes = Array(num.length + 2).fill(lineIndex - 1).map((_, i) => lineIndex - 1 + i);

  const isLeftClear = (currentLine[lineIndex - 1] || '.') === '.';
  const isRightClear = (currentLine[lineIndex + num.length] || '.') === '.';

  const isTopAllClear = numIndexes.every(numIndex => [...nums, '.'].includes((previousLine[numIndex] || '.')));
  const isBottomAllClear = numIndexes.every(numIndex => [...nums, '.'].includes((nextLine[numIndex] || '.')));

  // console.log(num, isLeftClear && isRightClear && isTopAllClear && isBottomAllClear);
  // console.log(numIndexes.map(numIndex => previousLine[numIndex] || 'b').join(''));
  // console.log((currentLine[lineIndex - 1] || 'b') + num + (currentLine[lineIndex + num.length] || 'b'));
  // console.log(numIndexes.map(numIndex => nextLine[numIndex] || 'b').join(''));
  // console.log('\n');

  const canGoAround = isLeftClear && isRightClear && isTopAllClear && isBottomAllClear;

  previousLine.forEach((symbol, symbolIndex) => {
    // Fuck optimization, I don't care.
    if (symbol === '*' && numIndexes.includes(symbolIndex)) {
      map[`${rowIndex - 1},${symbolIndex}`] = (map[`${rowIndex - 1},${symbolIndex}`] || []).concat(+num);
    }
  })

  currentLine.forEach((symbol, symbolIndex) => {
    // Still fuck optimization, I don't care.
    if (symbol === '*' && numIndexes.includes(symbolIndex)) {
      map[`${rowIndex},${symbolIndex}`] = (map[`${rowIndex},${symbolIndex}`] || []).concat(+num);
    }
  })

  nextLine.forEach((symbol, symbolIndex) => {
    // As I said, fuck optimization, I still don't care.
    if (symbol === '*' && numIndexes.includes(symbolIndex)) {
      map[`${rowIndex + 1},${symbolIndex}`] = (map[`${rowIndex + 1},${symbolIndex}`] || []).concat(+num);
    }
  })

  return canGoAround;
}

let sum = 0;
let map = {};
inputLines.forEach((inputLine, rowIndex) => {
  const currentLine = inputLine.split('');
  const outOfBoundaryLine = Array(currentLine.length).fill('.');
  const previousLine = inputLines[rowIndex - 1]?.split('') || outOfBoundaryLine
  const nextLine = inputLines[rowIndex + 1]?.split('') || outOfBoundaryLine

  const relevantLinesArr = [
    previousLine,
    currentLine,
    nextLine,
  ];

  const lineNumbers = inputLine.split(/\D/gim).filter(s => !!s.trim());

  let lastLineIndex = 0;
  lineNumbers.forEach(number => {
    const relevantLinePiece = inputLine.slice(lastLineIndex);

    const lineIndex = lastLineIndex + relevantLinePiece.indexOf(number);
    lastLineIndex = lineIndex + number.length;

    if (!canGoAroundNum(number, lineIndex, relevantLinesArr, rowIndex, map)) {
      sum += +number;
    }
  });
});

// console.log('sum', sum);
// console.log('map', map);

const sum2 = Object.values(map).filter(values => values.length === 2).map(values => values[0] * values[1]).reduce((s, next) => s + next, 0)

console.log(sum2);

// FYI, it's not fun to debug all this shit with a headache.
