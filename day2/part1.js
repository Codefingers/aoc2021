const fs = require('fs')


let depth = 0
let horizontal = 0

const applyOperation = (operator, currentValue) => {
    switch (operator) {
        case 'forward': 
            return horizontal += currentValue
        case 'down': 
            return depth += currentValue
        case 'up': 
            return depth -= currentValue
    }
}

const lines = fs.readFileSync('input.txt').toString().split('\n')
for (let i = 0; i < lines.length; i++) {
    const values = lines[i].split(' ')
    applyOperation(values[0], Number(values[1]))
}

console.log(depth*horizontal)