export class Ship {
  /**
   * @param {number} length
   */
  constructor(length) {
    if (length === undefined) throw new Error("Length should not empty!");
    if (length < 0) throw new Error("Length should not be negative!");
    if (length > 5) throw new Error("Length should not greater than five!");

    /** @type {number} */
    this.length = length;
    /** @type {number} */
    this.numberOfHits = 0;
    /** @type {boolean} */
    this.isAlive = true;
  }

  hit() {
    if (this.numberOfHits < this.length) this.numberOfHits += 1;
  }

  isSunk() {
    return this.length === this.numberOfHits;
  }
}
