/* =========================================================
   NOVA AI — AUTH.JS
   Handles the Login page only:
   - show/hide password
   - client-side validation (required, email format, length)
   - inline error messages
   - simulated login (no real backend yet)

   Written in plain JavaScript (var, function declarations,
   string concatenation), matching the rest of the project.
   ========================================================= */

function isValidEmail(value) {
  var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(value);
}

function setFieldError(inputEl, errorEl, message) {
  inputEl.classList.add('is-invalid');
  inputEl.classList.remove('is-valid');
  errorEl.textContent = message;
  errorEl.classList.add('is-visible');
}

function clearFieldError(inputEl, errorEl) {
  inputEl.classList.remove('is-invalid');
  inputEl.classList.add('is-valid');
  errorEl.classList.remove('is-visible');
}

function initPasswordToggle() {
  var toggleBtn = document.getElementById('togglePassword');
  var passwordInput = document.getElementById('loginPassword');

  if (!toggleBtn || !passwordInput) {
    return;
  }

  toggleBtn.addEventListener('click', function () {
    var isPassword = passwordInput.getAttribute('type') === 'password';
    passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
    toggleBtn.textContent = isPassword ? 'Hide' : 'Show';
    toggleBtn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
  });
}

function initForgotPassword() {
  var link = document.getElementById('forgotPasswordLink');
  var messageEl = document.getElementById('loginFormMessage');

  if (!link) {
    return;
  }

  link.addEventListener('click', function (event) {
    event.preventDefault();
    if (messageEl) {
      messageEl.textContent = 'Password reset is not available in this preview build.';
      messageEl.style.color = 'var(--text-muted)';
    }
    showToast('Password reset is not available yet', 'default');
  });
}

function initLoginForm() {
  var form = document.getElementById('loginForm');
  if (!form) {
    return;
  }

  var emailInput = document.getElementById('loginEmail');
  var emailError = document.getElementById('loginEmailError');
  var passwordInput = document.getElementById('loginPassword');
  var passwordError = document.getElementById('loginPasswordError');
  var submitBtn = document.getElementById('loginSubmitBtn');
  var submitBtnText = document.getElementById('loginBtnText');
  var messageEl = document.getElementById('loginFormMessage');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var emailValue = emailInput.value.trim();
    var passwordValue = passwordInput.value;
    var isFormValid = true;

    if (emailValue === '' || !isValidEmail(emailValue)) {
      setFieldError(emailInput, emailError, 'Please enter a valid email address.');
      isFormValid = false;
    } else {
      clearFieldError(emailInput, emailError);
    }

    if (passwordValue.length < 6) {
      setFieldError(passwordInput, passwordError, 'Password must be at least 6 characters.');
      isFormValid = false;
    } else {
      clearFieldError(passwordInput, passwordError);
    }

    if (!isFormValid) {
      messageEl.textContent = 'Please fix the errors above.';
      messageEl.style.color = 'var(--danger)';
      return;
    }

    /* Simulate an async login call */
    submitBtn.disabled = true;
    submitBtnText.textContent = 'Logging in...';
    messageEl.textContent = '';

    window.setTimeout(function () {
      var userProfile = {
        email: emailValue,
        loggedInAt: new Date().toISOString()
      };

      try {
        localStorage.setItem('novaAiSession', JSON.stringify(userProfile));
      } catch (error) {
        /* localStorage unavailable — login still simulates fine this session */
      }

      submitBtn.disabled = false;
      submitBtnText.textContent = 'Log In';
      messageEl.textContent = 'Login successful. Redirecting to your dashboard...';
      messageEl.style.color = 'var(--success)';

      showToast('Welcome back to Nova AI', 'success');

      window.setTimeout(function () {
        window.location.href = 'dashboard.html';
      }, 900);
    }, 1200);
  });

  /* Clear an error as soon as the user starts fixing it */
  emailInput.addEventListener('input', function () {
    if (emailInput.classList.contains('is-invalid') && isValidEmail(emailInput.value.trim())) {
      clearFieldError(emailInput, emailError);
    }
  });

  passwordInput.addEventListener('input', function () {
    if (passwordInput.classList.contains('is-invalid') && passwordInput.value.length >= 6) {
      clearFieldError(passwordInput, passwordError);
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  initPasswordToggle();
  initForgotPassword();
  initLoginForm();
});