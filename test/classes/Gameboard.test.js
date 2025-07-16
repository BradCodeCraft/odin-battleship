import { Gameboard } from "../../src/classes/Gameboard";
import { Ship } from "../../src/classes/Ship";

test("Should be able to construct a Gameboard entity", () => {
  expect(() => new Gameboard()).not.toThrow(Error);
});

test("Should create a Gameboard entity", () => {
  expect(new Gameboard().board).toEqual(
    new Array(10).fill(new Array(10).fill(null)),
  );
});

test("Should be able to call addShip method", () => {
  const gameboard = new Gameboard();
  expect(() =>
    gameboard.addShip(new Ship(4), [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ]),
  ).not.toThrow(Error);
});

test("Should place Ship at specific coordinates", () => {
  const gameboard = new Gameboard();
  gameboard.addShip(new Ship(4), [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ]);

  expect(gameboard.board[0][0]).toEqual(new Ship(4));
  expect(gameboard.board[0][1]).toEqual(new Ship(4));
  expect(gameboard.board[0][2]).toEqual(new Ship(4));
  expect(gameboard.board[0][3]).toEqual(new Ship(4));
});

test("Should not place two Ship entities at same coordinates", () => {
  const gameboard = new Gameboard();
  gameboard.addShip(new Ship(4), [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ]);

  expect(() =>
    gameboard.addShip(new Ship(5), [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
    ]),
  ).toThrow("Coordinates occupied!");
});

test("Should not place Ship at invalid coordinates", () => {
  const gameboard = new Gameboard();

  expect(() =>
    gameboard.addShip(new Ship(4), [
      [0, -1],
      [0, 0],
      [0, 1],
      [0, 2],
    ]),
  ).toThrow("Coordinates invalid!");
  expect(() =>
    gameboard.addShip(new Ship(4), [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 4],
    ]),
  ).toThrow("Coordinates invalid!");
});

test("Should be able to call receiveAttack method", () => {
  const gameboard = new Gameboard();

  expect(() => gameboard.receiveAttack([0, 0])).not.toThrow(Error);
});

test("Should handle receiveAttack method", () => {
  const gameboard = new Gameboard();
  const battleship = new Ship(4);
  gameboard.addShip(battleship, [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ]);
  gameboard.receiveAttack([0, 0]);
  gameboard.receiveAttack([1, 0]);

  expect(battleship.numberOfHits).toBe(1);
  expect(gameboard.board[0][0]).toBe(1);
  expect(gameboard.board[1][0]).toBe(0);
});

test("Should not attack on invalid coordinate", () => {
  const gameboard = new Gameboard();

  expect(() => gameboard.receiveAttack([0, -1])).toThrow("Coordinate invalid!");
});

test("Should be able to call areAllShipsSunk method", () => {
  const gameboard = new Gameboard();

  expect(() => gameboard.areAllShipsSunk()).not.toThrow(Error);
});

test("Should report all ships have been sunk or not", () => {
  const gameboard = new Gameboard();
  gameboard.addShip(new Ship(4), [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ]);

  expect(gameboard.areAllShipsSunk()).toBe(false);

  gameboard.receiveAttack([0, 0]);
  gameboard.receiveAttack([0, 1]);
  gameboard.receiveAttack([0, 2]);
  gameboard.receiveAttack([0, 3]);

  expect(gameboard.areAllShipsSunk()).toBe(true);
});
