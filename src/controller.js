import { Ship } from "./ship";
import { Player } from "./player";
import "./style.css";

// This function needs to:
// record the score
// record whose turn it is
// record if ships are hit
// record if all ships are hit
// show who won
// restart on game end and restart button pressed

export const gameLogic = () => {
  const player = new Player("name", "player");
  const bot = new Player("robot", "bot");
  const placeShips = () => {
    for (let i = 0; i < 5; i++) {
      let playerShip = new Ship(i, "A");
      let botShip = new Ship(i, "bot");

      let index = Math.abs(player.board.grid.length - playerShip.length);

      player.board.placeShipHorizontal(
        playerShip,
        randomIntShipPosition(10),
        randomIntShipPosition(index)
      );
      bot.board.placeShipHorizontal(
        botShip,
        randomIntShipPosition(10),
        randomIntShipPosition(index)
      );
      player.fleet.push(playerShip);
      bot.fleet.push(botShip);
    }
    console.log(player.board);
    console.log(player.fleet);
    console.log(bot.board);
    console.log(bot.fleet);

    /*    for (let i = 1; i <= 5; i++) {
      let randomX = Math.floor(Math.random() * 10);
      let randomY = Math.floor(Math.random() * 10);
      
      console.log(randomX, randomY);



      /*  if (!player.board.isShipPlacementOutOfBounds(ship, randomX, randomY)) {
        player.board.placeShipHorizontal(ship, randomX, randomY);
      } */
  };
  console.log("s");
  const ships = placeShips();

  function randomIntShipPosition(maxIndex) {
    return Math.floor(Math.random() * maxIndex);
  }
};

gameLogic();
