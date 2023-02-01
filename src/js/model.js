import { COVALENT_KEY } from './config';
import { fetchAPI } from './helpers';

export const routes = [
  { pathName: '/dashboard' },
  { pathName: '/my-nfts' },
  { pathName: '/transfer' },
  { pathName: '/swaps-and-markets' },
  { pathName: '/docs' },
];

export const setPath = newPath => {
  const currentURL = window.location.href;
  const currentPath = window.location.pathname;
  const location = currentURL.slice(0, currentURL.lastIndexOf(currentPath));
  const newUrl = new URL(newPath, location);
  return window.history.pushState({}, '', newUrl);
};

export const topDefiTokens = [
  ['bitcoin', 'BTC'],
  ['ethereum', 'ETH'],
  ['dai', 'DAI'],
  ['chainlink', 'LINK'],
  ['uniswap', 'UNI'],
];

export const getSidebarTrackerData = async token => {
  try {
    const [tokenName, tokenTicker] = token;
    const data =
      await fetchAPI(`https://api.coingecko.com/api/v3/coins/${tokenName}/market_chart?vs_currency=usd&days=1&interval=daily
    `);
    const tokenPrice = data.prices[0][1];
    return { ticker: tokenTicker, price: tokenPrice };
  } catch (error) {
    console.error(error);
  }
};

export let activeAddress;

export const takeActiveAddress = address => {
  return (activeAddress = address);
};

export const getWalletContent = async activeAddress => {
  try {
    const data = await fetchAPI(
      `https://api.covalenthq.com/v1/1/address/${activeAddress}/balances_v2/?quote-currency=USD&format=JSON&nft=true&no-nft-fetch=true&key=${COVALENT_KEY}`
    );
    const tokensWalletContent = new Array();
    const tokens = data.data.items;
    tokens.map(token => {
      if (
        token.type === 'cryptocurrency' &&
        token.balance >= 1 &&
        token.contract_name.length >= 1
      ) {
        const cryptocurrency = {
          tokenName: token.contract_name,
          tokenAddress: token.contract_address,
          tokenAmount: token.balance / 10 ** token.contract_decimals,
          tokenPrice: token.quote_rate,
          tokenTicker: token.contract_ticker_symbol,
        };
        cryptocurrency.tokenValue =
          cryptocurrency.tokenAmount * token.quote_rate;
        cryptocurrency.logo = `logos.covalenthq.com/tokens/1/${cryptocurrency.tokenAddress}.png`;
        tokensWalletContent.push(cryptocurrency);
      }
    });
    return tokensWalletContent;
  } catch (error) {
    console.error(error, '👎🏻');
  }
};

export const countBalance = walletContent => {
  if (!walletContent || walletContent === undefined) return;
  const balance = walletContent.reduce((acc, token) => {
    if (token.tokenValue !== null) return acc + token.tokenValue;
  }, 0);
  return balance;
};

export const getCoingeckoId = async function (contractAddress) {
  try {
    const data = await fetchAPI(
      'https://api.coingecko.com/api/v3/coins/list?include_platform=true'
    );
    const coinId = data.find(
      token => token.platforms.ethereum === contractAddress
    );
    return coinId;
  } catch (error) {
    console.error(error);
  }
};

export const getHistoricalTokenPrice = async function (
  selectedCoin = 'ethereum'
) {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${selectedCoin}/market_chart?vs_currency=usd&days=365&interval=daily`
    );
    const data = await response.json();
    const timestamp = data.prices.map(timestamp => timestamp[0]);
    // const date = timestamp.map(timestamp =>
    //   new Date(timestamp).toLocaleString().slice(indexOf(','))
    // );
    const price = data.prices.map(price => price[1]);
    return [timestamp, price];
  } catch (error) {
    console.error(error);
  }
};
