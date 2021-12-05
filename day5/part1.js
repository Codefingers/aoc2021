const fs = require('fs')

const coordinateLines = fs.readFileSync(__dirname + '/input.txt')
.toString().split('\n')
.map(coordinateLine => coordinateLine.split(' -> '))

const coordinates = []
coordinateLines.forEach(coordinateLine => {
    const start = coordinateLine[0].split(',').map(Number)
    const end = coordinateLine[1].split(',').map(Number)
    const x = start[0]
    const y = start[1]
    const x2 = end[0]
    const y2 = end[1]

    if (x == x2) {
        for (let col = Math.min(y, y2); col <= Math.max(y, y2); col++) {
            if (!coordinates[col]) coordinates[col] = []
            coordinates[col][x] = coordinates[col][x] ? ++coordinates[col][x] : 1
        }

        return
    } 
    
    if (y == y2) {
        for (let row = Math.min(x, x2); row <= Math.max(x, x2); row++) {
            if (!coordinates[y]) coordinates[y] = []
            coordinates[y][row] = coordinates[y][row] ? ++coordinates[y][row] : 1
        }
    }
})

console.log(coordinates.flat().filter(value => value > 1).length)
