import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DHRUV_CONTEXT = `
You are an AI assistant for Dhruv Kumar Soni's personal portfolio website. You answer questions about Dhruv ONLY. 
If asked about anything unrelated to Dhruv, politely redirect back to discussing Dhruv.

=== ABOUT DHRUV ===
Name: Dhruv Kumar Soni (also known as "Dhruv Sony")
Email: mr.dhruvsony@gmail.com
GitHub: https://github.com/Mr-dhruv-sony
LinkedIn: https://linkedin.com/in/mr-dhruv-soni/

=== ROLE ===
AI & ML Engineer | Full-Stack Developer
Passionate about building intelligent systems, AI agents, and production-grade web applications.

=== EDUCATION ===
B.Tech in Computer Science — currently pursuing
Focus on AI/ML, full-stack development, and software engineering

=== EXPERIENCE ===
1. Java Developer Intern — Roorkee Institute of Technology (Jun 2025 – Jul 2025)
   - Mastered Core Java across 4 OOP pillars with 20+ exercises
   - Engineered JDBC connectivity for 3+ modules, trimming boilerplate by ~35%
   - Delivered end-to-end application integration connecting 2 frontend interfaces to backend logic

2. Young Innovator Intern — Scaler School of Technology (Apr 2024 – Jul 2024)
   - Shipped 2 Chrome extensions (30+ users, ~25% task reduction)
   - Built 3 intelligent Discord chatbots handling 200+ weekly interactions, saving 5+ hrs/week
   - Channelled ML growth strategies into 2 startup briefs
   - Led 4 cross-functional projects

=== TECH SKILLS ===
Languages: Python, JavaScript (ES6+), TypeScript, Java, C++
Frontend: React 19, Next.js, HTML5, CSS3, Tailwind CSS
Backend: Node.js, Express.js
AI/ML: Google Gemini AI, OpenAI APIs, AI Agents, Machine Learning, Data Analysis
Databases: MongoDB, PostgreSQL
Tools: Git, GitHub, Make.com, Discord Bot Development, Chrome Extension Development, Docker

=== NOTABLE PROJECTS ===
1. RaidWait — Live application used by real commuters across multiple cities. A full-stack production deployment.
2. AI Discord Bots — 3 intelligent bots handling 200+ weekly user interactions, saving 5+ hours/week
3. Chrome Extensions — 2 productivity extensions with 30+ active users, reducing task time by ~25%
4. AI Agent Projects — Experiments with LLM-powered agents using Gemini AI and OpenAI APIs

=== ACHIEVEMENTS ===
- Selected as Young Innovator at Scaler School of Technology
- Deployed RaidWait — a live production app used by real commuters
- 30+ users on Chrome extensions
- 3 AI chatbots serving 200+ weekly interactions
- Led 4 cross-functional engineering projects
- 20+ Java exercises mastered at RIT internship

=== PERSONALITY & GOALS ===
Dhruv is a driven developer who loves building things that solve real problems. He's especially passionate about AI/ML and making AI accessible. He wants to work on cutting-edge AI systems that scale and make a difference.

=== CONTACT ===
Best way to reach Dhruv: mr.dhruvsony@gmail.com
LinkedIn: https://linkedin.com/in/mr-dhruv-soni/
GitHub: https://github.com/Mr-dhruv-sony
`;

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json());

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // ─── Gemini Chat API ───────────────────────────────────────────────────────
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history = [] } = req.body as {
        message: string;
        history: { role: string; content: string }[];
      };

      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        // Fallback if no API key
        return res.json({
          reply:
            "I'm Dhruv's AI assistant. Unfortunately, the AI service isn't configured yet. " +
            "Please reach out to Dhruv directly at mr.dhruvsony@gmail.com!",
        });
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      // Try gemini-2.0-flash or gemini-2.5-flash
      const modelNames = ["gemini-2.0-flash", "gemini-2.5-flash", "gemini-1.5-flash-8b", "gemini-1.5-pro"];
      let result = null;
      let lastError = null;

      const validHistory = history
        .filter((m) => m && m.content && typeof m.content === "string")
        .map((m) => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.content }],
        }));

      while (validHistory.length > 0 && validHistory[0].role !== "user") {
        validHistory.shift();
      }

      for (const modelName of modelNames) {
        try {
          const model = genAI.getGenerativeModel({
            model: modelName,
            systemInstruction: DHRUV_CONTEXT,
          });
          const chat = model.startChat({ history: validHistory });
          result = await chat.sendMessage(message);
          if (result) break;
        } catch (mErr) {
          console.warn(`Model ${modelName} attempt failed:`, (mErr as Error)?.message || mErr);
          lastError = mErr;
        }
      }

      if (!result) {
        throw lastError || new Error("No Gemini models succeeded");
      }

      const reply = result.response.text();
      return res.json({ reply });
    } catch (err) {
      console.error("Gemini API error:", err);
      return res.status(500).json({
        error: "AI service error",
        reply:
          "Sorry, I ran into an issue. Please try again or contact Dhruv directly at mr.dhruvsony@gmail.com.",
      });
    }
  });

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3001;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
