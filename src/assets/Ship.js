const SIZE = 10;
export default class Ship {
  constructor(length, tileId, isVertical) {
    this.length = length;
    this.hits = 0;
    this.tileId = tileId;
    this.isVertical = isVertical;
    this.tiles = initialiseTiles(this.length, this.tileId, this.isVertical);
  }

  hit() {
    this.hits++;
  }
  getTiles() {
    return this.tiles;
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
const initialiseTiles = (len, tileId, isVertical) => {
  let arr = [];
  for (let i = 0; i < len; i++) {
    if (isVertical) {
      arr.push(parseInt(tileId + i * SIZE));
    } else {
      arr.push(parseInt(tileId + i));
    }
  }
  return arr;
};
