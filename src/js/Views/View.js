export default class View {
  _data;
  parentElement = '';
  sidebarButtonId = '';
  targetFormElementId = '';
  errorMessage = 'Failed to load feature'; //default message

  renderError() {
    let html = `<div class="error">${this.errorMessage}</div>
    `;
  }

  renderComponent(data) {
    this._data = data;
    const markup = this.createMarkup();
    this.parentElement.insertAdjacentHTML('beforeend', markup);
  }

  clear() {
    this.parentElement = '';
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
