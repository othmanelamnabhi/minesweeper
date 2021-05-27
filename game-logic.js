/* Variables */
export const TILE_STATUS = {
  hidden: "hidden",
  mine: "mine",
  number: "number",
  marked: "marked",
};

/* Create board tiles */
export const boardTilesArray = [];
export function createTilesArray(boardSize) {
  for (let x = 1; x <= 10; x++) {
    const row = [];
    for (let y = 1; y <= 10; y++) {
      const tileElement = document.createElement("div");
      tileElement.dataset.status = TILE_STATUS.hidden;
      const tileObject = {
        x,
        y,
        tileElement,
        mine: false,
        get status() {
          return this.tileElement.dataset.status;
        },
        set status(value) {
          this.tileElement.dataset.status = value;
        },
      };
      row.push(tileObject);
    }
    boardTilesArray.push(row);
  }
}

/* function to generate mine locations on the board */
export function generateMines(numberOfMines, boardSize) {
  // while loop until you reach the number of mines
  const minePositions = [];
  while (minePositions.length < numberOfMines) {
    const position = {
      x: getRandomIntInclusive(boardSize),
      y: getRandomIntInclusive(boardSize),
    };
    if (
      !minePositions.some((p) => {
        comparePositions(p, position);
      })
    ) {
      minePositions.push(position);
    }
  }
  return minePositions;
}

/* function to generate random integers to use for mine locations */
function getRandomIntInclusive(boardSize) {
  const min = 1;
  const max = Math.floor(boardSize);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/* function to compare X and Y positions */
export function comparePositions(a, b) {
  return a.x === b.x && a.y === b.y;
}
