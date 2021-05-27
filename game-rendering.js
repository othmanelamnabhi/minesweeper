import {
  boardTilesArray,
  createTilesArray,
  generateMines,
  comparePositions,
  TILE_STATUS,
} from "./game-logic.js";

/* Select elements of use */
const board = document.querySelector(".board");

/* Set number of mines and size of board */
const boardSize = 10;
const numberOfMines = 10;

// Create array of tiles based on the board size
createTilesArray(boardSize);

// Generate random mine positions
const minePositions = generateMines(numberOfMines, boardSize);

// Change the status of mines to true in boardTilesArray
boardTilesArray.forEach((row) =>
  row.forEach((tile) => {
    minePositions.forEach((position) => {
      if (comparePositions(position, tile)) {
        tile.mine = true;
      }
    });
  })
);

// replace variable value in CSS file with board size
board.style.setProperty("--size", boardSize);

// Render tiles on board all with status hidden
boardTilesArray.forEach((row) =>
  row.forEach((tile) => {
    board.appendChild(tile.tileElement);
  })
);

// Add "right click" event listener to every tile
boardTilesArray.forEach((row) =>
  row.forEach((tile) => {
    tile.tileElement.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      if (tile.status === TILE_STATUS.hidden) {
        tile.status = TILE_STATUS.marked;
      } else if (tile.status === TILE_STATUS.marked) {
        tile.status = TILE_STATUS.hidden;
      }
    });
  })
);

// Add "left click" event listener to every tile
boardTilesArray.forEach((row) =>
  row.forEach((tile) => {
    tile.tileElement.addEventListener("click", (e) => {
      if (tile.status === TILE_STATUS.hidden) {
        if (tile.mine === true) {
          tile.status = TILE_STATUS.mine;
        } else {
          const adjacentCells = getAdjacentCells(tile);
          if (adjacentCells.filter((tile) => tile.mine === true).length > 0) {
            tile.status = TILE_STATUS.number;
            tile.tileElement.textContent = adjacentCells.filter(
              (tile) => tile.mine === true
            ).length;
          } else {
            adjacentCells.forEach((adjacentCell) => revealTiles(adjacentCell));
          }
        }
      }
    });
  })
);

function revealTiles(tile) {
  if (tile.status === TILE_STATUS.hidden && tile.mine === false) {
    const otherAdjacentTiles = getAdjacentCells(tile);
    if (otherAdjacentTiles.filter((t) => t.mine === true).length === 0) {
      tile.status = TILE_STATUS.number;
      otherAdjacentTiles.forEach((inceptionTile) => revealTiles(inceptionTile));
    }
  }
}

function getAdjacentCells(tile) {
  const adjacentCellsArray = [];
  for (let x = tile.x - 1; x <= tile.x + 1; x++) {
    for (let y = tile.y - 1; y <= tile.y + 1; y++) {
      boardTilesArray.forEach((row) =>
        row.forEach((t) => {
          if (comparePositions(t, { x, y })) {
            adjacentCellsArray.push(t);
          }
        })
      );
    }
  }

  return adjacentCellsArray;
}
