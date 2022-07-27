export class GameBoard {
  constructor() {
    this.grid = this.createGrid();
    this.missedShots = [];
  }

  getMissedShots() {
    return this.missedShots;
  }
  addMissedShots(x, y) {
    this.missedShots.push({ coorX: x, coorY: y });
  }

  createGrid() {
    let tempGrid = [];
    let tempArray = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        tempArray.push({
          ship: undefined,
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
      for (let j = 0; j < this.grid.length; j++) {
        if (i === x && j === y) {
          let shipLength = ship.length;
          while (j < this.grid.length && shipLength >= 0) {
            this.grid[i][j] = {
              ship: ship,
              shipPartIndex: shipLength,
              hit: false,
            };
            j++;
            shipLength--;
          }
        }
      }
    }
  };
  checkIfAllShipsSunk(...ships) {
    const sunkenShips = ships.filter((ship) => ship.isSunk() === true);
    if (sunkenShips.length == ships.length) {
      return true;
    }

    return false;
  }

  placeShipVertical = (ship, x, y) => {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid.length; j++) {
        if (i === x && j == y) {
          let shipLength = ship.length;
          while (i < this.grid.length && shipLength >= 0) {
            this.grid[i][j] = {
              ship: ship,
              shipPartIndex: shipLength,
              hit: false,
            };
            i++;
            shipLength--;
          }
        }
      }
    }
  };

  shipPlacementTaken(ship, x, y) {
    for (let i = x; i < x + ship.length; i++) {
      for (let j = y; j < y + ship.length; j++) {
        if (this.grid[x][y].ship !== undefined) {
          return true;
        }
      }
    }
    return false;
  }

  receiveAttack(x, y) {
    if (this.grid[x][y].ship !== undefined) {
      this.grid[x][y].hit = true;

      this.grid[x][y].ship.hitPos(this.grid[x][y].shipPartIndex);
      return true;
    }
    this.addMissedShots(x, y);
    return false;
  }
}
