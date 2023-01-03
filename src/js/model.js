import { COVALENT_KEY } from './config';

export const getSidebarTrackerData = async function (token) {
  try {
    class Coin {
      constructor(name, price) {
        this.name = name;
        this.price = price;
      }
    }

    const tokenName = token[0];
    const tokenTicker = token[1];
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${tokenName}/market_chart?vs_currency=usd&days=1&interval=daily
      `
    );
    const data = await response.json();
    const tokenLabel = new Array();
    const tokenPrice = data.prices[0][1];
    tokenLabel.push(tokenTicker, tokenPrice);
    return new Coin(...tokenLabel);
  } catch (err) {
    console.error(err);
    err;
  }
};

export const topDefiTokens = [
  ['bitcoin', 'BTC'],
  ['ethereum', 'ETH'],
  ['dai', 'DAI'],
  ['chainlink', 'LINK'],
  ['uniswap', 'UNI'],
];

export let activeAddress;

export const takeActiveAddress = function (address) {
  console.log(address);
  return (activeAddress = address);
};

export const getWalletContent = async activeAddress => {
  try {
    const response = await fetch(
      `https://api.covalenthq.com/v1/1/address/${activeAddress}/balances_v2/?quote-currency=USD&format=JSON&nft=true&no-nft-fetch=true&key=${COVALENT_KEY}`
    );
    const data = await response.json();
    console.log(data);
    const coinsWalletContent = new Array();
    const tokens = data.data.items;
    tokens.map(coin => {
      if (
        coin.type === 'cryptocurrency' &&
        coin.balance >= 1 &&
        coin.contract_name.length >= 1
      ) {
        const cryptocurrency = {
          coinName: coin.contract_name,
          coinAddress: coin.contract_address,
          coinAmount: coin.balance / 10 ** coin.contract_decimals,
          coinPrice: coin.quote_rate,
          coinTicker: coin.contract_ticker_symbol,
        };
        cryptocurrency.coinValue = cryptocurrency.coinAmount * coin.quote_rate;
        cryptocurrency.logo = `logos.covalenthq.com/tokens/1/${cryptocurrency.coinAddress}.png`;
        coinsWalletContent.push(cryptocurrency);
      }
    });
    return coinsWalletContent;
  } catch (err) {
    console.error(err);
    err;
  }
};

export const countBalance = function (walletContent) {
  return walletContent.reduce((acc, token) => {
    if (token.coinValue !== null) return acc + token.coinValue;
  }, 0);
};

export const getCoingeckoId = async function (contractAddress) {
  try {
    const resposne = await fetch(
      'https://api.coingecko.com/api/v3/coins/list?include_platform=true'
    );
    const data = await resposne.json();
    const coinId = data.find(
      token => token.platforms.ethereum === contractAddress
    );
    console.log(coinId);
    return coinId;
  } catch (err) {
    console.log(err);
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
  } catch (err) {
    console.log(err);
  }
};

// export const getWalletNFTs = async function () {
//   try {
//     const response = await fetch(
//       `https://api.covalenthq.com/v1/1/address/${exampleAddress}/balances_v2/?quote-currency=USD&format=JSON&nft=true&no-nft-fetch=true&key=${COVALENT_KEY}`
//     );
//     const data = await response.json();
//     console.log(data);
//     const NFTWalletContent = new Array();
//     const tokens = data.data.items;
//     tokens.map(token => {
//       if (token.type === 'nft' && token.balance >= 1) {
//         const NFT = {
//           nftContractAddress: token.contract_address,
//           nftName: token.contract_ticker_symbol,
//           nftBalance: token.balance,
//           nftLogo: token.logo_url,
//         };
//         NFTWalletContent.push(NFT);
//       }
//     });
//     return NFTWalletContent;
//   } catch (err) {
//     console.error(err);
//     err;
//   }
// };
