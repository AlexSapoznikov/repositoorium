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

const isValid = (game) => {
  return game.sets.every(set =>
    (set.green || 0) <= BAG.green &&
    (set.red || 0) <= BAG.red &&
    (set.blue || 0) <= BAG.blue
  );
}

let idSum = 0;
const games = inputLines.map(line => {
  const game = parseLine(line);
  const isPossible = isValid(game);

  if (isPossible) {
    idSum += game.id;
  }

  // console.log(JSON.stringify({...game, isPossible}, null, 2))
});

console.log(idSum);
