import { GoogleGenerativeAI } from "@google/generative-ai";
import { Promt } from "../model/promt.model.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const sendPrompt = async (req, res) => {
  try {
    const userId = req.userId;

    // If there's a file, read it and use its content, else fallback to req.body.content
    let promptContent = "";

    if (req.file) {
      // Assuming text file — read buffer to string
      promptContent = req.file.buffer.toString("utf-8");
    } else if (typeof req.body.content === "string" && req.body.content.trim() !== "") {
      promptContent = req.body.content.trim();
    } else {
      return res.status(400).json({ errors: "Prompt content or file is required" });
    }

    // Save user prompt
    await Promt.create({
      userId,
      role: "user",
      content: promptContent,
    });

    // Use Gemini to generate response
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
    const result = await model.generateContent(promptContent);
    const response = await result.response;
    const aiContent = response?.text?.();

    if (!aiContent) {
      return res.status(500).json({ error: "No response from Gemini AI" });
    }

    // Save AI response
    await Promt.create({
      userId,
      role: "assistant",
      content: aiContent,
    });

    return res.status(200).json({ reply: aiContent });
  } catch (error) {
    console.error("Error in Prompt: ", error);
    return res.status(500).json({ error: "Something went wrong with the AI response" });
  }
};
