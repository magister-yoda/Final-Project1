count = true;
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Predator = require("./modules/Predator.js");
var Hunter = require("./modules/Hunter.js");
var Trade = require("./modules/Trade.js");
let random = require('./modules/random');
let Water = require('./modules/Water.js');
let Fish = require('./modules/Fish.js');


grassArr = [];
grassEaterArr = [];
predatorArr = [];
hunterArr = [];
tradeArr = [];
waterArr = [];
fishArr = [];
matrix = [];

grassHashiv = 0;
grassEaterHashiv = 0;
hunterHashiv = 0;
predatorHashiv = 0;
tradeHashiv = 0;
waterHashiv = 0;
fishHashiv = 0;


function matrixGenerator(matrixSize, grass, grassEater,  predator, hunter, trade, water, fish) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < predator; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < hunter; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < trade; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
    for (let i = 0; i < water; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 6;
    }
    for (let i = 0; i < fish; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 7;
    }
}
matrixGenerator(70, 25, 20, 15, 10, 2, 1, );

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);


function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
                grassEaterHashiv++;
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            }
            else if (matrix[y][x] == 4) {
                var hunter = new Hunter(x, y);
                hunterArr.push(hunter);
                hunterHashiv++;
            }
            else if (matrix[y][x] == 3) {
                var predator = new Predator(x, y);
                predatorArr.push(predator);
                predatorHashiv++;
            }
            else if (matrix[y][x] == 5) {
                var trade = new Trade(x, y);
                tradeArr.push(trade);
                tradeHashiv++;
            }
            else if (matrix[y][x] == 6) {
                var water = new Water(x, y);
                waterArr.push(water);
                waterHashiv++;
            }
            else if (matrix[y][x] == 7) {
                var fish = new Fish(x, y);
                fishArr.push(fish);
                fishHashiv++;
            }
        }
    }
}

creatingObjects();

let exanak = 0;
let weather = "winter"

function game() {

    exanak++;
    if (exanak <= 10){
        weather = "summer";
    }
    else if (exanak <= 20){
        weather = "autumn";
    }
    else if (exanak <= 30){
        weather = "winter";
    } 
    else if (exanak <=40 ){
        weather = "spring";
    } 
    else if (exanak = 50){
        exanak = 0;
    }


    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }
    if (hunterArr[0] !== undefined) {
        for (var i in hunterArr) {
            hunterArr[i].eat();
        }
    }
    if (predatorArr[0] !== undefined) {
        for (var i in predatorArr) {
            predatorArr[i].eat();
        }
    }
    if (tradeArr[0] !== undefined) {
        for (var i in tradeArr) {
            tradeArr[i].eat();
        }
    }
    if (waterArr[0] !== undefined) {
        for (var i in waterArr) {
            waterArr[i].eat();
        }
    }
    
    if (waterArr[0] !== undefined) {
        for (var i in waterArr) {
            waterArr[i].mul();
            
            if (waterArr.length == 10 && count ) {
                count =false
                let curr = random(waterArr);
                for (var l = 0; l < 2; l++) {
                    matrix[curr.y][curr.x] = 7;
                    let fish = new Fish(curr.x, curr.y);
                    fishArr.push(fish)
                }
    
                for (let i in waterArr) {
                    if (waterArr[i].x == curr.x && waterArr[i].y == curr.y) {
                        waterArr.splice(i, 1)
                    }
                }
                 count = 0;
            }
        }
    }
    if (fishArr[0] !== undefined) {
        for (let i in fishArr) {
            fishArr[i].move();
        }
    }   

    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grassLiveCounter: grassArr.length,

        grassEaterCounter: grassEaterHashiv,
        grassEaterLiveCounter: grassEaterArr.length,

        hunterCounter: hunterHashiv,
        hunterLiveCounter: hunterArr.length,

        predatorCounter: predatorHashiv,
        predatorLiveCounter: predatorArr.length,

        tradeCounter: tradeHashiv,
        tradeLiveCounter: tradeArr.length,

        waterCounter: waterHashiv,
        waterLiveCounter: waterArr.length,

        fishCounter: fishHashiv,
        fishLiveCounter: fishArr.length,
                               
        weather: weather,
    }

    
    io.sockets.emit("data", sendData);
}



setInterval(game, 400)