
import { useEffect, useState } from "react";
import "./Progress.css";

const progressData = [
  { label: "Coding", value: 60 },
  { label: "Interview", value: 75 },
  { label: "Resume", value: 85 },
  { label: "Consistency", value: 70 },
];

const weeklyActivity = [
  { day: "Mon", value: 30 },
  { day: "Tue", value: 55 },
  { day: "Wed", value: 40 },
  { day: "Thu", value: 70 },
  { day: "Fri", value: 50 },
  { day: "Sat", value: 85 },
  { day: "Sun", value: 65 },
];

function Progress() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setAnimated(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="progress-page">
      <div className="progress-heading">
        <span className="progress-eyebrow">PROGRESS TRACKER</span>
        <h2>Your preparation, at a glance</h2>
        <p>Review your learning activity and preparation milestones.</p>
      </div>

      <div className="progress-rings-grid">
        {progressData.map((item) => (
          <article className="progress-card ring-card" key={item.label}>
            <div
              className="progress-ring-react"
              style={{
                "--progress-value": animated ? item.value : 0,
              }}
            >
              <div className="progress-ring-center">
                <strong>{animated ? item.value : 0}%</strong>
              </div>
            </div>
            <p>{item.label}</p>
          </article>
        ))}
      </div>

      <div className="progress-bottom-grid">
        <article className="progress-card">
          <h3>Weekly Activity</h3>
          <p className="progress-card-description">
            Your activity throughout the week
          </p>

          <div className="weekly-bars">
            {weeklyActivity.map((item) => (
              <div className="weekly-bar-column" key={item.day}>
                <div className="weekly-bar-track">
                  <div
                    className="weekly-bar"
                    style={{
                      height: animated ? `${item.value}%` : "0%",
                    }}
                  />
                </div>
                <span>{item.day}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="progress-card">
          <h3>Overview</h3>
          <p className="progress-card-description">
            Your preparation at a glance
          </p>

          <div className="progress-overview-row">
            <span>Problems Solved</span>
            <strong>24/60</strong>
          </div>
          <div className="progress-overview-row">
            <span>Interviews Completed</span>
            <strong>5</strong>
          </div>
          <div className="progress-overview-row">
            <span>Current Streak</span>
            <strong>7 days</strong>
          </div>
          <div className="progress-overview-row">
            <span>Career Readiness</span>
            <strong>72%</strong>
          </div>
        </article>
      </div>

      <p className="progress-demo-note">
        These are sample progress figures from the original project, not live
        account statistics.
      </p>
    </section>
  );
}

export default Progress;
