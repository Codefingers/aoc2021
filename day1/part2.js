const fs = require('fs')

const input = fs.readFileSync(__dirname + '/input.txt').toString().split('\n').map((value) => Number(value))

let increaseCount = 0
for (let i = 0; i < input.length; i++) {
    if (i+3 < input.length) {
        let firstSum = input[i] + input[i+1] + input[i+2]
        let nextSum = input[i+1] + input[i+2] + input[i+3]

        if (nextSum > firstSum) { 
            increaseCount++
        }
    }
    lastCount = input[i]
}

console.log(increaseCount)