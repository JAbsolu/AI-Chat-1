/**
 * Fetches stock data from the Yahoo Finance API.
 * @param {string | string[]} symbols - A single stock symbol or an array of stock symbols.
 * @returns {Promise<Object>} - Returns an object containing key stock metrics.
 */

const getStockData = async (symbols) => {
  const API_KEY = process.env.RAPID_API_KEY;

  // Format the symbols parameter for the API if it's an array
  if (Array.isArray(symbols) && symbols.length > 1) {
    symbols = symbols.join("%2C");
  }

  const url = `https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/quotes?ticker=${symbols}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!data.body || data.body.length === 0) {
      throw new Error("Invalid stock data received.");
    }

    const result = data.body[0];

    // Destructure key stock data
    const {
      symbol, // Stock ticker symbol
      shortName, // Company name
      regularMarketPrice, // Current market price
      regularMarketChange, // Change in price
      regularMarketChangePercent, // Change in percentage
      regularMarketPreviousClose, // Previous close price
      regularMarketOpen, // Opening price
      regularMarketDayHigh, // Highest price of the day
      regularMarketDayLow, // Lowest price of the day
      regularMarketVolume, // Trading volume of the day
      averageDailyVolume3Month, // 3-month average daily volume
      averageDailyVolume10Day, // 10-day average daily volume
      fiftyTwoWeekHigh, // 52-week high price
      fiftyTwoWeekLow, // 52-week low price
      fiftyTwoWeekRange, // 52-week range
      fiftyTwoWeekHighChange, // Difference from 52-week high
      fiftyTwoWeekHighChangePercent, // Percent difference from 52-week high
      fiftyTwoWeekLowChange, // Difference from 52-week low
      fiftyTwoWeekLowChangePercent, // Percent difference from 52-week low
      fiftyTwoWeekChangePercent, // Percent change over 52 weeks
      marketCap, // Market capitalization
      trailingPE, // Price-to-Earnings (P/E) ratio (trailing)
      forwardPE, // Forward Price-to-Earnings (P/E) ratio
      epsTrailingTwelveMonths, // Earnings per share (EPS) last 12 months
      epsForward, // Projected future EPS
      epsCurrentYear, // EPS for the current year
      priceEpsCurrentYear, // Price-to-EPS for the current year
      priceToBook, // Price-to-book ratio
      bookValue, // Book value per share
      dividendYield, // Dividend yield
      dividendRate, // Dividend rate
      dividendDate, // Next dividend payout date
      earningsTimestamp, // Next earnings report date
      earningsTimestampStart, // Earnings report period start
      earningsTimestampEnd, // Earnings report period end
      averageAnalystRating, // Analyst rating (e.g., Buy, Hold, Sell)
    } = result;

    return {
      symbol,
      shortName,
      regularMarketPrice,
      regularMarketChange,
      regularMarketChangePercent,
      regularMarketPreviousClose,
      regularMarketOpen,
      regularMarketDayHigh,
      regularMarketDayLow,
      regularMarketVolume,
      averageDailyVolume3Month,
      averageDailyVolume10Day,
      fiftyTwoWeekHigh,
      fiftyTwoWeekLow,
      fiftyTwoWeekRange,
      fiftyTwoWeekHighChange,
      fiftyTwoWeekHighChangePercent,
      fiftyTwoWeekLowChange,
      fiftyTwoWeekLowChangePercent,
      fiftyTwoWeekChangePercent,
      marketCap,
      trailingPE,
      forwardPE,
      epsTrailingTwelveMonths,
      epsForward,
      epsCurrentYear,
      priceEpsCurrentYear,
      priceToBook,
      bookValue,
      dividendYield,
      dividendRate,
      dividendDate,
      earningsTimestamp,
      earningsTimestampStart,
      earningsTimestampEnd,
      averageAnalystRating,
    };
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return null;
  }
};


module.exports = getStockData;