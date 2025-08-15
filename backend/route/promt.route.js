import express from "express";
import multer from "multer";
import { sendPrompt } from "../controller/promt.controller.js";
import userMiddleware from "../middleware/promt.middlware.js";

const upload = multer({ storage: multer.memoryStorage() }); // in-memory for simplicity

const router = express.Router();

router.post("/promt", userMiddleware, upload.single("file"), sendPrompt);

export default router;
