/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/Gameboard.js":
/*!*********************************!*\
  !*** ./src/assets/Gameboard.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Gameboard)\n/* harmony export */ });\n/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ \"./src/assets/Ship.js\");\n\n\nconst SIZE = 10;\nconst GRAY = \"rgb(211,211,211)\";\nconst GREEN = \"rgb(0,255,0)\";\nconst RED = \"rgb(255,0,0)\";\n\nclass Gameboard {\n  constructor() {\n    this.board = [];\n    this.TOTALTILES = SIZE * SIZE;\n    this.tileHitList = [];\n    this.initiliseBoard();\n    this.MAX_LENGTH = 5;\n    this.isVertical = false;\n    this.allShips = [];\n    this.sunkShips = [];\n  }\n  initiliseBoard() {\n    for (let i = 0; i < this.TOTALTILES; i++) {\n      this.board[i] = GRAY;\n      this.tileHitList[i] = false;\n    }\n  }\n  makeVertical() {\n    this.isVertical = true;\n  }\n  makeHorizontal() {\n    this.isVertical = false;\n  }\n  getBoard() {\n    return this.board;\n  }\n  getTotalTiles() {\n    return this.TOTALTILES;\n  }\n  getBoolBoard() {\n    return this.tileHitList;\n  }\n  isFirstColumn(n) {\n    if (n % 10 == 0) return true;\n    return false;\n  }\n  canShipBePlaced(len, tileId) {\n    for (let i = 0; i < len; i++) {\n      if (this.isVertical) {\n        if (tileId + SIZE > this.TOTALTILES) return false;\n        if (this.board[tileId + SIZE * i] != GRAY) return false;\n      } else {\n        if (tileId + i > this.TOTALTILES) return false;\n        if (this.board[tileId + i] != GRAY) return false;\n        if (i > 0 && this.isFirstColumn(tileId + i)) return false;\n      }\n    }\n    return true;\n  }\n  placeShip(ship) {\n    const len = ship.getLength();\n    const tileId = ship.getTileId();\n    if (!this.canShipBePlaced(len, tileId)) {\n      return;\n    }\n    if (this.isVertical) {\n      for (let i = 0; i < len; i++) {\n        this.board[tileId + i * SIZE] = RED;\n      }\n    } else {\n      for (let i = 0; i < len; i++) {\n        this.board[tileId + i] = RED;\n      }\n    }\n    this.allShips.push(ship);\n  }\n  placeShipsRandomly() {\n    let randTile = getRandomInt(0, 100);\n    let randbool = true;\n    this.isVertical = randbool;\n    while (this.allShips.length < this.MAX_LENGTH) {\n      this.isVertical = randbool;\n      const ship = new _Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.allShips.length + 1, randTile, randbool);\n      this.placeShip(ship);\n      randbool = !randbool;\n      randTile = getRandomInt(0, 100);\n    }\n  }\n  receiveAttack(tileId) {\n    if (this.getBoolBoard()[tileId]) return;\n    this.tileHitList[tileId] = true;\n    const allShipsTileIds = findTheNonEmptyTiles(this.allShips);\n    if (!allShipsTileIds.includes(parseInt(tileId))) {\n      this.board[tileId] = GREEN;\n      return;\n    }\n    const hitShip = findShip(this.allShips, tileId);\n    hitShip.hit();\n    if (hitShip.hasSunk()) {\n      this.sunkShips.push(hitShip);\n    }\n  }\n  isEmpty() {\n    for (let i = 0; i < this.TOTALTILES; i++) {\n      if (this.board[i] != GRAY) return false;\n    }\n    return true;\n  }\n}\nconst findTheNonEmptyTiles = (ships) => {\n  let arr = [];\n  for (let ship of ships) {\n    arr.push(...ship.getTiles());\n  }\n  return arr;\n};\nconst findShip = (ships, tileId) => {\n  for (let ship of ships) {\n    if (ship.getTiles().includes(parseInt(tileId))) {\n      return ship;\n    }\n  }\n  throw new Error(\"Ship does'nt exist but the tile is not empty\");\n};\nfunction getRandomInt(min, max) {\n  min = Math.ceil(min);\n  max = Math.floor(max);\n  return Math.floor(Math.random() * (max - min) + min);\n}\n\n\n//# sourceURL=webpack://battleship/./src/assets/Gameboard.js?");

/***/ }),

/***/ "./src/assets/MainGameScreen.js":
/*!**************************************!*\
  !*** ./src/assets/MainGameScreen.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gameboard */ \"./src/assets/Gameboard.js\");\n/* harmony import */ var _PlaceShipsWindow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PlaceShipsWindow */ \"./src/assets/PlaceShipsWindow.js\");\n\n\n\nconst GRAY = \"rgb(211,211,211)\";\nconst cpustr = \"CPU\";\nconst plstr = \"PLAYER\";\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(playerGameboard) {\n  const contentDiv = document.getElementById(\"content\");\n  contentDiv.innerHTML = \"\";\n  contentDiv.style.display = \"flex\";\n  contentDiv.style.justifyContent = \"space-evenly\";\n  const cpuGameboardDiv = document.createElement(\"div\");\n  cpuGameboardDiv.id = \"CPUGameBoardDiv\";\n  const plGameboardDiv = document.createElement(\"div\");\n  plGameboardDiv.id = \"PLAYERGameBoardDiv\";\n  contentDiv.appendChild(cpuGameboardDiv);\n  contentDiv.appendChild(plGameboardDiv);\n  //create cpu gameboard\n  let cpuGameboard = new _Gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  cpuGameboard.placeShipsRandomly();\n  setupGameboard(cpuGameboard, playerGameboard, cpustr);\n  setupGameboard(playerGameboard, cpuGameboard, plstr);\n}\nconst setupGameboard = (gameboard, opponentGameboard, str) => {\n  const TOTALTILES = gameboard.getTotalTiles();\n  const containerDiv = document.getElementById(str + \"GameBoardDiv\");\n  //heading\n  const headingDiv = document.createElement(\"div\");\n  headingDiv.id = str + \"headingDiv\";\n  const heading = document.createElement(\"h2\");\n  heading.textContent = \"Beat the \" + str;\n  headingDiv.appendChild(heading);\n  //ships remianing text\n  const textDiv = document.createElement(\"h5\");\n  textDiv.id = str + \"textDiv\";\n  textDiv.textContent = \"Remaining Ships : \" + noOfShipsRemaining(gameboard);\n  headingDiv.appendChild(textDiv);\n  //gameboard container\n  const gameboardDiv = document.createElement(\"div\");\n  gameboardDiv.style.display = \"grid\";\n  gameboardDiv.id = str + \"gameboardDiv\";\n  gameboardDiv.style.width = \"250px\";\n  gameboardDiv.style.height = \"250px\";\n  gameboardDiv.style.gridTemplateColumns = \"repeat(10,1fr)\";\n  gameboardDiv.style.border = \"2px solid black\";\n  //Tiles\n  for (let i = 0; i < TOTALTILES; i++) {\n    const box = document.createElement(\"div\");\n    box.style.border = \"1px solid black\";\n    box.id = str + \"tile\" + i;\n    box.className = str + \"tile\";\n    box.style.backgroundColor = GRAY;\n    gameboardDiv.appendChild(box);\n    box.addEventListener(\"click\", () => {\n      if (str == plstr) return;\n      if (gameboard.getBoolBoard()[i]) return;\n      gameboard.receiveAttack(i);\n      repaintBoxs(gameboard, str);\n      if (parseInt(noOfShipsRemaining(gameboard)) == 0) {\n        alert(\"Player Wins!! Play Again!!\");\n        (0,_PlaceShipsWindow__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n      }\n      let randTile = getRandomInt(0, 100);\n      while (opponentGameboard.getBoolBoard()[randTile]) {\n        randTile = getRandomInt(0, 100);\n      }\n      opponentGameboard.receiveAttack(randTile);\n      repaintBoxs(opponentGameboard, plstr);\n      if (parseInt(noOfShipsRemaining(opponentGameboard)) == 0) {\n        alert(\"Cpu wins!! Play Again!!\");\n        (0,_PlaceShipsWindow__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n      }\n    });\n  }\n  //containerDiv appends\n  containerDiv.appendChild(headingDiv);\n  containerDiv.appendChild(gameboardDiv);\n\n  //functions\n  const repaintBoxs = (gameboard, str) => {\n    for (let i = 0; i < TOTALTILES; i++) {\n      if (gameboard.getBoolBoard()[i]) {\n        document.getElementById(str + \"tile\" + i).style.backgroundColor =\n          gameboard.getBoard()[i];\n      }\n    }\n    //change the text\n    document.getElementById(str + \"textDiv\").textContent =\n      \"Remaining Ships : \" + noOfShipsRemaining(gameboard);\n  };\n};\nconst getRandomInt = (min, max) => {\n  min = Math.ceil(min);\n  max = Math.floor(max);\n  return Math.floor(Math.random() * (max - min) + min);\n};\nconst noOfShipsRemaining = (gameboard) => {\n  return gameboard.allShips.length - gameboard.sunkShips.length;\n};\n\n\n//# sourceURL=webpack://battleship/./src/assets/MainGameScreen.js?");

/***/ }),

/***/ "./src/assets/PlaceShipsWindow.js":
/*!****************************************!*\
  !*** ./src/assets/PlaceShipsWindow.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gameboard */ \"./src/assets/Gameboard.js\");\n/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ship */ \"./src/assets/Ship.js\");\n/* harmony import */ var _MainGameScreen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MainGameScreen */ \"./src/assets/MainGameScreen.js\");\n\n\n\n\nconst GRAY = \"rgb(211,211,211)\";\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\n  let isVertical = false;\n  let gameboard = new _Gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  const TOTALTILES = gameboard.getTotalTiles();\n  //heading container\n  const headingDiv = document.createElement(\"div\");\n  headingDiv.id = \"headingDiv\";\n  const heading = document.createElement(\"h2\");\n  heading.textContent = \"Place Your Ships\";\n  headingDiv.appendChild(heading);\n  //gameboard container\n  const gameboardDiv = document.createElement(\"div\");\n  gameboardDiv.style.display = \"grid\";\n  gameboardDiv.id = \"gameboardDiv\";\n  gameboardDiv.style.width = \"300px\";\n  gameboardDiv.style.height = \"300px\";\n  gameboardDiv.style.gridTemplateColumns = \"repeat(10,1fr)\";\n  gameboardDiv.style.border = \"2px solid black\";\n  //Tiles\n  for (let i = 0; i < TOTALTILES; i++) {\n    const box = document.createElement(\"div\");\n    box.style.border = \"1px solid black\";\n    box.id = \"tile\" + i;\n    box.className = \"tiles\";\n    box.style.backgroundColor = GRAY;\n    gameboardDiv.appendChild(box);\n    box.addEventListener(\"click\", () => {\n      if (gameboard.allShips.length == gameboard.MAX_LENGTH) return;\n      const ship = new _Ship__WEBPACK_IMPORTED_MODULE_1__[\"default\"](currentShipLength(gameboard), i, isVertical);\n      gameboard.placeShip(ship);\n      repaintBoxs(gameboard.getBoard());\n    });\n  } //Orientation of ships btn\n  const orientationOfShipsBtn = document.createElement(\"button\");\n  orientationOfShipsBtn.textContent = \"Place Vertically\";\n  orientationOfShipsBtn.id = \"orientationOfShipsBtn\";\n  orientationOfShipsBtn.addEventListener(\"click\", () => {\n    if (gameboard.isVertical) {\n      gameboard.makeHorizontal();\n      orientationOfShipsBtn.textContent = \"Place Vertically\";\n    } else {\n      gameboard.makeVertical();\n      orientationOfShipsBtn.textContent = \"Place Horizontally\";\n    }\n    isVertical = gameboard.isVertical;\n  });\n  //reset button\n  const resetBtn = document.createElement(\"button\");\n  resetBtn.id = \"resetbtn\";\n  resetBtn.textContent = \"Reset\";\n  resetBtn.addEventListener(\"click\", () => {\n    gameboard = new _Gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    if (isVertical) {\n      gameboard.makeVertical();\n    }\n    repaintBoxs(gameboard.getBoard());\n  });\n  //submit button\n  const submitBtn = document.createElement(\"button\");\n  submitBtn.id = \"submitbtn\";\n  submitBtn.textContent = \"Submit the Ships\";\n  submitBtn.addEventListener(\"click\", () => {\n    if (gameboard.allShips.length == 5) {\n      (0,_MainGameScreen__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(gameboard);\n    } else {\n      alert(\"Place all five ships!!\");\n    }\n  });\n  //content wrapper container\n  const contentDiv = document.getElementById(\"content\");\n  contentDiv.innerHTML = \"\";\n  contentDiv.style = null;\n  contentDiv.appendChild(headingDiv);\n  contentDiv.appendChild(orientationOfShipsBtn);\n  contentDiv.appendChild(gameboardDiv);\n  contentDiv.appendChild(resetBtn);\n  contentDiv.appendChild(submitBtn);\n\n  //functions\n  const repaintBoxs = (board) => {\n    for (let i = 0; i < TOTALTILES; i++) {\n      document.getElementById(\"tile\" + i).style.backgroundColor = board[i];\n    }\n  };\n\n  const currentShipLength = (gameboard) => {\n    let lenArr = [];\n    for (let ship of gameboard.allShips) {\n      lenArr.push(ship.getLength());\n    }\n    for (let i = 1; i < gameboard.MAX_LENGTH + 1; i++) {\n      if (!lenArr.includes(i)) return i;\n    }\n    return false;\n  };\n}\n\n\n//# sourceURL=webpack://battleship/./src/assets/PlaceShipsWindow.js?");

/***/ }),

/***/ "./src/assets/Ship.js":
/*!****************************!*\
  !*** ./src/assets/Ship.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Ship)\n/* harmony export */ });\nconst SIZE = 10;\nclass Ship {\n  constructor(length, tileId, isVertical) {\n    this.length = length;\n    this.hits = 0;\n    this.tileId = tileId;\n    this.isVertical = isVertical;\n    this.tiles = initialiseTiles(this.length, this.tileId, this.isVertical);\n  }\n\n  hit() {\n    this.hits++;\n  }\n  getTiles() {\n    return this.tiles;\n  }\n  getTileId() {\n    return this.tileId;\n  }\n  isVertical() {\n    return this.isVertical;\n  }\n  getLength() {\n    return this.length;\n  }\n  hasSunk() {\n    return this.length == this.hits;\n  }\n}\nconst initialiseTiles = (len, tileId, isVertical) => {\n  let arr = [];\n  for (let i = 0; i < len; i++) {\n    if (isVertical) {\n      arr.push(parseInt(tileId + i * SIZE));\n    } else {\n      arr.push(parseInt(tileId + i));\n    }\n  }\n  return arr;\n};\n\n\n//# sourceURL=webpack://battleship/./src/assets/Ship.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _assets_PlaceShipsWindow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/PlaceShipsWindow */ \"./src/assets/PlaceShipsWindow.js\");\n\nwindow.onload = () => {\n  (0,_assets_PlaceShipsWindow__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n};\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;