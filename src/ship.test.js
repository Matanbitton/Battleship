import { Ship } from "./ship";

test("check if ship was created correctly", () => {
  expect(Ship(3, 0)).toBeDefined();
  expect(Ship(4, 0).shipParts.length).toBe(4);
});

test("check if ship is sunk", () => {
  let ship = Ship(3, 0);
  ship.hitPos(0);
  expect(ship.isSunk()).toBeFalsy();
  ship.hitPos(1);
  expect(ship.isSunk()).toBeFalsy();

  ship.hitPos(2);
  expect(ship.isSunk()).toBeTruthy();
});
