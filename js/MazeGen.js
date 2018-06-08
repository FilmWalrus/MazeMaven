function MazeGeneration() {
    var mazeElement = document.getElementById("maze-grid");

    // Generate a grid
    for (var row = 0; row < gridHeight; row++) {

        var rowTileArray = new Array();

        for (var col = 0; col < gridWidth; col++) {

            var square = document.createElement("label");
            square.addEventListener("click", function () { ClickAction(this) });
            square.id = "maze_" + row + "_" + col;
            mazeElement.appendChild(square);

            var newTile = new mazeTile(row, col);
            newTile.displaySquare = square;
            rowTileArray.push(newTile);
        }

        var breakElement = document.createElement("break");
        breakElement.innerHTML = "<br>";
        mazeElement.appendChild(breakElement);

        mazeArray.push(rowTileArray);
    }

    ResetMaze();

    //for (var i = 0; i < 10; i++) {
    //    //MakeRandomSquareRed();
    //}

    StartTunnel();
}

function ResetMaze() {
    for (var row = 0; row < gridHeight; row++) {
        for (var col = 0; col < gridWidth; col++) {
            var tile = GetTile(row, col);

            // Create open tiles only where the row and col are both odd numbered
            if (row % 2 == 1 && col % 2 == 1) {
                SetTileToOpen(tile);
            } else {
                SetTileToWall(tile);
            }
        }
    }
}

function StartTunnel() {
    // Get a random start location on a white tile
    var randomRow = GetRandom(1, gridHeight - 1)
    var randomCol = GetRandom(1, gridWidth - 1)
    if (randomRow % 2 != 1) {
        randomRow++;
    }
    if (randomCol % 2 != 1) {
        randomCol++;
    }

    var startTile = GetTile(randomRow, randomCol);

    // Add this tile to the mazePath array
    var mazePath = new Array();
    mazePath.push(startTile);

    //var sameStartTile = mazePath.pop();

    DigTunnel(mazePath);
}

function DigTunnel(mazePath) {

    // If we've retraced all the way back to start, exit.
    if (mazePath.length == 0) {
        return;
    }

    var tile = mazePath[mazePath.length - 1];
    SetTileToPath(tile);

    var adjArray = GetAdjacentOpenSpots(tile);

    // If at a dead end, retrace our steps.
    if (adjArray.length == 0) {

        mazePath.pop();
        DigTunnel(mazePath);
        return;
    }

    // Get a randomly selected adjacent location
    var randomAdjacentTileIndex = GetRandom(0, adjArray.length - 1);
    var randomAdjacentTile = adjArray[randomAdjacentTileIndex];
    mazePath.push(randomAdjacentTile);

    // Knock down the wall in between where we are and where we are going
    var wallInBetweenRow = (tile.row + randomAdjacentTile.row) / 2;
    var wallInBetweenCol = (tile.col + randomAdjacentTile.col) / 2;
    var wallInBetweenTile = GetTile(wallInBetweenRow, wallInBetweenCol);
    SetTileToPath(wallInBetweenTile);


    // Now travel to the adjacent tile
    if (randomAdjacentTile) {
        DigTunnel(mazePath);
    }

    //for (var i = 0; i < adjArray.length; i++) {
    //    var adjTile = adjArray[i];
    //    adjTile.displaySquare.className = "maze-square maze-path";
    //}

}