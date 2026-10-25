
import { useState } from "react";
import "./Login.css";

export default function Login({ onLoginSuccess, onBack }) {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function changeMode(signup) {
    setIsSignup(signup);
    setError("");
    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    let users = [];

    try {
      users = JSON.parse(localStorage.getItem("novaUsers") || "[]");
      if (!Array.isArray(users)) users = [];
    } catch {
      users = [];
    }

    if (isSignup) {
      if (!name.trim()) {
        setError("Please enter your name.");
        return;
      }

      if (password.length < 8) {
        setError("Password must be at least 8 characters.");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      if (users.some((user) => user.email === cleanEmail)) {
        setError("An account with this email already exists.");
        return;
      }

      users.push({
        name: name.trim(),
        email: cleanEmail,
        password,
      });

      localStorage.setItem("novaUsers", JSON.stringify(users));
      setIsSignup(false);
      setPassword("");
      setConfirmPassword("");
      setMessage("Account created! Log in with your details.");
      return;
    }

    const user = users.find(
      (item) => item.email === cleanEmail && item.password === password
    );

    if (!user) {
      setError("Incorrect email or password. Please try again.");
      return;
    }

    localStorage.setItem(
      "novaUser",
      JSON.stringify({ name: user.name, email: user.email })
    );

    onLoginSuccess();
  }

  return (
    <main className="nova-auth">
      <header className="auth-header">
        <button className="auth-brand" onClick={onBack}>
          <span className="auth-logo">N</span>
          <span>nova<span>ai</span></span>
        </button>

        <button className="auth-back" onClick={onBack}>
          ← Back to home
        </button>
      </header>

      <section className="auth-layout">
        <div className="auth-intro">
          <div className="auth-eyebrow">
            <span />
            YOUR LEARNING SPACE
          </div>

          <h1>
            Your next step
            <br />
            starts <span>with you.</span>
          </h1>

          <p>
            Learn new skills, practise real problems and build your future
            with your personal NovaAI workspace.
          </p>

          <div className="auth-benefits">
            <div><span>✳</span><span><strong>Learn smarter</strong><small>Get support when you need it.</small></span></div>
            <div><span>⌘</span><span><strong>Keep practising</strong><small>Build skills one step at a time.</small></span></div>
            <div><span>↗</span><span><strong>See your progress</strong><small>Keep moving towards your goals.</small></span></div>
          </div>
        </div>

        <div className="auth-card">
          <div className="auth-card-top">
            <span className="auth-card-symbol">✳</span>
            <span>WELCOME TO NOVAAI</span>
          </div>

          <h2>{isSignup ? "Create your account." : "Welcome back."}</h2>
          <p className="auth-subtitle">
            {isSignup
              ? "Create your personal learning space."
              : "Pick up where your learning journey left off."}
          </p>

          <div className="auth-tabs">
            <button
              className={!isSignup ? "selected" : ""}
              onClick={() => changeMode(false)}
              type="button"
            >
              Log in
            </button>
            <button
              className={isSignup ? "selected" : ""}
              onClick={() => changeMode(true)}
              type="button"
            >
              Sign up
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {isSignup && (
              <label className="auth-field">
                <span>Full name</span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter your name"
                  autoComplete="name"
                  required
                />
              </label>
            )}

            <label className="auth-field">
              <span>Email address</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </label>

            <label className="auth-field">
              <span>Password</span>
              <div className="auth-password-wrap">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder={isSignup ? "At least 8 characters" : "Enter your password"}
                  autoComplete={isSignup ? "new-password" : "current-password"}
                  required
                />
                <button
                  type="button"
                  className="auth-show-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </label>

            {isSignup && (
              <label className="auth-field">
                <span>Confirm password</span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Enter password again"
                  autoComplete="new-password"
                  required
                />
              </label>
            )}

            {error && <p className="auth-error" role="alert">{error}</p>}
            {message && <p className="auth-success" role="status">{message}</p>}

            <button className="auth-submit" type="submit">
              {isSignup ? "Create account" : "Log in to NovaAI"}
              <span>↗</span>
            </button>
          </form>

          <p className="auth-switch">
            {isSignup ? "Already have an account?" : "New to NovaAI?"}{" "}
            <button
              type="button"
              onClick={() => changeMode(!isSignup)}
            >
              {isSignup ? "Log in" : "Create an account"}
            </button>
          </p>

          <div className="auth-disclaimer">
            Demo authentication only. Do not use a real or reused password.
          </div>
        </div>
      </section>
    </main>
  );
}
