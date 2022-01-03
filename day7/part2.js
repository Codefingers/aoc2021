const fs = require('fs')
const horizontalPositions = fs.readFileSync(__dirname + '/input.txt')
.toString()
.split(',')
.map(Number)
.sort((a, b) => a -	 b)


const calculateFuelCost = (horizontalPositionTarget) => {
	let fuel = 0;
	for (let i = 0; i < horizontalPositions.length; i++) {
        const positionDiff = Math.abs(horizontalPositionTarget - horizontalPositions[i])
		fuel += positionDiff * ((positionDiff + 1 ) / 2)
	}

	return fuel
}

const getCheapestFuelCost = () => {
    const fuelCost = []
    let min = Math.min(...horizontalPositions)
    let max = Math.max(...horizontalPositions)

    for (let y = min; y <= max; y++) {
        fuelCost.push(calculateFuelCost(y))
    }

    return fuelCost
}

console.log('fuelcost', Math.min(...getCheapestFuelCost()))