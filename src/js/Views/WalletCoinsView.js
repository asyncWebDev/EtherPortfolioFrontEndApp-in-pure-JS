import View from './View';

class WalletView extends View {
  parentElement = document.querySelector('.main-view-wallet-info');
  sidebarButtonId = document.getElementById('dashboard');

  createMarkup() {
    return `<div class="summary coin-table-small">
              <span>Net worth</span>
              <span class="font-strong">8000.0 USD</span>
            </div>
            <div class="wallet-frame">
              ${this._data.map(this.createCoinElement)}
            </div>
            <div class="chart-container">
              <canvas id="structure-chart"></canvas>
            </div>`;
  }

  createCoinElement(token) {
    return `<div class="coin-label" id="coin--address--${token.coinAddress}">
              <div class="coin-label-info">
               <img src=https://${
                 token.logo
               } onerror="(this.src = 'images/ERC20.jpg'; this.onerror = null)" alt="no-coin-logo" class="coin--image"/>
                  <div class="coin-table-small">
                      <span class="font-strong">${token.coinTicker}</span>
                      <span class="font-normal">${token.coinPrice}</span>
                  </div>
              </div>
              <div class="coin-table-small text-to-right">
                  <span class="font-strong">${token.coinValue}</span>
                  <span class="font-normal">${token.coinAmount.toFixed(
                    5
                  )}</span>
              </div>
            </div>`;
  }
}

export default new WalletView();
