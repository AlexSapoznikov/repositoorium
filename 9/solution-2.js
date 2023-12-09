let input = require('./input').trim();

/* input = `
0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45
`.trim(); */

const inputLines = input.trim().split('\n');

const parseLine = (inputLine) => {
  return inputLine.split(' ').filter(e => !!(e.trim())).map(e => +e);
}

const buildSequence = (parsedLine) => {
  let sequences = [
    parsedLine
  ];

  while (!sequences[sequences.length - 1].every(n => n === 0)) {
    let lastSeq = sequences[sequences.length - 1];

    const nextSeq = lastSeq.reduce((newSeq, num, i) => {
      if (i !== 0) {
        newSeq.push(num - lastSeq[i - 1]);
      }

      return newSeq;
    }, []);

    sequences.push(nextSeq);
  }

  return sequences;
};

const reverseInterpolate = (sequences) => {
  sequences.reverse().forEach((seq, i) => {
    const first = seq[0];
    
    const prevSeq = sequences[i - 1];
    const prevSeqFirst = prevSeq?.[0];

    seq.unshift(first - (prevSeqFirst || 0));
  });

  return sequences.reverse();
}

let sum = 0;
inputLines.forEach((inputLine, i) => {
  const parsedLine = parseLine(inputLine);
  const sequences = buildSequence([...parsedLine]);
  const interpolation = reverseInterpolate([...sequences]);
  const prediction = interpolation[0][0];
  
  sum += prediction;

  // console.log(i, '--->')
  // console.log('parsed', parsedLine);
  // console.log('seq', sequences);
  // console.log('pred', prediction);
  // console.log();
});

console.log('sum', sum);
