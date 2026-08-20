/* =========================================================
   NOVA AI — DASHBOARD.JS
   Handles the Dashboard page only:
   - reads the simulated session saved by auth.js
   - shows the logged-in user's email in the greeting
   - wires up the logout button

   Plain JavaScript (var, function declarations), matching
   the rest of the project.
   ========================================================= */

function loadSession() {
  var raw = null;
  try {
    raw = localStorage.getItem('novaAiSession');
  } catch (error) {
    return null;
  }
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
}

function applyGreeting() {
  var session = loadSession();
  var greetingEl = document.getElementById('greetingText');

  if (!session || !greetingEl) {
    return;
  }

  var namePart = session.email.split('@')[0];
  greetingEl.textContent = 'Good Morning, ' + namePart;
}

function initLogout() {
  var logoutBtn = document.getElementById('logoutBtn');
  if (!logoutBtn) {
    return;
  }

  logoutBtn.addEventListener('click', function () {
    try {
      localStorage.removeItem('novaAiSession');
    } catch (error) {
      /* localStorage unavailable — just navigate away */
    }
    window.location.href = 'login.html';
  });
}

/* -----------------------------
   Progress bar animation
   Each .mini-progress-fill starts at 0% and animates up to
   its data-target-width once the page has rendered, giving
   the stat cards a small "loading in" feel.
------------------------------ */
function initProgressBars() {
  var fills = document.querySelectorAll('.mini-progress-fill');
  if (fills.length === 0) {
    return;
  }

  window.setTimeout(function () {
    for (var i = 0; i < fills.length; i++) {
      var target = fills[i].getAttribute('data-target-width');
      fills[i].style.width = target;
    }
  }, 200);
}

document.addEventListener('DOMContentLoaded', function () {
  applyGreeting();
  initLogout();
  initProgressBars();
});