const first = document.getElementsByClassName("stageBtn")[0];
const second = document.getElementsByClassName("stageBtn")[1];
const third = document.getElementsByClassName("stageBtn")[2];

var dataset = [];
const tbody = document.getElementById("tableTbody");
var tr = [];
var listForDigging = []; // position of Mine
var btnTbody = document.getElementById("btnTbody");

var stopExecution = false;
var verti, horiz, numMine;

first.addEventListener("click", makeArray);
second.addEventListener("click", makeArray);
third.addEventListener("click", makeArray);

function makeArray(event) {
  if (event.target.id === "first") {
    verti = 10;
    horiz = 10;
    numMine = 10;
  } else if (event.target.id === "second") {
    verti = 10;
    horiz = 20;
    numMine = 10;
  } else {
    verti = 15;
    horiz = 30;
    numMine = 10;
  }
  //initialize the game
  numOpend = 0;
  tbody.innerHTML = "";
  stopExecution = false;
  tbody.classList.remove("fontSize");
  btnTbody.children[0].classList.remove("stop");
  tbody.style.display = "block";
  btnTbody.style.display = "block";
  listForDigging = []; // array used for making random num of mine's posiion
  dataset = []; //data of mines

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
    dataset[mineRow][mineCol] = "X";
  }
  tbody.addEventListener("contextmenu", IGuessMineIsHere);
  tbody.addEventListener("click", checkMine);
}

function IGuessMineIsHere(e) {
  //when you rightclick
  e.preventDefault();
  var parentNode = e.target.parentNode;
  var whichRow = Array.prototype.indexOf.call(tbody.children, parentNode);
  var whichCol = Array.prototype.indexOf.call(parentNode.children, e.target);

  if (e.target.textContent === "") {
    e.target.textContent = "!";
  } else if (e.target.textContent === "!") {
    e.target.textContent = "?";
  } else if (e.target.textContent === "?") {
    e.target.textContent = "";
  }
}

var numOpend = 0;
function checkMine(e) {
  //when you leftclick
  e.preventDefault();
  if (stopExecution) {
    return;
  }
  if (e.target.textContent === "!" || e.target.textContent === "?") {
    return;
  }
  var parentNode = e.target.parentNode;
  var whichRow = Array.prototype.indexOf.call(tbody.children, parentNode);
  var whichCol = Array.prototype.indexOf.call(parentNode.children, e.target);

  var arrAround = makeArrSurround(tbody, whichRow, whichCol);
  var arrDataAround = makeArrSurround2(dataset, whichRow, whichCol);
  var mineNumAround = 0;

  if (dataset[whichRow][whichCol] === "X") {
    //when you click the mine
    e.target.style.backgroundColor = "teal";
    e.target.textContent = "퐝";
    stopExecution = true;
    tr.forEach(function (x) {
      x.className = "stop"; //to vanish the table
    });
    setTimeout(function () {
      tbody.textContent = "You Lose";
      tbody.className = "fontSize";
    }, 2000);
  } else {
    arrDataAround.forEach(function (value) {
      if (value === "X") {
        mineNumAround++;
      }
    });
    if (mineNumAround !== 0) {
      e.target.textContent = mineNumAround;
    }
    e.target.style.backgroundColor = "teal";

    if (dataset[whichRow][whichCol] === 0) {
      numOpend++;
    }
    dataset[whichRow][whichCol] = 1;
    if (numOpend === verti * horiz - numMine) {
      //when you open all of mines
      stopExecution = true;
      tr.forEach(function (x) {
        x.className = "stop"; //to vanish the table
      });
      setTimeout(function () {
        tbody.textContent = "You Win";
        tbody.className = "fontSize";
      }, 2000);
    }
  }

  if (mineNumAround === 0) {
    arrAround
      .filter(function (x) {
        return !!x;
      })
      .forEach(function (around) {
        var parentNode = around.parentNode;
        var whichRow = Array.prototype.indexOf.call(tbody.children, parentNode);
        var whichCol = Array.prototype.indexOf.call(
          parentNode.children,
          around
        );
        if (dataset[whichRow][whichCol] === 0) {
          return around.click();
        }
      });
  }
}

function makeArrSurround(element, whichRow, whichCol) {
  Arr = [
    element.children[whichRow].children[whichCol - 1],
    element.children[whichRow].children[whichCol + 1],
  ];

  if (element.children[whichRow - 1]) {
    Arr = Arr.concat(
      element.children[whichRow - 1].children[whichCol - 1],
      element.children[whichRow - 1].children[whichCol],
      element.children[whichRow - 1].children[whichCol + 1]
    );
  }
  if (element.children[whichRow + 1]) {
    Arr = Arr.concat(
      element.children[whichRow + 1].children[whichCol - 1],
      element.children[whichRow + 1].children[whichCol],
      element.children[whichRow + 1].children[whichCol + 1]
    );
  }
  return Arr;
}

function makeArrSurround2(array, whichRow, whichCol) {
  Arr = [array[whichRow][whichCol - 1], array[whichRow][whichCol + 1]];

  if (array[whichRow - 1]) {
    Arr = Arr.concat(
      array[whichRow - 1][whichCol - 1],
      array[whichRow - 1][whichCol],
      array[whichRow - 1][whichCol + 1]
    );
  }

  if (array[whichRow + 1]) {
    Arr = Arr.concat(
      array[whichRow + 1][whichCol - 1],
      array[whichRow + 1][whichCol],
      array[whichRow + 1][whichCol + 1]
    );
  }
  return Arr;
}
