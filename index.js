process.stdin.setEncoding("utf-8");
require("dotenv").config();
const fetch = require("node-fetch");
const getStockData = require("./app_modules/get-stock-data");
const getStockNews = require("./app_modules/get-stock-news");
const useDeepSeekAi = require("./app_modules/useDeepSeek");
const useOpenAi = require("./app_modules/useOpenAI");


(async () => {
  process.stdout.write(`\Enter Stock Ticker Symbol: `);

  // proccess the prompt
  process.stdin.on("data", async (data) => {
    data = data.trim();
    const stockData = await getStockData(data);
    
    const prompt = `Instructions:
    Analyze the provided stock data and determine whether the stock is a good investment or a bad investment based on key financial indicators. Provide a well-reasoned explanation, citing the specific data points that influenced your decision.

    Stock Data:

    ${JSON.stringify(stockData)}

    Analysis Criteria:
    Valuation: Compare P/E ratio to industry averages. Is the stock overvalued or undervalued?
    Profitability: Analyze EPS, revenue growth, and profit margin to determine the company’s earnings strength.
    Financial Health: Check debt-to-equity ratio and free cash flow to assess liquidity and financial stability.
    Market Sentiment: Evaluate analyst ratings, insider activity, and recent news to gauge investor confidence.
    Risk vs. Reward: Based on historical volatility and macroeconomic conditions, determine the potential return vs. risk.

    Expected Output Format:
    Investment Decision: (Good Investment / Bad Investment)
    Reasoning: Detailed analysis explaining why the stock is good or bad, citing specific data points.
    Supporting Evidence: Reference financial ratios, growth trends, and market sentiment used in the evaluation.
    Example Response Format:
    Investment Decision: ✅ Good Investment

    Reasoning: The stock is trading at a P/E ratio of 15, which is below the industry average of 18, indicating it may be undervalued. The company's YoY revenue growth of 12% and EPS increase of 8% demonstrate strong financial performance. Additionally, a low debt-to-equity ratio of 0.3 suggests the company has minimal financial risk.

    Supporting Evidence:

    Valuation: The P/E ratio is lower than industry peers.
    Profitability: EPS growth and strong revenue increase show consistent earnings power.
    Financial Health: Healthy free cash flow and low debt indicate stability.
    Market Sentiment: Positive analyst ratings and insider buying suggest confidence.
  `

  // useDeepSeekAi(prompt);
  useOpenAi(prompt);
  
  });

})();


