/**
 * @param {} symbols - takes either a string or an array of strings
 */

// get stock data from the API
const getStockData = async (symbols) => {
  const API_KEY = process.env.RAPID_API_KEY;

  // format the parameter if symbols is an array
  if (typeof(symbols) == 'object' && symbols.length > 1) {
    let formatParameter = "";

    symbols.forEach( (symbol, index) => {
      if (index == symbols.length - 1) formatParameter += symbol;
      else formatParameter += `${symbol}%2C`;
    })

    symbols = formatParameter;
  }

  const url = `https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/quotes?ticker=${symbols}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com'
    }
  };
  console.log(url);
  

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

module.exports = getStockData;