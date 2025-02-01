const API_KEY = process.env.FMP_API_KEY;

const getStockSymbol = async (name) => {
  try {
    const url = `https://financialmodelingprep.com/api/v3/search-name?query=${name}&limit=1&exchange=NASDAQ&apikey=${API_KEY}`;
    const options = {
      method: "GET",
    }

    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

getStockSymbol("Reddit")