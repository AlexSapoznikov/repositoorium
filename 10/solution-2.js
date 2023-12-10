let input = require('./input').trim();

// input = `
// ...........
// .S-------7.
// .|F-----7|.
// .||.....||.
// .||.....||.
// .|L-7.F-J|.
// .|..|.|..|.
// .L--J.L--J.
// ...........
// `.trim();

// input = `
// ..........
// .S------7.
// .|F----7|.
// .||....||.
// .||....||.
// .|L-7F-J|.
// .|..||..|.
// .L--JL--J.
// ..........
// `.trim();

// input = `
// .F----7F7F7F7F-7....
// .|F--7||||||||FJ....
// .||.FJ||||||||L7....
// FJL7L7LJLJ||LJ.L-7..
// L--J.L7...LJS7F-7L7.
// ....F-J..F7FJ|L7L7L7
// ....L7.F7||L7|.L7L7|
// .....|FJLJ|FJ|F7|.LJ
// ....FJL-7.||.||||...
// ....L---J.LJ.LJLJ...
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

      maze[ri][ci] = Object.keys(map).find(key => {
        return (
          map[key].UP === map[maze[ri][ci]].UP &&
          map[key].DOWN === map[maze[ri][ci]].DOWN &&
          map[key].LEFT === map[maze[ri][ci]].LEFT &&
          map[key].RIGHT === map[maze[ri][ci]].RIGHT
        );
      })
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
for (let ri = 0; ri < maze.length; ri++) {
  for (let ci = 0; ci < maze[ri].length; ci++) {
    const mark = maze[ri][ci];
    const validVerticalMarks = Object.keys(map).filter(e => e !== '.' && (map[e].UP || map[e].DOWN));
  
    if (mark === '.') {
      // SO... Imagine we are drawing a line from each dot point to the left edge.
      // We will now count how many times we are actually crossing a wall...
      // It is a min amount of passing our row from top->bottom or bottom->top (for example if there is L-7 on the row, we are actually crossing row just once.)
      const validMarksLeft = maze[ri].slice(0, ci).filter(m => validVerticalMarks.includes(m)).map(m => ([map[m].UP, map[m].DOWN])).reduce((s, n) => {
        s[0] += (n[0] ? 1 : 0);
        s[1] += (n[1] ? 1 : 0);

        return s;
      }, [0, 0]);

      if (Math.min(...validMarksLeft) % 2 === 0/*  || validMarksRight % 2 === 0 || validMarksUp % 2 === 0 || validMarksDown % 2 === 0 */) {
        maze[ri][ci] = '0';
      } else {
        maze[ri][ci] = 'I';
      }
    }
  }
}

console.log(maze.map(c => c.join('')).join('\n'));
console.log(maze.map(c => c.join('')).join('\n').match(/I/gim)?.length);
