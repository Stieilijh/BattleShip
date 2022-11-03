import Gameboard from "./Gameboard";

const GRAY = "rgb(211,211,211)";
const cpustr = "CPU";
const plstr = "PLAYER";
export default function (playerGameboard) {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "";
  contentDiv.style.display = "flex";
  contentDiv.style.justifyContent = "space-evenly";
  const cpuGameboardDiv = document.createElement("div");
  cpuGameboardDiv.id = "CPUGameBoardDiv";
  const plGameboardDiv = document.createElement("div");
  plGameboardDiv.id = "PLAYERGameBoardDiv";
  contentDiv.appendChild(cpuGameboardDiv);
  contentDiv.appendChild(plGameboardDiv);
  //create cpu gameboard
  let cpuGameboard = new Gameboard();
  cpuGameboard.placeShipsRandomly();
  setupGameboard(cpuGameboard, playerGameboard, cpustr);
  setupGameboard(playerGameboard, cpuGameboard, plstr);
}
const setupGameboard = (gameboard, opponentGameboard, str) => {
  const TOTALTILES = gameboard.getTotalTiles();
  const containerDiv = document.getElementById(str + "GameBoardDiv");
  //heading
  const headingDiv = document.createElement("div");
  headingDiv.id = str + "headingDiv";
  const heading = document.createElement("h2");
  heading.textContent = "Beat the " + str;
  headingDiv.appendChild(heading);
  //gameboard container
  const gameboardDiv = document.createElement("div");
  gameboardDiv.style.display = "grid";
  gameboardDiv.id = str + "gameboardDiv";
  gameboardDiv.style.width = "250px";
  gameboardDiv.style.height = "250px";
  gameboardDiv.style.gridTemplateColumns = "repeat(10,1fr)";
  gameboardDiv.style.border = "2px solid black";
  //Tiles
  for (let i = 0; i < TOTALTILES; i++) {
    const box = document.createElement("div");
    box.style.border = "1px solid black";
    box.id = str + "tile" + i;
    box.className = str + "tile";
    box.style.backgroundColor = GRAY;
    gameboardDiv.appendChild(box);
    box.addEventListener("click", () => {
      if (str == plstr) return;
      if (gameboard.getBoolBoard()[i]) return;
      console.log("player");
      gameboard.receiveAttack(i);
      repaintBoxs(gameboard, box.className);
      checkWinner(gameboard, plstr);
      let randTile = getRandomInt(0, 100);
      while (opponentGameboard.getBoolBoard()[randTile]) {
        randTile = getRandomInt(0, 100);
      }
      console.log("cpu");
      opponentGameboard.receiveAttack(randTile);
      const opponentStr = plstr + "tile";
      repaintBoxs(opponentGameboard, opponentStr);
      checkWinner(gameboard, cpustr);
    });
  }
  //containerDiv appends
  containerDiv.appendChild(headingDiv);
  containerDiv.appendChild(gameboardDiv);

  //functions
  const repaintBoxs = (gameboard, str) => {
    for (let i = 0; i < TOTALTILES; i++) {
      if (gameboard.getBoolBoard()[i]) {
        document.getElementById(str + i).style.backgroundColor =
          gameboard.getBoard()[i];
      }
    }
  };
};
const checkWinner = (gameboard) => {
  if (!gameboard.sunkShips.length == gameboard.MAX_LENGTH) return;
};
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
