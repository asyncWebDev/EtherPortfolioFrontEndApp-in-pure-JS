import View from './View.js';
import { formatAmount } from '../helpers.js';

class TrackerView extends View {
  parentElement = document.querySelector('.coins--grid');
  errorMessage = 'Tracker failed to load';

  renderError(errorMessage = this.errorMessage) {
    const html = `<p class="sidebar-error">${errorMessage}</p>
    `;

    this.clear();
    this.parentElement.insertAdjacentHTML('beforeend', html);
  }

  clear() {}

  createMarkup() {
    return `
    <div class="coin-tracker">
      <span>${this._data.ticker}</span><span>${formatAmount(
      this._data.price
    )}</span>
    </div>`;
  }

  renderCoinlabel() {
    return;
  }
}

export default new TrackerView();
