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

    return bingoBoards.reverse()
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
let boardsWon = []
for (let i = 0; i < bingoNumbers.length; i++) {
    bingoBoards.forEach((bingoBoard, boardIndex) => {
        if (boardsWon.filter(boardWon => boardWon.boardIndex == boardIndex).length == 0) {
            bingoBoard.forEach(rows => {
                rows.forEach(value => {
                    if (bingoNumbers[i] == value.value) {
                        value.marked = true
                        const result = checkBoard(bingoBoard)
                        if (result && result.length > 0) {
                            if (boardsWon.filter(boardWon => boardWon.boardIndex == boardIndex).length == 0) {
                                boardsWon.push({
                                    boardIndex,
                                    winningResult: result,
                                    winningNumber: bingoNumbers[i],
                                    winningBoard: bingoBoard
                                })
                            }

                                winningResult = result
                                winningNumber = bingoNumbers[i]
                                winningBoard = bingoBoard
                        }
                    }
                })
            })
    }
    })
}

let unmarkedSum = 0
let unmarkedValues = []
boardsWon[boardsWon.length-1].winningBoard.forEach(rows => {
    unmarkedValues = [...rows.filter(value => value.marked == false), ...unmarkedValues]
})
unmarkedSum += unmarkedValues.reduce((acc, value) => { return {value: +acc.value + +value.value}}).value

console.log(unmarkedSum * winningNumber)
