import * as model from './model.js';
import * as transferModel from './transferModel';
import CoinChartView from './Views/CoinChartView.js';
import TrackerView from './Views/TrackerView.js';
import WalletCoinsView from './Views/WalletCoinsView.js';
import TransferView from './Views/TransferView.js';
import NavView from './Views/NavView.js';

const sidebarCoinsTracker = async () => {
  try {
    model.topDefiTokens.forEach(async token =>
      TrackerView.renderComponent(await model.getSidebarTrackerData(token))
    );
  } catch (error) {
    throw error;
  }
};

const navigationSetter = () => {
  NavView.renderComponent();

  const takeSearchForAddressHandler = e => {
    const searchForAddress = NavView.takeSearchForAddress();
    model.takeActiveAddress(searchForAddress);
    walletDashboard(e);
  };

  NavView.submitUserInputs(takeSearchForAddressHandler);
};

const walletDashboard = async e => {
  try {
    e.preventDefault();
    model.setPath(WalletCoinsView._path);

    WalletCoinsView.renderLoader();

    const tokensInWallet = await model.getWalletContent(model.activeAddress);

    const balance = model.countBalance(tokensInWallet);

    WalletCoinsView.renderComponent([tokensInWallet, balance]);
  } catch (error) {
    throw error;
  }
};

const setDisplayToken = token => {
  try {
    const getTokenId = async selectedToken => {
      const tokenId = await model.getCoingeckoId(selectedToken);
      if (tokenId === undefined) return;
      return tokenId.id;
    };

    const renderChart = async () => {
      CoinChartView.renderComponent(
        await model.getHistoricalTokenPrice(await getTokenId(token))
      );
    };
    renderChart();
  } catch (error) {
    throw error;
  }
};

const transferTokens = async e => {
  try {
    e.preventDefault();
    model.setPath(TransferView._path);

    TransferView.renderComponent('___');

    const transferTokensHandler = () => {
      const sender = transferModel.takeSenderData(
        transferModel.provider,
        transferModel.signer
      );
      const receiver = transferModel.takeReceiverData(
        TransferView.takeSendToData()
      );
      console.log(sender, receiver);
      transferModel.sendEther(sender, receiver);
    };

    TransferView.submitUserInputs(transferTokensHandler);
  } catch (error) {
    throw error;
  }
};

WalletCoinsView.sidebarHandler(walletDashboard);
TransferView.sidebarHandler(transferTokens);
CoinChartView.displayCoinChartHandler(setDisplayToken);

// const renderFromPath = currentPath => {
//   const currentPath = model.routes.filter(route => route === currentPath);
//   currentPath && '';
// };

const init = () => {
  sidebarCoinsTracker();
  navigationSetter();
};
init();
