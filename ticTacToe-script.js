//defaults
let userHistoryJson;
let count;
let table = [
  { place: "r1c1", value: "-" },
  { place: "r1c2", value: "-" },
  { place: "r1c3", value: "-" },
  { place: "r2c1", value: "-" },
  { place: "r2c2", value: "-" },
  { place: "r2c3", value: "-" },
  { place: "r3c1", value: "-" },
  { place: "r3c2", value: "-" },
  { place: "r3c3", value: "-" },
];
let color = "black";
let player;

//functions
function init() {
  if (localStorage.getItem("TicTacHistory") == null) {
    userHistoryJson = JSON.stringify(table);
    localStorage.setItem("TicTacHistory", userHistoryJson);
  } else {
    userHistoryJson = localStorage.getItem("TicTacHistory");
    table = JSON.parse(userHistoryJson);
    if (!checkCanPlay() || checkWin()) {
      emptyTable();
      userHistoryJson = JSON.stringify(table);
      localStorage.setItem("TicTacHistory", userHistoryJson);
    }
  }
  printBoard();
}
function returnValue(place) {
  for (let i of table) {
    if (i.place == place) {
      return i.value;
    }
  }
}
function emptyTable() {
  table = [
    { place: "r1c1", value: "-" },
    { place: "r1c2", value: "-" },
    { place: "r1c3", value: "-" },
    { place: "r2c1", value: "-" },
    { place: "r2c2", value: "-" },
    { place: "r2c3", value: "-" },
    { place: "r3c1", value: "-" },
    { place: "r3c2", value: "-" },
    { place: "r3c3", value: "-" },
  ];
}
function checkWin() {
  //diagnal

  let c1 = table[0].value;
  let c2 = table[4].value;
  let c3 = table[8].value;
  if (c1 == c2 && c2 == c3 && c1 != "-") {
    console.log("1");
    return true;
  }
  c1 = table[2].value;
  c2 = table[4].value;
  c3 = table[6].value;
  if (c1 == c2 && c2 == c3 && c1 != "-") {
    console.log("2");
    return true;
  }
  for (let i = 1; i <= 3; i++) {
    //row win
    c1 = returnValue(`r${i}c1`);
    c2 = returnValue(`r${i}c2`);
    c3 = returnValue(`r${i}c3`);
    if (c1 == c2 && c2 == c3 && c1 != "-") {
      console.log("3");
      return true;
    }
    //culomn win
    c1 = returnValue(`r1c${i}`);
    c2 = returnValue(`r2c${i}`);
    c3 = returnValue(`r3c${i}`);
    if (c1 == c2 && c2 == c3 && c1 != "-") {
      console.log("4");
      return true;
    }
  }
  return false;
}
function updateCount() {
  count = 0;
  for (let i of table) {
    if (i.value != "-") {
      count++;
    }
  }
  console.log(count);
}
function updatePlayer() {
  if (count % 2 == 0) {
    player = "X";
  } else {
    player = "O";
  }
  document.querySelector("#top").innerHTML = `player is: ${player}`;
  console.log(player);
}
function checkCanPlay() {
  let emptyCounter = 0;
  for (let i of table) {
    if (i.value == "-") {
      emptyCounter++;
    }
  }

  if (emptyCounter > 0) {
    return true;
  }
  return false;
}
function disableCells() {
  for (let i of table) {
    let place = i.place;
    document.querySelector(`#${place}`).onclick = "";
  }
}
function printBoard() {
  updateCount();
  updatePlayer();
  document.querySelector("#board").innerHTML = "";
  document.querySelector("#prompt").textContent = "";
  for (let i in table) {
    let place = table[i].place;
    let value = table[i].value;
    document.querySelector(
      `#board`
    ).innerHTML += `<div class="symbol" id="${place}" onclick="addSymbol(this)">${value}</div>`;
  }
  document.querySelector("#btnReset").style = "display:none";
  colorAllCells();
}
function resetTable() {
  emptyTable();
  userHistoryJson = JSON.stringify(table);
  localStorage.setItem("TicTacHistory", userHistoryJson);
  updateCount();
  updatePlayer();
  printBoard();
}
function updateTableValue(place) {
  for (let i of table) {
    if (i.place == place) {
      i.value = player;
    }
  }
}
function colorAllCells() {
  for (i of table) {
    let cell = document.querySelector(`#${i.place}`);
    if (i.value != "-") {
      document.querySelector("#btnReset").style = "display:block";
    }
    if (i.value == "X") {
      cell.style = "color:green";
    } else if (i.value == "O") {
      cell.style = "color:red";
    }
  }
}
function addSymbol(cell) {
  if (cell.innerText == "-") {
    cell.innerText = player;
    updateTableValue(cell.id);
    colorAllCells();
    userHistoryJson = JSON.stringify(table);
    localStorage.setItem("TicTacHistory", userHistoryJson);
    updateCount();
    updatePlayer();
    if (checkWin()) {
      // if someone won
      document.querySelector("#prompt").innerText = `the winner is: ${player}!`;
      disableCells();
    } else if (!checkCanPlay()) {
      //if its a tie
      document.querySelector("#prompt").innerText = `it's a tie!`;
      disableCells();
    }
  }
}
//print the board when game starts
init();
