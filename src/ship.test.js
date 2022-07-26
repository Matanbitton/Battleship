import { Ship } from "./ship";

test("check if ship was created correctly", () => {
  let ship = new Ship(3, "A");

  expect(ship).toBeDefined();
  expect(ship.shipParts.length).toBe(4); // beacuse of array index starting at 0
});

test("check if ship is sunk", () => {
  let ship = new Ship(3);
  ship.hitPos(0);
  expect(ship.isSunk()).toBeFalsy();
  ship.hitPos(1);
  expect(ship.isSunk()).toBeFalsy();
  ship.hitPos(2);
  expect(ship.isSunk()).toBeTruthy();
});

test("check if ship parts are hit", () => {
  let ship = new Ship(3);
  ship.hitPos(0);
  ship.hitPos(1);
  ship.hitPos(2);

  expect(ship.shipParts[0].hit).toBeTruthy();
  expect(ship.shipParts[1].hit).toBeTruthy();
  expect(ship.shipParts[2].hit).toBeTruthy();
});
