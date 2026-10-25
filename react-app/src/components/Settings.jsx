
import { useState } from "react";
import "./Settings.css";

const defaults = {
  notifications: true,
  sound: true,
  streaks: true,
  weeklyReports: false,
  language: "English",
  responseStyle: "Balanced",
  codingLanguage: "Java",
  dailyGoal: "60 minutes",
  difficulty: "Medium",
  compact: false,
  animations: true,
};

function getPrefs() {
  try {
    return { ...defaults, ...JSON.parse(localStorage.getItem("novaAiSettings") || "{}") };
  } catch {
    return { ...defaults };
  }
}

function Settings() {
  const [theme, setTheme] = useState(
    localStorage.getItem("novaAiTheme") || "light"
  );
  const [prefs, setPrefs] = useState(getPrefs);
  const [accent, setAccent] = useState(
    localStorage.getItem("novaAiAccent") || "#6978e8"
  );
  const [saved, setSaved] = useState(false);

  function update(key, value) {
    const next = { ...prefs, [key]: value };
    setPrefs(next);
    localStorage.setItem("novaAiSettings", JSON.stringify(next));
    setSaved(false);
  }

  function changeTheme(value) {
    setTheme(value);
    localStorage.setItem("novaAiTheme", value);
    document.documentElement.setAttribute("data-theme", value);
  }

  function changeAccent(value) {
    setAccent(value);
    localStorage.setItem("novaAiAccent", value);
    document.documentElement.style.setProperty("--settings-accent", value);
  }

  function resetSettings() {
    setPrefs({ ...defaults });
    setTheme("light");
    setAccent("#6978e8");
    localStorage.setItem("novaAiSettings", JSON.stringify(defaults));
    localStorage.setItem("novaAiTheme", "light");
    localStorage.setItem("novaAiAccent", "#6978e8");
    document.documentElement.setAttribute("data-theme", "light");
    document.documentElement.style.setProperty("--settings-accent", "#6978e8");
    setSaved(true);
  }

  function toggle(key) {
    return (
      <button
        type="button"
        role="switch"
        aria-checked={prefs[key]}
        className={`settings-switch ${prefs[key] ? "on" : ""}`}
        onClick={() => update(key, !prefs[key])}
      >
        <span />
      </button>
    );
  }

  return (
    <div className="settings-page">
      <header className="settings-heading">
        <span className="settings-eyebrow">YOUR LEARNING SPACE</span>
        <h1>Settings</h1>
        <p>Make NovaAI work your way.</p>
      </header>

      <div className="settings-banner">
        <div>
          <span>✦ YOUR JOURNEY, YOUR PACE</span>
          <h2>Your workspace, your rules.</h2>
          <p>Personalize your learning experience.</p>
        </div>
        <div className="settings-banner-icon">⚙</div>
      </div>

      <section className="settings-card">
        <div className="settings-title">
          <div className="settings-icon">◐</div>
          <div>
            <h2>Appearance</h2>
            <p>Choose your preferred look and feel.</p>
          </div>
        </div>

        <div className="settings-theme-grid">
          {["light", "dark"].map((item) => (
            <button
              key={item}
              type="button"
              className={`settings-theme ${theme === item ? "selected" : ""}`}
              onClick={() => changeTheme(item)}
            >
              <div className={`settings-theme-preview ${item}`}>
                {item === "light" ? "☀️" : "🌙"}
              </div>
              <strong>{item === "light" ? "Light mode" : "Dark mode"}</strong>
              <small>{theme === item ? "Currently selected" : "Select theme"}</small>
              <span className="settings-radio">{theme === item ? "✓" : ""}</span>
            </button>
          ))}
        </div>

        <div className="settings-row">
          <div>
            <strong>Accent color</strong>
            <small>Choose your workspace highlight color.</small>
          </div>
          <div className="settings-colors">
            {["#6978e8", "#8b5cf6", "#0d9b91", "#e47a58", "#d65391"].map((color) => (
              <button
                key={color}
                type="button"
                aria-label={`Choose accent ${color}`}
                className={`settings-color ${accent === color ? "active" : ""}`}
                style={{ background: color }}
                onClick={() => changeAccent(color)}
              />
            ))}
          </div>
        </div>

        <div className="settings-row">
          <div>
            <strong>Compact layout</strong>
            <small>Keep cards and sections more compact.</small>
          </div>
          {toggle("compact")}
        </div>

        <div className="settings-row">
          <div>
            <strong>Animations</strong>
            <small>Enable interface animation preference.</small>
          </div>
          {toggle("animations")}
        </div>
      </section>

      <section className="settings-card">
        <div className="settings-title">
          <div className="settings-icon">♧</div>
          <div>
            <h2>Notifications</h2>
            <p>Choose which updates matter to you.</p>
          </div>
        </div>

        <div className="settings-row">
          <div><strong>Interview reminders</strong><small>Keep your preparation on track.</small></div>
          {toggle("notifications")}
        </div>
        <div className="settings-row">
          <div><strong>Coding streak alerts</strong><small>Stay consistent with practice.</small></div>
          {toggle("streaks")}
        </div>
        <div className="settings-row">
          <div><strong>Sound effects</strong><small>Interface sound preference.</small></div>
          {toggle("sound")}
        </div>
        <div className="settings-row">
          <div><strong>Weekly progress reports</strong><small>Save your weekly report preference.</small></div>
          {toggle("weeklyReports")}
        </div>
      </section>

      <section className="settings-card">
        <div className="settings-title">
          <div className="settings-icon">✧</div>
          <div>
            <h2>AI Mentor Preferences</h2>
            <p>Set your preferred learning style.</p>
          </div>
        </div>

        <div className="settings-select-grid">
          <label>
            Response language
            <select value={prefs.language} onChange={(e) => update("language", e.target.value)}>
              <option>English</option>
              <option>Hindi</option>
              <option>Hinglish</option>
            </select>
          </label>

          <label>
            Explanation style
            <select value={prefs.responseStyle} onChange={(e) => update("responseStyle", e.target.value)}>
              <option>Simple</option>
              <option>Balanced</option>
              <option>Detailed</option>
            </select>
          </label>

          <label>
            Preferred coding language
            <select value={prefs.codingLanguage} onChange={(e) => update("codingLanguage", e.target.value)}>
              <option>Java</option>
              <option>Python</option>
              <option>JavaScript</option>
              <option>C++</option>
              <option>C</option>
            </select>
          </label>
        </div>
      </section>

      <section className="settings-card">
        <div className="settings-title">
          <div className="settings-icon">◎</div>
          <div>
            <h2>Learning Goals</h2>
            <p>Personalize your daily practice targets.</p>
          </div>
        </div>

        <div className="settings-select-grid">
          <label>
            Daily study target
            <select value={prefs.dailyGoal} onChange={(e) => update("dailyGoal", e.target.value)}>
              <option>30 minutes</option>
              <option>60 minutes</option>
              <option>90 minutes</option>
              <option>120 minutes</option>
            </select>
          </label>

          <label>
            Challenge difficulty
            <select value={prefs.difficulty} onChange={(e) => update("difficulty", e.target.value)}>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </label>
        </div>
      </section>

      <section className="settings-card settings-reset-card">
        <div>
          <h2>Reset preferences</h2>
          <p>Restore settings to their default values.</p>
        </div>
        <button type="button" className="settings-reset-btn" onClick={resetSettings}>
          Reset settings
        </button>
      </section>

      {saved && <p className="settings-saved">✓ Settings restored to defaults.</p>}

      <footer className="settings-footer">
        <span>✦</span> NovaAI · Your space to learn and grow
      </footer>
    </div>
  );
}

export default Settings;
