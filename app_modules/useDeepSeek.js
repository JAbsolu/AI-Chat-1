const OpenAi = require("openai");
const fs = require("node:fs");
const getSticker = require("./get-tickers");
process.stdin.setEncoding('utf-8');

const API_KEY = process.env.DEEPSEEK_API_KEY;

const openai = new OpenAi({
  baseURL: "https://api.deepseek.com",
  apiKey: API_KEY
});

// main function to process inputs and outputs
const main = async (prompt) => {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: prompt }],
    model: "deepseek-chat",
    max_token: 2000,
    temperature: 0,
  });

  const aiResponse = "\n" + await completion.choices[0].message.content;

  //get today's date
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${day}-${month}`;
  };

  const date = formatDate(new Date());

  fs.appendFile(`DeepSeek_Log/${date}-log.md`, `\nYou: ${prompt}`, (err) => {
    if (err) throw err;
  });

  fs.appendFile(`chat_log/${date}-log.md`, `DeepSeek: ${aiResponse}\n`, (err) => {
    if (err) throw err;

    // exit process if the user says bye or exit
    if (prompt == "bye") process.exit();
  });
  
  process.stdout.write(aiResponse)
  process.stdout.write("\nYou: ");
}

module.exports = main;