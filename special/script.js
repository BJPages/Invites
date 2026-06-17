const EVENT_DATA = {
  fullName: 'Valeria Sarahí',
  firstName: 'Valeria',
  middleName: 'Sarahí',

  fullDate: '19 de diciembre de 2026',
  shortDate: '19 · Diciembre · 2026',
  japaneseDate: '十九日 · 十二月 · 二〇二六',

  location: 'Zacatlán, Puebla',

  times: {
    ceremony: '5:00 PM',
    reception: '6:30 PM',
    waltz: '8:00 PM',
    dinner: '8:30 PM',
    party: '10:00 PM'
  },

  labels: {
    selectorTitle: '¿De qué lado vienes?',
    selectorSubtitle: 'Elige tu experiencia para entrar a la invitación',

    ruquitosTitle: 'Ruquitos',
    chavizaTitle: 'Chaviza',

    ruquitosLocationText: 'Un lugar mágico para una noche inolvidable',
    chavizaLocationText: 'Un destino legendario para una historia inolvidable',

    rsvpFormal: 'Tu presencia hará este día aún más especial',
    rsvpAnime: 'Tu presencia será parte de esta leyenda'
  }
};

const selector = document.querySelector('#selector');
const ruquitos = document.querySelector('#ruquitos');
const chaviza = document.querySelector('#chaviza');
const choiceButtons = document.querySelectorAll('[data-theme]');
const backButtons = document.querySelectorAll('[data-back]');

renderEventData();

choiceButtons.forEach((button) => {
  button.addEventListener('click', () => {
    openTheme(button.dataset.theme);
  });
});

backButtons.forEach((button) => {
  button.addEventListener('click', () => {
    showSelector();
  });
});

function renderEventData() {
  const fields = {
    fullName: EVENT_DATA.fullName,
    firstName: EVENT_DATA.firstName,
    middleName: EVENT_DATA.middleName,
    fullDate: EVENT_DATA.fullDate,
    shortDate: EVENT_DATA.shortDate,
    japaneseDate: EVENT_DATA.japaneseDate,
    location: EVENT_DATA.location,

    ceremonyTime: EVENT_DATA.times.ceremony,
    receptionTime: EVENT_DATA.times.reception,
    waltzTime: EVENT_DATA.times.waltz,
    dinnerTime: EVENT_DATA.times.dinner,
    partyTime: EVENT_DATA.times.party,

    selectorTitle: EVENT_DATA.labels.selectorTitle,
    selectorSubtitle: EVENT_DATA.labels.selectorSubtitle,
    ruquitosTitle: EVENT_DATA.labels.ruquitosTitle,
    chavizaTitle: EVENT_DATA.labels.chavizaTitle,
    ruquitosLocationText: EVENT_DATA.labels.ruquitosLocationText,
    chavizaLocationText: EVENT_DATA.labels.chavizaLocationText,
    rsvpFormal: EVENT_DATA.labels.rsvpFormal,
    rsvpAnime: EVENT_DATA.labels.rsvpAnime
  };

  Object.entries(fields).forEach(([key, value]) => {
    document.querySelectorAll(`[data-field="${key}"]`).forEach((element) => {
      element.textContent = value;
    });
  });

  document.title = `XV Años ${EVENT_DATA.fullName}`;
}

function openTheme(theme) {
  selector.classList.add('hidden');
  selector.style.display = 'none';

  ruquitos.classList.add('hidden');
  chaviza.classList.add('hidden');

  ruquitos.classList.remove('active');
  chaviza.classList.remove('active');

  const selectedPage = theme === 'ruquitos' ? ruquitos : chaviza;

  selectedPage.classList.remove('hidden');
  selectedPage.style.display = 'block';

  requestAnimationFrame(() => {
    selectedPage.classList.add('active');
  });

  document.body.className = theme;

  window.scrollTo(0, 0);
}

function showSelector() {
  selector.classList.remove('hidden');
  selector.style.display = 'grid';

  ruquitos.classList.add('hidden');
  chaviza.classList.add('hidden');

  ruquitos.classList.remove('active');
  chaviza.classList.remove('active');

  ruquitos.style.display = '';
  chaviza.style.display = '';

  document.body.className = '';

  window.scrollTo(0, 0);
}
