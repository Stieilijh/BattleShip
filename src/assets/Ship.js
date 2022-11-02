const MAX_LENGTH = 4;
const MIN_LENGTH = 1;

export default class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
  }
  hit() {
    this.hits++;
  }
  get hasSunk() {
    return this.length == this.hits;
  }
}
