// server.js
const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const { initialSessions, sampleAnswer } = require("./mockData");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// In-memory data stores
const sessions = [...initialSessions]; // array of {id, title, createdAt}
const histories = {}; // map sessionId -> [{role:'user'|'bot', text, answer?}]

// Utility to generate a title (simple)
function makeTitleFromQuestion(q) {
  if (!q) return `Chat ${new Date().toLocaleString()}`;
  return q.length > 30 ? q.slice(0, 30) + "..." : q;
}

/**
 * GET /api/sessions
 * Returns list of sessions (id, title, createdAt)
 */
app.get("/api/sessions", (req, res) => {
  // sort newest first
  const list = sessions
    .slice()
    .sort((a, b) => b.createdAt - a.createdAt);
  res.json({ sessions: list });
});

/**
 * GET /api/new-chat
 * Creates new session and returns id & url
 */
app.get("/api/new-chat", (req, res) => {
  const id = uuidv4();
  const title = "New Chat";
  const s = { id, title, createdAt: Date.now() };
  sessions.push(s);
  histories[id] = []; // init
  res.json({ sessionId: id, title });
});

/**
 * GET /api/session/:id
 * Returns full conversation history for session
 */
app.get("/api/session/:id", (req, res) => {
  const id = req.params.id;
  const session = sessions.find((s) => s.id === id);
  if (!session) {
    return res.status(404).json({ error: "Session not found" });
  }
  const history = histories[id] || [];
  res.json({ session: { ...session }, history });
});

/**
 * POST /api/chat/:id
 * Body: { question: "..." }
 * Returns: { info: "...", table: {columns:[], rows:[[]]} }
 * Also pushes the entry into histories so session persists across calls
 */
app.post("/api/chat/:id", (req, res) => {
  const id = req.params.id;
  const { question } = req.body || {};

  // Basic validation
  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }

  // Ensure session exists
  let session = sessions.find((s) => s.id === id);
  if (!session) {
    // Optionally create session on the fly
    session = { id, title: makeTitleFromQuestion(question), createdAt: Date.now() };
    sessions.push(session);
    histories[id] = [];
  }

  // Create a mock answer
  const answer = sampleAnswer(question);

  // Add to history
  histories[id] = histories[id] || [];
  histories[id].push({
    id: uuidv4(),
    role: "user",
    text: question,
    timestamp: Date.now()
  });
  histories[id].push({
    id: uuidv4(),
    role: "bot",
    text: answer.info,
    table: answer.table,
    timestamp: Date.now()
  });

  // Optionally update the session title (first user question)
  if (!session.title || session.title === "New Chat") {
    session.title = makeTitleFromQuestion(question);
  }

  res.json({
    answer: answer.info,
    table: answer.table,
    session: { ...session }
  });
});

// start server
app.listen(PORT, () => {
  console.log(`Mock backend listening on http://localhost:${PORT}`);
});
