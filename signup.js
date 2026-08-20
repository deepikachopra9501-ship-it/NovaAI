/* =========================================================
   NOVA AI — SIGNUP.JS
   Handles the Signup page only:
   - required-field, email format, password length, and
     confirm-password validation
   - simulated account creation -> redirects to dashboard

   Plain JavaScript (var, function declarations), matching
   the rest of the project.
   ========================================================= */

function isValidSignupEmail(value) {
  var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(value);
}

function markInvalid(inputEl, errorEl) {
  inputEl.classList.add('is-invalid');
  inputEl.classList.remove('is-valid');
  errorEl.classList.add('is-visible');
}

function markValid(inputEl, errorEl) {
  inputEl.classList.remove('is-invalid');
  inputEl.classList.add('is-valid');
  errorEl.classList.remove('is-visible');
}

function initSignupForm() {
  var form = document.getElementById('signupForm');
  if (!form) {
    return;
  }

  var nameInput = document.getElementById('signupName');
  var emailInput = document.getElementById('signupEmail');
  var passwordInput = document.getElementById('signupPassword');
  var confirmInput = document.getElementById('signupConfirmPassword');
  var collegeInput = document.getElementById('signupCollege');
  var semesterInput = document.getElementById('signupSemester');

  var submitBtn = document.getElementById('signupSubmitBtn');
  var submitBtnText = document.getElementById('signupBtnText');
  var messageEl = document.getElementById('signupFormMessage');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var isFormValid = true;

    if (nameInput.value.trim() === '') {
      markInvalid(nameInput, document.getElementById('signupNameError'));
      isFormValid = false;
    } else {
      markValid(nameInput, document.getElementById('signupNameError'));
    }

    if (!isValidSignupEmail(emailInput.value.trim())) {
      markInvalid(emailInput, document.getElementById('signupEmailError'));
      isFormValid = false;
    } else {
      markValid(emailInput, document.getElementById('signupEmailError'));
    }

    if (passwordInput.value.length < 6) {
      markInvalid(passwordInput, document.getElementById('signupPasswordError'));
      isFormValid = false;
    } else {
      markValid(passwordInput, document.getElementById('signupPasswordError'));
    }

    if (confirmInput.value !== passwordInput.value || confirmInput.value === '') {
      markInvalid(confirmInput, document.getElementById('signupConfirmError'));
      isFormValid = false;
    } else {
      markValid(confirmInput, document.getElementById('signupConfirmError'));
    }

    if (collegeInput.value.trim() === '') {
      markInvalid(collegeInput, document.getElementById('signupCollegeError'));
      isFormValid = false;
    } else {
      markValid(collegeInput, document.getElementById('signupCollegeError'));
    }

    if (semesterInput.value.trim() === '') {
      markInvalid(semesterInput, document.getElementById('signupSemesterError'));
      isFormValid = false;
    } else {
      markValid(semesterInput, document.getElementById('signupSemesterError'));
    }

    if (!isFormValid) {
      messageEl.textContent = 'Please fix the errors above.';
      messageEl.style.color = 'var(--danger)';
      return;
    }

    submitBtn.disabled = true;
    submitBtnText.textContent = 'Creating account...';
    messageEl.textContent = '';

    window.setTimeout(function () {
      var profile = {
        fullName: nameInput.value.trim(),
        email: emailInput.value.trim(),
        college: collegeInput.value.trim(),
        semester: semesterInput.value.trim(),
        github: '',
        linkedin: '',
        bio: ''
      };
      var session = { email: emailInput.value.trim(), loggedInAt: new Date().toISOString() };

      localStorage.setItem('novaAiProfile', JSON.stringify(profile));
      localStorage.setItem('novaAiSession', JSON.stringify(session));

      submitBtn.disabled = false;
      submitBtnText.textContent = 'Create Account';
      messageEl.textContent = 'Account created. Redirecting to your dashboard...';
      messageEl.style.color = 'var(--success)';

      window.setTimeout(function () {
        window.location.href = 'dashboard.html';
      }, 800);
    }, 1200);
  });
}

document.addEventListener('DOMContentLoaded', initSignupForm);