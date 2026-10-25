import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./ChatMentor.css";

const STORAGE_KEY = "novaai_mentor_messages";

function ChatMentor() {
  const [messages, setMessages] = useState(() => {
    try {
      const savedMessages = localStorage.getItem(STORAGE_KEY);
      return savedMessages ? JSON.parse(savedMessages) : [];
    } catch {
      return [];
    }
  });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(messages.slice(-100))
      );
    } catch (error) {
      console.error("Could not save chat history:", error);
    }
  }, [messages]);

  async function sendMessage(event) {
    event.preventDefault();

    const message = input.trim();

    if (!message || loading) return;

    const previousMessages = messages;
    const updatedMessages = [
      ...previousMessages,
      { role: "user", text: message },
    ];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          history: previousMessages.map((item) => ({
            role: item.role === "assistant" ? "model" : "user",
            text: item.text,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setMessages((previous) => [
        ...previous,
        { role: "assistant", text: data.reply },
      ]);
    } catch (error) {
      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text:
            error.message ||
            "Couldn't connect to NovaAI. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage(event);
    }
  }

  return (
    <section className="mentor-chat">
      <div className="mentor-chat-header">
        <div className="mentor-avatar">✳</div>

        <div>
          <h2>NovaAI Mentor</h2>
          <p>Your personal AI learning companion</p>
        </div>

        <span className="mentor-status">AI</span>
      </div>

      <div className="mentor-messages">
        {messages.length === 0 && (
          <div className="mentor-welcome">
            <div className="mentor-welcome-icon">✦</div>
            <h3>What would you like to learn?</h3>
            <p>
              Ask me about Java, DSA, AI/ML, projects or interviews.
            </p>

            <div className="mentor-suggestions">
              {[
                "Explain OOP in Java",
                "Help me practise DSA",
                "Give me an AI project idea",
              ].map((suggestion) => (
                <button
                  type="button"
                  key={suggestion}
                  onClick={() => setInput(suggestion)}
                >
                  {suggestion} ↗
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            className={`mentor-message ${
              message.role === "user" ? "user-message" : "ai-message"
            }`}
            key={`${index}-${message.role}`}
          >
            <div className="message-label">
              {message.role === "user" ? "You" : "✳ NovaAI"}
            </div>

            <div className="message-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.text}
              </ReactMarkdown>
            </div>
          </div>
        ))}

        {loading && (
          <div className="mentor-message ai-message">
            <div className="message-label">✳ NovaAI</div>
            <div className="typing-indicator" aria-label="NovaAI is thinking">
              <span />
              <span />
              <span />
            </div>
          </div>
        )}
      </div>

      <form className="mentor-input-form" onSubmit={sendMessage}>
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask your AI Mentor anything..."
          aria-label="Message your AI Mentor"
          disabled={loading}
          rows={1}
        />

        <button type="submit" disabled={loading || !input.trim()}>
          {loading ? "..." : "↑"}
        </button>
      </form>

      <p className="mentor-disclaimer">
        Enter to send · Shift + Enter for a new line
        <br />
        AI can make mistakes. Verify important information.
      </p>
    </section>
  );
}

export default ChatMentor;