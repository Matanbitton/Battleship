import { Player } from "./player";

export function randomInt(maxIndex) {
  return Math.floor(Math.random() * maxIndex);
}

export function toggleShipOrientation(orientation) {
  orientation = orientation === true ? false : true;
  return orientation;
}

export function botAttackRandom(player) {
  player.board.receiveAttack(randomInt(10), randomInt(10));
  console.log(player.board.grid);
}
