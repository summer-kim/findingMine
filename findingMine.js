const row = document.getElementById("row");
const col = document.getElementById("column");
const mine = document.getElementById("mine");
const btn = document.getElementById("excute");

var dataset = [];
const tbody = document.getElementById("tableTbody");
var tr = [];
var listForDigging = []; // position of Mine
var btnTbody = document.getElementById("btnTbody");

var stopExecution = false;

function makeArray(event) {
  tbody.style.display = "block";
  btnTbody.style.display = "block";
  tbody.innerHTML = "";
  listForDigging = [];
  dataset = [];
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
      arr.push(0);
    }
    tbody.appendChild(tr);
  }
  tr = Array.from(document.getElementsByTagName("tr"));
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
  if (stopExecution) {
    return;
  }
  var parentNode = e.target.parentNode;
  var whichRow = Array.prototype.indexOf.call(tbody.children, parentNode);
  var whichCol = Array.prototype.indexOf.call(parentNode.children, e.target);

  ArrAround = [
    tbody.children[whichRow].children[whichCol - 1],
    tbody.children[whichRow].children[whichCol + 1],
  ];
  if (tbody.children[whichRow - 1]) {
    ArrAround = ArrAround.concat(
      tbody.children[whichRow - 1].children[whichCol - 1],
      tbody.children[whichRow - 1].children[whichCol],
      tbody.children[whichRow - 1].children[whichCol + 1]
    );
  }
  if (tbody.children[whichRow + 1]) {
    ArrAround = ArrAround.concat(
      tbody.children[whichRow + 1].children[whichCol - 1],
      tbody.children[whichRow + 1].children[whichCol],
      tbody.children[whichRow + 1].children[whichCol + 1]
    );
  }
  var mineNumAround = 0;
  if (e.target.textContent === "X" || e.target.textContent === "퐝") {
    e.target.style.backgroundColor = "teal";
    e.target.textContent = "퐝";
    stopExecution = true;
    tr.forEach(function (x) {
      x.className = "stop";
    });
    setTimeout(function () {
      tbody.textContent = "You Lose";
      tbody.className = "fontSize";
    }, 2000);
  } else {
    mineNumAround = ArrAround.filter(function (x) {
      return !!x;
    }).filter(function (x) {
      return x.textContent === "X";
    }).length;
    if (mineNumAround !== 0) {
      e.target.textContent = mineNumAround;
    }
    e.target.style.backgroundColor = "teal";
    dataset[whichRow][whichCol] = 1;
    console.log(1);
  }
  if (mineNumAround === 0 && e.target.textContent !== "퐝") {
    ArrAround.filter(function (x) {
      return !!x;
    }).forEach(function (around) {
      var parentNode = around.parentNode;
      var whichRow = Array.prototype.indexOf.call(tbody.children, parentNode);
      var whichCol = Array.prototype.indexOf.call(parentNode.children, around);
      if (dataset[whichRow][whichCol] === 0) {
        return around.click();
      }
    });
  }
}

btn.addEventListener("click", makeArray);
btnTbody.addEventListener("click", makeArray);
