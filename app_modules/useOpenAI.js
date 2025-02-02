const OpenAI = require("openai");
const fs = require("node:fs");

const ORG_ID = process.env.ORGANIZATION_ID;
const PROJ_ID = process.env.PROJECT_ID;
const API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: API_KEY,
  organization: ORG_ID,
  project: PROJ_ID,
});

const main = async (prompt) => {
  const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      store: true,
      stream: true,
  });

  //Log prompts and responses
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${day}-${month}`;
  };

  const date = formatDate(new Date());

  fs.appendFile(`OpenAI_Log/${date}_OpenAI.md`, prompt, (err) => {
    if (err) throw err;
  })

  for await (const chunk of stream) {
    const aiResponse = chunk.choices[0]?.delta?.content || "";
    fs.appendFile(`OpenAI_Log/${date}_OpenAI.md`, aiResponse, (err) => {
      if (err) throw err;
    })

    process.stdout.write(chunk.choices[0]?.delta?.content || "");
  }
}

module.exports = main;