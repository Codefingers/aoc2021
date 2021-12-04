const fs = require('fs')

const buildBingoBoards = (lines) => {
    let bingoBoards = []
    let boardNumbers = []
    for (let i = 1; i < lines.length;  i++) {
        const emptyLine = lines[i] == ''
        if (!emptyLine) {
            let row = lines[i].split(' ').filter(value => value != '').map(value => {return {value, marked: false }})
            boardNumbers.push(row)
        }

        if (i == lines.length-1 || (emptyLine && boardNumbers.length)) {
            bingoBoards.push(boardNumbers)
            boardNumbers = []
        }
    }

    return bingoBoards
}

const checkBoard = (board) => {
    for (let i = 0; i < board.length; i++) {
        let column = board.map(values => values[i])
        if (column.filter(value => value.marked == true).length == 5) {
            return column
        }

        if (board[i].filter(value => value.marked == true).length == 5) {
            return board[i]
        }
    }
}

const lines = fs.readFileSync(__dirname + '/input.txt').toString().split('\n')
const bingoNumbers = lines[0].split(',')
const bingoBoards = buildBingoBoards(lines)

let winningResult = []
let winningNumber = 0
let winningBoard = []
for (let i = 0; i < bingoNumbers.length; i++) {
    bingoBoards.forEach(bingoBoard => {

        bingoBoard.forEach(rows => {
            rows.forEach(value => {
                if (bingoNumbers[i] == value.value) {
                    value.marked = true
                    const result = checkBoard(bingoBoard)
                    if (result && result.length > 0) {
                        winningResult = result
                        winningNumber = bingoNumbers[i]
                        winningBoard = bingoBoard
                        i = bingoNumbers.length-1
                        return
                    }
                }
            })
        })
    })
}

let unmarkedSum = 0
winningBoard.forEach(rows => {
    const unmarkedValues = rows.filter(value => value.marked == false)
    if (unmarkedValues.length) {
        unmarkedSum += unmarkedValues.reduce((acc, value) => ({value: +acc.value + +value.value})).value
    }
})

console.log(unmarkedSum * winningNumber)
