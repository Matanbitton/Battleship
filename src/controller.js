import { Ship } from "./ship";
import { Player } from "./player";
import { domElements } from "./dom";
import "./style.css";

// This function needs to:
// record the score
// record whose turn it is
// record if ships are hit
// record if all ships are hit
// show who won
// restart on game end and restart button pressed

export const gameLogic = () => {
  const gameContainer = document.querySelector(".game");
  const player = new Player("name", "player");
  const bot = new Player("robot", "bot");
  let orientationHorizontal = true;

  const placeShips = () => {
    placeBotShips();
    placePlayerShips();
  };

  function placePlayerShips() {
    for (let i = 4; i >= 0; i--) {
      let playerShip = new Ship(i, "A");
      player.fleet.push(playerShip);
      let index = Math.abs(player.board.grid.length - playerShip.length); //highest index we can place a ship at

      let coordinates = getRandomCoors(
        playerShip,
        player,
        orientationHorizontal,
        index
      );
      console.log(coordinates);
      if (orientationHorizontal) {
        player.board.placeShipHorizontal(
          playerShip,
          coordinates.x,
          coordinates.y
        );
      } else {
        player.board.placeShipVertical(
          playerShip,
          coordinates.x,
          coordinates.y
        );
      }
      toggleShipOrientation();
    }
    let playerHtmlgrid = domElements();
    playerHtmlgrid = playerHtmlgrid.createGrids(player);
    gameContainer.append(playerHtmlgrid);
  }

  function placeBotShips() {
    for (let i = 4; i >= 0; i--) {
      let botShip = new Ship(i, "bot");
      bot.fleet.push(botShip);
      let index = Math.abs(bot.board.grid.length - botShip.length);
      let coordinates = getRandomCoors(
        botShip,
        bot,
        orientationHorizontal,
        index
      );
      if (orientationHorizontal) {
        bot.board.placeShipHorizontal(botShip, coordinates.x, coordinates.y);
      } else {
        bot.board.placeShipVertical(botShip, coordinates.x, coordinates.y);
      }
      toggleShipOrientation();
    }
    let botHtmlgrid = domElements();
    botHtmlgrid = botHtmlgrid.createGrids(bot);
    gameContainer.append(botHtmlgrid);
  }
  placeShips();

  function randomInt(maxIndex) {
    return Math.floor(Math.random() * maxIndex);
  }
  function toggleShipOrientation() {
    orientationHorizontal = orientationHorizontal === true ? false : true;
  }
  function getRandomCoors(ship, player, orientationHorizontal, index) {
    let xRandomCoor;
    let yRandomCoor;

    if (orientationHorizontal) {
      xRandomCoor = randomInt(10);
      yRandomCoor = randomInt(index);
    } else {
      xRandomCoor = randomInt(index);
      yRandomCoor = randomInt(10);
    }

    if (!player.board.shipPlacementTaken(ship, xRandomCoor, yRandomCoor)) {
      return { x: xRandomCoor, y: yRandomCoor };
    }
    let placing = false;

    while (!placing) {
      if (
        player.board.shipPlacementTaken(ship, xRandomCoor, yRandomCoor) &&
        orientationHorizontal
      ) {
        xRandomCoor = randomInt(10);
        yRandomCoor = randomInt(index);
      }
      if (
        player.board.shipPlacementTaken(ship, xRandomCoor, yRandomCoor) &&
        !orientationHorizontal
      ) {
        xRandomCoor = randomInt(index);
        yRandomCoor = randomInt(10);
      }
      if (
        (!player.board.shipPlacementTaken(ship, xRandomCoor, yRandomCoor) &&
          orientationHorizontal) ||
        (!player.board.shipPlacementTaken(ship, xRandomCoor, yRandomCoor) &&
          !orientationHorizontal)
      ) {
        placing = true;
        return { x: xRandomCoor, y: yRandomCoor };
      }
    }

    toggleShipOrientation();
  }
};

gameLogic();
