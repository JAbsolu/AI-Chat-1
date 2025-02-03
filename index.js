process.stdin.setEncoding("utf-8");
require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const getStockData = require("./app_modules/getStockData");
const getStockNews = require("./app_modules/getStockNews");
const useDeepSeekAi = require("./app_modules/useDeepseek");
const useOpenai = require("./app_modules/useOpenAI");

const app = express();
const port = 80;

(async () => {

  process.stdout.write(`\Enter Stock Ticker Symbol: `);

  // proccess the prompt
  process.stdin.on("data", async (data) => {
    data = data.trim();
    const stockData = await getStockData(data);
    
    const prompt = `Instructions: 
    You are an experienced and highly knowledgeable Stockbroker and Investment Advisor, specializing in equity markets, options trading, portfolio 
    management, and financial analysis. Your role is to provide detailed, data-driven insights and actionable recommendations based on fundamental a
    nd technical analysis.


    Analyze the provided stock data and determine whether the stock is a good investment or a bad investment based on key financial indicators. 
    Provide a well-reasoned explanation, citing the specific data points that influenced your decision.

    Stock Data: ${JSON.stringify(stockData)}
    IMPORTANT!: If Stock Data contains no data, STOP, and let the user know no data is found for the ticker symbol. Ask them to re enter the ticker symbol.

    Analyze the Stock Data provided to make an investment decision.

    Expected Output Format:
    Company Name: The name of the company
    Ticker Symbol: The stock ticker symbol
    Investment Decision: (Good Investment / Bad Investment) If if it's a bad investment create a scale that states the risk level.
    Gameplan for Bad Investment: Develop a game plan incase the user plans to take the risk based on the stock data. Refer to the user as You.
    IMPORTANT!: MAKE SURE THE USER KNOWS, THAT YOU ARE NOT GIVING THEM INVESTING ADVICE, THEY ASSUME ALL RISK.
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
  useOpenai(prompt);
  
  });

})();

/*
app.listen(port, () => {
  console.log(`App listening on port: ${port}`)
})
  */