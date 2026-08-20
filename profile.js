/* =========================================================
   NOVA AI — PROFILE.JS
   Handles the Profile page only:
   - toggles edit mode (enables/disables the form fields)
   - saves profile data to localStorage on submit
   - loads any previously saved profile data on page load

   Plain JavaScript (var, function declarations), matching
   the rest of the project.
   ========================================================= */

var profileFieldIds = ['fullName', 'email', 'college', 'semester', 'github', 'linkedin', 'bio'];

function loadProfile() {
  var raw = localStorage.getItem('novaAiProfile');
  if (!raw) {
    return;
  }

  var data = null;
  try {
    data = JSON.parse(raw);
  } catch (error) {
    return;
  }

  for (var i = 0; i < profileFieldIds.length; i++) {
    var id = profileFieldIds[i];
    if (data[id] !== undefined) {
      document.getElementById(id).value = data[id];
    }
  }

  if (data.fullName) {
    document.getElementById('profileNameDisplay').textContent = data.fullName;
    document.getElementById('avatarInitials').textContent = data.fullName.charAt(0).toUpperCase();
  }

  if (data.college || data.semester) {
    var collegeText = (data.college || '') + ' • Semester ' + (data.semester || '');
    document.getElementById('profileCollegeDisplay').textContent = collegeText;
  }
}

function setEditMode(isEditing) {
  document.body.classList.toggle('is-editing', isEditing);

  for (var i = 0; i < profileFieldIds.length; i++) {
    document.getElementById(profileFieldIds[i]).disabled = !isEditing;
  }

  document.getElementById('saveProfileBtn').style.display = isEditing ? 'inline-flex' : 'none';
  document.getElementById('editProfileBtn').textContent = isEditing ? 'Cancel' : 'Edit Profile';
}

function initEditToggle() {
  var editBtn = document.getElementById('editProfileBtn');
  var isEditing = false;

  editBtn.addEventListener('click', function () {
    isEditing = !isEditing;
    setEditMode(isEditing);
  });

  document.getElementById('profileForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var data = {};
    for (var i = 0; i < profileFieldIds.length; i++) {
      var id = profileFieldIds[i];
      data[id] = document.getElementById(id).value;
    }

    localStorage.setItem('novaAiProfile', JSON.stringify(data));

    document.getElementById('profileNameDisplay').textContent = data.fullName;
    document.getElementById('avatarInitials').textContent = data.fullName.charAt(0).toUpperCase();
    document.getElementById('profileCollegeDisplay').textContent = data.college + ' • Semester ' + data.semester;

    isEditing = false;
    setEditMode(false);
    showToast('Profile saved', 'success');
  });
}

document.addEventListener('DOMContentLoaded', function () {
  loadProfile();
  initEditToggle();
});