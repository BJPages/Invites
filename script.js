(() => {
  const statusTitle = document.getElementById("statusTitle");
  const statusText = document.getElementById("statusText");
  const statusScreen = document.getElementById("statusScreen");
  const app = document.getElementById("app");

  const hero = document.getElementById("hero");
  const eventTag = document.getElementById("eventTag");
  const title = document.getElementById("title");
  const subtitle = document.getElementById("subtitle");
  const eventDateText = document.getElementById("eventDateText");
  const eventPlace = document.getElementById("eventPlace");
  const eventDescription = document.getElementById("eventDescription");
  const locationBtn = document.getElementById("locationBtn");
  const gallery = document.getElementById("gallery");
  const musicBtn = document.getElementById("musicBtn");
  const musicPlayer = document.getElementById("musicPlayer");

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  const rsvpForm = document.getElementById("rsvpForm");
  const guestName = document.getElementById("guestName");
  const attendance = document.getElementById("attendance");
  const rsvpMessage = document.getElementById("rsvpMessage");

  let countdownTimer = null;
  let musicReady = false;

  init();

  async function init() {
    let id = null;

    // 1. Query param (?id=)
    const params = new URLSearchParams(window.location.search);
    id = params.get("id");

    // 2. Path (/abc123)
    if (!id) {
      let path = window.location.pathname;

      // Quitar base del repo: /Invites/
      path = path.replace("/Invites/", "");

      // Quitar slash inicial/final
      path = path.replace(/^\/|\/$/g, "");

      if (path) {
        id = path;
      }
    }

    if (!id) {
      showError("Falta el ID", "Usa una URL como /abc123");
      return;
    }

    try {
      setStatus("Cargando invitación...", `ID: ${id}`);

      const response = await fetch(`data/${id}.json`, { cache: "no-store" });

      if (!response.ok) {
        throw new Error("Invitación no encontrada");
      }

      const config = await response.json();
      validateConfig(config);

      render(config);
      initCountdown(config.eventDateISO);
      initMusic(config);

      app.classList.remove("hidden");
      statusScreen.classList.add("hidden");
    } catch (error) {
      showError("Error", error.message);
    }
  }

  function validateConfig(config) {
    const required = [
      "template",
      "eventTypeLabel",
      "title",
      "subtitle",
      "eventDateISO",
      "eventDateText",
      "place",
      "description",
      "assetsPath",
      "heroImage"
    ];

    for (const key of required) {
      if (!config[key]) {
        throw new Error(`Falta: ${key}`);
      }
    }
  }

  function render(config) {
    document.body.className = "";
    document.body.classList.add(`theme-${config.template}`);

    eventTag.textContent = config.eventTypeLabel;
    title.textContent = config.title;
    subtitle.textContent = config.subtitle;
    eventDateText.textContent = config.eventDateText;
    eventPlace.textContent = config.place;
    eventDescription.textContent = config.description;

    hero.style.backgroundImage = `url('${joinPath(config.assetsPath, config.heroImage)}')`;

    if (config.locationUrl) {
      locationBtn.href = config.locationUrl;
      locationBtn.style.display = "";
    } else {
      locationBtn.style.display = "none";
    }

    gallery.innerHTML = "";

    (config.gallery || []).forEach(file => {
      const img = document.createElement("img");
      img.src = joinPath(config.assetsPath, file);
      gallery.appendChild(img);
    });
  }

  function initCountdown(dateISO) {
    if (countdownTimer) clearInterval(countdownTimer);

    const target = new Date(dateISO).getTime();

    const tick = () => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setCountdown(0,0,0,0);
        return;
      }

      const d = Math.floor(diff / (1000*60*60*24));
      const h = Math.floor((diff / (1000*60*60)) % 24);
      const m = Math.floor((diff / (1000*60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setCountdown(d,h,m,s);
    };

    tick();
    countdownTimer = setInterval(tick, 1000);
  }

  function setCountdown(d,h,m,s) {
    daysEl.textContent = d;
    hoursEl.textContent = h.toString().padStart(2,"0");
    minutesEl.textContent = m.toString().padStart(2,"0");
    secondsEl.textContent = s.toString().padStart(2,"0");
  }

  function initMusic(config) {
    musicBtn.style.display = "none";

    if (!config.music?.enabled) return;

    musicPlayer.src = joinPath(config.assetsPath, config.music.file);
    musicBtn.style.display = "";

    musicBtn.onclick = async () => {
      if (musicPlayer.paused) {
        await musicPlayer.play();
        musicBtn.textContent = "Pausar música";
      } else {
        musicPlayer.pause();
        musicBtn.textContent = "Reproducir música";
      }
    };
  }

  rsvpForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = guestName.value.trim();
    if (!name) {
      rsvpMessage.textContent = "Escribe tu nombre";
      return;
    }

    rsvpMessage.textContent = "Gracias por confirmar 🙌";
    console.log({ name, attendance: attendance.value });
  });

  function joinPath(base, file) {
    return `${base.replace(/\/$/, "")}/${file}`;
  }

  function setStatus(t, d) {
    statusTitle.textContent = t;
    statusText.textContent = d;
  }

  function showError(t, d) {
    app.classList.add("hidden");
    statusScreen.classList.remove("hidden");
    setStatus(t, d);
  }
})();