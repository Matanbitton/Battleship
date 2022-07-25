import { GameBoard } from "./gameboard";
export class Player {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.board = new GameBoard();
    this.turn = this.type === "bot" ? false : true;
  }

  changeTurn = () => {
    this.turn = this.turn === true ? false : true;
  };

  playerAttack(opponent, x, y) {
    opponent.board.receiveAttack(null, x, y);
    this.changeTurn();
  }
}
