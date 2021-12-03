const fs = require('fs')

const getColumns = (rows) => {
    let columns = []
    for (let z = 0; z < rows[0].length; z++) {
        columns.push(rows.map(function(value) { return value[z]; }))
    }

    return columns
}

const getOxygenGeneratorRating = (position, numbers) => {
    let counts = {0: 0, 1:0}
    let columns = getColumns(numbers)

    for (let y = 0; y < columns[position].length; y++) {
        counts[columns[position][y]]++
    }

    numbers = numbers.filter(number => counts[0] > counts[1] ? number[position] == 0 : number[position] == 1)

    if (numbers.length == 1) return parseInt(numbers, 2)

    return getOxygenGeneratorRating(++position, numbers)
}

const getScrubberRating = (position, numbers) => {
    let counts = {0: 0, 1:0}
    let columns = getColumns(numbers)

    for (let y = 0; y < columns[position].length; y++) {
        counts[columns[position][y]]++
    }

    numbers = numbers.filter(number => counts[0] > counts[1] ? number[position] == 1 : number[position] == 0)

    if (numbers.length == 1) return parseInt(numbers, 2)

    return getScrubberRating(++position, numbers)
}


const lines = fs.readFileSync(__dirname + '/input.txt').toString().split('\n')

const oxyGenRating = getOxygenGeneratorRating(0, [...lines])
const scrubberRating = getScrubberRating(0, [...lines])

console.log(oxyGenRating * scrubberRating)
