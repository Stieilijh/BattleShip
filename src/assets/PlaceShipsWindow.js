import Gameboard from "./Gameboard";
import Ship from "./Ship";
import MainGameScreen from "./MainGameScreen";

const GRAY = "rgb(211,211,211)";

export default function () {
  let isVertical = false;
  let gameboard = new Gameboard();
  const TOTALTILES = gameboard.getTotalTiles();
  //heading container
  const headingDiv = document.createElement("div");
  headingDiv.id = "headingDiv";
  const heading = document.createElement("h2");
  heading.textContent = "Place Your Ships";
  headingDiv.appendChild(heading);
  //gameboard container
  const gameboardDiv = document.createElement("div");
  gameboardDiv.style.display = "grid";
  gameboardDiv.id = "gameboardDiv";
  gameboardDiv.style.width = "300px";
  gameboardDiv.style.height = "300px";
  gameboardDiv.style.gridTemplateColumns = "repeat(10,1fr)";
  gameboardDiv.style.border = "2px solid black";
  //Tiles
  for (let i = 0; i < TOTALTILES; i++) {
    const box = document.createElement("div");
    box.style.border = "1px solid black";
    box.id = "tile" + i;
    box.className = "tiles";
    box.style.backgroundColor = GRAY;
    gameboardDiv.appendChild(box);
    box.addEventListener("click", () => {
      if (gameboard.allShips.length == gameboard.MAX_LENGTH) return;
      const ship = new Ship(currentShipLength(gameboard), i, isVertical);
      gameboard.placeShip(ship);
      repaintBoxs(gameboard.getBoard());
    });
  } //Orientation of ships btn
  const orientationOfShipsBtn = document.createElement("button");
  orientationOfShipsBtn.textContent = "Place Vertically";
  orientationOfShipsBtn.id = "orientationOfShipsBtn";
  orientationOfShipsBtn.addEventListener("click", () => {
    if (gameboard.isVertical) {
      gameboard.makeHorizontal();
      orientationOfShipsBtn.textContent = "Place Vertically";
    } else {
      gameboard.makeVertical();
      orientationOfShipsBtn.textContent = "Place Horizontally";
    }
    isVertical = gameboard.isVertical;
  });
  //reset button
  const resetBtn = document.createElement("button");
  resetBtn.id = "resetbtn";
  resetBtn.textContent = "Reset";
  resetBtn.addEventListener("click", () => {
    gameboard = new Gameboard();
    if (isVertical) {
      gameboard.makeVertical();
    }
    repaintBoxs(gameboard.getBoard());
  });
  //submit button
  const submitBtn = document.createElement("button");
  submitBtn.id = "submitbtn";
  submitBtn.textContent = "Submit the Ships";
  submitBtn.addEventListener("click", () => {
    if (gameboard.allShips.length == 5) {
      MainGameScreen(gameboard);
    } else {
      alert("Place all five ships!!");
    }
  });
  //content wrapper container
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "";
  contentDiv.style = null;
  contentDiv.appendChild(headingDiv);
  contentDiv.appendChild(orientationOfShipsBtn);
  contentDiv.appendChild(gameboardDiv);
  contentDiv.appendChild(resetBtn);
  contentDiv.appendChild(submitBtn);

  //functions
  const repaintBoxs = (board) => {
    for (let i = 0; i < TOTALTILES; i++) {
      document.getElementById("tile" + i).style.backgroundColor = board[i];
    }
  };

  const currentShipLength = (gameboard) => {
    let lenArr = [];
    for (let ship of gameboard.allShips) {
      lenArr.push(ship.getLength());
    }
    for (let i = 1; i < gameboard.MAX_LENGTH + 1; i++) {
      if (!lenArr.includes(i)) return i;
    }
    return false;
  };
}
