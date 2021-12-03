const fs = require('fs')


let depth = 0
let horizontal = 0
let aim = 0

const applyOperation = (operator, currentValue) => {
    switch (operator) {
        case 'forward': 
            horizontal += currentValue
            return depth += (aim * currentValue)
        case 'down': 
            return aim += currentValue
        case 'up': 
            return aim -= currentValue
    }
}

const lines = fs.readFileSync(__dirname + '/input.txt').toString().split('\n')
for (let i = 0; i < lines.length; i++) {
    const values = lines[i].split(' ')
    applyOperation(values[0], Number(values[1]))
}

console.log(depth*horizontal)