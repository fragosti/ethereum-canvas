export const toEther = (wei) => wei / 1000000000000000000;

export const etherUsd = fetch('https://api.coinmarketcap.com/v1/ticker/')
  .then(res => res.json())
  .then(tickers => tickers.find(ticker => ticker.symbol === "ETH").price_usd);