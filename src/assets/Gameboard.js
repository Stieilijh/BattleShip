import Ship from "./Ship";

const SIZE = 10;
const GRAY = "rgb(211,211,211)";
const GREEN = "rgb(0,255,0)";
const RED = "rgb(255,0,0)";

export default class Gameboard {
  constructor() {
    this.board = [];
    this.TOTALTILES = SIZE * SIZE;
    this.tileHitList = [];
    this.initiliseBoard();
    this.MAX_LENGTH = 5;
    this.isVertical = false;
    this.allShips = [];
    this.sunkShips = [];
  }
  initiliseBoard() {
    for (let i = 0; i < this.TOTALTILES; i++) {
      this.board[i] = GRAY;
      this.tileHitList[i] = false;
    }
  }
  makeVertical() {
    this.isVertical = true;
  }
  makeHorizontal() {
    this.isVertical = false;
  }
  getBoard() {
    return this.board;
  }
  getTotalTiles() {
    return this.TOTALTILES;
  }
  getBoolBoard() {
    return this.tileHitList;
  }
  isFirstColumn(n) {
    if (n % 10 == 0) return true;
    return false;
  }
  canShipBePlaced(len, tileId) {
    for (let i = 0; i < len; i++) {
      if (this.isVertical) {
        if (tileId + SIZE > this.TOTALTILES) return false;
        if (this.board[tileId + SIZE * i] != GRAY) return false;
      } else {
        if (tileId + i > this.TOTALTILES) return false;
        if (this.board[tileId + i] != GRAY) return false;
        if (i > 0 && this.isFirstColumn(tileId + i)) return false;
      }
    }
    return true;
  }
  placeShip(ship) {
    const len = ship.getLength();
    const tileId = ship.getTileId();
    if (!this.canShipBePlaced(len, tileId)) {
      return;
    }
    if (this.isVertical) {
      for (let i = 0; i < len; i++) {
        this.board[tileId + i * SIZE] = RED;
      }
    } else {
      for (let i = 0; i < len; i++) {
        this.board[tileId + i] = RED;
      }
    }
    this.allShips.push(ship);
  }
  placeShipsRandomly() {
    let randTile = getRandomInt(0, 100);
    let randbool = true;
    this.isVertical = randbool;
    while (this.allShips.length < this.MAX_LENGTH) {
      this.isVertical = randbool;
      const ship = new Ship(this.allShips.length + 1, randTile, randbool);
      this.placeShip(ship);
      randbool = !randbool;
      randTile = getRandomInt(0, 100);
    }
  }
  receiveAttack(tileId) {
    if (this.getBoolBoard()[tileId]) return;
    this.tileHitList[tileId] = true;
    const allShipsTileIds = findTheNonEmptyTiles(this.allShips);
    if (!allShipsTileIds.includes(parseInt(tileId))) {
      this.board[tileId] = GREEN;
      return;
    }
    const hitShip = findShip(this.allShips, tileId);
    hitShip.hit();
    if (hitShip.hasSunk()) {
      this.sunkShips.push(hitShip);
    }
  }
  isEmpty() {
    for (let i = 0; i < this.TOTALTILES; i++) {
      if (this.board[i] != GRAY) return false;
    }
    return true;
  }
}
const findTheNonEmptyTiles = (ships) => {
  let arr = [];
  for (let ship of ships) {
    arr.push(...ship.getTiles());
  }
  return arr;
};
const findShip = (ships, tileId) => {
  for (let ship of ships) {
    if (ship.getTiles().includes(parseInt(tileId))) {
      return ship;
    }
  }
  throw new Error("Ship does'nt exist but the tile is not empty");
};
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
