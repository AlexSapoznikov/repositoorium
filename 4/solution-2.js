const input = require('./input').trim();

// const input = `
// Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
// Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
// Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
// Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
// Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
// Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
// `.trim()

// 1 -> 1
// 2 -> 2
// 3 -> 4
// 4 -> 8
// 5 -> 14
// 6 -> 1

// +    30


const inputLines = input.trim().split('\n');


const parseCard = (inputLine) => {
  const [cardStr, numbers] = inputLine.split(':');
  const card = +cardStr.replace(/\D/gim, '').trim();
  let [winningNumbers, ownedNumbers] = numbers.split('|');

  winningNumbers = winningNumbers.split(' ').filter(exists => !!exists.trim()).map(num => +num);
  ownedNumbers = ownedNumbers.split(' ').filter(exists => !!exists.trim()).map(num => +num);

  return [card, winningNumbers, ownedNumbers];
}

const matches = (winningNumbers, ownedNumbers) => {
  return ownedNumbers.filter(ownedNumber => winningNumbers.includes(ownedNumber)).length;
}

const map = {}; // Id:instances map

for (let i = 0; i < inputLines.length; i++) {
  const cardNumByI = i + 1;
  const inputLine = inputLines[i];

  const [card, winningNumbers, ownedNumbers] = parseCard(inputLine);

  // Current one is an instance as well.
  map[cardNumByI] = (map[card] || 0) + 1;

  const amountOfMatches = matches(winningNumbers, ownedNumbers);

  // For all the copies.
  for (let copies = 0; copies < map[cardNumByI]; copies++) {
    // Copy next card.
    for (let ii = 0; ii < amountOfMatches; ii++) {
      const newCopyOfCardI = cardNumByI + ii + 1;
      map[newCopyOfCardI] = (map[newCopyOfCardI] || 0) + 1;
    }
  }
}

// It's just a sum of copies ok? Nothing hard here...
console.log(Object.values(map).reduce((sum, next) => sum + next, 0));
