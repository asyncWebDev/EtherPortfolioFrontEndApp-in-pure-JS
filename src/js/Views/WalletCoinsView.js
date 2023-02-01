import View from './View';
import gmx from './../../images/gmx.png';

class WalletView extends View {
  _path = '/dashboard';
  parentElement = document.querySelector('.main-view-handler');
  sidebarButtonId = document.getElementById('dashboard');
  errorMessage = `We couldn't find the address, try again with another one 😕`;

  renderError(errorMessage = this.errorMessage) {
    const html = `<p class="main-error">${errorMessage}</p>
    `;

    this.clear();
    this.parentElement.insertAdjacentHTML('beforeend', html);
  }

  createMarkup() {
    const [coinsWalletContent, balance] = this._data;
    return `<div class="main-view-wallet-info">
              <div class="net-worth coin-table-small">
                <span>Net worth</span>
                <span class="font-strong">${balance.toFixed(2)}</span>
              </div>
              <div class="wallet-frame">
                ${coinsWalletContent.map(this.createCoinElement).join('')}
              </div>
              <div class="chart-container">
                <canvas id="structure-chart"></canvas>
              </div>
           </div>`;
  }

  createCoinElement(token) {
    return `<div class="coin-label" id="coin--address--${token.tokenAddress}">
              <div class="coin-label-info">
               <img src=https://${token.logo} onerror="() => {
                return this.src = '../../images/gmx.png'
               }" alt="" class="coin--image"/>
                  <div class="coin-table-small">
                    <span class="font-strong">${token.tokenTicker}</span>
                    <span class="font-normal">${
                      token.tokenPrice === null ? '---' : token.tokenPrice
                    }</span>
                  </div>
              </div>
              <div class="coin-table-small text-to-right">
                <span class="font-strong">${
                  token.tokenPrice === null && token.tokenValue === 0
                    ? '---'
                    : token.tokenValue
                }</span>
                <span class="font-normal">${token.tokenAmount.toFixed(5)}</span>
              </div>
            </div>`;
  }
}

export default new WalletView();
