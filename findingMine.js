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
  randomMine(horiz, verti);
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

var mineList = [];
function randomMine(horiz, verti) {
  var numList = Array(horiz * verti);
  for (i = 0; i < numMine; i++) {
    mineList.push(Math.floor(Math.random() * num));
  }
  console.log(mineList);
}

btn.addEventListener("click", makeArray);
