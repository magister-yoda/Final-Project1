var LiveForm = require("./LiveForm");
var random = require("./random");


module.exports = class Fish extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.directions = [];
    }
    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.newDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            } 
        }
        return found;
    }
    move() {

        let emptyCells = this.chooseCell(6);
        let newCell = random(emptyCells);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            fishHashiv++;

            matrix[y][x] = 7;
            matrix[this.y][this.x] = 6;

            this.y = y;
            this.x = x;

        }
    }
}