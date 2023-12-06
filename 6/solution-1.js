// const input = require('./input').trim();

const input = `
Time:        53     91     67     68
Distance:   250   1330   1081   1025
`.trim();

const inputLines = input.trim().split('\n');

const time = inputLines[0].trim().split(' ').filter(e => !!e.trim()).map(n => +n).slice(1);
const distance = inputLines[1].trim().split(' ').filter(e => !!e.trim()).map(n => +n).slice(1);

// console.log('time', time)
// console.log('distance', distance)

const map = [];

time.forEach((t, i) => {
  map.push({
    time: t,
    record: distance[i],
    myDistance: [],
  })
});

let multiply = 1;
map.forEach(race => {
  let beatableAmount = 0;
  for (let i = 0; i < race.time; i++) {
    const distance = (race.time - i) * i;
    const beatable = distance > race.record;

    race.myDistance.push({
      time: i,
      distance,
      beatable,
    });

    beatableAmount = beatable ? beatableAmount + 1 : beatableAmount;
  }

  race.beatableAmount = beatableAmount;
  multiply *= beatableAmount;
});

console.log('m', /* JSON.stringify(map, null, 2) */);
console.log('m', multiply);
