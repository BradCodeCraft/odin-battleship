import { Ship } from "./Ship";

export class Gameboard {
  constructor() {
    /** @type {any[][]}*/
    this.board = [
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ];
  }

  /**
   * @param {number[]} coordinate
   *
   * @returns {boolean}
   */
  #isCoordinateValid(coordinate) {
    const [x, y] = coordinate;
    if (x < 0 || x > 9 || y < 0 || y > 9) return false;
    return true;
  }

  /**
   * @param {number[][]} coordinates
   *
   * @returns {boolean}
   */
  #areCoordinatesAvailable(coordinates) {
    for (const coordinate of coordinates) {
      const [x, y] = coordinate;
      if (this.board[x][y] !== null) return false;
    }
    return true;
  }

  /**
   * @param {number[][]} coordinates
   *
   * @returns {boolean}
   */
  #areCoordinatesValid(coordinates) {
    for (const coordinate of coordinates) {
      if (!this.#isCoordinateValid(coordinate)) return false;
    }
    for (let i = 1; i < coordinates.length; i++) {
      const [previousX, previousY] = coordinates[i - 1];
      const [currentX, currentY] = coordinates[i];
      if (currentY - previousY + (currentX - previousX) !== 1) return false;
    }
    return true;
  }

  /**
   * @param {Ship} ship
   * @param {number[][]} coordinates
   */
  addShip(ship, coordinates) {
    if (!this.#areCoordinatesValid(coordinates))
      throw new Error("Coordinates invalid!");
    if (!this.#areCoordinatesAvailable(coordinates))
      throw new Error("Coordinates occupied!");

    for (const coordinate of coordinates) {
      const [x, y] = coordinate;
      this.board[x][y] = ship;
    }
  }

  /**
   * @param {number[]} coordinate
   */
  receiveAttack(coordinate) {
    if (!this.#isCoordinateValid(coordinate))
      throw new Error("Coordinate invalid!");

    const [x, y] = coordinate;
    const cellValue = this.board[x][y];

    if (cellValue === null) {
      this.board[x][y] = 0;
    } else if (typeof cellValue === "object") {
      /** @type {Ship} */
      const ship = this.board[x][y];
      ship.hit();
      this.board[x][y] = 1;
    }
  }

  /**
   * @returns {boolean}
   */
  areAllShipsSunk() {
    let copiedBoard = this.board;
    for (let row of copiedBoard) {
      row = row.filter((value) => value === null || value === 0 || value === 1);
      if (row.length < 10) return false;
    }
    return true;
  }
}
