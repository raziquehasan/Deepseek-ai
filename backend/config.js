import dotenv from "dotenv";
dotenv.config();

console.log("Loaded JWT Secret:", process.env.JWT_SECRET); // Debug
console.log("Loaded Gemini API Key:", process.env.GEMINI_API_KEY); // Debug

const config = {
  JWT_SECRET: process.env.JWT_SECRET,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
};

export default config;
