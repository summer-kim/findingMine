const row = document.getElementById("row");
const col = document.getElementById("column");
const mine = document.getElementById("mine");
const btn = document.getElementById("excute");

var dataset = [];
var tbody = document.querySelector("tbody");
var listForDigging = []; // position of Mine

function makeArray(event) {
  tbody.innerHTML = "";
  listForDigging = [];
  verti = row.value;
  horiz = col.value;
  numMine = mine.value;
  for (i = 0; i < verti; i++) {
    var arr = [];
    arr.push;
    dataset.push(arr);
    const tr = document.createElement("tr");
    for (j = 0; j < horiz; j++) {
      const td = document.createElement("td");
      tr.appendChild(td);
      arr.push(1);
    }
    tbody.appendChild(tr);
  }
  randomNumberForDigging(horiz, verti, numMine);
}

function randomNumberForDigging(horiz, verti, numMine) {
  var startNum = 0; //for fill the numList
  var numList = Array(horiz * verti) //which will be used for picking up the number
    .fill()
    .map(function () {
      startNum += 1;
      return startNum;
    });
  for (i = 0; i < numMine; i++) {
    listForDigging.push(
      numList.splice(Math.floor(Math.random() * numList.length - 1), 1)[0]
    );
  }
  diggingMine(horiz, verti);
}

var mineRow = 0;
var mineCol = 0;
function diggingMine(horiz, verti) {
  for (i = 0; i < listForDigging.length; i++) {
    if (listForDigging[i] % horiz === 0) {
      mineRow = Math.floor(listForDigging[i] / horiz) - 1;
      mineCol = horiz - 1;
    } else {
      mineRow = Math.floor(listForDigging[i] / horiz);
      mineCol = (listForDigging[i] % horiz) - 1;
    }
    tbody.children[mineRow].children[mineCol].innerHTML = "X";
    dataset[mineRow][mineCol] = "X";
  }
  tbody.addEventListener("contextmenu", IGuessMineIsHere);
  tbody.addEventListener("click", checkMine);
}

function IGuessMineIsHere(e) {
  e.preventDefault();
  var parentNode = e.target.parentNode;
  var whichRow = Array.prototype.indexOf.call(tbody.children, parentNode);
  var whichCol = Array.prototype.indexOf.call(parentNode.children, e.target);

  if (e.target.textContent === "" || e.target.textContent === "X") {
    e.target.textContent = "!";
  } else if (e.target.textContent === "!") {
    e.target.textContent = "?";
  } else if (e.target.textContent === "?") {
    if (dataset[whichRow][whichCol] === "X") {
      e.target.textContent = "X";
    } else {
      e.target.textContent = "";
    }
  }
}
function checkMine(e) {
  e.preventDefault();
  var parentNode = e.target.parentNode;
  var whichRow = Array.prototype.indexOf.call(tbody.children, parentNode);
  var whichCol = Array.prototype.indexOf.call(parentNode.children, e.target);

  ArrAround = [
    dataset[whichRow][whichCol - 1],
    dataset[whichRow][whichCol + 1],
  ];
  if (dataset[whichRow - 1]) {
    ArrAround = ArrAround.concat(
      dataset[whichRow - 1][whichCol - 1],
      dataset[whichRow - 1][whichCol],
      dataset[whichRow - 1][whichCol + 1]
    );
  }
  if (dataset[whichRow + 1]) {
    ArrAround = ArrAround.concat(
      dataset[whichRow + 1][whichCol - 1],
      dataset[whichRow + 1][whichCol],
      dataset[whichRow + 1][whichCol + 1]
    );
  }
  if (e.target.textContent === "X") {
    e.target.textContent = "퐝";
  } else {
    e.target.textContent = ArrAround.filter(function (x) {
      return x === "X";
    }).length;
  }
}

btn.addEventListener("click", makeArray);

var name = "carrot";
function log() {
  console.log(name);
}
function rename() {
  var name = "onion";
  log();
}
