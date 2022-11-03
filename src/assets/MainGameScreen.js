const GRAY = "rgb(211,211,211)";
export default function (playerGameboard) {
  setupCpuGameboard(playerGameboard);
}
const setupCpuGameboard = (playerGameboard) => {
  const TOTALTILES = playerGameboard.getTotalTiles();
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "";
  //heading container
  const headingDiv = document.createElement("div");
  headingDiv.id = "headingDiv";
  const heading = document.createElement("h2");
  heading.textContent = "BattleShip";
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
    box.id = "CPUtile" + i;
    box.className = "CPUtile";
    box.style.backgroundColor = GRAY;
    gameboardDiv.appendChild(box);
    box.addEventListener("click", () => {
      playerGameboard.receiveAttack(i);
      repaintBoxs(playerGameboard, box.className);
    });
  }
  //contentDiv appends
  contentDiv.appendChild(heading);
  contentDiv.appendChild(gameboardDiv);
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
