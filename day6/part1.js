const fs = require('fs')
const lines = fs.readFileSync(__dirname + '/input.txt').toString()

const updateFishLife = (fish) => {
    const updatedFish = [...fish]
    for (let z = 0; z < fish.length; z++) {
        if (fish[z] === 0) {
            updatedFish.push(8)
            updatedFish[z] = 6
        } else {
            updatedFish[z]--
        }
    }

    return updatedFish
}

const fish = [[...lines.split(',').map(Number)]]
let count = fish[0].length
// loop through days
for (let i = 0; i < 18; i++) {
    fish[i+1] = updateFishLife(fish[i])
    count = fish[i+1].length
}

console.log('count', count)
