import View from './View.js';
import { formatAmount } from '../helpers.js';

class TrackerView extends View {
  parentElement = document.querySelector('.coins--grid');
  errorMessage = 'Tracker failed to load';

  createMarkup() {
    return `
    <div class="coin-tracker">
      <span>${this._data.name}</span><span>${formatAmount(
      this._data.price
    )}</span>
    </div>`;
  }

  renderCoinlabel() {
    return;
  }
}

export default new TrackerView();
