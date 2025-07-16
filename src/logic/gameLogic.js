import { Gameboard } from "../classes/Gameboard";
import { Player } from "../classes/Player";
import { Ship } from "../classes/Ship";

export const ShipTypes = {
  CARRIER: 5,
  BATTLESHIP: 4,
  DESTROYER: 3,
  SUBMARINE: 3,
  "PATROL BOAT": 2,
};

/**
 * @param {Player} player
 */
export function setupPlayerBoard(player) {
  player.gameboard.addShip(new Ship(ShipTypes.CARRIER), [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ]);
  player.gameboard.addShip(new Ship(ShipTypes.BATTLESHIP), [
    [2, 1],
    [2, 2],
    [2, 3],
    [2, 4],
  ]);
  player.gameboard.addShip(new Ship(ShipTypes.DESTROYER), [
    [4, 2],
    [4, 3],
    [4, 4],
  ]);
  player.gameboard.addShip(new Ship(ShipTypes.SUBMARINE), [
    [6, 2],
    [6, 3],
    [6, 4],
  ]);
  player.gameboard.addShip(new Ship(ShipTypes["PATROL BOAT"]), [
    [8, 3],
    [8, 4],
  ]);
}

/**
 * @param {Player} playerOne
 * @param {Player} playerTwo
 */
export function resetGame(playerOne, playerTwo) {
  playerOne.gameboard = new Gameboard();
  playerTwo.gameboard = new Gameboard();

  setupPlayerBoard(playerOne);
  setupPlayerBoard(playerTwo);
}

/**
 * @returns {number[]}
 */
export function generateRandomCoordinate() {
  return [Math.floor(Math.random() * 9), Math.floor(Math.random() * 9)];
}

/**
 * @param {Player} playerOne
 * @param {Player} playerTwo
 *
 * @returns {boolean}
 */
export function isGameOver(playerOne, playerTwo) {
  return (
    playerOne.gameboard.areAllShipsSunk() ||
    playerTwo.gameboard.areAllShipsSunk()
  );
}

/**
 * @param {Player} playerOne
 * @param {Player} playerTwo
 *
 * @returns {Player}
 */
export function getWinner(playerOne, playerTwo) {
  return playerOne.gameboard.areAllShipsSunk() ? playerTwo : playerOne;
}
