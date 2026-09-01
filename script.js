// ================================
// GAME ULAR TANGGA
// ================================

const board = document.getElementById("board");
const dice = document.getElementById("dice");
const rollButton = document.getElementById("rollButton");
const turnText = document.getElementById("turn");

let players = [
    {
        name: "Pemain 1",
        position: 1,
        element: null
    },
    {
        name: "Pemain 2",
        position: 1,
        element: null
    }
];

let currentPlayer = 0;
let gameOver = false;

// ================================
// POSISI ULAR
// ================================

const snakes = {
    98: 40,
    95: 75,
    92: 88,
    64: 60,
    48: 26,
    39: 2,
    25: 5,
    16: 6
};

// ================================
// POSISI TANGGA
// ================================

const ladders = {
    4: 25,
    8: 31,
    20: 41,
    28: 55,
    40: 59,
    51: 67,
    63: 81,
    71: 91
};

// ================================
// MEMBUAT PAPAN 100 KOTAK
// ================================

function createBoard() {
    board.innerHTML = "";

    for (let i = 100; i >= 1; i--) {
        const cell = document.createElement("div");

        cell.classList.add("cell");
        cell.dataset.position = i;
        cell.textContent = i;

        // Tandai tangga
        if (ladders[i]) {
            cell.classList.add("ladder");
            cell.title = `Tangga → ${ladders[i]}`;
        }

        // Tandai ular
        if (snakes[i]) {
            cell.classList.add("snake");
            cell.title = `Ular → ${snakes[i]}`;
        }

        board.appendChild(cell);
    }
}

// ================================
// MEMBUAT PION
// ================================

function createPlayers() {
    players.forEach((player, index) => {
        const pawn = document.createElement("div");

        pawn.classList.add("pawn");
        pawn.classList.add(`player${index + 1}`);

        pawn.textContent = index + 1;

        player.element = pawn;

        updatePawn(player);
    });
}

// ================================
// MEMINDAHKAN PION
// ================================

function updatePawn(player) {
    const cell = document.querySelector(
        `.cell[data-position="${player.position}"]`
    );

    if (cell && player.element) {
        cell.appendChild(player.element);
    }
}

// ================================
// MENGGULINGKAN DADU
// ================================

function rollDice() {
    if (gameOver) return;

    const result = Math.floor(Math.random() * 6) + 1;

    dice.textContent = result;

    movePlayer(result);
}

// ================================
// GERAK PEMAIN
// ================================

function movePlayer(steps) {
    const player = players[currentPlayer];

    let newPosition = player.position + steps;

    // Tidak boleh melewati kotak 100
    if (newPosition > 100) {
        turnText.textContent =
            `${player.name} mendapat ${steps}, tetapi tidak bisa bergerak.`;

        changeTurn();
        return;
    }

    player.position = newPosition;

    updatePawn(player);

    // Cek tangga
    if (ladders[player.position]) {
        const oldPosition = player.position;

        player.position = ladders[player.position];

        updatePawn(player);

        turnText.textContent =
            `🪜 ${player.name} naik tangga dari ${oldPosition} ke ${player.position}!`;
    }

    // Cek ular
    else if (snakes[player.position]) {
        const oldPosition = player.position;

        player.position = snakes[player.position];

        updatePawn(player);

        turnText.textContent =
            `🐍 ${player.name} terkena ular! Turun dari ${oldPosition} ke ${player.position}.`;
    }

    // Cek pemenang
    if (player.position === 100) {
        turnText.textContent =
            `🏆 ${player.name} MENANG!`;

        gameOver = true;
        rollButton.disabled = true;

        return;
    }

    // Ganti giliran
    setTimeout(() => {
        changeTurn();
    }, 700);
}

// ================================
// GANTI GILIRAN
// ================================

function changeTurn() {
    currentPlayer = currentPlayer === 0 ? 1 : 0;

    turnText.textContent =
        `Giliran ${players[currentPlayer].name}`;
}

// ================================
// RESET GAME
// ================================

function resetGame() {
    players[0].position = 1;
    players[1].position = 1;

    currentPlayer = 0;
    gameOver = false;

    dice.textContent = "🎲";

    rollButton.disabled = false;

    updatePawn(players[0]);
    updatePawn(players[1]);

    turnText.textContent = "Giliran Pemain 1";
}

// ================================
// EVENT TOMBOL
// ================================

rollButton.addEventListener("click", rollDice);

// Jika ada tombol reset dengan id="resetButton"
const resetButton = document.getElementById("resetButton");

if (resetButton) {
    resetButton.addEventListener("click", resetGame);
}

// ================================
// MULAI GAME
// ================================

createBoard();
createPlayers();

turnText.textContent = "Giliran Pemain 1";
