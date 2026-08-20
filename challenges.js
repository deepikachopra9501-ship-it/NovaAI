/* =========================================================
   NOVA AI — CHALLENGES.JS
   Handles the Coding Challenges page only:
   - renders challenge cards from an array
   - search box filtering
   - difficulty filter pills
   - mark-as-complete toggle, persisted in localStorage

   Plain JavaScript (var, function declarations), matching
   the rest of the project.
   ========================================================= */

var challengeData = [
  { id: 'two-sum', title: 'Two Sum', difficulty: 'Easy', description: 'Find two numbers in an array that add up to a target value.' },
  { id: 'reverse-string', title: 'Reverse String', difficulty: 'Easy', description: 'Reverse a string in place using two-pointer technique.' },
  { id: 'valid-parentheses', title: 'Valid Parentheses', difficulty: 'Easy', description: 'Check whether brackets in a string are correctly matched.' },
  { id: 'max-subarray', title: 'Maximum Subarray', difficulty: 'Medium', description: 'Find the contiguous subarray with the largest sum.' },
  { id: 'merge-intervals', title: 'Merge Intervals', difficulty: 'Medium', description: 'Merge all overlapping intervals in a list.' },
  { id: 'binary-tree-paths', title: 'Binary Tree Paths', difficulty: 'Medium', description: 'Return all root-to-leaf paths in a binary tree.' },
  { id: 'word-ladder', title: 'Word Ladder', difficulty: 'Hard', description: 'Find the shortest transformation sequence between two words.' },
  { id: 'trapping-rain-water', title: 'Trapping Rain Water', difficulty: 'Hard', description: 'Compute how much water can be trapped after raining.' }
];

var activeFilter = 'All';
var searchTerm = '';

function getCompletedIds() {
  var raw = localStorage.getItem('novaAiCompletedChallenges');
  if (!raw) {
    return [];
  }
  try {
    return JSON.parse(raw);
  } catch (error) {
    return [];
  }
}

function saveCompletedIds(ids) {
  localStorage.setItem('novaAiCompletedChallenges', JSON.stringify(ids));
}

function toggleCompleted(id) {
  var completed = getCompletedIds();
  var index = completed.indexOf(id);

  if (index === -1) {
    completed.push(id);
  } else {
    completed.splice(index, 1);
  }

  saveCompletedIds(completed);
  renderChallenges();
}

function badgeClassForDifficulty(difficulty) {
  if (difficulty === 'Easy') {
    return 'badge-easy';
  }
  if (difficulty === 'Medium') {
    return 'badge-medium';
  }
  return 'badge-hard';
}

function renderChallenges() {
  var listEl = document.getElementById('challengeList');
  var completed = getCompletedIds();
  var html = '';

  for (var i = 0; i < challengeData.length; i++) {
    var item = challengeData[i];

    var matchesFilter = activeFilter === 'All' || item.difficulty === activeFilter;
    var matchesSearch = item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;

    if (!matchesFilter || !matchesSearch) {
      continue;
    }

    var isDone = completed.indexOf(item.id) !== -1;
    var rowClass = isDone ? 'card challenge-card challenge-row is-done' : 'card challenge-card challenge-row';
    var buttonLabel = isDone ? 'Completed ✓' : 'Solve';
    var buttonClass = isDone ? 'btn btn-secondary btn-sm' : 'btn btn-primary btn-sm';

    html = html + '<div class="' + rowClass + '">';
    html = html + '<div>';
    html = html + '<span class="badge ' + badgeClassForDifficulty(item.difficulty) + '">' + item.difficulty + '</span>';
    html = html + '<h4 style="margin-top: 0.5rem;">' + item.title + '</h4>';
    html = html + '<p class="text-small" style="margin-top: 0.35rem;">' + item.description + '</p>';
    html = html + '</div>';
    html = html + '<button type="button" class="' + buttonClass + '" data-id="' + item.id + '">' + buttonLabel + '</button>';
    html = html + '</div>';
  }

  if (html === '') {
    html = '<p class="text-small">No challenges match your search/filter.</p>';
  }

  listEl.innerHTML = html;

  var buttons = listEl.querySelectorAll('[data-id]');
  for (var j = 0; j < buttons.length; j++) {
    buttons[j].addEventListener('click', function () {
      toggleCompleted(this.getAttribute('data-id'));
    });
  }
}

function initFilters() {
  var pills = document.querySelectorAll('.filter-pill');
  for (var i = 0; i < pills.length; i++) {
    pills[i].addEventListener('click', function () {
      for (var j = 0; j < pills.length; j++) {
        pills[j].classList.remove('is-active');
      }
      this.classList.add('is-active');
      activeFilter = this.getAttribute('data-filter');
      renderChallenges();
    });
  }
}

function initSearch() {
  var searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', function () {
    searchTerm = searchInput.value;
    renderChallenges();
  });
}

document.addEventListener('DOMContentLoaded', function () {
  initFilters();
  initSearch();
  renderChallenges();
});