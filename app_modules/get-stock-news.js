const fetch = require("node-fetch");
const readArticles = require("./read-articles");

const getStockNews = async (param) => {
  const API_KEY = process.env.RAPID_API_KEY;

  if (Array.isArray(param)) {
    param = param.join("%2C");
  }

  const url = `https://yahoo-finance166.p.rapidapi.com/api/news/list-by-symbol?s=${param}&region=US&snippetCount=500`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": "yahoo-finance166.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    if (!result.data || !result.data.main || !result.data.main.stream) {
      throw new Error("Invalid response format or no news data found.");
    }

    const newsData = result.data.main.stream;

    // Extract URLs and filter out missing ones
    const all_urls = newsData
      .map((newsItem) => newsItem.content.clickThroughUrl?.url || newsItem.content.previewUrl)
      .filter((url) => url !== undefined && url !== "No URL available");

    if (all_urls.length === 0) {
      console.log("No valid news URLs found.");
      return [];
    }

    // Fetch articles and return the processed text
    const articles = await readArticles(all_urls);
    return articles;
  } catch (error) {
    console.error("Unable to fetch stock news:", error);
    return [];
  }
};

module.exports = getStockNews;
