// const apiKey = "AIzaSyD21TT-msY3lQaA6FU_OKuHLNKpRoM1KxQ";

// Install required package:
// npm install @google/generative-ai

import { GoogleGenerativeAI } from "@google/generative-ai"

// Your Gemini API key
const API_KEY = "AIzaSyD21TT-msY3lQaA6FU_OKuHLNKpRoM1KxQ";  // Replace this with your actual key

// Initialize the Gemini model
const MODEL_NAME = "gemini-1.5-flash"; // instead of gemini-1.0-pro
//const MODEL_NAME = "gemini-1.0-pro";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

const safetySettings = [
  { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
  { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
  { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
  { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" }
];

async function runChat(prompt) {
  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
    ],
  });

  const result = await chat.sendMessage(prompt);

  const response = result.response;
  console.log(response.text());
  return response.text();

  
}

// runChat().catch(console.error);
export default runChat;
