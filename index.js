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
    Analyze the provided stock data and determine whether the stock is a good investment or a bad investment based on key financial indicators. 
    Provide a well-reasoned explanation, citing the specific data points that influenced your decision.

    Stock Data: ${JSON.stringify(stockData)}
    IMPORTANT!: If Stock Data contains no data, STOP, and let the user know no data is found for the ticker symbol. Ask them to re enter the ticker symbol.

    Analyze the Stock Data provided to make an investment decision.

    Expected Output Format:
    Company Name: The name of the company
    Ticker Symbol: The stock ticker symbol
    Investment Decision: (Good Investment / Bad Investment) If Bad create a scale that states the risk level
    Reasoning: Detailed analysis explaining why the stock is good or bad, citing specific data points.
    Supporting Evidence: Reference financial ratios, growth trends, and market sentiment used in the evaluation.
    Long Term or Short Term: If the stock is a good investment, state whether it is a long term or short term investment. Explain why.
    
    Example Response Format:
    Investment Decision: ✅ Good Investment

    Reasoning: Provide the precise reason for this invesment decision

    Supporting Evidence: Provide solid evidence and explain

    Term: Long Term/Short Term (Approximate Holding Timey)
    
  `

  // useDeepSeekAi(prompt);
  useOpenAi(prompt);
  
  });

})();


