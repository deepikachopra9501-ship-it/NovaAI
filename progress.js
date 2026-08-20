/* =========================================================
   NOVA AI — PROGRESS.JS
   Handles the Progress Tracker page only:
   - animates circular progress rings from 0 to their target
   - animates the weekly activity bar chart

   Plain JavaScript (var, function declarations), matching
   the rest of the project.
   ========================================================= */

function animateRing(ringEl) {
  var target = parseInt(ringEl.getAttribute('data-ring-target'), 10);
  var labelEl = ringEl.querySelector('.progress-ring-inner span');
  var current = 0;

  var timer = window.setInterval(function () {
    current = current + 2;
    if (current >= target) {
      current = target;
      window.clearInterval(timer);
    }
    ringEl.style.setProperty('--ring-pct', current);
    labelEl.textContent = current + '%';
  }, 20);
}

function initRings() {
  var rings = document.querySelectorAll('.progress-ring[data-ring-target]');
  for (var i = 0; i < rings.length; i++) {
    animateRing(rings[i]);
  }
}

function initWeekBars() {
  var bars = document.querySelectorAll('.week-bar[data-height]');
  window.setTimeout(function () {
    for (var i = 0; i < bars.length; i++) {
      bars[i].style.height = bars[i].getAttribute('data-height');
    }
  }, 150);
}

document.addEventListener('DOMContentLoaded', function () {
  initRings();
  initWeekBars();
});