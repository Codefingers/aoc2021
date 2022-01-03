const fs = require('fs')
const horizontalPositions = fs.readFileSync(__dirname + '/input.txt')
.toString()
.split(',')
.map(Number)
.sort((a, b) => a -	 b)


const calculateFuelCost = (horizontalPositionTarget) => {
	let fuel = 0;
	for (let i = 0; i < horizontalPositions.length; i++) {
		fuel += Math.abs(horizontalPositionTarget - horizontalPositions[i]);
	}
	
	return fuel
}

const getCheapestFuelCost = () => {
    let cheapestFuelCost = 0
    for (let y = 0; y < horizontalPositions.length; y++) {
        const fuelCost = calculateFuelCost(horizontalPositions[y])

        if (cheapestFuelCost === 0 || fuelCost < cheapestFuelCost) {
            cheapestFuelCost = fuelCost
        }
    }

    return cheapestFuelCost
}

console.log('cheapestFuelCost', getCheapestFuelCost())