import { Ship } from "./ship";
import { GameBoard } from "./gameboard";

test("check if ship coordiantes are correct after placing", () => {
  let ship = new Ship(4, "A");
  let gameboard = new GameBoard();
  gameboard.placeShipHorizontal(ship, 0, 0);
  gameboard.placeShipVertical(ship, 0, 0);

  expect(gameboard.grid[0][5]).toEqual({
    shipId: undefined,
    shipPartIndex: undefined,
    hit: false,
  });
  expect(gameboard.grid[5][0]).toEqual({
    shipId: undefined,
    shipPartIndex: undefined,
    hit: false,
  });
  expect(gameboard.grid[0][0]).toEqual({
    shipId: "A",
    shipPartIndex: 4,
    hit: false,
  });
  expect(gameboard.grid[0][1]).toEqual({
    shipId: "A",
    shipPartIndex: 3,
    hit: false,
  });
  expect(gameboard.grid[0][2]).toEqual({
    shipId: "A",
    shipPartIndex: 2,
    hit: false,
  });
  expect(gameboard.grid[0][3]).toEqual({
    shipId: "A",
    shipPartIndex: 1,
    hit: false,
  });
});

test("Check is ship placement is out of bounds", () => {
  let ship = new Ship(3, "B");
  let gameboard = new GameBoard();

  expect(gameboard.isShipPlacementOutOfBounds(ship, 0, 7)).toBeFalsy();
  expect(gameboard.isShipPlacementOutOfBounds(ship, 7, 0)).toBeFalsy();
  expect(gameboard.isShipPlacementOutOfBounds(ship, 7, 7)).toBeFalsy();
  expect(gameboard.isShipPlacementOutOfBounds(ship, 0, 5)).toBeFalsy();
  expect(gameboard.isShipPlacementOutOfBounds(ship, 0, 2)).toBeFalsy();

  expect(gameboard.isShipPlacementOutOfBounds(ship, 0, 8)).toBeTruthy();
  expect(gameboard.isShipPlacementOutOfBounds(ship, 8, 8)).toBeTruthy();
  expect(gameboard.isShipPlacementOutOfBounds(ship, 0, 9)).toBeTruthy();
  expect(gameboard.isShipPlacementOutOfBounds(ship, 9, 2)).toBeTruthy();
});

test("Check if ship received Attack", () => {
  let ship = new Ship(4, "B");
  let gameboard = new GameBoard();
  gameboard.placeShipHorizontal(ship, 0, 0);

  expect(gameboard.receiveAttack(ship, 0, 0)).toBeTruthy();
  expect(gameboard.receiveAttack(ship, 0, 1)).toBeTruthy();
  expect(gameboard.receiveAttack(ship, 0, 2)).toBeTruthy();
  expect(gameboard.receiveAttack(ship, 0, 3)).toBeTruthy();

  expect(gameboard.receiveAttack(ship, 0, 4)).toBeFalsy();
});
