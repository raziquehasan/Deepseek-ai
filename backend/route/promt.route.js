import express from "express";
import multer from "multer";
import { sendPrompt } from "../controller/promt.controller.js";
import userMiddleware from "../middleware/promt.middlware.js";

const upload = multer({ storage: multer.memoryStorage() }); // in-memory for simplicity

const router = express.Router();

router.post("/", userMiddleware, sendPrompt);
router.get("/", (req, res) => {
  res.send("✅ Prompts GET route exists — but use POST to send prompts.");
});

export default router;
