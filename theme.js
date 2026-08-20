/* =========================================================
   NOVA AI — THEME.JS
   Light/dark mode toggle, shared across every page.
   Light is the default/primary theme.

   The actual theme is applied as early as possible by a
   tiny inline script in each page's <head> (to avoid a
   flash of the wrong theme). This file only wires up the
   toggle button(s) after the DOM is ready.

   Plain JavaScript (var, function declarations), matching
   the rest of the project.
   ========================================================= */

function getStoredTheme() {
  try {
    return localStorage.getItem('novaAiTheme');
  } catch (error) {
    return null;
  }
}

function storeTheme(theme) {
  try {
    localStorage.setItem('novaAiTheme', theme);
  } catch (error) {
    /* localStorage unavailable — theme just won't persist */
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);

  var toggleButtons = document.querySelectorAll('[data-theme-toggle]');
  for (var i = 0; i < toggleButtons.length; i++) {
    toggleButtons[i].textContent = theme === 'dark' ? '☀️' : '🌙';
    toggleButtons[i].setAttribute(
      'aria-label',
      theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    );
  }
}

function initThemeToggle() {
  var currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  applyTheme(currentTheme);

  var toggleButtons = document.querySelectorAll('[data-theme-toggle]');
  for (var i = 0; i < toggleButtons.length; i++) {
    toggleButtons[i].addEventListener('click', function () {
      var nowTheme = document.documentElement.getAttribute('data-theme');
      var nextTheme = nowTheme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      storeTheme(nextTheme);
    });
  }
}

document.addEventListener('DOMContentLoaded', initThemeToggle);