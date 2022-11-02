import Ship from "./Ship";

const SIZE = 10;
const GRAY = "rgb(211,211,211)";
const GREEN = "#00FF00";
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
  isEmpty() {
    for (let i = 0; i < this.TOTALTILES; i++) {
      if (this.board[i] != GRAY) return false;
    }
    return true;
  }
}
