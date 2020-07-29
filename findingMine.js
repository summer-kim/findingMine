const row = document.getElementById("row");
const col = document.getElementById("column");
const mine = document.getElementById("mine");
const btn = document.getElementById("excute");

var dataset = [];
var tbody = document.querySelector("tbody");

function makeArray(event) {
  horiz = row.value;
  verti = col.value;
  numMine = mine.value;
  randomNumberForDigging(horiz, verti, numMine);
  for (i = 0; i < horiz; i++) {
    var arr = [];
    arr.push;
    dataset.push(arr);
    const tr = document.createElement("tr");
    for (j = 0; j < verti; j++) {
      const td = document.createElement("td");
      tr.appendChild(td);
      arr.push(1);
    }
    tbody.appendChild(tr);
  }
}

var listForDigging = [];
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
  console.log(tbody.children[2]);
}

function diggingMine(horiz, verti) {
  for (i = 0; i < listForDigging.length; i++) {
    var mineRow = Math.floor(listForDigging[i] / horiz);
    var mineCol = (listForDigging[i] % verti) - 1;
    console.log(mineRow, mineCol);
  }
  console.log(tbody.children[2]); //tbody.children[mineRow].children[mineCol].innerHTML = "X";
}
btn.addEventListener("click", makeArray);
