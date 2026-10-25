
import { useState } from "react";
import "./Profile.css";

const defaultProfile = {
  fullName: "",
  email: "",
  college: "",
  semester: "",
  github: "",
  linkedin: "",
  bio: "",
  skills: ["JavaScript", "React", "Python", "Node.js"],
};

function readProfile() {
  try {
    const saved = localStorage.getItem("novaAiProfile");
    return saved
      ? { ...defaultProfile, ...JSON.parse(saved) }
      : defaultProfile;
  } catch {
    return defaultProfile;
  }
}

function Profile() {
  const [profile, setProfile] = useState(readProfile);
  const [draft, setDraft] = useState(readProfile);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");

  function startEditing() {
    setDraft({ ...profile, skills: [...profile.skills] });
    setMessage("");
    setEditing(true);
  }

  function cancelEditing() {
    setDraft({ ...profile, skills: [...profile.skills] });
    setEditing(false);
    setMessage("");
  }

  function updateField(event) {
    const { name, value } = event.target;
    setDraft((previous) => ({ ...previous, [name]: value }));
  }

  function saveProfile(event) {
    event.preventDefault();

    const cleaned = {
      ...draft,
      fullName: draft.fullName.trim(),
      email: draft.email.trim(),
      college: draft.college.trim(),
      semester: draft.semester.trim(),
      github: draft.github.trim(),
      linkedin: draft.linkedin.trim(),
      bio: draft.bio.trim(),
    };

    try {
      localStorage.setItem("novaAiProfile", JSON.stringify(cleaned));
      setProfile(cleaned);
      setDraft(cleaned);
      setEditing(false);
      setMessage("Profile saved successfully!");
    } catch {
      setMessage("Could not save. Please check browser storage.");
    }
  }

  const displayName = profile.fullName || "Your Name";
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  function field(label, name, placeholder, type = "text") {
    return (
      <div className="profile-field" key={name}>
        <label htmlFor={name}>{label}</label>
        <input
          id={name}
          name={name}
          type={type}
          value={draft[name]}
          placeholder={placeholder}
          onChange={updateField}
          disabled={!editing}
          required={name === "fullName" || name === "email"}
        />
      </div>
    );
  }

  return (
    <div className="profile-page">
      <header className="profile-page-heading">
        <span className="profile-eyebrow">YOUR SPACE</span>
        <h1>My Profile</h1>
        <p>Make your profile reflect your skills and ambitions.</p>
      </header>

      <section className="profile-hero">
        <div className="profile-avatar">{initials}</div>

        <div className="profile-hero-info">
          <span className="profile-status">
            <span /> YOUR PROFILE
          </span>
          <h2>{displayName}</h2>
          <p>
            {[profile.college, profile.semester && `Semester ${profile.semester}`]
              .filter(Boolean)
              .join(" · ") || "Add your college and semester"}
          </p>
          <span className="profile-email">
            {profile.email || "Add your email address"}
          </span>
        </div>

        {!editing && (
          <button
            className="profile-btn profile-edit-btn"
            onClick={startEditing}
            type="button"
          >
            ✎ Edit Profile
          </button>
        )}
      </section>

      <form onSubmit={saveProfile}>
        <section className="profile-card">
          <div className="profile-card-heading">
            <div>
              <span className="profile-section-label">PERSONAL DETAILS</span>
              <h3>About You</h3>
              <p>Your academic and contact information.</p>
            </div>
            <span className="profile-card-icon">✦</span>
          </div>

          <div className="profile-field-grid">
            {field("Full Name", "fullName", "Enter your full name")}
            {field("Email Address", "email", "you@example.com", "email")}
            {field("College / University", "college", "Your college name")}
            {field("Current Semester", "semester", "e.g. 3")}
            {field("GitHub Profile", "github", "github.com/username")}
            {field("LinkedIn Profile", "linkedin", "linkedin.com/in/username")}
          </div>

          <div className="profile-field profile-bio-field">
            <label htmlFor="bio">About Me</label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              value={draft.bio}
              onChange={updateField}
              disabled={!editing}
              placeholder="Tell us about your interests, goals and what you're learning..."
            />
            <span className="profile-field-hint">
              Share a short introduction about yourself.
            </span>
          </div>
        </section>

        <section className="profile-card">
          <div className="profile-card-heading">
            <div>
              <span className="profile-section-label">YOUR TOOLKIT</span>
              <h3>Skills & Technologies</h3>
              <p>Technologies currently displayed on your profile.</p>
            </div>
            <span className="profile-card-icon">⌘</span>
          </div>

          <div className="profile-skills">
            {profile.skills.map((skill) => (
              <span className="profile-skill" key={skill}>
                <span>✦</span> {skill}
              </span>
            ))}
          </div>
          <p className="profile-field-hint">
            These are sample skill tags; editing the profile does not change them.
          </p>
        </section>

        {editing && (
          <div className="profile-actions">
            <button
              type="button"
              className="profile-btn profile-cancel-btn"
              onClick={cancelEditing}
            >
              Cancel
            </button>
            <button type="submit" className="profile-btn profile-save-btn">
              Save Changes ↗
            </button>
          </div>
        )}

        {message && (
          <p className="profile-message" role="status">
            {message}
          </p>
        )}
      </form>

      <p className="profile-privacy">
        <span>🔒</span> Your profile details are saved in this browser.
      </p>
    </div>
  );
}

export default Profile;
