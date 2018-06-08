// Get a mazeTile from the mazeArray using the (row, col) coordinates
function GetTile(row, col) {
    if (row < 0 || row >= gridHeight || col < 0 || col >= gridWidth) {
        return;
    } else {
        return mazeArray[row][col];
    }
}

function GetTileUnvisited(row, col) {
    if (row < 0 || row >= gridHeight || col < 0 || col >= gridWidth) {
        return;
    } else if (GetTile(row, col).isVisited) {
        return;
    } else {
        return mazeArray[row][col];
    }
}

function SetTileToPath(tile) {
    tile.displaySquare.className = "maze-square maze-path";
    tile.isWall = false;
    tile.isVisited = true;
}

function SetTileToOpen(tile) {
    tile.displaySquare.className = "maze-square maze-open";
    tile.isWall = false;
    tile.isVisited = false;
}

function SetTileToWall(tile) {
    tile.displaySquare.className = "maze-square maze-wall";
    tile.isWall = true;
    tile.isVisited = false;
}

function GetTileHTML(row, col) {
    var tileName = "maze_" + row + "_" + col;
    return document.getElementById(tileName);
}

function GetAdjacentOpenSpots(tile) {

    // This function only returns adjacent open spots that haven't yet been visited
    var adjacentArray = new Array();

    var leftTile = GetTileUnvisited(tile.row, tile.col - 2);
    if (leftTile) {
        adjacentArray.push(leftTile);
    }

    var rightTile = GetTileUnvisited(tile.row, tile.col + 2);
    if (rightTile) {
        adjacentArray.push(rightTile);
    }

    var upTile = GetTileUnvisited(tile.row - 2, tile.col);
    if (upTile) {
        adjacentArray.push(upTile);
    }

    var downTile = GetTileUnvisited(tile.row + 2, tile.col);
    if (downTile) {
        adjacentArray.push(downTile);
    }

    return adjacentArray;
}