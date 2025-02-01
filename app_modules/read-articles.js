const fetch = require("node-fetch");

const readArticles = async (links) => {
  const API_KEY = process.env.RAPID_API_KEY;

  try {
    // If links is a single URL, convert it into an array for consistency
    if (typeof links === "string") {
      links = [links];
    }

    // Map each URL into a fetch call and store promises
    const fetchPromises = links.map(async (link) => {
      const url = `https://news-article-extractor1.p.rapidapi.com/api/scrape_article?url=${link}&format=text`;

      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host": "news-article-extractor1.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        return await response.text();
      } catch (error) {
        console.error(`Error fetching article for ${link}:`, error);
        return `Failed to fetch: ${link}`;
      }
    });

    // Wait for all API calls to finish
    const results = await Promise.all(fetchPromises);

    return results; // Return an array of fetched articles
  } catch (error) {
    console.error("Unable to fetch articles", error);
    return [];
  }
};

module.exports = readArticles;
