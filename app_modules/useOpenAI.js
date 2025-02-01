const OpenAI = require("openai");

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
  for await (const chunk of stream) {
      process.stdout.write(chunk.choices[0]?.delta?.content || "");
  }
}

module.exports = main;