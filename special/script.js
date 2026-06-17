const selector = document.querySelector('#selector');
const ruquitos = document.querySelector('#ruquitos');
const chaviza = document.querySelector('#chaviza');
const choiceButtons = document.querySelectorAll('[data-theme]');
const backButtons = document.querySelectorAll('[data-back]');

choiceButtons.forEach((button) => {
  button.addEventListener('click', () => {
    openTheme(button.dataset.theme);
  });
});

backButtons.forEach((button) => {
  button.addEventListener('click', () => {
    selector.classList.remove('hidden');
    ruquitos.classList.add('hidden');
    chaviza.classList.add('hidden');
    document.body.className = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

function openTheme(theme) {
  selector.classList.add('hidden');

  ruquitos.classList.toggle('hidden', theme !== 'ruquitos');
  chaviza.classList.toggle('hidden', theme !== 'chaviza');

  document.body.className = theme;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
