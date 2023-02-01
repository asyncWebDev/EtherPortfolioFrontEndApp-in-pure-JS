export default class View {
  _path = '/docs';
  _data;
  parentElement = '';
  sidebarButtonId = '';
  targetFormElementId = '';
  errorMessage = 'Failed to load feature'; //default message

  renderError(errorMessage = this.errorMessage) {
    const html = `<p class="error">${errorMessage}</p>
    `;

    this.clear();
    this.parentElement.insertAdjacentHTML('beforeend', html);
  }

  renderLoader() {
    const html = `<div class="loader-wrapper">
      <div class="loader loader-outer">
        <div class="loader loader-inner"></div>
      </div>
    </div>`;
    this.clear();
    this.parentElement.insertAdjacentHTML('beforeend', html);
  }

  renderComponent(data) {
    const checkArray = Array.isArray(data) ? data.includes(undefined) : false;
    if (!data || data === undefined || data.length < 1 || checkArray) {
      return this.renderError();
    }
    this._data = data;
    this.clear();
    const markup = this.createMarkup();
    this.parentElement.insertAdjacentHTML('beforeend', markup);
  }

  clear() {
    if (this.parentElement !== '') this.parentElement.innerHTML = '';
  }

  sidebarHandler(handler) {
    const button = this.sidebarButtonId.closest('.sidebar-content');
    button.addEventListener('click', handler);
  }

  submitUserInputs(handler) {
    const target = this.targetFormElementId;
    document.addEventListener('submit', function (e) {
      e.preventDefault();
      if (e.target.id === target) {
        handler(e);
      }
    });
  }
}
