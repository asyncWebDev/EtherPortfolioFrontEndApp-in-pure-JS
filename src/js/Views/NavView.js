import View from './View';

class NavView extends View {
  parentElement = document.querySelector('.main-layout-dashboard');
  targetFormElementId = 'form-search';

  renderComponent(data) {
    this._data = data;
    const markup = this.createMarkup();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  createMarkup() {
    return `<nav class="navbar">
        <form id="form-search">
          <label class="margin-text">Search for address</label>
          <input
            type="text"
            id="search--for--address"
            size="50"
            placeholder="0x123..."
            required
          />
          <button class="submit-search-for-address">          
          <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="search-loupe"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg></button>
        </form>
        <div>
          <div class="network">
            <form>
              <label class="margin-text">Network</label>
              <select>
                <option value="Goerli">Goerli</option>
                <option value="Mainnet">Mainnet</option>
              </select>
            </form>
            <button id="connect-wallet">
              <span id="isConnected">Connect wallet </span>
            </button>
          </div>
        </div>
      </nav>`;
  }

  takeSearchForAddress() {
    const searchForAddress = document.getElementById(
      'search--for--address'
    ).value;
    return searchForAddress;
  }
}

export default new NavView();
