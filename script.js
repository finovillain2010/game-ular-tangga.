const board = document.getElementById("board");
const statusText = document.getElementById("status");
const diceText = document.getElementById("dice");

let player1 = 1;
let player2 = 1;
let currentPlayer = 1;

// Tangga
const ladders = {
    4: 25,
    13: 46,
    33: 49,
    42: 63,
    50: 69,
    62: 81
};

// Ular
const snakes = {
    99: 78,
    95: 75,
    92: 88,
    87: 24,
    64: 36,
    48: 26,
    16: 6
};

function createBoard() {
    board.innerHTML = "";

    for (let i = 100; i >= 1; i--) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.id = "cell-" + i;
        cell.textContent = i;

        board.appendChild(cell);
    }

    updatePlayers();
}

function updatePlayers() {
    document.querySelectorAll(".player").forEach(p => p.remove());

    addPlayer(player1, "player1");
    addPlayer(player2, "player2");
}

function addPlayer(position, className) {
    const cell = document.getElementById("cell-" + position);

    if (cell) {
        const player = document.createElement("div");
        player.className = "player " + className;
        cell.appendChild(player);
    }
}

function rollDice() {
    const dice = Math.floor(Math.random() * 6) + 1;

    diceText.textContent = dice;

    if (currentPlayer === 1) {
        player1 += dice;

        if (player1 > 100) {
            player1 -= dice;
        }

        if (ladders[player1]) {
            player1 = ladders[player1];
        }

        if (snakes[player1]) {
            player1 = snakes[player1];
        }

        if (player1 === 100) {
            alert("🎉 Pemain 1 Menang!");
            return;
        }

        currentPlayer = 2;

    } else {
        player2 += dice;

        if (player2 > 100) {
            player2 -= dice;
        }

        if (ladders[player2]) {
            player2 = ladders[player2];
        }

        if (snakes[player2]) {
            player2 = snakes[player2];
        }

        if (player2 === 100) {
            alert("🎉 Pemain 2 Menang!");
            return;
        }

        currentPlayer = 1;
    }

    updatePlayers();

    statusText.textContent =
        "Giliran: Pemain " + currentPlayer;
}

function resetGame() {
    player1 = 1;
    player2 = 1;
    currentPlayer = 1;
    diceText.textContent = "-";
    statusText.textContent = "Giliran: Pemain 1";

    updatePlayers();
}

createBoard();
