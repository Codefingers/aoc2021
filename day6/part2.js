const fs = require('fs')
const lines = fs.readFileSync(__dirname + '/input.txt').toString()

const fish = Array.from(lines.split(',').map(Number))
const fishAges = new Array(9).fill(0)
for (let y = 0; y < fish.length; y++) {
    fishAges[fish[y]]++
}

for (let i = 0; i < 256; i++) {
    const newFish = fishAges.shift();
    fishAges.push(newFish);
    fishAges[6] += newFish;
}

console.log('count', fishAges.reduce((prev, current) => prev + current))
