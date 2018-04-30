// This mazeArray stores all the mazeTiles
var mazeArray = new Array();

// Define the dimensions of the maze
var gridHeight = 51;
var gridWidth = 81;

// A mazeTile corresponds to a single square in the maze grid
function mazeTile(row, col) {
    this.row = row;
    this.col = col;
    this.isWall = true;

}

// Get a random number between min and max
function GetRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Get a mazeTile from the mazeArray using the (row, col) coordinates
function GetTile(row, col) {
    if (row < 0 || row >= gridHeight || col < 0 || col >= gridWidth) {
        return;
    } else {
        return mazeArray[row][col];
    }
}

function GetTileHTML(row, col) {
    var tileName = "maze_" + row + "_" + col;
    return document.getElementById(tileName);
}

function MazeGeneration() {
    var mazeElement = document.getElementById("maze-grid");

    // Generate a grid
    for (var row = 0; row < gridHeight; row++) {

        var rowTileArray = new Array();

        for (var col = 0; col < gridWidth; col++) {

            // Create white squares only where the row and col are both odd numbered
            var square = document.createElement("label");
            if (row % 2 == 1 && col % 2 == 1) {
                square.className = "maze-square maze-white";
            }else {
                square.className = "maze-square maze-black";
            }   

            //square.style = "width: 15px; height: 15px;"
            //square.value = col;
            square.addEventListener("click", function () { ClickAction(this) });

            // id = maze_0_0
            square.id = "maze_" + row + "_" + col;

            //square.innerHTML = "_";
            mazeElement.appendChild(square);

            var newTile = new mazeTile(row, col);
            rowTileArray.push(newTile);
        }

        var breakElement = document.createElement("break");
        breakElement.innerHTML = "<br>";
        mazeElement.appendChild(breakElement);

        mazeArray.push(rowTileArray);
    }

    //CreateTunnel();
    //CreateTunnel();
    //CreateTunnel();
}

function CreateTunnel() {
    var randomRow = GetRandom(0, gridHeight - 1)
    var randomCol = GetRandom(0, gridWidth - 1)

    var randomSquare = GetTileHTML(randomRow, randomCol);

    randomSquare.className = "maze-square maze-red";
}

function ClickAction(square) {
    square.className = "maze-square maze-red";
}

