// Defaults
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

// Initialize the game
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

// Get the value at a specific place
function returnValue(place) {
  for (let i of table) {
    if (i.place == place) {
      return i.value;
    }
  }
}

// Reset the table to its initial state
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

// Check if there's a win
function checkWin() {
  // Check diagonals
  let c1 = table[0].value,
    c2 = table[4].value,
    c3 = table[8].value;
  if (c1 == c2 && c2 == c3 && c1 != "-") return true;
  c1 = table[2].value;
  c2 = table[4].value;
  c3 = table[6].value;
  if (c1 == c2 && c2 == c3 && c1 != "-") return true;

  // Check rows and columns
  for (let i = 1; i <= 3; i++) {
    // Row win
    c1 = returnValue(`r${i}c1`);
    c2 = returnValue(`r${i}c2`);
    c3 = returnValue(`r${i}c3`);
    if (c1 == c2 && c2 == c3 && c1 != "-") return true;

    // Column win
    c1 = returnValue(`r1c${i}`);
    c2 = returnValue(`r2c${i}`);
    c3 = returnValue(`r3c${i}`);
    if (c1 == c2 && c2 == c3 && c1 != "-") return true;
  }
  return false;
}

// Update the move count
function updateCount() {
  count = 0;
  for (let i of table) {
    if (i.value != "-") {
      count++;
    }
  }
}

// Update the current player
function updatePlayer() {
  player = count % 2 == 0 ? "X" : "O";
  document.querySelector("#top").innerHTML = `player is: ${player}`;
}

// Check if there are available moves
function checkCanPlay() {
  for (let i of table) {
    if (i.value == "-") {
      return true;
    }
  }
  return false;
}

// Disable all cells (after game ends)
function disableCells() {
  for (let i of table) {
    document.querySelector(`#${i.place}`).onclick = null;
  }
}

// Print the board
function printBoard() {
  updateCount();
  updatePlayer();
  document.querySelector("#board").innerHTML = "";
  document.querySelector("#prompt").textContent = "";
  for (let i of table) {
    document.querySelector(
      "#board"
    ).innerHTML += `<div class="symbol" id="${i.place}" onclick="addSymbol(this)">${i.value}</div>`;
  }
  document.querySelector("#btnReset").style.visibility = "hidden";
  colorAllCells();

  if (player == "O") {
    compPlay();
  }
}

// Reset the game
function resetTable() {
  emptyTable();
  userHistoryJson = JSON.stringify(table);
  localStorage.setItem("TicTacHistory", userHistoryJson);
  updateCount();
  updatePlayer();
  printBoard();
}

// Update the table with a move
function updateTableValue(place, symbol) {
  for (let i of table) {
    if (i.place == place) {
      i.value = symbol;
    }
  }
}

// Color cells based on their values
function colorAllCells() {
  for (let i of table) {
    let cell = document.querySelector(`#${i.place}`);
    if (i.value != "-") {
      document.querySelector("#btnReset").style.visibility = "visible";
    }
    cell.style.color =
      i.value == "X" ? "green" : i.value == "O" ? "red" : "black";
  }
}

// Add a symbol to the board when a cell is clicked
function addSymbol(cell) {
  if (cell.innerText == "-") {
    player = "X";
    cell.innerText = player;
    updateTableValue(cell.id, "X");
    colorAllCells();
    userHistoryJson = JSON.stringify(table);
    localStorage.setItem("TicTacHistory", userHistoryJson);
    if (checkWin()) {
      document.querySelector("#prompt").innerText = `the winner is: ${player}!`;
      disableCells();
    } else if (!checkCanPlay()) {
      document.querySelector("#prompt").innerText = `it's a tie!`;
      disableCells();
    } else {
      compPlay();
    }
  }
}

// Computer plays
function compPlay() {
  let id;
  if (checkCanPlay()) {
    id = getBestMove();
    setTimeout(() => {
      let cell = document.getElementById(id);
      player = "O";
      cell.innerHTML = "O";
      cell.onclick = null;
      updateTableValue(id, "O");
      colorAllCells();
      if (checkWin()) {
        document.querySelector(
          "#prompt"
        ).innerText = `the winner is: ${player}!`;
        disableCells();
      } else if (!checkCanPlay()) {
        document.querySelector("#prompt").innerText = `it's a tie!`;
        disableCells();
      }
    }, 200);
  }
}

// Get the best move for the computer
function getBestMove() {
  let move = checkCanWin();
  if (move !== "-") return move;
  move = checkCanBlock();
  if (move !== "-") return move;
  return createRandom();
}

// Check if the computer can win
function checkCanWin() {
  // Check rows, columns, and diagonals for a winning move
  for (let i = 0; i < 3; i++) {
    if (
      table[3 * i].value == table[3 * i + 1].value &&
      table[3 * i].value == "O" &&
      table[3 * i + 2].value == "-"
    )
      return table[3 * i + 2].place;
    if (
      table[3 * i].value == table[3 * i + 2].value &&
      table[3 * i].value == "O" &&
      table[3 * i + 1].value == "-"
    )
      return table[3 * i + 1].place;
    if (
      table[3 * i + 1].value == table[3 * i + 2].value &&
      table[3 * i + 1].value == "O" &&
      table[3 * i].value == "-"
    )
      return table[3 * i].place;
    if (
      table[i].value == table[i + 3].value &&
      table[i].value == "O" &&
      table[i + 6].value == "-"
    )
      return table[i + 6].place;
    if (
      table[i].value == table[i + 6].value &&
      table[i].value == "O" &&
      table[i + 3].value == "-"
    )
      return table[i + 3].place;
    if (
      table[i + 3].value == table[i + 6].value &&
      table[i + 3].value == "O" &&
      table[i].value == "-"
    )
      return table[i].place;
  }
  if (
    table[0].value == table[4].value &&
    table[0].value == "O" &&
    table[8].value == "-"
  )
    return table[8].place;
  if (
    table[0].value == table[8].value &&
    table[0].value == "O" &&
    table[4].value == "-"
  )
    return table[4].place;
  if (
    table[4].value == table[8].value &&
    table[4].value == "O" &&
    table[0].value == "-"
  )
    return table[0].place;
  if (
    table[2].value == table[4].value &&
    table[2].value == "O" &&
    table[6].value == "-"
  )
    return table[6].place;
  if (
    table[2].value == table[6].value &&
    table[2].value == "O" &&
    table[4].value == "-"
  )
    return table[4].place;
  if (
    table[4].value == table[6].value &&
    table[4].value == "O" &&
    table[2].value == "-"
  )
    return table[2].place;
  return "-";
}

// Check if the computer can block the player's win
function checkCanBlock() {
  // Check rows, columns, and diagonals to block the player's move
  for (let i = 0; i < 3; i++) {
    if (
      table[3 * i].value == table[3 * i + 1].value &&
      table[3 * i].value == "X" &&
      table[3 * i + 2].value == "-"
    )
      return table[3 * i + 2].place;
    if (
      table[3 * i].value == table[3 * i + 2].value &&
      table[3 * i].value == "X" &&
      table[3 * i + 1].value == "-"
    )
      return table[3 * i + 1].place;
    if (
      table[3 * i + 1].value == table[3 * i + 2].value &&
      table[3 * i + 1].value == "X" &&
      table[3 * i].value == "-"
    )
      return table[3 * i].place;
    if (
      table[i].value == table[i + 3].value &&
      table[i].value == "X" &&
      table[i + 6].value == "-"
    )
      return table[i + 6].place;
    if (
      table[i].value == table[i + 6].value &&
      table[i].value == "X" &&
      table[i + 3].value == "-"
    )
      return table[i + 3].place;
    if (
      table[i + 3].value == table[i + 6].value &&
      table[i + 3].value == "X" &&
      table[i].value == "-"
    )
      return table[i].place;
  }
  if (
    table[0].value == table[4].value &&
    table[0].value == "X" &&
    table[8].value == "-"
  )
    return table[8].place;
  if (
    table[0].value == table[8].value &&
    table[0].value == "X" &&
    table[4].value == "-"
  )
    return table[4].place;
  if (
    table[4].value == table[8].value &&
    table[4].value == "X" &&
    table[0].value == "-"
  )
    return table[0].place;
  if (
    table[2].value == table[4].value &&
    table[2].value == "X" &&
    table[6].value == "-"
  )
    return table[6].place;
  if (
    table[2].value == table[6].value &&
    table[2].value == "X" &&
    table[4].value == "-"
  )
    return table[4].place;
  if (
    table[4].value == table[6].value &&
    table[4].value == "X" &&
    table[2].value == "-"
  )
    return table[2].place;
  return "-";
}

// Create a random move if no winning or blocking move is found
function createRandom() {
  let index;
  do {
    index = Math.floor(Math.random() * 9);
  } while (table[index].value != "-");
  return table[index].place;
}

// Call init to start the game
init();
