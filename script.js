// ===============================
// GAME ULAR TANGGA
// ===============================

const boardSize = 100;

let players = [
    {
        name: "Pemain 1",
        position: 1,
        color: "red"
    },
    {
        name: "Pemain 2",
        position: 1,
        color: "blue"
    }
];

let currentPlayer = 0;
let gameOver = false;

// Posisi ular
const snakes = {
    99: 54,
    95: 75,
    92: 88,
    89: 68,
    74: 53,
    64: 36,
    62: 19,
    49: 11,
    46: 25,
    16: 6
};

// Posisi tangga
const ladders = {
    2: 23,
    7: 29,
    8: 15,
    21: 42,
    28: 55,
    36: 44,
    51: 67,
    71: 91,
    78: 98,
    87: 94
};

// Ambil elemen HTML
const diceButton = document.getElementById("rollDice");
const diceResult = document.getElementById("diceResult");
const currentPlayerText = document.getElementById("currentPlayer");
const message = document.getElementById("message");

// ===============================
// FUNGSI KOCOK DADU
// ===============================

function rollDice() {
    if (gameOver) return;

    const dice = Math.floor(Math.random() * 6) + 1;

    diceResult.textContent = `🎲 ${dice}`;

    movePlayer(dice);
}

// ===============================
// GERAKKAN PEMAIN
// ===============================

function movePlayer(dice) {
    const player = players[currentPlayer];

    let newPosition = player.position + dice;

    // Tidak boleh melewati kotak 100
    if (newPosition > boardSize) {
        message.textContent =
            `${player.name} mendapatkan ${dice}, tetapi tidak bisa bergerak.`;

        nextTurn();
        return;
    }

    player.position = newPosition;

    message.textContent =
        `${player.name} maju ke kotak ${player.position}.`;

    // Cek tangga
    if (ladders[player.position]) {
        const oldPosition = player.position;

        player.position = ladders[player.position];

        message.textContent =
            `🪜 ${player.name} naik tangga dari ${oldPosition} ke ${player.position}!`;
    }

    // Cek ular
    if (snakes[player.position]) {
        const oldPosition = player.position;

        player.position = snakes[player.position];

        message.textContent =
            `🐍 ${player.name} terkena ular! Turun dari ${oldPosition} ke ${player.position}.`;
    }

    updateBoard();

    // Cek kemenangan
    if (player.position === 100) {
        message.textContent =
            `🎉 ${player.name} MENANG!`;

        gameOver = true;
        diceButton.disabled = true;

        return;
    }

    nextTurn();
}

// ===============================
// GANTI GILIRAN
// ===============================

function nextTurn() {
    currentPlayer = currentPlayer === 0 ? 1 : 0;

    currentPlayerText.textContent =
        `Giliran: ${players[currentPlayer].name}`;
}

// ===============================
// UPDATE PAPAN
// ===============================

function updateBoard() {
    players.forEach((player, index) => {
        const oldPawn = document.getElementById(`player-${index}`);

        if (oldPawn) {
            oldPawn.remove();
        }

        const cell = document.querySelector(
            `[data-position="${player.position}"]`
        );

        if (!cell) return;

        const pawn = document.createElement("div");

        pawn.id = `player-${index}`;
        pawn.className = "pawn";

        pawn.style.backgroundColor = player.color;
        pawn.textContent = index + 1;

        cell.appendChild(pawn);
    });
}

// ===============================
// RESET GAME
// ===============================

function resetGame() {
    players[0].position = 1;
    players[1].position = 1;

    currentPlayer = 0;
    gameOver = false;

    diceButton.disabled = false;

    diceResult.textContent = "🎲 -";

    currentPlayerText.textContent =
        `Giliran: ${players[currentPlayer].name}`;

    message.textContent =
        "Game dimulai! Lempar dadu.";

    updateBoard();
}

// ===============================
// EVENT BUTTON
// ===============================

if (diceButton) {
    diceButton.addEventListener("click", rollDice);
}

// Tombol reset jika tersedia
const resetButton = document.getElementById("resetGame");

if (resetButton) {
    resetButton.addEventListener("click", resetGame);
}

// Jalankan pertama kali
updateBoard();
