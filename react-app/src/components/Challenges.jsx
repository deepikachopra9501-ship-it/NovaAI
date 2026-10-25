
import { useEffect, useMemo, useState } from "react";
import "./Challenges.css";

const challengeData = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    description: "Find two numbers in an array that add up to a target value.",
  },
  {
    id: "reverse-string",
    title: "Reverse String",
    difficulty: "Easy",
    description: "Reverse a string in place using two-pointer technique.",
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    description: "Check whether brackets in a string are correctly matched.",
  },
  {
    id: "max-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    description: "Find the contiguous subarray with the largest sum.",
  },
  {
    id: "merge-intervals",
    title: "Merge Intervals",
    difficulty: "Medium",
    description: "Merge all overlapping intervals in a list.",
  },
  {
    id: "binary-tree-paths",
    title: "Binary Tree Paths",
    difficulty: "Medium",
    description: "Return all root-to-leaf paths in a binary tree.",
  },
  {
    id: "word-ladder",
    title: "Word Ladder",
    difficulty: "Hard",
    description: "Find the shortest transformation sequence between two words.",
  },
  {
    id: "trapping-rain-water",
    title: "Trapping Rain Water",
    difficulty: "Hard",
    description: "Compute how much water can be trapped after raining.",
  },
];

function getSavedCompleted() {
  try {
    const saved = JSON.parse(
      localStorage.getItem("novaAiCompletedChallenges") || "[]"
    );
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function Challenges() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [completed, setCompleted] = useState(getSavedCompleted);

  useEffect(() => {
    try {
      localStorage.setItem(
        "novaAiCompletedChallenges",
        JSON.stringify(completed)
      );
    } catch {
      // Saving may be unavailable in some browsers.
    }
  }, [completed]);

  const filteredChallenges = useMemo(() => {
    return challengeData.filter((challenge) => {
      const matchesFilter =
        activeFilter === "All" ||
        challenge.difficulty === activeFilter;

      const matchesSearch = challenge.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchTerm]);

  function toggleCompleted(id) {
    setCompleted((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }

  return (
    <section className="challenges-page">
      <div className="challenges-heading">
        <span className="challenges-eyebrow">CODING CHALLENGES</span>
        <h2>Sharpen your problem solving</h2>
        <p>Practice coding problems and track your progress.</p>
      </div>

      <div className="challenges-toolbar">
        <input
          className="challenges-search"
          type="text"
          placeholder="Search challenges..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <div className="challenges-filters">
          {["All", "Easy", "Medium", "Hard"].map((filter) => (
            <button
              type="button"
              key={filter}
              className={`challenge-filter ${
                activeFilter === filter ? "active" : ""
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="challenges-list">
        {filteredChallenges.map((challenge) => {
          const isDone = completed.includes(challenge.id);

          return (
            <article
              key={challenge.id}
              className={`challenge-card ${
                isDone ? "challenge-done" : ""
              }`}
            >
              <div className="challenge-details">
                <span
                  className={`challenge-badge ${challenge.difficulty.toLowerCase()}`}
                >
                  {challenge.difficulty}
                </span>

                <h3>{challenge.title}</h3>
                <p>{challenge.description}</p>
              </div>

              <button
                type="button"
                className={`challenge-action ${
                  isDone ? "completed" : ""
                }`}
                onClick={() => toggleCompleted(challenge.id)}
              >
                {isDone ? "Completed ✓" : "Solve"}
              </button>
            </article>
          );
        })}

        {filteredChallenges.length === 0 && (
          <p className="challenges-empty">
            No challenges match your search/filter.
          </p>
        )}
      </div>

      <p className="challenges-progress">
        Completed: {completed.filter((id) =>
          challengeData.some((challenge) => challenge.id === id)
        ).length} / {challengeData.length}
      </p>
    </section>
  );
}

export default Challenges;
