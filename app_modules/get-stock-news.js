const getStockNews = async (param) => {
  if (typeof(param) === "object" && param.length > 1){
    param = param.toString().replace(",", "%2C");
  }

  const url = `https://yahoo-finance166.p.rapidapi.com/api/news/list-by-symbol?s=${param}&region=US&snippetCount=500`;
  const options = {
    method: "GET",
    headers: {
      'x-rapidapi-key': process.env.RAPID_API_KEY,
      'x-rapidapi-host': 'yahoo-finance166.p.rapidapi.com'
    }
  }

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    console.log(result.data.main.stream);
    return result.data.main.stream;

  } catch (error) {
    console.error("unable to fetch dats", error);
  }
}

module.exports = getStockNews;