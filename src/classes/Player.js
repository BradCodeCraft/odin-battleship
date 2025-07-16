import { Gameboard } from "../../src/classes/Gameboard";

export class Player {
  /**
   * @param {string} name
   */
  constructor(name) {
    if (name === undefined) throw new Error("Name is missing!");

    this.name = name;
    this.gameboard = new Gameboard();
  }
}
