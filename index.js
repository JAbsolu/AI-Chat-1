const OpenAi = require("openai");
process.stdin.setEncoding('utf-8');
require("dotenv").config();
const fs = require("node:fs");
const fetch = require('node-fetch');
const getStockData = require("./app_modules/get-stock-data");
const articlesToText = require("./app_modules/articles-to-text");
const getStockNews = require("./app_modules/get-stock-news");

const API_KEY = process.env.RAPID_API_KEY;


// articlesToText(["https://www.pymnts.com/earnings/2025/apple-tops-a-billion-subscribers-as-services-climb-to-record-revenue/"]);
// getStockData("AAPL");
getStockNews(["AAPL", "MSFT"]);

// prompt user to ask a question
process.stdout.write("\nHi there! How can I help you today: ");

// proccess the prompt
process.stdin.on('data', data => {
  //capture the prompt from the terminal
  const prompt = data.trim();
  main(prompt)
});


// initiate open ai API connection
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

const openai = new OpenAi({
  baseURL: "https://api.deepseek.com",
  apiKey: DEEPSEEK_API_KEY
});

// main function to process inputs and outputs
const main = async (prompt) => {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: prompt }],
    model: "deepseek-chat"
  });

  const aiResponse = "\nAI: " + completion.choices[0].message.content;

  fs.appendFile("conversations.md", `\n You: ${prompt}`, (err) => {
    if (err) throw err;
  });

  fs.appendFile("./conversations.md", aiResponse , (err) => {
    if (err) throw err;

    // exit process if the user says bye or exit
    if (prompt == "bye") process.exit();
  });

  console.log(aiResponse);
  process.stdout.write("\nYou: ");
}