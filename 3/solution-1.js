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

const canGoAroundNum = (num, lineIndex, relevantLinesArr) => {
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

  // console.log(numIndexes)

  const isTopAllClear = numIndexes.every(numIndex => [...nums, '.'].includes((previousLine[numIndex] || '.')));
  const isBottomAllClear = numIndexes.every(numIndex => [...nums, '.'].includes((nextLine[numIndex] || '.')));

  // console.log({
  //   num,
  //   lineIndex,
  //   isLeftClear,
  //   isRightClear,
  //   isTopAllClear,
  //   isBottomAllClear,
  // })

  // console.log(num, isLeftClear && isRightClear && isTopAllClear && isBottomAllClear);
  // console.log(numIndexes.map(numIndex => previousLine[numIndex] || 'b').join(''));
  // console.log((currentLine[lineIndex - 1] || 'b') + num + (currentLine[lineIndex + num.length] || 'b'));
  // console.log(numIndexes.map(numIndex => nextLine[numIndex] || 'b').join(''));
  // console.log('\n');
  
  return isLeftClear && isRightClear && isTopAllClear && isBottomAllClear;
}

let sum = 0;
inputLines.forEach((inputLine, i) => {
  const currentLine = inputLine.split('');
  const outOfBoundaryLine = Array(currentLine.length).fill('.');
  const previousLine = inputLines[i - 1]?.split('') || outOfBoundaryLine
  const nextLine = inputLines[i + 1]?.split('') || outOfBoundaryLine

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

    // console.log(number, '>>', lineIndex, '??', canGoAroundNum(number, lineIndex, relevantLinesArr));
    if (!canGoAroundNum(number, lineIndex, relevantLinesArr)) {
      sum += +number;
    }
  });
});

console.log('sum', sum);

