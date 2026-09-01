// =============================
// DATA ULAR DAN TANGGA
// =============================
const tangga = {
    4: 40,
    8: 28,
    20: 51,
    40: 71
};

const ular = {
    16: 6,
    25: 15,
    39: 18,
    48: 30,
    64: 44,
    92: 73,
    95: 75,
    98: 78
};

// =============================
// DATA PEMAIN
// =============================
let posisiPemain = 1;
let giliran = true;

// =============================
// TOMBOL LEMPAR DADU
// =============================
const tombolDadu = document.getElementById("lemparDadu");

if (tombolDadu) {
    tombolDadu.addEventListener("click", lemparDadu);
}

function lemparDadu() {
    if (!giliran) return;

    // Angka dadu 1-6
    const dadu = Math.floor(Math.random() * 6) + 1;

    console.log("Dadu:", dadu);

    // Tampilkan angka dadu
    const hasilDadu = document.getElementById("hasilDadu");

    if (hasilDadu) {
        hasilDadu.textContent = "🎲 Dadu: " + dadu;
    }

    // Bergerak
    let tujuan = posisiPemain + dadu;

    // Tidak boleh melewati 100
    if (tujuan > 100) {
        tujuan = posisiPemain;
    }

    posisiPemain = tujuan;

    // Cek tangga
    if (tangga[posisiPemain]) {
        setTimeout(() => {
            alert(
                "🪜 Naik tangga! " +
                posisiPemain +
                " → " +
                tangga[posisiPemain]
            );

            posisiPemain = tangga[posisiPemain];
            pindahkanPion();
        }, 300);
    }

    // Cek ular
    else if (ular[posisiPemain]) {
        setTimeout(() => {
            alert(
                "🐍 Kena ular! " +
                posisiPemain +
                " → " +
                ular[posisiPemain]
            );

            posisiPemain = ular[posisiPemain];
            pindahkanPion();
        }, 300);
    }

    pindahkanPion();

    // Menang
    if (posisiPemain === 100) {
        setTimeout(() => {
            alert("🎉 Selamat! Pemain 1 menang!");
            giliran = false;
        }, 400);
    }
}

// =============================
// MEMINDAHKAN PION
// =============================
function pindahkanPion() {
    const kotak = document.querySelector(
        `[data-cell="${posisiPemain}"]`
    );

    const pion = document.getElementById("pion1");

    if (kotak && pion) {
        kotak.appendChild(pion);
    }

    const posisi = document.getElementById("posisiPemain");

    if (posisi) {
        posisi.textContent = "Posisi: " + posisiPemain;
    }
}
