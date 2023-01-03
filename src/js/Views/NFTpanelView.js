import View from './View';
import { lazyLoad } from '../helpers';

class NFTPanelView extends View {
  parentElement = document.querySelector('.main-view-wallet-info');

  createMarkup() {
    console.log(this._data.nftLogo);
    return `<div class="coin--label">
    <span>${this._data.nftName}</span>
    <span>Amount:<span>${this._data.nftBalance}</span></span>
    <img src="${this._data.nftLogo}" alt="${this._data.nftName}" class="coin--image">
  </div>`;
  }
}

export default new NFTPanelView();
