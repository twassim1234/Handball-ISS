require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

// Initialize the Gemini API client using the API key from .env
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Get the Gemini model (for complete responses)
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

/**
 * queryChatbot
 * Accepts a chat message from the client and returns an AI-generated response.
 * It logs both the user's message and the AI response (with ISO-formatted timestamps)
 * to a file named "chat_log.txt" located at the project root.
 * Expects a JSON payload in the request with:
 *   { chat: string, history: Array (optional) }
 * Returns:
 *   { text: string }
 */
exports.queryChatbot = async (req, res, next) => {
  try {
    const { chat, history } = req.body;
    if (!chat) {
      return res.status(400).json({ error: 'Message is required' });
    }
    const chatHistory = history || [];
    const chatInstance = model.startChat({ history: chatHistory });
    const result = await chatInstance.sendMessage(chat);
    const response = await result.response;
    const text = response.text();

    // Log the conversation with ISO-formatted timestamps
    const now = new Date().toISOString();
    const logEntry = `${now} - User: ${chat}\n${now} - Bot: ${text}\n\n`;
    const logFile = path.join(__dirname, '../../chat_log.txt');
    fs.appendFile(logFile, logEntry, (err) => {
      if (err) console.error('Error writing to chat log:', err);
    });

    return res.status(200).json({ text });
  } catch (error) {
    console.error("Chatbot query error:", error);
    return res.status(500).json({ error: "Error processing chatbot query" });
  }
};

/**
 * streamChatbot
 * Accepts a chat message and streams the AI-generated response back to the client.
 * (Optional: Include this if streaming is desired.)
 */
exports.streamChatbot = async (req, res, next) => {
  try {
    const { chat, history } = req.body;
    if (!chat) {
      return res.status(400).json({ error: "Message is required" });
    }
    const chatHistory = history || [];
    const chatInstance = model.startChat({ history: chatHistory });
    const result = await chatInstance.sendMessageStream(chat);
    res.writeHead(200, { "Content-Type": "text/plain" });
    for await (const chunk of result.stream) {
      res.write(chunk.text());
    }
    res.end();
  } catch (error) {
    console.error("Chatbot streaming error:", error);
    return res.status(500).json({ error: "Error processing chatbot streaming query" });
  }
};

exports.streamGeminiResponse = async (req, res) => {
    try {
      const { prompt } = req.body;
  
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }
  
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
      const result = await model.generateContentStream(prompt);
  
      res.writeHead(200, { "Content-Type": "text/plain" });
  
      for await (const chunk of result.stream) {
        res.write(chunk.text());
      }
  
      res.end();
    } catch (error) {
      console.error("Gemini streaming error:", error);
      res.status(500).json({ error: "Error processing streaming prompt" });
    }
  };
  exports.genAI = genAI;