const OpenAi = require("openai");
process.stdin.setEncoding('utf-8');
require("dotenv").config();
const fs = require("node:fs");

// prompt user to ask a question
process.stdout.write("\nAsk me a question: ");

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
const main = async (data) => {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: data }],
    model: "deepseek-chat",
  });

  const aiResponse = completion.choices[0].message.content;

  fs.appendFile("conversations.txt", `\n${data}`, (err) => {
    if (err) throw err;
  });

  fs.appendFile("conversations.txt", aiResponse , (err) => {
    if (err) throw err;

    // exit process if the user says bye or exit
    if (data == "bye" || data == "exit") process.exit();
  });

  console.log(aiResponse);
  process.stdout.write("\nAwaiting new prompt: ");
}