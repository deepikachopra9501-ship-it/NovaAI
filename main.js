/* =========================================================
   NOVA AI — MAIN.JS
   Shared utilities used across every page:
   - sticky / scrolled navbar state
   - mobile hamburger menu toggle
   - dashboard sidebar toggle (mobile off-canvas)
   - reusable toast notification helper

   Written in plain JavaScript on purpose (var, function
   declarations, string concatenation) rather than ES6+
   syntax such as let/const, arrow functions or template
   literals.
   ========================================================= */

/* -----------------------------
   1. STICKY NAVBAR
------------------------------ */
function initNavbarScroll() {
  var navbar = document.querySelector('.navbar');
  if (!navbar) {
    return;
  }

  function handleScroll() {
    if (window.scrollY > 12) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();
}

/* -----------------------------
   2. MOBILE NAV TOGGLE
------------------------------ */
function initMobileNav() {
  var toggleBtn = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');

  if (!toggleBtn || !navLinks) {
    return;
  }

  toggleBtn.addEventListener('click', function () {
    var isOpen = navLinks.classList.toggle('is-open');
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  var navLinkItems = navLinks.querySelectorAll('a');
  for (var i = 0; i < navLinkItems.length; i++) {
    navLinkItems[i].addEventListener('click', function () {
      navLinks.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  }
}

/* -----------------------------
   3. SIDEBAR TOGGLE (dashboard-family pages)
------------------------------ */
function initSidebarToggle() {
  var sidebar = document.querySelector('.sidebar');
  var openBtn = document.querySelector('[data-sidebar-open]');
  var backdrop = document.querySelector('.sidebar-backdrop');

  if (!sidebar || !openBtn || !backdrop) {
    return;
  }

  function openSidebar() {
    sidebar.classList.add('is-open');
    backdrop.classList.add('is-visible');
  }

  function closeSidebar() {
    sidebar.classList.remove('is-open');
    backdrop.classList.remove('is-visible');
  }

  openBtn.addEventListener('click', openSidebar);
  backdrop.addEventListener('click', closeSidebar);
}

/* -----------------------------
   4. TOAST NOTIFICATION HELPER
   Usage: showToast('Profile saved', 'success');
   Reused later by auth.js, profile.js, challenges.js, etc.
------------------------------ */
function ensureToastStack() {
  var stack = document.querySelector('.toast-stack');
  if (!stack) {
    stack = document.createElement('div');
    stack.className = 'toast-stack';
    document.body.appendChild(stack);
  }
  return stack;
}

function showToast(message, type) {
  var stack = ensureToastStack();
  var toast = document.createElement('div');
  var toastType = type ? type : 'default';

  toast.className = 'toast toast-' + toastType;
  toast.setAttribute('role', 'status');
  toast.textContent = message;

  stack.appendChild(toast);

  window.setTimeout(function () {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-8px)';
    toast.style.transition = 'opacity 200ms ease, transform 200ms ease';
    window.setTimeout(function () {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 220);
  }, 3200);
}

/* -----------------------------
   5. SCROLL-REVEAL ANIMATION
   Any element with class="reveal" fades/slides into place
   the first time it enters the viewport. Used throughout
   the landing page sections.
------------------------------ */
function initScrollReveal() {
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length === 0) {
    return;
  }

  if (!('IntersectionObserver' in window)) {
    for (var i = 0; i < revealEls.length; i++) {
      revealEls[i].classList.add('is-visible');
    }
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    for (var j = 0; j < entries.length; j++) {
      var entry = entries[j];
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.15 });

  for (var k = 0; k < revealEls.length; k++) {
    observer.observe(revealEls[k]);
  }
}

/* -----------------------------
   6. TERMINAL TYPING EFFECT
   Types out a few lines inside the featured "Resume
   Analyzer" card once it scrolls into view. Ties the
   visual to the coding-mentor brand.
------------------------------ */
function typeTerminalLines(element) {
  var lines = [
    '> analyzing resume.pdf',
    'score: 85/100',
    'strengths: 3 found',
    'improve: 2 suggestions'
  ];
  var completedLines = [];
  var lineIndex = 0;
  var charIndex = 0;

  function render() {
    var partial = lineIndex < lines.length ? lines[lineIndex].substring(0, charIndex) : '';
    element.textContent = completedLines.concat([partial]).join('\n');
  }

  function typeStep() {
    if (lineIndex >= lines.length) {
      return;
    }
    var currentLine = lines[lineIndex];

    if (charIndex < currentLine.length) {
      charIndex = charIndex + 1;
      render();
      window.setTimeout(typeStep, 28);
    } else {
      completedLines.push(currentLine);
      lineIndex = lineIndex + 1;
      charIndex = 0;
      window.setTimeout(typeStep, 380);
    }
  }

  typeStep();
}

function initTerminalTyping() {
  var terminalEl = document.getElementById('terminalTypedLine');
  if (!terminalEl) {
    return;
  }

  if (!('IntersectionObserver' in window)) {
    typeTerminalLines(terminalEl);
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        typeTerminalLines(terminalEl);
        observer.unobserve(terminalEl);
      }
    }
  }, { threshold: 0.4 });

  observer.observe(terminalEl);
}

/* -----------------------------
   7. INIT ON LOAD
------------------------------ */
document.addEventListener('DOMContentLoaded', function () {
  initNavbarScroll();
  initMobileNav();
  initSidebarToggle();
  initScrollReveal();
  initTerminalTyping();
});