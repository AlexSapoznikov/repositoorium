const input = require('./input').trim();

const inputLines = input.trim().split('\n');

// only 12 red cubes, 13 green cubes, and 14 blue cubes
const BAG = {
  'red': 12,
  'green': 13,
  'blue': 14,
};

// Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
const parseLine = (line) => {
  const [game, data] = line.split(':');
  const sets = data.split(';').map(set => {
    const cubes = set.trim().split(',').map(cubeLine => cubeLine.trim().split(' '));

    return {
      ...cubes.reduce((map, cube) => {
        map[cube[1].toLowerCase()] = +cube[0];
        return map;
      }, {}),
    };
  });

  return {
    id: +(game.replace(/[^0-9]/g, '').trim()),
    sets,
  }
}

const getPower = (game) => {
  let minGreenNeeded = 0;
  let minRedNeeded = 0;
  let minBlueNeeded = 0;

  game.sets.forEach(set => {
    minGreenNeeded = Math.max(minGreenNeeded, set.green || 0);
    minRedNeeded = Math.max(minRedNeeded, set.red || 0);
    minBlueNeeded = Math.max(minBlueNeeded, set.blue || 0);
  })

  return {
    minGreenNeeded,
    minRedNeeded,
    minBlueNeeded,
    power: minGreenNeeded * minRedNeeded * minBlueNeeded
  }
};

let powerSum = 0;
const games = inputLines.map(line => {
  const game = parseLine(line);
  const power = getPower(game);

  powerSum += power.power;

  // console.log(JSON.stringify({...game, power}, null, 2))
});

console.log(powerSum);
