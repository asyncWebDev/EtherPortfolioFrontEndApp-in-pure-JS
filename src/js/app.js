import * as model from './model.js';
import * as transferModel from './transferModel';
import CoinChartView from './Views/CoinChartView.js';
import TrackerView from './Views/TrackerView.js';
import WalletCoinsView from './Views/WalletCoinsView.js';
import TransferView from './Views/TransferView.js';
import NavView from './Views/NavView.js';

const sidebarCoinsTracker = async function () {
  model.topDefiTokens.forEach(async token =>
    TrackerView.renderComponent(await model.getSidebarTrackerData(token))
  );
};

const navigationSetter = function () {
  NavView.renderComponent();

  const takeSearchForAddressHandler = function (e) {
    const searchForAddress = NavView.takeSearchForAddress();
    model.takeActiveAddress(searchForAddress);
    walletDashboard(e);
  };

  NavView.submitUserInputs(takeSearchForAddressHandler);
};

const walletDashboard = async function (e) {
  e.preventDefault();

  const coinsInWallet = await model.getWalletContent(model.activeAddress);

  const balance = model.countBalance(coinsInWallet);

  WalletCoinsView.renderComponent(coinsInWallet);
};

const transferTokens = async function (e) {
  e.preventDefault();
  TransferView.renderComponent();

  const transferTokensHandler = function () {
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
};

const setDisplayToken = function (token) {
  const getTokenId = async function (selectedToken) {
    const tokenId = await model.getCoingeckoId(selectedToken);
    return tokenId.id;
  };
  const renderChart = async function () {
    CoinChartView.renderComponent(
      await model.getHistoricalTokenPrice(await getTokenId(token))
    );
  };
  renderChart();
};

WalletCoinsView.sidebarHandler(walletDashboard);
TransferView.sidebarHandler(transferTokens);
CoinChartView.displayCoinChartHandler(setDisplayToken);

const init = () => {
  sidebarCoinsTracker();
  navigationSetter();
};
init();
