const SIZE = 10;

export default class Gameboard {
  constructor() {
    this.board = [];
    this.TOTALTILES = SIZE * SIZE;
    this.tileHitList = [];
    this.initiliseBoard();
  }
  initiliseBoard() {
    for (let i = 0; i < this.TOTALTILES; i++) {
      this.board[i] = " ";
      this.tileHitList[i] = false;
    }
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

  isEmpty() {
    for (let i = 0; i < this.TOTALTILES; i++) {
      if (this.board != " ") return false;
    }
    return true;
  }
}
