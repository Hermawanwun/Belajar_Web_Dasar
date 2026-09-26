// --- Countdown ---
const targetDate = new Date("Dec 12, 2026 08:00:00").getTime();

function updateCountdown() {
    const now = Date.now();
    const diff = targetDate - now;

    if (diff <= 0) {
        document.getElementById("days").innerText = '00';
        document.getElementById("hours").innerText = '00';
        document.getElementById("minutes").innerText = '00';
        document.getElementById("seconds").innerText = '00';
        return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = String(d).padStart(2, '0');
    document.getElementById("hours").innerText = String(h).padStart(2, '0');
    document.getElementById("minutes").innerText = String(m).padStart(2, '0');
    document.getElementById("seconds").innerText = String(s).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// --- Scroll animation for multiple elements ---
function handleFadeIn() {
    const elems = document.querySelectorAll('.fade-in');
    const screenHeight = window.innerHeight;
    elems.forEach(el => {
        const pos = el.getBoundingClientRect().top;
        if (pos < screenHeight - 100) el.classList.add('appear');
    });
}
window.addEventListener('scroll', handleFadeIn);
window.addEventListener('load', handleFadeIn);

// --- Audio and invitation open ---
const audio = document.getElementById("myAudio");
let isPlaying = false;

function openInvitation() {
    const overlay = document.getElementById("overlay");
    if (overlay) overlay.style.transform = "translateY(-100%)";
    try { audio.play(); isPlaying = true; } catch (e) { /* autoplay may be blocked */ }
}

function toggleMusic() {
    if (!audio) return;
    if (isPlaying) {
        audio.pause();
        document.getElementById("musicControl").style.animationPlayState = "paused";
        document.getElementById("musicIcon").innerText = '🔈';
    } else {
        audio.play();
        document.getElementById("musicControl").style.animationPlayState = "running";
        document.getElementById("musicIcon").innerText = '🎵';
    }
    isPlaying = !isPlaying;
}

// --- RSVP handler (kirim ke WhatsApp) ---
const rsvpForm = document.getElementById('rsvpForm');
if (rsvpForm) {
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const nama = document.getElementById('name').value || '-';
        const status = document.getElementById('status').value || '-';
        const pesan = document.getElementById('message').value || '-';
        const nomorWA = "6281234567890"; // GANTI DENGAN NOMOR ANDA (format internasional tanpa +)

        const teks = `Halo, saya ${nama}. Ingin mengonfirmasi bahwa saya ${status} di acara pernikahan Anda.\n\nPesan: ${pesan}`;
        const linkWA = `https://wa.me/${nomorWA}?text=${encodeURIComponent(teks)}`;
        window.open(linkWA, '_blank');
    });
}

// --- Lightbox image ---
function zoomImage(element) {
    const popup = document.getElementById("imagePopup");
    const popupImg = document.getElementById("popupImg");
    const clickedImg = element.querySelector("img");
    if (!clickedImg) return;
    popup.style.display = "flex";
    popupImg.src = clickedImg.src;
}

function closePopup() {
    const popup = document.getElementById("imagePopup");
    if (popup) popup.style.display = "none";
}

// --- Utility: copy text ---
function copyText(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;
    const text = el.innerText || el.value || '';
    navigator.clipboard.writeText(text).then(() => {
        alert("Nomor Rekening Berhasil Disalin!");
    }).catch(() => {
        alert("Gagal menyalin. Silakan salin secara manual.");
    });
}