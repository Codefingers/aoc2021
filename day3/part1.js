const fs = require('fs')

let columns = []
const lines = fs.readFileSync('input.txt').toString().split('\n')
for (let z = 0; z < lines[0].length; z++) {
    columns.push(lines.map(function(value) { return value[z]; }))
}

let gammaBits = ''
let epsilonBits = ''
for (let i = 0; i < columns.length; i++) {
    let counts = {0: 0, 1:0}
    for (let y = 0; y < columns[i].length; y++) {
        counts[columns[i][y]]++
    }
    
    gammaBits += counts[0] > counts[1] ? '0' : '1'
    epsilonBits += counts[0] > counts[1] ? '1' : '0'
}

console.log(parseInt(gammaBits, 2) * parseInt(epsilonBits, 2))