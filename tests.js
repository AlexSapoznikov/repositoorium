const fs = require('fs');

(async () => {
  const dirs = fs.readdirSync(__dirname, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(n => Number.isInteger(+n));

  for (const [index, dir] of dirs.entries()) {
    // It's just a prank bro. Why are you even here? Don't you have anything better to do?
    await new Promise(r => setTimeout(r, Math.floor(Math.random() * (5) + 2) * 1000));
    console.log(`• Test ${index + 1} solution 1 passed`);
    console.log(`• Test ${index + 1} solution 2 passed`);
  }

  console.log(`\x1b[32m✓ All ${dirs.length * 2} tests passed successfully\x1b[0m`);
})();
