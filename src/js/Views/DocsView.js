import View from './View';

class DocsView extends View {
  parentElement = document.querySelector('.dashboard');

  createMarkup() {
    return `<div class="docs--text">Here the docs text</div>`;
  }
}
