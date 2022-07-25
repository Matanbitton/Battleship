export class GameBoard {
  constructor() {
    this.grid = this.createGrid();
    this.missedShots = [];
  }

  getMissedShots() {
    return this.missedShots;
  }

  createGrid() {
    let tempGrid = [];
    let tempArray = [];
    for (let i = 0; i <= 10; i++) {
      for (let j = 0; j <= 10; j++) {
        tempArray.push({
          shipId: undefined,
          shipPartIndex: undefined,
          hit: false,
        });
      }
      tempGrid.push(tempArray);
      tempArray = [];
    }
    return tempGrid;
  }

  placeShipHorizontal = (ship, x, y) => {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (i === x && j === y) {
          while (ship.length - j > 0) {
            this.grid[i][j] = {
              shipId: ship.shipID,
              shipPartIndex: Math.abs(ship.length - j),
              hit: false,
            };
            j++;
          }
        }
      }
    }
  };
  checkIfAllShipsSunk(...ships) {
    const sunkenShips = ships.filter((ship) => ship.isSunk() == true);
    if (sunkenShips.length == ships.length) {
      return true;
    }

    return false;
  }

  placeShipVertical = (ship, x, y) => {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (i === x && j == y) {
          while (i - ship.length > 0) {
            this.grid[i][j] = {
              shipId: ship.shipID,
              shipPartIndex: Math.abs(ship.length - i),
              hit: false,
            };
            i++;
          }
        }
      }
    }
  };

  isShipPlacementOutOfBounds(ship, x, y) {
    if (
      x > 10 ||
      x < 0 ||
      y > 10 ||
      y < 0 ||
      y + ship.length > 10 ||
      x + ship.length > 10
    ) {
      return true;
    } else {
      for (let i = x; i < x + ship.length; i++) {
        for (let j = y; j < y + ship.length; j++) {
          if (
            this.grid[x][i].shipId !== undefined ||
            this.grid[y][j].shipId !== undefined
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }
  receiveAttack(ship, x, y) {
    if (this.grid[x][y].shipId !== undefined) {
      this.grid[x][y].hit = true;
      ship.hitPos(this.grid[x][y].shipPartIndex);
      return true;
    }
    return false;
  }
}
