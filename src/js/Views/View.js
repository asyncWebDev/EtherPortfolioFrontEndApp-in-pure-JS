export default class View {
  _data;
  parentElement = '';
  sidebarButtonId = '';
  targetFormElementId = '';
  errorMessage = 'Failed to load feature'; //default message

  renderError() {
    const html = `<p class="error">${this.errorMessage}</p>
    `;
  }

  renderComponent(data) {
    this._data = data;
    this.clear();
    const markup = this.createMarkup();
    this.parentElement.insertAdjacentHTML('beforeend', markup);
  }

  clear() {
    this.parentElement.innerHTML = '';
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
