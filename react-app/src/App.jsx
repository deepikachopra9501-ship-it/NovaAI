
import { useState } from "react";
import "./App.css";

import ChatMentor from "./components/ChatMentor";
import Challenges from "./components/Challenges";
import Interviews from "./components/Interviews";
import ResumeBuilder from "./components/ResumeBuilder";
import Progress from "./components/Progress";
import Settings from "./components/Settings";
import Profile from "./components/Profile";
import Landing from "./components/Landing";
import Login from "./components/Login";

const navItems = [
  { name: "Overview", icon: "◫" },
  { name: "AI Mentor", icon: "✳" },
  { name: "Challenges", icon: "⌘" },
  { name: "Interviews", icon: "◎" },
  { name: "Resume Builder", icon: "▤" },
  { name: "My Progress", icon: "↗" },
  { name: "Settings", icon: "⚙" },
];

const activities = [
  {
    title: "Java problem solving",
    category: "Challenges",
    progress: 72,
    color: "blue",
  },
  {
    title: "Interview preparation",
    category: "Interviews",
    progress: 45,
    color: "purple",
  },
  {
    title: "Resume improvement",
    category: "Career",
    progress: 28,
    color: "orange",
  },
];

const pageDescriptions = {
  Overview: "Your personal space to learn, practice and grow.",
  "AI Mentor": "Get guidance for your next learning step.",
  Challenges: "Build your skills one problem at a time.",
  Interviews: "Prepare for interviews with confidence.",
  "Resume Builder": "Create a resume that represents your skills.",
  "My Progress": "See the progress you make every day.",
  Settings: "Personalize your NovaAI workspace.",
};

function App() {
  const [screen, setScreen] = useState(() => {
    return localStorage.getItem("novaUser") ? "dashboard" : "landing";
  });

  const [activePage, setActivePage] = useState("Overview");
  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  const filteredActivities = activities.filter((activity) =>
    activity.title.toLowerCase().includes(search.toLowerCase())
  );

  function openMentor() {
    setActivePage("AI Mentor");
  }

  function renderPlaceholder() {
    const descriptions = {
      Challenges:
        "Practice coding problems and improve your problem-solving skills.",
      Interviews:
        "Prepare for technical questions and build interview confidence.",
      "Resume Builder":
        "Organize your skills, projects and experience for your resume.",
      "My Progress":
        "Your learning statistics and completed activities will appear here as those features are built.",
      Settings:
        "Workspace customization options will be available here as those features are built.",
    };

    return (
      <section className="placeholder-page">
        <div className="placeholder-icon">✳</div>
        <div className="section-kicker">NOVA WORKSPACE</div>
        <h2>Your {activePage} space starts here.</h2>
        <p>{descriptions[activePage]}</p>

        {activePage === "Challenges" && (
          <button className="hero-button" onClick={openMentor}>
            Practise with AI Mentor <span>↗</span>
          </button>
        )}

        {activePage === "Interviews" && (
          <button className="hero-button" onClick={openMentor}>
            Get interview guidance <span>↗</span>
          </button>
        )}

        {activePage === "Resume Builder" && (
          <button className="hero-button" onClick={openMentor}>
            Get resume tips <span>↗</span>
          </button>
        )}
      </section>
    );
  }

  if (screen === "landing") {
    return (
      <Landing
        onGetStarted={() => setScreen("login")}
        onLogin={() => setScreen("login")}
      />
    );
  }

  if (screen === "login") {
    return (
      <Login
        onLoginSuccess={() => {
          setActivePage("Overview");
          setScreen("dashboard");
        }}
        onBack={() => setScreen("landing")}
      />
    );
  }

  return (
    <div className="nova-app">
      <aside className="sidebar">
        <a
          className="brand"
          href="#home"
          onClick={(event) => {
            event.preventDefault();
            setActivePage("Overview");
          }}
        >
          <span className="brand-symbol">N</span>
          <span className="brand-name">
            nova<span>ai</span>
          </span>
        </a>

        <div className="workspace-label">WORKSPACE</div>

        <nav className="navigation">
          {navItems.map((item) => (
            <button
              key={item.name}
              className={`nav-item ${
                activePage === item.name ? "active" : ""
              }`}
              onClick={() => setActivePage(item.name)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.name}</span>

              {item.name === "AI Mentor" && (
                <span className="new-tag">AI</span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="upgrade-card">
            <div className="upgrade-orb">✳</div>
            <strong>Your next level starts here.</strong>
            <p>Small steps. Real progress.</p>

            <button onClick={openMentor}>
              Explore AI Mentor <span>↗</span>
            </button>
          </div>

          <div className="profile-mini">
            <div className="avatar">
              {(() => {
                try {
                  const user = JSON.parse(
                    localStorage.getItem("novaUser") || "{}"
                  );
                  return user.name?.charAt(0).toUpperCase() || "S";
                } catch {
                  return "S";
                }
              })()}
            </div>

            <div className="profile-info">
              <strong>
                {(() => {
                  try {
                    const user = JSON.parse(
                      localStorage.getItem("novaUser") || "{}"
                    );
                    return user.name || "Student Workspace";
                  } catch {
                    return "Student Workspace";
                  }
                })()}
              </strong>
              <span>Free plan</span>
            </div>

            <button
              className="profile-menu"
              aria-label="Log out"
              title="Log out"
              onClick={() => {
                localStorage.removeItem("novaUser");
                setScreen("landing");
                setActivePage("Overview");
              }}
            >
              ↪
            </button>
          </div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="breadcrumb">
            <span>Workspace</span>
            <span className="breadcrumb-slash">/</span>
            <strong>{activePage}</strong>
          </div>

          <div className="topbar-actions">
            <label className="search-box">
              <span>⌕</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search activities..."
                aria-label="Search activities"
              />
              <kbd>⌘ K</kbd>
            </label>

            <div className="notification-wrap">
              <button
                className="notification-button"
                aria-label="Notifications"
                onClick={() =>
                  setShowNotifications(!showNotifications)
                }
              >
                ♧<span className="notification-dot"></span>
              </button>

              {showNotifications && (
                <div className="notification-popover">
                  <strong>Notifications</strong>
                  <p>Your workspace is ready!</p>
                </div>
              )}
            </div>

            <div className="top-avatar">
              {(() => {
                try {
                  const user = JSON.parse(
                    localStorage.getItem("novaUser") || "{}"
                  );
                  return user.name?.charAt(0).toUpperCase() || "S";
                } catch {
                  return "S";
                }
              })()}
            </div>
          </div>
        </header>

        <div className="page-content">
          <div className="welcome-row">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-dot"></span>
                YOUR LEARNING SPACE
              </div>

              <h1>
                {activePage === "Overview" ? (
                  <>
                    Make room for
                    <br />
                    <span>
                      what's next<span className="title-period">.</span>
                    </span>
                  </>
                ) : (
                  activePage
                )}
              </h1>

              <p className="welcome-description">
                {pageDescriptions[activePage]}
              </p>
            </div>

            <div className="date-chip">
              <span>◷</span> YOUR JOURNEY, YOUR PACE
            </div>
          </div>

          {activePage === "Overview" ? (
            <>
              <section className="hero-panel">
                <div className="hero-grid-pattern"></div>

                <div className="hero-copy">
                  <div className="hero-label">
                    <span>✳</span> YOUR AI-POWERED COMPANION
                  </div>

                  <h2>
                    Big goals.
                    <br />
                    <span>Smarter steps.</span>
                  </h2>

                  <p>
                    Learn new skills, practice real problems, and build a
                    future you're excited about.
                  </p>

                  <button className="hero-button" onClick={openMentor}>
                    Meet your AI Mentor <span>↗</span>
                  </button>

                  <div className="hero-footnote">
                    <span>✦</span> Made for your next breakthrough
                  </div>
                </div>

                <div className="hero-art" aria-hidden="true">
                  <div className="orbit orbit-one"></div>
                  <div className="orbit orbit-two"></div>
                  <div className="orbit orbit-three"></div>

                  <div className="hero-core">
                    <span>✳</span>
                  </div>

                  <div className="float-card float-card-top">
                    <span>✦</span> Learn smarter
                  </div>

                  <div className="float-card float-card-bottom">
                    <span>↗</span> Keep growing
                  </div>

                  <div className="spark spark-one"></div>
                  <div className="spark spark-two"></div>
                  <div className="spark spark-three"></div>
                </div>
              </section>

              <section className="stats-grid">
                <article className="stat-card">
                  <div className="stat-top">
                    <span className="stat-icon blue-icon">✳</span>
                    <span className="stat-caption">CONSISTENCY</span>
                  </div>

                  <div className="stat-value">
                    0 <span>days</span>
                  </div>
                  <p>Your learning streak</p>

                  <div className="stat-bottom">
                    <span className="mini-track">
                      <span style={{ width: "0%" }}></span>
                    </span>
                    <span>Start today</span>
                  </div>
                </article>

                <article className="stat-card">
                  <div className="stat-top">
                    <span className="stat-icon purple-icon">⌘</span>
                    <span className="stat-caption">PRACTICE</span>
                  </div>

                  <div className="stat-value">
                    0 <span>solved</span>
                  </div>
                  <p>Challenges completed</p>

                  <div className="stat-bottom">
                    <span className="mini-track purple-track">
                      <span style={{ width: "0%" }}></span>
                    </span>
                    <span>Ready when you are</span>
                  </div>
                </article>

                <article className="stat-card">
                  <div className="stat-top">
                    <span className="stat-icon orange-icon">↗</span>
                    <span className="stat-caption">GROWTH</span>
                  </div>

                  <div className="stat-value">
                    3 <span>paths</span>
                  </div>
                  <p>Ways to level up</p>

                  <div className="stat-bottom">
                    <span className="growth-dots">
                      <i></i>
                      <i></i>
                      <i></i>
                    </span>
                    <span>Explore your options</span>
                  </div>
                </article>
              </section>

              <section className="activity-section" id="activities">
                <div className="section-heading">
                  <div>
                    <div className="section-kicker">YOUR WORKSPACE</div>
                    <h2>
                      Pick up where you grow<span>.</span>
                    </h2>
                    <p>Your next step doesn't have to be a big one.</p>
                  </div>

                  <button
                    className="text-button"
                    onClick={() => setActivePage("My Progress")}
                  >
                    View progress <span>↗</span>
                  </button>
                </div>

                <div className="activity-grid">
                  {filteredActivities.map((activity) => (
                    <article
                      className="activity-card"
                      key={activity.title}
                    >
                      <div className={`activity-icon ${activity.color}`}>
                        {activity.color === "blue"
                          ? "⌘"
                          : activity.color === "purple"
                            ? "◎"
                            : "▤"}
                      </div>

                      <div className="activity-category">
                        {activity.category}
                      </div>

                      <h3>{activity.title}</h3>

                      <p>
                        {activity.color === "blue"
                          ? "Practice coding and sharpen your logic."
                          : activity.color === "purple"
                            ? "Get comfortable with common interview questions."
                            : "Showcase your projects and experience."}
                      </p>

                      <div className="activity-progress-label">
                        <span>Getting started</span>
                        <span>{activity.progress}%</span>
                      </div>

                      <div className={`progress-track ${activity.color}`}>
                        <span
                          style={{ width: `${activity.progress}%` }}
                        ></span>
                      </div>

                      <button
                        className="activity-link"
                        onClick={() =>
                          setActivePage(
                            activity.color === "blue"
                              ? "Challenges"
                              : activity.color === "purple"
                                ? "Interviews"
                                : "Resume Builder"
                          )
                        }
                      >
                        Open workspace <span>↗</span>
                      </button>
                    </article>
                  ))}

                  {filteredActivities.length === 0 && (
                    <p className="empty-state">
                      No matching activities. Try another search.
                    </p>
                  )}
                </div>
              </section>
            </>
          ) : activePage === "AI Mentor" ? (
            <ChatMentor />
          ) : activePage === "Challenges" ? (
            <Challenges />
          ) : activePage === "Interviews" ? (
            <Interviews />
          ) : activePage === "Resume Builder" ? (
            <ResumeBuilder />
          ) : activePage === "My Progress" ? (
            <Progress />
          ) : activePage === "Profile" ? (
            <Profile />
          ) : activePage === "Settings" ? (
            <Settings />
          ) : (
            renderPlaceholder()
          )}

          <footer className="footer">
            <span>
              ✳ novaai{" "}
              <span className="footer-muted">
                — built for what's next.
              </span>
            </span>

            <span>LEARN · BUILD · BECOME</span>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
