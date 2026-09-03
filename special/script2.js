window.PASS_SCRIPT_VERSION = '2.0.0';
console.info('[Invitación] script-pases-v2.js 2.0.0 cargado');

const EVENT_DATA = {
  fullName: 'Valeria Sarahí',
  firstName: 'Valeria',
  middleName: 'Sarahí',

  fullDate: '19 de diciembre de 2026',
  shortDate: '19 · Diciembre · 2026',
  japaneseDate: '十九日 · 十二月 · 二〇二六',

  location: 'Zacatlán, Puebla',
  whatsappNumber: '522224552910',

  passBackgrounds: {
    ruquitos: 'ruquitosHero',
    chaviza: 'chavizaHero'
  },

  links: {
    salon: 'https://share.google/EekuzPNNUuxc9XwVi',
    rsvpAccept: '',
    rsvpDecline: ''
  },

  images: {
    ruquitosHero:
      'https://pub-cb21ede894ea4a9681d5a9533840d647.r2.dev/ruquitos-hero.png',

    chavizaHero:
      'https://pub-cb21ede894ea4a9681d5a9533840d647.r2.dev/chaviza-hero.png',

    gallery1:
      'https://pub-cb21ede894ea4a9681d5a9533840d647.r2.dev/vale1.jpeg',

    gallery2:
      'https://pub-cb21ede894ea4a9681d5a9533840d647.r2.dev/vale2.jpeg',

    gallery3:
      'https://pub-cb21ede894ea4a9681d5a9533840d647.r2.dev/vale3.jpeg',

    gallery4:
      'https://pub-cb21ede894ea4a9681d5a9533840d647.r2.dev/vale4.jpeg'
  },

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
        description:
          'Parroquia de San Pedro, Zacatlán, Puebla'
      },

      {
        icon: '🥂',
        time: '6:00 PM',
        title: 'Recepción',
        description:
          'Salón & Jardín M&G, Zacatlán, Puebla'
      },

      {
        icon: '🍽️',
        time: '7:00 PM',
        title: 'Cena',
        description:
          'Cena de celebración'
      },

      {
        icon: '💃',
        time: '9:00 PM',
        title: 'Vals',
        description:
          'Un momento muy especial'
      },

      {
        icon: '🎵',
        time: '10:00 PM',
        title: 'Fiesta y baile',
        description:
          'A celebrar y bailar toda la noche'
      }
    ],

    anime: [
      {
        icon: '⛩️',
        time: '5:00 PM',
        title: 'Primer capítulo',
        description:
          'Ceremonia en la Parroquia de San Pedro, Zacatlán, Puebla'
      },

      {
        icon: '🌙',
        time: '6:00 PM',
        title: 'El encuentro',
        description:
          'Recepción en Salón & Jardín M&G, Zacatlán, Puebla'
      },

      {
        icon: '🍱',
        time: '7:00 PM',
        title: 'El banquete',
        description:
          'Cena de celebración'
      },

      {
        icon: '🦋',
        time: '9:00 PM',
        title: 'El vals',
        description:
          'La escena más especial de la noche'
      },

      {
        icon: '⚔️',
        time: '10:00 PM',
        title: 'Fiesta final',
        description:
          'Comienza el baile y la celebración'
      }
    ]
  },

  labels: {
    selectorTitle:
      '¿De qué lado vienes?',

    selectorSubtitle:
      'Elige tu experiencia para entrar a la invitación',

    ruquitosTitle:
      'Ruquitos',

    chavizaTitle:
      'Chaviza',

    ruquitosDesc:
      'Elegante · formal · tradicional',

    chavizaDesc:
      'Anime · épico · legendario',

    formalScheduleTitle:
      'Una noche mágica está por comenzar',

    animeScheduleTitle:
      'Los capítulos de esta historia',

    formalGalleryTitle:
      'Momentos para recordar',

    animeGalleryTitle:
      'Fragmentos de la leyenda',

    rsvpFormal:
      'Tu presencia hará este día aún más especial.',

    rsvpAnime:
      'Tu presencia será parte de esta leyenda.'
  }
};


/* =========================================================
   ELEMENTOS
========================================================= */

const selector =
  document.querySelector('#selector');

const ruquitos =
  document.querySelector('#ruquitos');

const chaviza =
  document.querySelector('#chaviza');

const choiceButtons =
  document.querySelectorAll('[data-theme]');

const backButtons =
  document.querySelectorAll('[data-back]');

const bgMusic =
  document.querySelector('#bgMusic');

const musicToggle =
  document.querySelector('#musicToggle');

const musicLabel =
  document.querySelector(
    '[data-music-label]'
  );

const musicIcon =
  document.querySelector(
    '[data-music-icon]'
  );


let currentTheme = null;
let musicReady = false;


/* =========================================================
   PASES
========================================================= */

const PASS_COUNT =
  getPassCount();

const PASS_LABEL =
  formatPassLabel(
    PASS_COUNT
  );

const passBackgroundPromises = {};


/* =========================================================
   INICIO
========================================================= */

renderEventData();
renderSchedules();
renderImages();
renderPassContent();
renderRsvpLinks();
bindPassDownloadButtons();
preloadPassBackgrounds();


/* =========================================================
   EVENTOS
========================================================= */

choiceButtons.forEach(
  (button) => {

    button.addEventListener(
      'click',
      () => {

        openTheme(
          button.dataset.theme
        );

      }
    );

  }
);


backButtons.forEach(
  (button) => {

    button.addEventListener(
      'click',
      showSelector
    );

  }
);


musicToggle?.addEventListener(
  'click',
  toggleMusic
);


bgMusic?.addEventListener(
  'play',
  () => {
    updateMusicButton(true);
  }
);


bgMusic?.addEventListener(
  'pause',
  () => {
    updateMusicButton(false);
  }
);


/* =========================================================
   LEER NÚMERO DE PASES
========================================================= */

function getPassCount() {

  const params =
    new URLSearchParams(
      window.location.search
    );


  const raw =
    params.get('pases') ||
    params.get('personas') ||
    '1';


  const parsed =
    Number.parseInt(
      raw,
      10
    );


  return (
    Number.isInteger(parsed) &&
    parsed > 0
  )
    ? parsed
    : 1;

}


function formatPassLabel(
  count
) {

  return (
    `${count} ` +
    (
      count === 1
        ? 'persona'
        : 'personas'
    )
  );

}


function passInvitationText(
  baseText
) {

  return (
    `${baseText} ` +
    `Nos llena de alegría compartir contigo tu pase para ${PASS_LABEL}.`
  );

}


/* =========================================================
   DATOS GENERALES
========================================================= */

function renderEventData() {

  const fields = {

    fullName:
      EVENT_DATA.fullName,

    firstName:
      EVENT_DATA.firstName,

    middleName:
      EVENT_DATA.middleName,

    fullDate:
      EVENT_DATA.fullDate,

    shortDate:
      EVENT_DATA.shortDate,

    japaneseDate:
      EVENT_DATA.japaneseDate,

    location:
      EVENT_DATA.location,

    selectorTitle:
      EVENT_DATA.labels.selectorTitle,

    selectorSubtitle:
      EVENT_DATA.labels.selectorSubtitle,

    ruquitosTitle:
      EVENT_DATA.labels.ruquitosTitle,

    chavizaTitle:
      EVENT_DATA.labels.chavizaTitle,

    ruquitosDesc:
      EVENT_DATA.labels.ruquitosDesc,

    chavizaDesc:
      EVENT_DATA.labels.chavizaDesc,

    formalScheduleTitle:
      EVENT_DATA.labels
        .formalScheduleTitle,

    animeScheduleTitle:
      EVENT_DATA.labels
        .animeScheduleTitle,

    formalGalleryTitle:
      EVENT_DATA.labels
        .formalGalleryTitle,

    animeGalleryTitle:
      EVENT_DATA.labels
        .animeGalleryTitle,

    rsvpFormal:
      passInvitationText(
        EVENT_DATA.labels.rsvpFormal
      ),

    rsvpAnime:
      passInvitationText(
        EVENT_DATA.labels.rsvpAnime
      )

  };


  Object.entries(
    fields
  ).forEach(
    ([key, value]) => {

      document
        .querySelectorAll(
          `[data-field="${key}"]`
        )
        .forEach(
          (element) => {

            element.textContent =
              value;

          }
        );

    }
  );


  document.title =
    `XV Años ${EVENT_DATA.fullName}`;

}


/* =========================================================
   HORARIOS
========================================================= */

function renderSchedules() {

  document
    .querySelectorAll(
      '[data-schedule]'
    )
    .forEach(
      (container) => {

        const type =
          container.dataset.schedule;


        const items =
          EVENT_DATA
            .schedule[type] ||
          [];


        container.innerHTML =
          items
            .map(
              (item) => `
                <article>

                  <span>
                    ${item.icon || ''}
                  </span>

                  <h4>
                    ${item.title || ''}
                  </h4>

                  <p class="schedule-time">
                    ${item.time || ''}
                  </p>

                  <small>
                    ${item.description || ''}
                  </small>

                </article>
              `
            )
            .join('');

      }
    );

}


/* =========================================================
   IMÁGENES
========================================================= */

function renderImages() {

  document
    .querySelectorAll(
      '[data-img]'
    )
    .forEach(
      (image) => {

        const key =
          image.dataset.img;


        const src =
          EVENT_DATA.images[key];


        const wrapper =
          image.closest('figure') ||
          image.parentElement;


        if (src) {

          image.src =
            src;


          image.classList.remove(
            'is-placeholder'
          );


          wrapper
            ?.classList
            .remove(
              'image-placeholder'
            );

        } else {

          image.removeAttribute(
            'src'
          );


          image.classList.add(
            'is-placeholder'
          );


          wrapper
            ?.classList
            .add(
              'image-placeholder'
            );

        }

      }
    );

}


/* =========================================================
   TEXTO DE LOS PASES
========================================================= */

function renderPassContent() {

  document
    .querySelectorAll(
      '[data-pass-message]'
    )
    .forEach(
      (element) => {

        element.textContent =
          `Pase para ${PASS_LABEL}`;

      }
    );


  const instructions =
    'En caso de asistir, primero descarga tu pase y después confirma tu asistencia por WhatsApp con el botón de abajo.';


  document
    .querySelectorAll(
      '.pass-instructions'
    )
    .forEach(
      (element) => {

        element.textContent =
          instructions;

      }
    );

}


/* =========================================================
   WHATSAPP
========================================================= */

function buildWhatsAppLink(
  message
) {

  return (
    `https://wa.me/` +
    `${EVENT_DATA.whatsappNumber}` +
    `?text=` +
    `${encodeURIComponent(message)}`
  );

}


function renderRsvpLinks() {

  /*
   * Conserva el mensaje original:
   *
   * Hola, confirmo mi asistencia...
   * ¡Ahí estaré! 💜
   *
   * y solamente agrega el número
   * de personas en medio.
   */
  const acceptMessage =
    `Hola, confirmo mi asistencia a los XV Años de ${EVENT_DATA.fullName}. ` +
    `La asistencia será para ${PASS_LABEL}. ` +
    '¡Ahí estaré! 💜';


  /*
   * No asistencia queda igual.
   */
  const declineMessage =
    `Hola, muchas gracias por la invitación a los XV Años de ${EVENT_DATA.fullName}. ` +
    'Lamentablemente no podré asistir.';


  EVENT_DATA.links.rsvpAccept =
    buildWhatsAppLink(
      acceptMessage
    );


  EVENT_DATA.links.rsvpDecline =
    buildWhatsAppLink(
      declineMessage
    );


  renderLinks();

}


/* =========================================================
   LINKS
========================================================= */

function renderLinks() {

  document
    .querySelectorAll(
      '[data-link]'
    )
    .forEach(
      (link) => {

        const key =
          link.dataset.link;


        const href =
          EVENT_DATA.links[key];


        link.href =
          href || '#';


        link.classList.toggle(
          'is-disabled',
          !href ||
          href === '#'
        );

      }
    );

}


/* =========================================================
   TEMAS
========================================================= */

function openTheme(
  theme
) {

  currentTheme =
    theme;


  selector.classList.add(
    'hidden'
  );


  selector.style.display =
    'none';


  ruquitos.classList.add(
    'hidden'
  );


  chaviza.classList.add(
    'hidden'
  );


  ruquitos.classList.remove(
    'active'
  );


  chaviza.classList.remove(
    'active'
  );


  const selectedPage =
    theme === 'ruquitos'
      ? ruquitos
      : chaviza;


  selectedPage
    .classList
    .remove(
      'hidden'
    );


  selectedPage.style.display =
    'block';


  requestAnimationFrame(
    () => {

      selectedPage
        .classList
        .add(
          'active'
        );

    }
  );


  document.body.className =
    theme;


  startThemeMusic(
    theme
  );


  window.scrollTo(
    0,
    0
  );

}


function showSelector() {

  selector.classList.remove(
    'hidden'
  );


  selector.style.display =
    'grid';


  ruquitos.classList.add(
    'hidden'
  );


  chaviza.classList.add(
    'hidden'
  );


  ruquitos.classList.remove(
    'active'
  );


  chaviza.classList.remove(
    'active'
  );


  ruquitos.style.display =
    '';


  chaviza.style.display =
    '';


  document.body.className =
    '';


  currentTheme =
    null;


  stopMusic();


  musicToggle
    ?.classList
    .add(
      'hidden'
    );


  window.scrollTo(
    0,
    0
  );

}


/* =========================================================
   MÚSICA
========================================================= */

function startThemeMusic(
  theme
) {

  if (
    !bgMusic ||
    !musicToggle
  ) {
    return;
  }


  const src =
    EVENT_DATA.audio[theme];


  musicToggle
    .classList
    .remove(
      'hidden'
    );


  if (!src) {

    musicReady =
      false;


    bgMusic.pause();


    bgMusic.removeAttribute(
      'src'
    );


    updateMusicButton(
      false,
      'Sin música'
    );


    return;

  }


  musicReady =
    true;


  if (
    bgMusic.getAttribute(
      'src'
    ) !== src
  ) {

    bgMusic.src =
      src;


    bgMusic.load();

  }


  bgMusic.volume =
    0.55;


  bgMusic
    .play()
    .catch(
      () => {

        updateMusicButton(
          false,
          'Reproducir música'
        );

      }
    );

}


function toggleMusic() {

  if (
    !musicReady ||
    !bgMusic
  ) {
    return;
  }


  if (
    bgMusic.paused
  ) {

    bgMusic
      .play()
      .catch(
        () => {

          updateMusicButton(
            false,
            'Reproducir música'
          );

        }
      );

  } else {

    bgMusic.pause();

  }

}


function stopMusic() {

  if (!bgMusic) {
    return;
  }


  bgMusic.pause();


  bgMusic.currentTime =
    0;


  bgMusic.removeAttribute(
    'src'
  );


  musicReady =
    false;


  updateMusicButton(
    false
  );

}


function updateMusicButton(
  isPlaying,
  customLabel
) {

  if (
    !musicLabel ||
    !musicIcon
  ) {
    return;
  }


  musicLabel.textContent =
    customLabel ||
    (
      isPlaying
        ? 'Pausar música'
        : 'Reproducir música'
    );


  musicIcon.textContent =
    isPlaying
      ? 'Ⅱ'
      : '♪';

}


/* =========================================================
   PRE-CARGA DEL FONDO DEL PASE
========================================================= */

function preloadPassBackgrounds() {

  [
    'ruquitos',
    'chaviza'
  ].forEach(
    (theme) => {

      getPassBackgroundImage(
        theme
      );

    }
  );

}


function getPassBackgroundSrc(
  theme
) {

  const imageKey =
    EVENT_DATA
      .passBackgrounds[
        theme
      ];


  return (
    EVENT_DATA
      .images[
        imageKey
      ] ||
    EVENT_DATA
      .images
      .gallery1
  );

}


function getPassBackgroundImage(
  theme
) {

  if (
    !passBackgroundPromises[
      theme
    ]
  ) {

    passBackgroundPromises[
      theme
    ] =
      loadImage(
        getPassBackgroundSrc(
          theme
        ),
        true,
        2500
      )
      .catch(
        (error) => {

          console.warn(
            'No se pudo precargar el fondo del pase; se usará el fondo alternativo.',
            error
          );


          return null;

        }
      );

  }


  return (
    passBackgroundPromises[
      theme
    ]
  );

}


/* =========================================================
   BOTÓN DESCARGAR PASE
========================================================= */

function bindPassDownloadButtons() {

  document
    .querySelectorAll(
      '[data-download-pass]'
    )
    .forEach(
      (button) => {

        button.addEventListener(
          'click',
          async () => {

            const originalText =
              button
                .textContent
                .trim();


            button.disabled =
              true;


            button.textContent =
              'Generando pase...';


            try {

              const blob =
                await generatePassImage();


              const objectUrl =
                URL.createObjectURL(
                  blob
                );


              const link =
                document.createElement(
                  'a'
                );


              link.href =
                objectUrl;


              link.download =
                `mis-xv-vale-pase-${PASS_COUNT}-${
                  PASS_COUNT === 1
                    ? 'persona'
                    : 'personas'
                }.png`;


              document.body
                .appendChild(
                  link
                );


              link.click();


              link.remove();


              setTimeout(
                () => {

                  URL.revokeObjectURL(
                    objectUrl
                  );

                },
                1500
              );

            } catch (error) {

              console.error(
                'No se pudo generar el pase:',
                error
              );


              alert(
                `No se pudo generar el pase: ${error.message}`
              );

            } finally {

              button.disabled =
                false;


              button.textContent =
                originalText;

            }

          }
        );

      }
    );

}


/* =========================================================
   GENERAR PNG
========================================================= */

async function generatePassImage() {

  /*
   * Ya NO espera document.fonts.ready.
   *
   * Los timeouts de Google Fonts
   * no bloquean la descarga.
   */
  if (
    typeof QRCode ===
    'undefined'
  ) {

    throw new Error(
      'No cargó la librería del código QR.'
    );

  }


  const canvas =
    document.createElement(
      'canvas'
    );


  canvas.width =
    1600;


  canvas.height =
    900;


  const ctx =
    canvas.getContext(
      '2d'
    );


  if (!ctx) {

    throw new Error(
      'Canvas no está disponible en este navegador.'
    );

  }


  const theme =
    currentTheme ===
    'chaviza'
      ? 'chaviza'
      : 'ruquitos';


  /*
   * Si la imagen R2 ya precargó,
   * se utiliza.
   *
   * Si R2/CORS falla, el pase
   * NO falla: se usa degradado.
   */
  const backgroundImage =
    await getPassBackgroundImage(
      theme
    );


  if (backgroundImage) {

    drawCoverImage(
      ctx,
      backgroundImage,
      0,
      0,
      canvas.width,
      canvas.height
    );

  } else {

    drawFallbackBackground(
      ctx,
      theme,
      canvas.width,
      canvas.height
    );

  }


  drawPassOverlay(
    ctx,
    theme,
    canvas.width,
    canvas.height
  );


  drawPassBorder(
    ctx,
    theme
  );


  drawPassText(
    ctx,
    theme
  );


  /*
   * Texto PLANO almacenado
   * dentro del QR.
   */
  const qrText =
    `Mis XV Vale - Pase para ${PASS_LABEL}`;


  const qrDataUrl =
    generateQrDataUrl(
      qrText
    );


  const qrImage =
    await loadImage(
      qrDataUrl,
      false,
      2000
    );


  drawQrBlock(
    ctx,
    qrImage
  );


  return canvasToPngBlob(
    canvas
  );

}


/* =========================================================
   FONDO ALTERNATIVO
========================================================= */

function drawFallbackBackground(
  ctx,
  theme,
  width,
  height
) {

  const gradient =
    ctx.createLinearGradient(
      0,
      0,
      width,
      height
    );


  if (
    theme ===
    'chaviza'
  ) {

    gradient.addColorStop(
      0,
      '#080814'
    );


    gradient.addColorStop(
      1,
      '#35135a'
    );

  } else {

    gradient.addColorStop(
      0,
      '#fffaff'
    );


    gradient.addColorStop(
      1,
      '#d8c0ff'
    );

  }


  ctx.fillStyle =
    gradient;


  ctx.fillRect(
    0,
    0,
    width,
    height
  );

}


/* =========================================================
   OVERLAY
========================================================= */

function drawPassOverlay(
  ctx,
  theme,
  width,
  height
) {

  const overlay =
    ctx.createLinearGradient(
      0,
      0,
      width,
      0
    );


  if (
    theme ===
    'chaviza'
  ) {

    overlay.addColorStop(
      0,
      'rgba(7, 7, 19, 0.94)'
    );


    overlay.addColorStop(
      0.55,
      'rgba(22, 8, 37, 0.78)'
    );


    overlay.addColorStop(
      1,
      'rgba(7, 7, 19, 0.42)'
    );

  } else {

    overlay.addColorStop(
      0,
      'rgba(255, 250, 255, 0.96)'
    );


    overlay.addColorStop(
      0.55,
      'rgba(255, 250, 255, 0.84)'
    );


    overlay.addColorStop(
      1,
      'rgba(238, 224, 255, 0.42)'
    );

  }


  ctx.fillStyle =
    overlay;


  ctx.fillRect(
    0,
    0,
    width,
    height
  );

}


/* =========================================================
   TEXTO DEL PASE
========================================================= */

function drawPassText(
  ctx,
  theme
) {

  const textColor =
    theme ===
    'chaviza'
      ? '#ffffff'
      : '#3f2858';


  const secondaryColor =
    theme ===
    'chaviza'
      ? '#e9d5ff'
      : '#6d4a9a';


  const accentColor =
    theme ===
    'chaviza'
      ? '#ec4899'
      : '#8050a8';


  ctx.textAlign =
    'left';


  ctx.textBaseline =
    'alphabetic';


  /*
   * MIS XV
   */
  ctx.fillStyle =
    secondaryColor;


  ctx.font =
    '600 34px Cinzel, Georgia, serif';


  ctx.fillText(
    'MIS XV',
    145,
    165
  );


  /*
   * Nombre
   */
  ctx.fillStyle =
    textColor;


  ctx.font =
    '700 88px "Playfair Display", Georgia, serif';


  ctx.fillText(
    EVENT_DATA.fullName,
    145,
    275
  );


  /*
   * Fecha y lugar
   */
  ctx.fillStyle =
    secondaryColor;


  ctx.font =
    '500 31px Inter, Arial, sans-serif';


  ctx.fillText(
    EVENT_DATA.fullDate,
    145,
    345
  );


  ctx.fillText(
    EVENT_DATA.location,
    145,
    393
  );


  /*
   * Pase
   */
  ctx.fillStyle =
    accentColor;


  ctx.font =
    '700 72px Inter, Arial, sans-serif';


  ctx.fillText(
    `Pase para ${PASS_LABEL}`,
    145,
    555
  );


  /*
   * Texto inferior
   */
  ctx.fillStyle =
    textColor;


  ctx.globalAlpha =
    0.78;


  ctx.font =
    '400 28px Inter, Arial, sans-serif';


  ctx.fillText(
    'Guarda esta imagen y preséntala el día del evento.',
    145,
    625
  );


  ctx.font =
    '500 25px Inter, Arial, sans-serif';


  ctx.fillText(
    'Mis XV Vale',
    145,
    735
  );


  ctx.globalAlpha =
    1;

}


/* =========================================================
   QR
========================================================= */

function drawQrBlock(
  ctx,
  qrImage
) {

  drawRoundedRect(
    ctx,
    1110,
    215,
    355,
    430,
    28
  );


  ctx.fillStyle =
    'rgba(255, 255, 255, 0.96)';


  ctx.fill();


  ctx.drawImage(
    qrImage,
    1142,
    247,
    291,
    291
  );


  ctx.fillStyle =
    '#2e2140';


  ctx.textAlign =
    'center';


  ctx.font =
    '700 25px Inter, Arial, sans-serif';


  ctx.fillText(
    'Pase de acceso',
    1287,
    585
  );


  ctx.font =
    '400 20px Inter, Arial, sans-serif';


  ctx.fillText(
    PASS_LABEL,
    1287,
    620
  );


  ctx.textAlign =
    'left';

}


function generateQrDataUrl(
  text
) {

  const container =
    document.createElement(
      'div'
    );


  container.style.position =
    'fixed';


  container.style.left =
    '-10000px';


  container.style.top =
    '-10000px';


  document.body
    .appendChild(
      container
    );


  try {

    new QRCode(
      container,
      {
        text:
          text,

        width:
          330,

        height:
          330,

        colorDark:
          '#171129',

        colorLight:
          '#ffffff',

        correctLevel:
          QRCode
            .CorrectLevel
            .M
      }
    );


    const qrCanvas =
      container.querySelector(
        'canvas'
      );


    if (!qrCanvas) {

      throw new Error(
        'La librería QR no creó el canvas esperado.'
      );

    }


    return qrCanvas.toDataURL(
      'image/png'
    );

  } finally {

    container.remove();

  }

}


/* =========================================================
   CANVAS -> PNG
========================================================= */

function canvasToPngBlob(
  canvas
) {

  return new Promise(
    (
      resolve,
      reject
    ) => {

      canvas.toBlob(
        (blob) => {

          if (blob) {

            resolve(
              blob
            );

          } else {

            reject(
              new Error(
                'No se pudo convertir el pase a PNG.'
              )
            );

          }

        },
        'image/png'
      );

    }
  );

}


/* =========================================================
   CARGAR IMAGEN
========================================================= */

function loadImage(
  src,
  useCors = false,
  timeoutMs = 2500
) {

  return new Promise(
    (
      resolve,
      reject
    ) => {

      const image =
        new Image();


      let finished =
        false;


      const timeoutId =
        setTimeout(
          () => {

            if (finished) {
              return;
            }


            finished =
              true;


            reject(
              new Error(
                `Tiempo agotado al cargar imagen: ${src}`
              )
            );

          },
          timeoutMs
        );


      if (useCors) {

        image.crossOrigin =
          'anonymous';

      }


      image.onload =
        () => {

          if (finished) {
            return;
          }


          finished =
            true;


          clearTimeout(
            timeoutId
          );


          resolve(
            image
          );

        };


      image.onerror =
        () => {

          if (finished) {
            return;
          }


          finished =
            true;


          clearTimeout(
            timeoutId
          );


          reject(
            new Error(
              `No se pudo cargar imagen: ${src}`
            )
          );

        };


      image.src =
        src;

    }
  );

}


/* =========================================================
   IMAGEN COVER
========================================================= */

function drawCoverImage(
  ctx,
  image,
  x,
  y,
  width,
  height
) {

  const scale =
    Math.max(
      width /
        image.width,
      height /
        image.height
    );


  const drawWidth =
    image.width *
    scale;


  const drawHeight =
    image.height *
    scale;


  const drawX =
    x +
    (
      width -
      drawWidth
    ) / 2;


  const drawY =
    y +
    (
      height -
      drawHeight
    ) / 2;


  ctx.drawImage(
    image,
    drawX,
    drawY,
    drawWidth,
    drawHeight
  );

}


/* =========================================================
   MARCO
========================================================= */

function drawPassBorder(
  ctx,
  theme
) {

  ctx.save();


  ctx.lineWidth =
    3;


  ctx.strokeStyle =
    theme ===
    'chaviza'
      ? 'rgba(236, 72, 153, 0.75)'
      : 'rgba(128, 80, 168, 0.60)';


  drawRoundedRect(
    ctx,
    42,
    42,
    1516,
    816,
    34
  );


  ctx.stroke();


  ctx.restore();

}


/* =========================================================
   RECTÁNGULO REDONDEADO
========================================================= */

function drawRoundedRect(
  ctx,
  x,
  y,
  width,
  height,
  radius
) {

  const r =
    Math.min(
      radius,
      width / 2,
      height / 2
    );


  ctx.beginPath();


  ctx.moveTo(
    x + r,
    y
  );


  ctx.lineTo(
    x +
      width -
      r,
    y
  );


  ctx.arcTo(
    x + width,
    y,
    x + width,
    y + r,
    r
  );


  ctx.lineTo(
    x + width,
    y +
      height -
      r
  );


  ctx.arcTo(
    x + width,
    y + height,
    x +
      width -
      r,
    y + height,
    r
  );


  ctx.lineTo(
    x + r,
    y + height
  );


  ctx.arcTo(
    x,
    y + height,
    x,
    y +
      height -
      r,
    r
  );


  ctx.lineTo(
    x,
    y + r
  );


  ctx.arcTo(
    x,
    y,
    x + r,
    y,
    r
  );


  ctx.closePath();

}
