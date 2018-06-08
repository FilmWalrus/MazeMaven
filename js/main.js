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
    this.isVisited = false;
    this.displaySquare;
}

// Get a random number between min and max
function GetRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}







function MakeRandomSquareRed() {
    var randomRow = GetRandom(0, gridHeight - 1)
    var randomCol = GetRandom(0, gridWidth - 1)

    //var randomSquare = GetTileHTML(randomRow, randomCol);
    var randomTile = GetTile(randomRow, randomCol);
    AddTileToMazePath(randomTile);
}

function ClickAction(square) {
    //AddTileToMazePath(randomTile);
    ResetMaze();
    StartTunnel();
}

