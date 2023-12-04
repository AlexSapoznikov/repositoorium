const input = require('./input').trim();

const inputLines = input.trim().split('\n');

// Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
// Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
// Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
// Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
// Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
// Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11

const parseCard = (inputLine) => {
  const [cardStr, numbers] = inputLine.split(':');
  const card = +cardStr.replace(/\D/gim, '').trim();
  let [winningNumbers, ownedNumbers] = numbers.split('|');

  winningNumbers = winningNumbers.split(' ').filter(exists => !!exists.trim()).map(num => +num);
  ownedNumbers = ownedNumbers.split(' ').filter(exists => !!exists.trim()).map(num => +num);

  return [card, winningNumbers, ownedNumbers];
}

const doubleNum = (num) => {
  let result = num > 0 ? 1 : 0;

  for (let i = 0; i < num - 1; i++) {
    result *= 2;
  }

  return result;
}

const matches = (winningNumbers, ownedNumbers) => {
  return ownedNumbers.filter(ownedNumber => winningNumbers.includes(ownedNumber)).length;
}

let sum = 0;
inputLines.forEach(inputLine => {
  const [card, winningNumbers, ownedNumbers] = parseCard(inputLine);

  console.log(matches(winningNumbers, ownedNumbers))

  const amountOfMatches = matches(winningNumbers, ownedNumbers);
  const doubled = doubleNum(amountOfMatches);
  sum += doubled;
});

// console.log(doubleNum(3));
// console.log(doubleNum(4));
// console.log(doubleNum(0));
// console.log(doubleNum(-1));

console.log('sum', sum);

