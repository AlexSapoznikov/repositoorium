// Ohkay, shit's getting a bit more serious, can't do oneliner anymore...

const input = require('./input');

const inputLines = input.trim().split('\n');

const numsAsWords = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const numsAsWordsMap = numsAsWords.reduce((map, word, index) => {
  map[word] = index + 1;

  return map;
}, {});

const words = [
  ...numsAsWords,
  ...Array(9).fill(0).map((_, i) => `${i + 1}`)
];

const sum = inputLines.reduce((sum, inputLine) => {
  // Find those numbers, baby!
  const wordPlacements = words.reduce((wp, word, index) => {
    const firstPlace = inputLine.indexOf(word);
    const lastPlace = inputLine.lastIndexOf(word);

    if (firstPlace >= 0) {
      wp.push({ place: firstPlace, word, value: Number.isInteger(+word) ? +word : +numsAsWordsMap[word] });  
    }
    if (lastPlace >= 0) {
      wp.push({ place: lastPlace, word, value: Number.isInteger(+word) ? +word : +numsAsWordsMap[word] });  
    }

    return wp;
  }, []).sort((a, b) => a.place - b.place);

  // Abrakaboom! Here's the number!
  const num = +`${wordPlacements[0].value}${wordPlacements[wordPlacements.length - 1].value}`;

  // console.log('->', inputLine, num, wordPlacements);

  return sum + num;
}, 0);

// And here's the cookie.
console.log(sum);
