import Gameboard from "../assets/Gameboard";
let board = new Gameboard();
test("BoolBoard size is 100 when created", () => {
  expect(board.getBoolBoard().length).toBe(board.getTotalTiles());
});
test("Gameboard size is 100 when created", () => {
  expect(board.getBoard().length).toBe(board.getTotalTiles());
});
