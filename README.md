# Tic Tac Toe
<img src = "\pictures\winTicTacToe.png" style = 'width:150px'></img>
## Table of Contents

- [Getting Started](#getting-started)
- [Features](#features)
- [Usage](#usage)
- [Code Structure](#code-structure)
- [Screenshots](#screenshots)
- [License](#license)

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Open the `index.html` file in your browser to start the game.

    ```bash
    open index.html
    ```

## Features

- **Two-player mode:** Play against another person.
- **Local Storage:** Game state is saved in the browser.
- **Winning Highlight:** Highlights the winning combination.
- **Turn Indicator:** Displays the current player's turn.
- **Reset Button:** Allows resetting the game board.

## Usage

1. Open the `index.html` file in your browser.
2. Players take turns clicking on the cells of the game board.
3. The game indicates the current player and displays the winner once a player wins.
4. Click the "Reset" button to start a new game.

<img src="path/to/board-image.png" alt="Game Board" width="400">

## Code Structure

### index.html

The main HTML file that structures the game.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tic Tac Toe</title>
    <link rel="stylesheet" href="style.css" />
</head>
<body>
    <div id="main">
        <div id="top">player is: X</div>
        <div id="board"></div>
        <div id="bottom">
            <button id="btnReset" onclick="resetTable()">reset</button>
            <label id="prompt"></label>
        </div>
    </div>
    <script src="ticTacToe-script.js"></script>
</body>
</html>
