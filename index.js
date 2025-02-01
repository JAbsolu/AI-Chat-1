process.stdin.setEncoding('utf-8');
require("dotenv").config();
const fetch = require('node-fetch');
const getStockData = require("./app_modules/get-stock-data");
const articlesToText = require("./app_modules/articles-to-text");
const getStockNews = require("./app_modules/get-stock-news");
const useOpenAIo4mini = require("./app_modules/useOpenAI");
const useDeepSeekAi = require("./app_modules/useDeepSeek");


process.stdout.write("\nHi there! How can I help you today: ");

// proccess the prompt
process.stdin.on('data', data => {
  const prompt = data.trim();

  useDeepSeekAi(prompt);
  // useOpenAIo4mini(prompt);
});