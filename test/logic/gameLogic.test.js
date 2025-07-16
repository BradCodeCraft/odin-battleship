import { Player } from "../../src/classes/Player";
import { Ship } from "../../src/classes/Ship";
import {
  generateRandomCoordinate,
  getWinner,
  isGameOver,
  setupPlayerBoard,
  ShipTypes,
} from "../../src/logic/gameLogic";

test("Should generate a random valid coordinate", () => {
  const coordinate = generateRandomCoordinate();

  expect(coordinate[0] >= 0 && coordinate[1] <= 9).toBe(true);
});

test("Should check if game is over", () => {
  const playerOne = new Player("A");
  const playerTwo = new Player("CPU");
  playerOne.gameboard.addShip(new Ship(ShipTypes["PATROL BOAT"]), [
    [8, 3],
    [8, 4],
  ]);
  playerTwo.gameboard.addShip(new Ship(ShipTypes["PATROL BOAT"]), [
    [8, 3],
    [8, 4],
  ]);

  expect(isGameOver(playerOne, playerTwo)).toBe(false);

  playerOne.gameboard.receiveAttack([8, 3]);
  playerOne.gameboard.receiveAttack([8, 4]);

  expect(isGameOver(playerOne, playerTwo)).toBe(true);
});

test("Should find winner when game is over", () => {
  const playerOne = new Player("A");
  const playerTwo = new Player("CPU");
  playerOne.gameboard.addShip(new Ship(ShipTypes["PATROL BOAT"]), [
    [8, 3],
    [8, 4],
  ]);
  playerTwo.gameboard.addShip(new Ship(ShipTypes["PATROL BOAT"]), [
    [8, 3],
    [8, 4],
  ]);

  playerOne.gameboard.receiveAttack([8, 3]);
  playerOne.gameboard.receiveAttack([8, 4]);

  expect(getWinner(playerOne, playerTwo)).toEqual(playerTwo);
});
