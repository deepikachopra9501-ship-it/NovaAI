/* =========================================================
   NOVA AI — INTERVIEW.JS
   Handles the Mock Interview page only:
   - countdown timer
   - question rotation per category
   - answer submission -> reveal AI feedback panel
   - progress bar animation reused for feedback bars

   Plain JavaScript (var, function declarations), matching
   the rest of the project.
   ========================================================= */

var interviewQuestions = {
  Frontend: [
    'What is the difference between let, const and var in JavaScript?',
    'Explain the CSS box model.',
    'What is the virtual DOM?'
  ],
  Backend: [
    'What is a REST API?',
    'Explain the difference between SQL and NoSQL databases.',
    'What is middleware?'
  ],
  React: [
    'What are React hooks?',
    'Explain the component lifecycle.',
    'What is the purpose of keys in lists?'
  ],
  JavaScript: [
    'What is a closure?',
    'Explain event bubbling and capturing.',
    'What is the difference between == and ===?'
  ],
  HR: [
    'Tell me about yourself.',
    'Why do you want to work here?',
    'Describe a challenge you overcame.'
  ]
};

var currentCategory = 'Frontend';
var currentQuestionIndex = 0;
var timerSeconds = 165;
var timerInterval = null;

function formatTime(totalSeconds) {
  var minutes = Math.floor(totalSeconds / 60);
  var seconds = totalSeconds % 60;
  var secondsPadded = seconds < 10 ? '0' + seconds : String(seconds);
  return minutes + ':' + secondsPadded;
}

function startTimer() {
  if (timerInterval) {
    window.clearInterval(timerInterval);
  }
  timerSeconds = 165;
  var display = document.getElementById('timerDisplay');
  display.textContent = formatTime(timerSeconds);

  timerInterval = window.setInterval(function () {
    timerSeconds = timerSeconds - 1;
    if (timerSeconds <= 0) {
      window.clearInterval(timerInterval);
      timerSeconds = 0;
    }
    display.textContent = formatTime(timerSeconds);
  }, 1000);
}

function loadQuestion() {
  var questions = interviewQuestions[currentCategory];
  var question = questions[currentQuestionIndex % questions.length];
  document.getElementById('questionText').textContent = question;
  document.getElementById('questionNumber').textContent = currentQuestionIndex + 1;
  document.getElementById('answerInput').value = '';
  document.getElementById('feedbackPanel').classList.remove('is-visible');
  document.getElementById('feedbackPlaceholder').style.display = 'block';
  startTimer();
}

function initCategorySwitch() {
  var items = document.querySelectorAll('.category-item');
  for (var i = 0; i < items.length; i++) {
    items[i].addEventListener('click', function () {
      for (var j = 0; j < items.length; j++) {
        items[j].classList.remove('is-active');
      }
      this.classList.add('is-active');
      currentCategory = this.getAttribute('data-category');
      currentQuestionIndex = 0;
      loadQuestion();
    });
  }
}

function initSkip() {
  var skipBtn = document.getElementById('skipBtn');
  skipBtn.addEventListener('click', function () {
    currentQuestionIndex = currentQuestionIndex + 1;
    loadQuestion();
  });
}

function revealFeedback() {
  document.getElementById('feedbackPlaceholder').style.display = 'none';
  var panel = document.getElementById('feedbackPanel');
  panel.classList.add('is-visible');

  var fills = panel.querySelectorAll('.mini-progress-fill');
  window.setTimeout(function () {
    for (var i = 0; i < fills.length; i++) {
      fills[i].style.width = fills[i].getAttribute('data-target-width');
    }
  }, 100);
}

function initSubmit() {
  var submitBtn = document.getElementById('submitAnswerBtn');
  submitBtn.addEventListener('click', function () {
    if (timerInterval) {
      window.clearInterval(timerInterval);
    }
    revealFeedback();
    showToast('Answer submitted', 'success');
  });
}

document.addEventListener('DOMContentLoaded', function () {
  initCategorySwitch();
  initSkip();
  initSubmit();
  loadQuestion();
});