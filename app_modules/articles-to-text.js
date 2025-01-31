// fetch articles to be fed as prompt to the AI for context
const convertArticles = async (address) => {
  const API_KEY = process.env.RAPID_API_KEY;

  try {
    //make multiple api calls for multiple link address
    let url = `https://news-article-extractor1.p.rapidapi.com/api/scrape_article?url=${address}&format=text`;

    if (typeof(address) == 'object' && address.length > 1) {
      address.forEach( async (single_address) => {
        // new url
        url = `https://news-article-extractor1.p.rapidapi.com/api/scrape_article?url=${single_address}&format=text`;
        const options = {
          method: 'GET',
          headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': 'news-article-extractor1.p.rapidapi.com'
          }
        };

        const response = await fetch(url, options)
        const result = await response.text();
        console.log(result);
        return result;
      })
    } else {
        const options = {
          method: 'GET',
          headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': 'news-article-extractor1.p.rapidapi.com'
          }
        };

        const response = await fetch(url, options)
        const result = await response.text();
        console.log(result);
        return result;
    }

  } catch (error) {
    console.error("unable to fetch", error);
  }

}

module.exports = convertArticles;