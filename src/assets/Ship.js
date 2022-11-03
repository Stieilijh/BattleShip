export default class Ship {
  constructor(length, tileId, isVertical) {
    this.length = length;
    this.hits = 0;
    this.tileId = tileId;
    this.isVertical = isVertical;
  }
  hit() {
    this.hits++;
  }
  getTileId() {
    return this.tileId;
  }
  isVertical() {
    return this.isVertical;
  }
  getLength() {
    return this.length;
  }
  hasSunk() {
    return this.length == this.hits;
  }
}
