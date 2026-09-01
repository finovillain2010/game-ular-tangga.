// ===============================
// GAME ULAR TANGGA
// ===============================

// Posisi awal pemain
let posisiPemain1 = 1;
let posisiPemain2 = 1;

// Giliran pemain
let giliran = 1;

// Data ular
const ular = {
    99: 80,
    95: 75,
    92: 88,
    87: 24,
    64: 36,
    62: 19,
    54: 34,
    17: 7
};

// Data tangga
const tangga = {
    4: 25,
    9: 31,
    20: 38,
    28: 84,
    40: 59,
    51: 67,
    63: 81,
    71: 91
};

// Mengambil elemen HTML
const board = document.getElementById("board");
const turn = document.getElementById("turn");
const diceResult = document.getElementById("diceResult");
const position1 = document.getElementById("position1");
const position2 = document.getElementById("position2");
const message = document.getElementById("message");
const rollButton = document.getElementById("rollButton");


// ===============================
// MEMBUAT PAPAN 1 - 100
// ===============================

function buatPapan() {

    board.innerHTML = "";

    for (let angka = 1; angka <= 100; angka++) {

        const kotak = document.createElement("div");

        kotak.classList.add("cell");

        kotak.id = "cell-" + angka;

        kotak.innerHTML = angka;

        // Jika ada tangga
        if (tangga[angka]) {
            kotak.innerHTML += " 🪜";
        }

        // Jika ada ular
        if (ular[angka]) {
            kotak.innerHTML += " 🐍";
        }

        board.appendChild(kotak);
    }

    tampilkanPemain();
}


// ===============================
// MENAMPILKAN PEMAIN
// ===============================

function tampilkanPemain() {

    // Hapus tanda pemain sebelumnya
    document.querySelectorAll(".token").forEach(function(token) {
        token.remove();
    });

    // Tampilkan pemain 1
    let kotak1 = document.getElementById(
        "cell-" + posisiPemain1
    );

    if (kotak1) {

        let pemain1 = document.createElement("span");

        pemain1.className = "token";

        pemain1.innerHTML = "🔵";

        kotak1.appendChild(pemain1);
    }


    // Tampilkan pemain 2
    let kotak2 = document.getElementById(
        "cell-" + posisiPemain2
    );

    if (kotak2) {

        let pemain2 = document.createElement("span");

        pemain2.className = "token";

        pemain2.innerHTML = "🔴";

        kotak2.appendChild(pemain2);
    }


    // Update posisi
    position1.innerHTML = posisiPemain1;

    position2.innerHTML = posisiPemain2;
}


// ===============================
// LEMPAR DADU
// ===============================

function rollDice() {

    // Menghasilkan angka 1 - 6
    const dadu = Math.floor(Math.random() * 6) + 1;

    diceResult.innerHTML = "🎲 Dadu: " + dadu;


    // Tentukan pemain
    let posisi;

    if (giliran === 1) {

        posisi = posisiPemain1;

    } else {

        posisi = posisiPemain2;
    }


    // Hitung posisi baru
    let posisiBaru = posisi + dadu;


    // Tidak boleh melewati 100
    if (posisiBaru > 100) {

        message.innerHTML =
            "⚠️ Tidak bisa bergerak. Harus mendapatkan angka yang tepat untuk mencapai 100.";

    } else {

        // Pindahkan pemain
        if (giliran === 1) {

            posisiPemain1 = posisiBaru;

        } else {

            posisiPemain2 = posisiBaru;
        }


        tampilkanPemain();


        // ===============================
        // CEK TANGGA
        // ===============================

        if (tangga[posisiBaru]) {

            message.innerHTML =
                "🪜 Naik tangga! " +
                posisiBaru +
                " → " +
                tangga[posisiBaru];

            if (giliran === 1) {

                posisiPemain1 = tangga[posisiBaru];

            } else {

                posisiPemain2 = tangga[posisiBaru];
            }

            tampilkanPemain();
        }


        // ===============================
        // CEK ULAR
        // ===============================

        else if (ular[posisiBaru]) {

            message.innerHTML =
                "🐍 Kena ular! " +
                posisiBaru +
                " → " +
                ular[posisiBaru];

            if (giliran === 1) {

                posisiPemain1 = ular[posisiBaru];

            } else {

                posisiPemain2 = ular[posisiBaru];
            }

            tampilkanPemain();
        }


        // ===============================
        // CEK PEMENANG
        // ===============================

        let posisiSekarang =
            giliran === 1
                ? posisiPemain1
                : posisiPemain2;


        if (posisiSekarang === 100) {

            message.innerHTML =
                "🎉🎉 PEMAIN " +
                giliran +
                " MENANG! 🎉🎉";

            turn.innerHTML =
                "🏆 Pemain " + giliran + " adalah pemenangnya!";

            rollButton.disabled = true;

            return;
        }
    }


    // ===============================
    // GANTI GILIRAN
    // ===============================

    if (giliran === 1) {

        giliran = 2;

    } else {

        giliran = 1;
    }


    turn.innerHTML =
        "Giliran: Pemain " + giliran;
}


// ===============================
// MULAI ULANG GAME
// ===============================

function resetGame() {

    posisiPemain1 = 1;

    posisiPemain2 = 1;

    giliran = 1;

    diceResult.innerHTML = "🎲 Dadu: -";

    turn.innerHTML = "Giliran: Pemain 1";

    message.innerHTML = "Selamat bermain!";

    rollButton.disabled = false;

    tampilkanPemain();
}


// ===============================
// JALANKAN GAME
// ===============================

buatPapan();
