(()=>{"use strict";const t="rgb(211,211,211)",e="rgb(255,0,0)";class i{constructor(){this.board=[],this.TOTALTILES=100,this.tileHitList=[],this.initiliseBoard(),this.MAX_LENGTH=5,this.isVertical=!1,this.allShips=[]}initiliseBoard(){for(let e=0;e<this.TOTALTILES;e++)this.board[e]=t,this.tileHitList[e]=!1}makeVertical(){this.isVertical=!0}makeHorizontal(){this.isVertical=!1}getBoard(){return this.board}getTotalTiles(){return this.TOTALTILES}getBoolBoard(){return this.tileHitList}isFirstColumn(t){return t%10==0}canShipBePlaced(e,i){for(let l=0;l<e;l++)if(this.isVertical){if(i+10>this.TOTALTILES)return!1;if(this.board[i+10*l]!=t)return!1}else{if(i+l>this.TOTALTILES)return!1;if(this.board[i+l]!=t)return!1;if(l>0&&this.isFirstColumn(i+l))return!1}return!0}placeShip(t){const i=t.getLength(),l=t.getTileId();if(this.canShipBePlaced(i,l)){if(this.isVertical)for(let t=0;t<i;t++)this.board[l+10*t]=e;else for(let t=0;t<i;t++)this.board[l+t]=e;this.allShips.push(t)}}isEmpty(){for(let e=0;e<this.TOTALTILES;e++)if(this.board[e]!=t)return!1;return!0}}class l{constructor(t,e,i){this.length=t,this.hits=0,this.tileId=e,this.isVertical=i}hit(){this.hits++}getTileId(){return this.tileId}getLength(){return this.length}hasSunk(){return this.length==this.hits}}window.onload=()=>{!function(){let t=!1,e=new i;const s=e.getTotalTiles(),n=document.createElement("div");n.id="headingDiv";const r=document.createElement("h2");r.textContent="Place Your Ships",n.appendChild(r);const o=document.createElement("div");o.style.display="grid",o.id="gameboardDiv",o.style.width="400px",o.style.height="400px",o.style.gridTemplateColumns="repeat(10,1fr)",o.style.border="2px solid black";for(let i=0;i<s;i++){const s=document.createElement("div");s.style.border="1px solid black",s.id="tile"+i,s.className="tiles",s.style.backgroundColor="rgb(211,211,211)",o.appendChild(s),s.addEventListener("click",(()=>{const s=new l(p(e),i,t);e.allShips.length!=e.MAX_LENGTH&&(e.placeShip(s),u(e.getBoard()))}))}const a=document.createElement("button");a.textContent="Place Vertically",a.id="orientationOfShipsBtn",a.addEventListener("click",(()=>{e.isVertical?(e.makeHorizontal(),a.textContent="Place Vertically"):(e.makeVertical(),a.textContent="Place Horizontally"),t=e.isVertical}));const c=document.createElement("button");c.id="resetbtn",c.textContent="Reset",c.addEventListener("click",(()=>{e=new i,t&&e.makeVertical(),u(e.getBoard())}));const h=document.createElement("button");h.id="submitbtn",h.textContent="Submit the Ships",h.addEventListener("click",(()=>{5==e.allShips.length?console.log("Succes"):console.log("Fail")}));const d=document.getElementById("content");d.appendChild(n),d.appendChild(a),d.appendChild(o),d.appendChild(c),d.appendChild(h);const u=t=>{for(let e=0;e<s;e++)document.getElementById("tile"+e).style.backgroundColor=t[e]},p=t=>{let e=[];for(let i of t.allShips)e.push(i.getLength());console.log(t.allShips);for(let i=1;i<t.MAX_LENGTH+1;i++)if(!e.includes(i))return i;return!1}}()}})();