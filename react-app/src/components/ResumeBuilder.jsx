
import { useRef, useState } from "react";
import "./ResumeBuilder.css";

function ResumeBuilder() {
  const fileInputRef = useRef(null);
  const resultsRef = useRef(null);
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  function selectFile(selectedFile) {
    if (!selectedFile) return;

    const extension = selectedFile.name.split(".").pop().toLowerCase();

    if (!["pdf", "doc", "docx"].includes(extension)) {
      alert("Please select a PDF or DOCX file.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("File size must be 5MB or less.");
      return;
    }

    setFile(selectedFile);
    setAnalyzed(false);
  }

  function removeFile() {
    setFile(null);
    setAnalyzed(false);
    setAnalyzing(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function analyzeResume() {
    if (!file || analyzing) return;

    setAnalyzing(true);
    setAnalyzed(false);

    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }, 1400);
  }

  return (
    <section className="resume-page">
      <div className="resume-heading">
        <span className="resume-eyebrow">RESUME ANALYZER</span>
        <h2>Get feedback on your resume</h2>
        <p>
          Upload your resume to review its strengths and areas for improvement.
        </p>
      </div>

      <div
        className={`resume-upload-card ${dragging ? "dragging" : ""}`}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          selectFile(event.dataTransfer.files[0]);
        }}
      >
        {!file ? (
          <div
            className="resume-upload-zone"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="resume-upload-icon">📄</div>
            <h3>Drag & drop your resume here</h3>
            <p>or</p>
            <button
              type="button"
              className="resume-secondary-button"
              onClick={(event) => {
                event.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              Browse Files
            </button>
            <span className="resume-file-hint">
              PDF, DOC or DOCX · Maximum 5MB
            </span>
          </div>
        ) : (
          <div className="resume-selected-file">
            <span className="resume-file-icon">📎</span>
            <span className="resume-file-name">{file.name}</span>
            <button
              type="button"
              className="resume-remove-button"
              onClick={removeFile}
            >
              Remove
            </button>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          hidden
          onChange={(event) => {
            selectFile(event.target.files[0]);
            event.target.value = "";
          }}
        />

        {file && (
          <button
            type="button"
            className="resume-primary-button"
            onClick={analyzeResume}
            disabled={analyzing}
          >
            {analyzing ? "Analyzing..." : "Analyze Resume"}
          </button>
        )}

        {analyzing && (
          <p className="resume-status">Analyzing your resume...</p>
        )}
      </div>

      {analyzed && (
        <div className="resume-results" ref={resultsRef}>
          <div className="resume-score-section">
            <div className="resume-score-ring">
              <span>85</span>
              <small>/100</small>
            </div>
            <div>
              <h3>Overall Score: 85/100</h3>
              <p>
                This is a sample result. A real score requires analyzing the
                uploaded resume content.
              </p>
            </div>
          </div>

          <div className="resume-results-grid">
            <div>
              <h3 className="resume-strength-title">Strengths</h3>
              <p>✓ Good project descriptions</p>
              <p>✓ Relevant technical skills</p>
              <p>✓ Clear structure</p>
            </div>

            <div>
              <h3 className="resume-improve-title">Areas to Improve</h3>
              <p>⚠ Add measurable achievements</p>
              <p>⚠ Improve skill organization</p>
              <p>⚠ Add relevant projects</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ResumeBuilder;
