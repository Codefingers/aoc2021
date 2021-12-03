const fs = require('fs')

const input = fs.readFileSync('input.txt').toString().split('\n').map((value) => Number(value))

let lastCount = input[0]
let increaseCount = 0
for (let i = 1; i < input.length; i++) {
    if (input[i] > lastCount) {
        increaseCount++
    }

    lastCount = input[i]
}

console.log(increaseCount)