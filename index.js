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
const JohnDev = process.env.API_KEY;

const openai = new OpenAi({
  baseURL: "https://api.deepseek.com",
  apiKey: JohnDev
});


// main function to process inputs and outputs
const main = async (prompt) => {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: prompt }],
    model: "deepseek-chat",
  });

  const aiResponse = "\n AI: " + completion.choices[0].message.content;

  fs.appendFile("conversations.md", `\n User: ${prompt}`, (err) => {
    if (err) throw err;
  });

  fs.appendFile("conversations.md", aiResponse , (err) => {
    if (err) throw err;

    // exit process if the user says bye or exit
    if (prompt == "bye" || prompt == "exit") process.exit();
  });

  console.log(aiResponse);
  process.stdout.write("\nAwaiting next prompt: ");
}