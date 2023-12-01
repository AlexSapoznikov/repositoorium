// I tried to make it as short as possible so you wouldn't have to spend time on reading all the code :)
console.log(require('./input').replace(/[^0-9\n]/gim, '').trim().split('\n').reduce((s,n) => +s + +(n.slice(0, 1) + n.slice(-1)), 0));
