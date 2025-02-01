process.stdin.setEncoding("utf-8");
require("dotenv").config();
const fetch = require("node-fetch");
const getStockData = require("./app_modules/get-stock-data");
const getStockNews = require("./app_modules/get-stock-news");
const useDeepSeekAi = require("./app_modules/useDeepSeek");

const stockSymbol = "AAPL";

(async () => {
  process.stdout.write(`\Enter Stock Ticker Symbol: `);

  // proccess the prompt
  process.stdin.on("data", data => {
    data = data.trim();
    const stockData = getStockData(data);

    const prompt = `
  You are an expert financial analyst with deep knowledge of stock market fundamentals, 
  valuation metrics, and investment strategies. Your task is to analyze the provided stock 
  data and determine whether the stock is a good investment or a bad investment. Use the 
  following steps to guide your analysis:
  ${stockData}

  Determine if the stock is overvalued, undervalued, or fairly valued based on the provided metrics and industry benchmarks.

  Evaluate the company’s growth prospects, competitive positioning, and industry trends.

  Identify any significant risks, such as high debt, declining revenue, or unfavorable industry conditions.

  Conclude whether the stock is a good investment or a bad investment based on your analysis. Clearly state the reasons for your decision, citing specific metrics and data points from the provided information.

  Always reference the exact data points or metrics used to support your conclusion.

  Output Format:

  Summary of Analysis: A brief overview of the stock’s performance and key metrics.

  Valuation Assessment: Whether the stock is overvalued, undervalued, or fairly valued.

  Growth and Risk Analysis: Key growth drivers and risks.

  Recommendation: A clear statement on whether the stock is a good or bad investment, with supporting reasoning.

  Data References: Specific metrics or data points used to reach the conclusion.

  
  Example Output:

  Summary of Analysis: The stock has a P/E ratio of 15, which is below the industry average of 20, indicating potential undervaluation. Revenue growth has been steady at 8% annually, and the company has a low debt-to-equity ratio of 0.5.

  Valuation Assessment: The stock appears undervalued based on its P/E ratio and strong financial health.

  Growth and Risk Analysis: The company operates in a growing industry with a strong competitive position. However, there is a risk of increased competition in the next 12 months.

  Recommendation: This stock is a good investment due to its undervaluation, strong financials, and growth potential.

  Data References: P/E ratio (15), industry average P/E (20), revenue growth (8%), debt-to-equity ratio (0.5).

  Note: If any critical data is missing or insufficient, clearly state that a definitive conclusion cannot be reached and specify what additional information is needed.
  `

  useDeepSeekAi(prompt)
  });

})();


