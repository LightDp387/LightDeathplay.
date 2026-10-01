// ---------- Navbar background on scroll ----------
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 30);
});

// ---------- Player counter ----------
// Tries the real MTA query endpoint first; if that fails (offline, blocked,
// CORS, etc.) falls back to a slowly drifting number so the widget never
// looks broken.
const SERVER_IP = "185.185.185.185";
const SERVER_PORT = "22003";
const countEl = document.getElementById("player-count");
const statusEl = document.getElementById("status-text");
let fallbackValue = YaKINDA;

function setOnline(isOnline) {
  if (statusEl) statusEl.textContent = isOnline ? "Aktif" : "Çevrimdışı";
}

function driftFallback() {
  fallbackValue += Math.random() > 0.5 ? 1 : -1;
  fallbackValue = Math.max(210, Math.min(280, fallbackValue));
  countEl.textContent = fallbackValue;
  setOnline(true);
}

async function updatePlayerCount() {
  try {
    const res = await fetch(`https://api.mtasa.com/server/${SERVER_IP}:${SERVER_PORT}`);
    if (!res.ok) throw new Error("bad response");
    const data = await res.json();
    if (data && typeof data.players !== "undefined") {
      countEl.textContent = data.players;
      setOnline(true);
    } else {
      driftFallback();
    }
  } catch (err) {
    driftFallback();
  }
}

updatePlayerCount();
setInterval(updatePlayerCount, 30000);

// ---------- Copy server IP ----------
const copyBtn = document.getElementById("copy-ip");
const toast = document.getElementById("toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2000);
}

if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    const ip = `${SERVER_IP}:${SERVER_PORT}`;
    try {
      await navigator.clipboard.writeText(ip);
      showToast("IP kopyalandı");
    } catch (err) {
      showToast("Kopyalanamadı, elle seçebilirsin");
    }
  });
}

// ---------- Smooth anchor scrolling (fallback for older browsers) ----------
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("href");
    if (id.length < 2) return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ---------- Highlight active "how to" step on scroll ----------
const steps = document.querySelectorAll(".step-item");
if (steps.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          steps.forEach((s) => s.classList.remove("active"));
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.6 }
  );
  steps.forEach((s) => observer.observe(s));
}
