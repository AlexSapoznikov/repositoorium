let input = require('./input').trim();

// input = `
// -L|F7
// 7S-7|
// L|7||
// -L-J|
// L|-JF
// `.trim();

const maze = input.trim().split('\n').map(line => line.split(''));

// | is a vertical pipe connecting north and south.
// - is a horizontal pipe connecting east and west.
// L is a 90-degree bend connecting north and east.
// J is a 90-degree bend connecting north and west.
// 7 is a 90-degree bend connecting south and west.
// F is a 90-degree bend connecting south and east.
// . is ground; there is no pipe in this tile.
// S is the starting position of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has.

/*
      north
        |
west ---+--- east
        |
      south
*/

const map = {
  '|': {
    'UP': true,
    'DOWN': true,
    'LEFT': false,
    'RIGHT': false,
  },
  '-': {
    'UP': false,
    'DOWN': false,
    'LEFT': true,
    'RIGHT': true,
  },
  'L': {
    'UP': true,
    'DOWN': false,
    'LEFT': false,
    'RIGHT': true,
  },
  'J': {
    'UP': true,
    'DOWN': false,
    'LEFT': true,
    'RIGHT': false,
  },
  '7': {
    'UP': false,
    'DOWN': true,
    'LEFT': true,
    'RIGHT': false,
  },
  'F': {
    'UP': false,
    'DOWN': true,
    'LEFT': false,
    'RIGHT': true,
  },
  '.': {
    'UP': false,
    'DOWN': false,
    'LEFT': false,
    'RIGHT': false,
  },
  'S': {
    'UP': null,
    'DOWN': null,
    'LEFT': null,
    'RIGHT': null,
  },
};

let startingPos = {};

const defineS = (startingPos) => {
  map.S.UP = map[maze[startingPos.ri - 1][startingPos.ci]].DOWN;
  map.S.LEFT = map[maze[startingPos.ri][startingPos.ci - 1]].RIGHT;
  map.S.RIGHT = map[maze[startingPos.ri][startingPos.ci + 1]].LEFT;
  map.S.DOWN = map[maze[startingPos.ri + 1][startingPos.ci]].UP;
}

maze.find((_, ri) => {
  return maze.find((_, ci) => {
    if (maze[ri][ci] === 'S') {
      startingPos = {ri, ci};
      defineS(startingPos);
      return true;
    }
  });
});

// console.log('startingPos', startingPos, map.S);

const getMarkFrom = (ri, ci, target) => {
  if (target === 'UP') {
    return maze?.[ri - 1]?.[ci];
  }
  if (target === 'DOWN') {
    return maze?.[ri + 1]?.[ci];
  }
  if (target === 'LEFT') {
    return maze?.[ri]?.[ci - 1];
  }
  if (target === 'RIGHT') {
    return maze?.[ri]?.[ci + 1];
  }
}

let changes = 1;

// Remove all crap.
while (changes > 0) {
  changes = 0;
  for (let ri = 0; ri < maze.length; ri++) {
    for (let ci = 0; ci < maze[ri].length; ci++) {
      const mark = maze[ri][ci];
      const upMark = getMarkFrom(ri, ci, 'UP');
      const downMark = getMarkFrom(ri, ci, 'DOWN');
      const leftMark = getMarkFrom(ri, ci, 'LEFT');
      const rightMark = getMarkFrom(ri, ci, 'RIGHT');

      // Turn borders or connections to '.' into '.'
      if ((!upMark || upMark === '.') && map[mark].UP === true) {
        maze[ri][ci] = '.';
        changes++;
      }
      if ((!downMark || downMark === '.') && map[mark].DOWN === true) {
        maze[ri][ci] = '.';
        changes++;
      }
      if ((!leftMark || leftMark === '.') && map[mark].LEFT === true) {
        maze[ri][ci] = '.';
        changes++;
      }
      if ((!rightMark || rightMark === '.') && map[mark].RIGHT === true) {
        maze[ri][ci] = '.';
        changes++;
      }

      // Turn pipe that does not connect to anything to '.'
      if (
        (map[mark].UP && !map[upMark]?.DOWN) ||
        (map[mark].DOWN && !map[downMark]?.UP) ||
        (map[mark].LEFT && !map[leftMark]?.RIGHT) ||
        (map[mark].RIGHT && !map[rightMark]?.LEFT)
      ) {
        maze[ri][ci] = '.';
        changes++;
      }
    }
  }
}

// Run through the maze.
let tile = '';
let ri = startingPos.ri;
let ci = startingPos.ci;
let cameFrom;

let mazeCopy = JSON.parse(JSON.stringify(maze));

let s = 1;
while (tile !== 'S') {
  const mark = maze[ri][ci];
  const upMark = getMarkFrom(ri, ci, 'UP');
  const downMark = getMarkFrom(ri, ci, 'DOWN');
  const leftMark = getMarkFrom(ri, ci, 'LEFT');
  const rightMark = getMarkFrom(ri, ci, 'RIGHT');

  // Go right
  if (map[mark].RIGHT && map[rightMark]?.LEFT === true && cameFrom !== 'RIGHT') {
    tile = rightMark;
    cameFrom = 'LEFT';
    ci = ci + 1;
    console.log('go right', ri, ci)
  }
  // Go left
  else if (map[mark].LEFT && map[leftMark]?.RIGHT === true && cameFrom !== 'LEFT') {
    tile = leftMark;
    cameFrom = 'RIGHT';
    ci = ci - 1;
    console.log('go left', ri, ci)
  }
  // Go up
  else if (map[mark].UP && map[upMark]?.DOWN === true && cameFrom !== 'UP') {
    tile = upMark;
    cameFrom = 'DOWN';
    ri = ri - 1;
    console.log('go up', ri, ci)
  }
  // Go down
  else if (map[mark].DOWN && map[downMark]?.UP === true && cameFrom !== 'DOWN') {
    tile = downMark;
    cameFrom = 'UP';
    ri = ri + 1;
    console.log('go down', ri, ci)
  }

  mazeCopy[ri][ci] = '*';

  console.log('now', tile);

  s++;
}

// console.log(maze);
console.log(maze.map(c => c.join('')).join('\n'));
console.log();
console.log(mazeCopy.map(c => c.join('')).join('\n'));
console.log();
console.log('s', (s - 1) / 2);

// console.log('sum', sum);
