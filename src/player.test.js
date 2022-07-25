import { Player } from "./player";

test("check players taking turns", () => {
  let player = new Player("Matt", "Player");
  let bot = new Player("R2D2", "bot");

  expect(player.turn).toBeTruthy();
  expect(bot.turn).toBeFalsy();

  player.playerAttack(bot, 2, 2);
  expect(player.turn).toBeFalsy();
});
