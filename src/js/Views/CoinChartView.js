import View from './View.js';
import Chart from 'chart.js/auto';

const options = {};

class CoinChartView extends View {
  parentElement = '';
  coinChart = null;
  errorMessage = `Sorry, we couldn't find token with specified ID`;

  renderLoader() {
    const html = `<div class="loader-wrapper">
      <div class="loader loader-outer">
        <div class="loader loader-inner"></div>
      </div>
    </div>`;
    this.parentElement = document.querySelector('.chart-container');
    this.parentElement.insertAdjacentHTML('beforeend', html);
  }

  createMarkup() {
    this.parentElement = document.getElementById('structure-chart');

    if (this.coinChart !== null) this.coinChart.destroy();
    this.coinChart = new Chart(this.parentElement, {
      type: 'line',
      data: {
        labels: this._data[0],
        datasets: [
          {
            label: 'Token price',
            data: this._data[1],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return this.coinChart;
  }

  displayCoinChartHandler(handler) {
    document.addEventListener('click', function (e) {
      if (e.target.id.startsWith('coin--address--')) {
        const [selectedToken] = e.target.id.split('coin--address--').splice(1);
        handler(selectedToken);
      }
    });
  }
}

export default new CoinChartView();
