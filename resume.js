/* =========================================================
   NOVA AI — RESUME.JS
   Handles the Resume Analyzer page only:
   - browse / drag-and-drop file selection
   - file name preview and remove
   - simulated "analyze" step with a loading state
   - animated score ring on results

   Plain JavaScript (var, function declarations), matching
   the rest of the project.
   ========================================================= */

var selectedFileName = null;

function showFileChip(name) {
  selectedFileName = name;
  document.getElementById('fileNameLabel').textContent = name;
  document.getElementById('fileChipWrap').style.display = 'block';
  document.getElementById('analyzeBtn').style.display = 'inline-flex';
  document.getElementById('uploadZone').style.display = 'none';
}

function clearFileChip() {
  selectedFileName = null;
  document.getElementById('fileChipWrap').style.display = 'none';
  document.getElementById('analyzeBtn').style.display = 'none';
  document.getElementById('uploadZone').style.display = 'block';
  document.getElementById('resumeResults').classList.remove('is-visible');
  document.getElementById('analyzeStatus').textContent = '';
  document.getElementById('fileInput').value = '';
}

function initFileSelection() {
  var uploadZone = document.getElementById('uploadZone');
  var browseBtn = document.getElementById('browseBtn');
  var fileInput = document.getElementById('fileInput');
  var removeBtn = document.getElementById('removeFileBtn');

  if (!uploadZone) {
    return;
  }

  browseBtn.addEventListener('click', function () {
    fileInput.click();
  });

  uploadZone.addEventListener('click', function () {
    fileInput.click();
  });

  fileInput.addEventListener('change', function () {
    if (fileInput.files.length > 0) {
      showFileChip(fileInput.files[0].name);
    }
  });

  removeBtn.addEventListener('click', function () {
    clearFileChip();
  });

  uploadZone.addEventListener('dragover', function (event) {
    event.preventDefault();
    uploadZone.classList.add('is-dragover');
  });

  uploadZone.addEventListener('dragleave', function () {
    uploadZone.classList.remove('is-dragover');
  });

  uploadZone.addEventListener('drop', function (event) {
    event.preventDefault();
    uploadZone.classList.remove('is-dragover');
    if (event.dataTransfer.files.length > 0) {
      showFileChip(event.dataTransfer.files[0].name);
    }
  });
}

function animateScoreRing(targetScore) {
  var ring = document.getElementById('scoreRing');
  var label = document.getElementById('scoreRingLabel');
  var current = 0;

  var timer = window.setInterval(function () {
    current = current + 2;
    if (current >= targetScore) {
      current = targetScore;
      window.clearInterval(timer);
    }
    ring.style.setProperty('--ring-pct', current);
    label.textContent = current;
  }, 20);
}

function initAnalyzeButton() {
  var analyzeBtn = document.getElementById('analyzeBtn');
  var statusEl = document.getElementById('analyzeStatus');
  var resultsEl = document.getElementById('resumeResults');

  if (!analyzeBtn) {
    return;
  }

  analyzeBtn.addEventListener('click', function () {
    analyzeBtn.disabled = true;
    statusEl.textContent = 'Analyzing your resume...';

    window.setTimeout(function () {
      statusEl.textContent = 'Analysis complete.';
      analyzeBtn.disabled = false;
      resultsEl.classList.add('is-visible');
      animateScoreRing(85);
      resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 1400);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  initFileSelection();
  initAnalyzeButton();
});