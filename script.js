const header = document.querySelector(".topbar");

function updateHeaderShadow() {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
}

updateHeaderShadow();
window.addEventListener("scroll", updateHeaderShadow, { passive: true });

const countdown = document.querySelector("[data-countdown]");
const countdownHours = document.querySelector("[data-hours]");
const countdownMinutes = document.querySelector("[data-minutes]");
const countdownSeconds = document.querySelector("[data-seconds]");

function getCountdownDeadline() {
  const storageKey = "metodo3c_offer_deadline";
  const now = Date.now();
  const savedDeadline = Number(localStorage.getItem(storageKey));

  if (savedDeadline > now) return savedDeadline;

  const nextDeadline = now + 20 * 60 * 1000;
  localStorage.setItem(storageKey, String(nextDeadline));
  return nextDeadline;
}

function updateCountdown() {
  if (!countdown || !countdownHours || !countdownMinutes || !countdownSeconds) return;

  const deadline = getCountdownDeadline();
  const remaining = Math.max(0, deadline - Date.now());
  const totalSeconds = Math.floor(remaining / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  countdownHours.textContent = String(hours).padStart(2, "0");
  countdownMinutes.textContent = String(minutes).padStart(2, "0");
  countdownSeconds.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
window.setInterval(updateCountdown, 1000);
