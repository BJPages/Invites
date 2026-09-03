const EVENT_DATA = {
  fullName: 'Valeria Sarahí',
  firstName: 'Valeria',
  middleName: 'Sarahí',

  fullDate: '19 de diciembre de 2026',
  shortDate: '19 · Diciembre · 2026',
  japaneseDate: '十九日 · 十二月 · 二〇二六',

  location: 'Zacatlán, Puebla',

  links: {
    rsvpFormal: '#',
    rsvpAnime: '#',
    rsvpAccept: '',
    rsvpDecline: ''
  },

  images: {
    ruquitosHero: 'https://pub-cb21ede894ea4a9681d5a9533840d647.r2.dev/ruquitos-hero.png',

    chavizaHero: 'https://pub-cb21ede894ea4a9681d5a9533840d647.r2.dev/chaviza-hero.png',

    gallery1: 'https://pub-cb21ede894ea4a9681d5a9533840d647.r2.dev/vale1.jpeg',

    gallery2: 'https://pub-cb21ede894ea4a9681d5a9533840d647.r2.dev/vale2.jpeg',

    gallery3: 'https://pub-cb21ede894ea4a9681d5a9533840d647.r2.dev/vale3.jpeg',

    gallery4: 'https://pub-cb21ede894ea4a9681d5a9533840d647.r2.dev/vale4.jpeg'
  },

  // Cambia estos src cuando tengas las canciones.
  audio: {
    ruquitos: '',
    chaviza: ''
  },

  schedule: {
    formal: [
      {
        icon: '⛪',
        time: '5:00 PM',
        title: 'Ceremonia',
        description: 'Parroquia de San Pedro, Zacatlán, Puebla'
      },
      {
        icon: '🥂',
        time: '6:00 PM',
        title: 'Recepción',
        description: 'Salón & Jardín M&G, Zacatlán, Puebla'
      },
      {
        icon: '🍽️',
        time: '7:00 PM',
        title: 'Cena',
        description: 'Cena de celebración'
      },
      {
        icon: '💃',
        time: '9:00 PM',
        title: 'Vals',
        description: 'Un momento muy especial'
      },
      {
        icon: '🎵',
        time: '10:00 PM',
        title: 'Fiesta y baile',
        description: 'A celebrar y bailar toda la noche'
      }
    ],

    anime: [
      {
        icon: '⛩️',
        time: '5:00 PM',
        title: 'Primer capítulo',
        description: 'Ceremonia en la Parroquia de San Pedro, Zacatlán, Puebla'
      },
      {
        icon: '🌙',
        time: '6:00 PM',
        title: 'El encuentro',
        description: 'Recepción en Salón & Jardín M&G, Zacatlán, Puebla'
      },
      {
        icon: '🍱',
        time: '7:00 PM',
        title: 'El banquete',
        description: 'Cena de celebración'
      },
      {
        icon: '🦋',
        time: '9:00 PM',
        title: 'El vals',
        description: 'La escena más especial de la noche'
      },
      {
        icon: '⚔️',
        time: '10:00 PM',
        title: 'Fiesta final',
        description: 'Comienza el baile y la celebración'
      }
    ]
  },

  labels: {
    selectorTitle: '¿De qué lado vienes?',
    selectorSubtitle: 'Elige tu experiencia para entrar a la invitación',

    ruquitosTitle: 'Ruquitos',
    chavizaTitle: 'Chaviza',

    ruquitosDesc: 'Elegante · formal · tradicional',
    chavizaDesc: 'Anime · épico · legendario',

    formalScheduleTitle: 'Una noche mágica está por comenzar',
    animeScheduleTitle: 'Los capítulos de esta historia',

    formalGalleryTitle: 'Momentos para recordar',
    animeGalleryTitle: 'Fragmentos de la leyenda',

    rsvpFormal: 'Tu presencia hará este día aún más especial',
    rsvpAnime: 'Tu presencia será parte de esta leyenda'
  }
};


const selector = document.querySelector('#selector');
const ruquitos = document.querySelector('#ruquitos');
const chaviza = document.querySelector('#chaviza');

const choiceButtons = document.querySelectorAll('[data-theme]');
const backButtons = document.querySelectorAll('[data-back]');

const bgMusic = document.querySelector('#bgMusic');

const musicToggle = document.querySelector('#musicToggle');

const musicLabel = document.querySelector('[data-music-label]');

const musicIcon = document.querySelector('[data-music-icon]');


let currentTheme = null;
let musicReady = false;


renderEventData();
renderSchedules();
renderImages();
renderLinks();


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


musicToggle.addEventListener('click', () => {
  toggleMusic();
});


bgMusic.addEventListener('play', () => {
  updateMusicButton(true);
});


bgMusic.addEventListener('pause', () => {
  updateMusicButton(false);
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

    selectorTitle: EVENT_DATA.labels.selectorTitle,
    selectorSubtitle: EVENT_DATA.labels.selectorSubtitle,

    ruquitosTitle: EVENT_DATA.labels.ruquitosTitle,
    chavizaTitle: EVENT_DATA.labels.chavizaTitle,

    ruquitosDesc: EVENT_DATA.labels.ruquitosDesc,
    chavizaDesc: EVENT_DATA.labels.chavizaDesc,

    formalScheduleTitle: EVENT_DATA.labels.formalScheduleTitle,
    animeScheduleTitle: EVENT_DATA.labels.animeScheduleTitle,

    formalGalleryTitle: EVENT_DATA.labels.formalGalleryTitle,
    animeGalleryTitle: EVENT_DATA.labels.animeGalleryTitle,

    rsvpFormal: EVENT_DATA.labels.rsvpFormal,
    rsvpAnime: EVENT_DATA.labels.rsvpAnime
  };


  Object.entries(fields).forEach(([key, value]) => {
    document
      .querySelectorAll(`[data-field="${key}"]`)
      .forEach((element) => {
        element.textContent = value;
      });
  });


  document.title = `XV Años ${EVENT_DATA.fullName}`;


  document
    .querySelectorAll('[data-link]')
    .forEach((link) => {
      const key = link.dataset.link;

      if (EVENT_DATA.links[key]) {
        link.href = EVENT_DATA.links[key];
      }
    });
}


function renderSchedules() {
  document
    .querySelectorAll('[data-schedule]')
    .forEach((container) => {
      const type = container.dataset.schedule;

      const items = EVENT_DATA.schedule[type] || [];


      container.innerHTML = items
        .map((item) => `
          <article>
            <span>${item.icon || ''}</span>

            <h4>${item.title || ''}</h4>

            <p class="schedule-time">
              ${item.time || ''}
            </p>

            <small>
              ${item.description || ''}
            </small>
          </article>
        `)
        .join('');
    });
}


function renderImages() {
  document
    .querySelectorAll('[data-img]')
    .forEach((image) => {
      const key = image.dataset.img;

      const src = EVENT_DATA.images[key];

      const wrapper =
        image.closest('figure') ||
        image.parentElement;


      if (src) {
        image.src = src;

        image.classList.remove('is-placeholder');

        wrapper?.classList.remove('image-placeholder');
      } else {
        image.removeAttribute('src');

        image.classList.add('is-placeholder');

        wrapper?.classList.add('image-placeholder');
      }
    });
}


function renderLinks() {
  document
    .querySelectorAll('[data-link]')
    .forEach((link) => {
      const key = link.dataset.link;

      const href = EVENT_DATA.links[key];


      link.href = href || '#';

      link.classList.toggle(
        'is-disabled',
        !href || href === '#'
      );
    });
}


function openTheme(theme) {
  currentTheme = theme;


  selector.classList.add('hidden');
  selector.style.display = 'none';


  ruquitos.classList.add('hidden');
  chaviza.classList.add('hidden');


  ruquitos.classList.remove('active');
  chaviza.classList.remove('active');


  const selectedPage =
    theme === 'ruquitos'
      ? ruquitos
      : chaviza;


  selectedPage.classList.remove('hidden');

  selectedPage.style.display = 'block';


  requestAnimationFrame(() => {
    selectedPage.classList.add('active');
  });


  document.body.className = theme;


  startThemeMusic(theme);


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

  currentTheme = null;


  stopMusic();

  musicToggle.classList.add('hidden');


  window.scrollTo(0, 0);
}


function startThemeMusic(theme) {
  const src = EVENT_DATA.audio[theme];


  musicToggle.classList.remove('hidden');


  if (!src) {
    musicReady = false;

    bgMusic.removeAttribute('src');

    bgMusic.pause();

    updateMusicButton(false, 'Sin música');

    return;
  }


  musicReady = true;


  if (bgMusic.getAttribute('src') !== src) {
    bgMusic.src = src;

    bgMusic.load();
  }


  bgMusic.volume = 0.55;


  const playPromise = bgMusic.play();


  if (
    playPromise &&
    typeof playPromise.catch === 'function'
  ) {
    playPromise.catch(() => {
      updateMusicButton(
        false,
        'Reproducir música'
      );
    });
  }
}


function toggleMusic() {
  if (!musicReady) return;


  if (bgMusic.paused) {
    bgMusic.play().catch(() => {
      updateMusicButton(
        false,
        'Reproducir música'
      );
    });
  } else {
    bgMusic.pause();
  }
}


function stopMusic() {
  bgMusic.pause();

  bgMusic.currentTime = 0;

  bgMusic.removeAttribute('src');

  musicReady = false;

  updateMusicButton(false);
}


function updateMusicButton(
  isPlaying,
  customLabel
) {
  if (customLabel) {
    musicLabel.textContent = customLabel;

    musicIcon.textContent =
      isPlaying ? 'Ⅱ' : '♪';

    return;
  }


  musicLabel.textContent =
    isPlaying
      ? 'Pausar música'
      : 'Reproducir música';


  musicIcon.textContent =
    isPlaying ? 'Ⅱ' : '♪';
}
