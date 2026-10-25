
import React from "react";
import "./Landing.css";

const features = [
  {
    number: "01",
    icon: "✳",
    title: "AI Learning Mentor",
    description:
      "Get personalized guidance, understand difficult concepts, and learn at your own pace.",
    color: "violet",
  },
  {
    number: "02",
    icon: "⌘",
    title: "Coding Challenges",
    description:
      "Strengthen your programming logic with practice problems and hands-on learning.",
    color: "blue",
  },
  {
    number: "03",
    icon: "◎",
    title: "Interview Preparation",
    description:
      "Build confidence with interview practice and prepare for your next opportunity.",
    color: "pink",
  },
  {
    number: "04",
    icon: "▤",
    title: "Resume Builder",
    description:
      "Organize your skills, projects, and experience into a professional resume.",
    color: "cyan",
  },
  {
    number: "05",
    icon: "↗",
    title: "Progress Tracking",
    description:
      "Keep track of your learning journey and identify areas to improve.",
    color: "violet",
  },
  {
    number: "06",
    icon: "✧",
    title: "One Learning Space",
    description:
      "Bring learning, coding practice, career preparation, and growth together.",
    color: "blue",
  },
];

function Landing({ onGetStarted, onLogin }) {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="nova-landing">
      <header className="nova-navbar">
        <a
          className="nova-brand"
          href="#home"
          aria-label="NovaAI home"
        >
          <span className="nova-brand-icon">N</span>
          <span>nova<span className="nova-brand-accent">ai</span></span>
        </a>

        <nav className="nova-nav-links">
          <button onClick={() => scrollTo("features")}>Features</button>
          <button onClick={() => scrollTo("how-it-works")}>
            How it works
          </button>
          <button onClick={() => scrollTo("about")}>About us</button>
          <button onClick={() => scrollTo("contact")}>Contact</button>
        </nav>

        <div className="nova-nav-actions">
          <button className="nova-login" onClick={onLogin || onGetStarted}>
            Log in <span>↗</span>
          </button>
          <button
            className="nova-menu-button"
            onClick={() => scrollTo("features")}
            aria-label="Explore features"
          >
            ☰
          </button>
        </div>
      </header>

      <main>
        <section className="nova-hero" id="home">
          <div className="nova-hero-copy">
            <div className="nova-eyebrow">
              <span className="nova-status-dot" />
              YOUR PERSONAL LEARNING SPACE
            </div>

            <h1>
              Make room for
              <br />
              <span>what's next.</span>
            </h1>

            <p className="nova-hero-description">
              Learn smarter. Practice with purpose. Prepare for your future.
              Everything you need to take your next step, in one place.
            </p>

            <div className="nova-hero-actions">
              <button
                className="nova-primary-button"
                onClick={onGetStarted}
              >
                Start your journey <span>↗</span>
              </button>
              <button
                className="nova-text-button"
                onClick={() => scrollTo("features")}
              >
                Explore NovaAI <span>↓</span>
              </button>
            </div>

            <div className="nova-trust-line">
              <span>✦</span>
              Your goals. Your pace. Your progress.
            </div>

            <div className="nova-hero-stats">
              <div>
                <strong>01</strong>
                <span>Personalized learning</span>
              </div>
              <div>
                <strong>02</strong>
                <span>Practical skill building</span>
              </div>
              <div>
                <strong>03</strong>
                <span>Career readiness</span>
              </div>
            </div>
          </div>

          <div className="nova-hero-visual">
            <div className="nova-orbit nova-orbit-one" />
            <div className="nova-orbit nova-orbit-two" />
            <span className="nova-spark nova-spark-one">✦</span>
            <span className="nova-spark nova-spark-two">✧</span>

            <div className="nova-preview-card">
              <div className="nova-preview-header">
                <div className="nova-preview-brand">
                  <span className="nova-brand-icon">N</span>
                  <div>
                    <strong>novaai</strong>
                    <small>YOUR LEARNING SPACE</small>
                  </div>
                </div>
                <span className="nova-live-dot" />
              </div>

              <div className="nova-preview-label">
                YOUR NEXT CHAPTER STARTS HERE
              </div>

              <h2>
                Big goals.
                <br />
                <span>Smarter steps.</span>
              </h2>
              <p>Make progress, one focused step at a time.</p>

              <div className="nova-preview-grid">
                <div className="nova-mini-card">
                  <span className="nova-mini-icon violet">✳</span>
                  <small>LEARN</small>
                  <strong>AI Mentor</strong>
                  <div className="nova-progress-track">
                    <span style={{ width: "78%" }} />
                  </div>
                </div>
                <div className="nova-mini-card">
                  <span className="nova-mini-icon blue">⌘</span>
                  <small>PRACTICE</small>
                  <strong>Coding skills</strong>
                  <div className="nova-progress-track">
                    <span style={{ width: "62%" }} />
                  </div>
                </div>
                <div className="nova-mini-card">
                  <span className="nova-mini-icon pink">◎</span>
                  <small>PREPARE</small>
                  <strong>Interview ready</strong>
                  <div className="nova-progress-track">
                    <span style={{ width: "48%" }} />
                  </div>
                </div>
                <div className="nova-mini-card">
                  <span className="nova-mini-icon cyan">↗</span>
                  <small>GROW</small>
                  <strong>Track progress</strong>
                  <div className="nova-progress-track">
                    <span style={{ width: "88%" }} />
                  </div>
                </div>
              </div>

              <div className="nova-preview-bottom">
                <span className="nova-bottom-symbol">↗</span>
                <div>
                  <strong>Your journey starts here</strong>
                  <small>One workspace. Many possibilities.</small>
                </div>
                <span className="nova-bottom-arrow">↗</span>
              </div>
            </div>

            <div className="nova-floating-chip nova-chip-top">
              <span>✳</span>
              <div>
                <strong>AI Mentor</strong>
                <small>Ready to help you learn</small>
              </div>
              <i />
            </div>

            <div className="nova-floating-chip nova-chip-bottom">
              <span>↗</span>
              <div>
                <strong>Keep growing</strong>
                <small>Progress starts with practice</small>
              </div>
            </div>
          </div>
        </section>

        <div className="nova-strip">
          <span>LEARN WITH PURPOSE</span>
          <i />
          <span>PRACTICE WITH CONFIDENCE</span>
          <i />
          <span>GROW EVERY DAY</span>
          <i />
          <span>BUILD YOUR FUTURE</span>
        </div>

        <section className="nova-section nova-features" id="features">
          <div className="nova-section-heading">
            <div className="nova-eyebrow">
              <span className="nova-status-dot" />
              EVERYTHING IN ONE PLACE
            </div>
            <h2>
              Your goals deserve
              <br />
              <span>a smarter workspace.</span>
            </h2>
            <p>
              From learning a new concept to preparing for your next
              opportunity, NovaAI brings your growth journey together.
            </p>
          </div>

          <div className="nova-feature-grid">
            {features.map((feature) => (
              <article
                className={`nova-feature-card ${feature.color}`}
                key={feature.number}
              >
                <div className="nova-feature-top">
                  <span className="nova-feature-icon">{feature.icon}</span>
                  <span className="nova-feature-number">
                    {feature.number}
                  </span>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <span className="nova-feature-decoration">↗</span>
              </article>
            ))}
          </div>
        </section>

        <section className="nova-work-section" id="how-it-works">
          <div className="nova-section-heading">
            <div className="nova-eyebrow">
              <span className="nova-status-dot" />
              SIMPLE BY DESIGN
            </div>
            <h2>
              A little progress.
              <br />
              <span>A bigger future.</span>
            </h2>
            <p>A clear path from where you are to where you want to be.</p>
          </div>

          <div className="nova-steps-grid">
            <article className="nova-step-card">
              <span className="nova-step-number">01</span>
              <div className="nova-step-icon">✧</div>
              <h3>Choose your goal</h3>
              <p>
                Start with the skill you want to learn or the milestone
                you want to reach.
              </p>
            </article>
            <article className="nova-step-card highlighted">
              <span className="nova-step-number">02</span>
              <div className="nova-step-icon">⌘</div>
              <h3>Learn and practice</h3>
              <p>
                Explore concepts, work on challenges, and prepare with
                your learning tools.
              </p>
            </article>
            <article className="nova-step-card">
              <span className="nova-step-number">03</span>
              <div className="nova-step-icon">↗</div>
              <h3>Track your growth</h3>
              <p>
                Review your progress, keep improving, and move towards
                your next opportunity.
              </p>
            </article>
          </div>
        </section>

        <section className="nova-about-section" id="about">
          <div className="nova-about-visual">
            <div className="nova-about-glow" />
            <div className="nova-about-card">
              <span className="nova-about-logo">N</span>
              <p>YOUR SPACE TO</p>
              <h3>
                Learn.
                <br />
                Practice.
                <br />
                <span>Become.</span>
              </h3>
              <div className="nova-about-line" />
              <small>Every big goal starts with one step.</small>
            </div>
            <span className="nova-about-orbit orbit-a" />
            <span className="nova-about-orbit orbit-b" />
          </div>

          <div className="nova-about-copy">
            <div className="nova-eyebrow">
              <span className="nova-status-dot" />
              ABOUT NOVAAI
            </div>
            <h2>
              Your potential.
              <br />
              <span>With a clearer path.</span>
            </h2>
            <p>
              NovaAI is a personal learning and career-preparation
              workspace designed to bring essential student tools together.
              Instead of jumping between different resources, learners can
              use one space to explore concepts, practice coding, prepare
              for interviews, build resumes, and review their progress.
            </p>
            <div className="nova-about-points">
              <div><span>✓</span> Learning and practice in one space</div>
              <div><span>✓</span> Tools for academic and career growth</div>
              <div><span>✓</span> A workspace built around your goals</div>
            </div>
            <button
              className="nova-primary-button"
              onClick={onGetStarted}
            >
              Explore your workspace <span>↗</span>
            </button>
          </div>
        </section>

        <section className="nova-cta-section">
          <div className="nova-cta-decoration">✳</div>
          <div className="nova-eyebrow">
            <span className="nova-status-dot" />
            YOUR NEXT STEP STARTS NOW
          </div>
          <h2>
            Ready to make room
            <br />
            <span>for what's next?</span>
          </h2>
          <p>
            Bring your learning goals, practice, and future plans into
            one personal workspace.
          </p>
          <button className="nova-primary-button" onClick={onGetStarted}>
            Start your journey <span>↗</span>
          </button>
        </section>

        <section className="nova-contact-section" id="contact">
          <div>
            <div className="nova-eyebrow">
              <span className="nova-status-dot" />
              LET'S CONNECT
            </div>
            <h2>
              Questions about
              <br />
              <span>your learning journey?</span>
            </h2>
            <p>
              Explore NovaAI and discover the tools available in your
              personal learning space.
            </p>
          </div>
          <button
            className="nova-contact-card"
            onClick={() => scrollTo("home")}
          >
            <span>↑</span>
            <div>
              <strong>Back to the beginning</strong>
              <small>Continue exploring NovaAI</small>
            </div>
            <b>↗</b>
          </button>
        </section>
      </main>

      <footer className="nova-footer">
        <a className="nova-brand" href="#home">
          <span className="nova-brand-icon">N</span>
          <span>nova<span className="nova-brand-accent">ai</span></span>
        </a>
        <p>Your goals. Your pace. Your progress.</p>
        <div className="nova-footer-links">
          <button onClick={() => scrollTo("features")}>Features</button>
          <button onClick={() => scrollTo("about")}>About</button>
          <button onClick={() => scrollTo("contact")}>Contact</button>
        </div>
        <small>© {new Date().getFullYear()} NovaAI. Keep growing.</small>
      </footer>
    </div>
  );
}

export default Landing;
