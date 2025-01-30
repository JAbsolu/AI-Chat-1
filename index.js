const OpenAi = require("openai");
process.stdin.setEncoding('utf-8');
require("dotenv").config();
const fs = require("node:fs");

// prompt user to ask a question
process.stdout.write("\nHi there! Ask me a question: ");

// proccess the prompt
process.stdin.on('data', data => {
  //capture the prompt from the terminal
  const prompt = data.trim();
  main(prompt)
});


// initiate open ai API connection
const API_KEY = process.env.API_KEY;

const openai = new OpenAi({
  baseURL: "https://api.deepseek.com",
  apiKey: API_KEY
});


// main function to process inputs and outputs
const main = async (prompt) => {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: prompt }],
    model: "deepseek-chat",
    role: "trandlater",
    max_tokens: 2000,
    temperature: 0.2
  });

  const aiResponse = "\nAI: " + completion.choices[0].message.content;

  fs.appendFile("conversations.md", `\n You: ${prompt}`, (err) => {
    if (err) throw err;
  });

  fs.appendFile("conversations.md", aiResponse , (err) => {
    if (err) throw err;

    // exit process if the user says bye or exit
    if (prompt == "bye") process.exit();
  });

  console.log(aiResponse);
  process.stdout.write("\nAwaiting next prompt: ");
}