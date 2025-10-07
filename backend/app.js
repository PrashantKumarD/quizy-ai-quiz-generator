import express from "express";
import cors from "cors";
import helmet from "helmet";
import aiRoutes from "./routes/aiRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(rateLimiter);

app.get("/", (req, res) => res.send("AI-Assisted Quiz API is working"));

app.use("/api/ai", aiRoutes);
app.use("/api/quiz", quizRoutes);

export default app;
