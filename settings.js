/* =========================================================
   NOVA AI — SETTINGS.JS
   Handles the Settings page only:
   - polished light/dark theme picker (in addition to the
     navbar/sidebar toggle button from theme.js)
   - notification / sound / weekly-report toggles, saved to
     localStorage

   Plain JavaScript (var, function declarations), matching
   the rest of the project.
   ========================================================= */

function highlightSelectedTheme() {
  var current = document.documentElement.getAttribute('data-theme') || 'light';
  var lightOption = document.getElementById('lightThemeOption');
  var darkOption = document.getElementById('darkThemeOption');

  lightOption.classList.toggle('is-selected', current === 'light');
  darkOption.classList.toggle('is-selected', current === 'dark');
}

function initThemePicker() {
  var options = document.querySelectorAll('[data-theme-option]');

  for (var i = 0; i < options.length; i++) {
    options[i].addEventListener('click', function () {
      var chosenTheme = this.getAttribute('data-theme-option');
      document.documentElement.setAttribute('data-theme', chosenTheme);

      try {
        localStorage.setItem('novaAiTheme', chosenTheme);
      } catch (error) {
        /* localStorage unavailable */
      }

      highlightSelectedTheme();
    });
  }

  highlightSelectedTheme();
}

function getStoredPrefs() {
  var raw = null;
  try {
    raw = localStorage.getItem('novaAiPrefs');
  } catch (error) {
    return { notifications: true, sound: true, weeklyReports: false };
  }
  if (!raw) {
    return { notifications: true, sound: true, weeklyReports: false };
  }
  try {
    return JSON.parse(raw);
  } catch (error) {
    return { notifications: true, sound: true, weeklyReports: false };
  }
}

function savePrefs(prefs) {
  try {
    localStorage.setItem('novaAiPrefs', JSON.stringify(prefs));
  } catch (error) {
    /* localStorage unavailable — preferences just won't persist */
  }
}

function initPreferenceToggles() {
  var prefs = getStoredPrefs();

  var notificationsToggle = document.getElementById('notificationsToggle');
  var soundToggle = document.getElementById('soundToggle');
  var weeklyReportsToggle = document.getElementById('weeklyReportsToggle');

  notificationsToggle.checked = prefs.notifications;
  soundToggle.checked = prefs.sound;
  weeklyReportsToggle.checked = prefs.weeklyReports;

  function persist() {
    savePrefs({
      notifications: notificationsToggle.checked,
      sound: soundToggle.checked,
      weeklyReports: weeklyReportsToggle.checked
    });
    showToast('Preferences saved', 'success');
  }

  notificationsToggle.addEventListener('change', persist);
  soundToggle.addEventListener('change', persist);
  weeklyReportsToggle.addEventListener('change', persist);
}

document.addEventListener('DOMContentLoaded', function () {
  initThemePicker();
  initPreferenceToggles();
});