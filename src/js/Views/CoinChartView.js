import View from './View.js';
import { Chart } from 'chart.js/auto';

const options = {};

class CoinChartView extends View {
  createMarkup() {
    this.parentElement = document.getElementById('structure-chart');

    console.log(this._data);
    return new Chart(this.parentElement, {
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
