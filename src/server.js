// src/server.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { env } from "./config/env.js";
import routes from "./presentation/routes/index.js";

const app = express();

// 🛡 Sécurité HTTP de base
app.use(helmet());

// 🌍 CORS : n'autoriser que ton frontend
app.use(
  cors({
    origin: env.frontendUrl,
    methods: ["GET"], // pour l'instant, API lecture seule
  })
);

// ⏱ Limitation des requêtes publiques
const publicLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60,             // 60 requêtes par minute par IP
});
app.use(publicLimiter);

// Pour plus tard si tu reçois du JSON (POST, etc.)
app.use(express.json());

// 📡 Routes
app.use("/", routes);

// 🚀 Lancement du serveur
app.listen(env.port, () => {
  console.log(`✅ Backend lancé sur http://localhost:${env.port}`);
});
