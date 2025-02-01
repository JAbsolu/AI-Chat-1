const fs = require("node:fs/promises");

const getSticker = async (name) => {
  try {
    const data = await fs.readFile("../assets/tickers.json", "utf-8");
    const result = JSON.parse(data)[0];

    const tickers = {};

    for (let key in result){
      if (key.includes(name)) {
        tickers[result[key].name] = result[key].symbol;
      }
    }
  
    console.log(tickers)
    return tickers;

  } catch (err) {
    console.error("Error reading file:", err);
    return null; // Return null or an appropriate error message
  }
};

module.exports = getSticker;