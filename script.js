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

  const scheduleSection = document.getElementById("scheduleSection");
  const scheduleList = document.getElementById("scheduleList");

  const rsvpForm = document.getElementById("rsvpForm");
  const guestName = document.getElementById("guestName");
  const attendance = document.getElementById("attendance");
  const rsvpHelp = document.getElementById("rsvpHelp");
  const rsvpMessage = document.getElementById("rsvpMessage");

  let countdownTimer = null;

  init();

  async function init() {
    const id = getInvitationId();

    if (!id) {
      showError("Invitación no disponible", "No fue posible identificar esta invitación.");
      return;
    }

    try {
      setStatus("Cargando invitación...", "Espera un momento por favor.");

      const response = await fetch(`data/${id}.json`, { cache: "no-store" });

      if (!response.ok) {
        throw new Error("No se encontró la invitación.");
      }

      const config = await response.json();
      validateConfig(config);

      render(config);
      initCountdown(config.eventDateISO);
      initMusic(config);
      initWhatsAppHelp(config);

      hideStatus();
    } catch (error) {
      showError("No fue posible cargar la invitación", error.message);
    }
  }

  function getInvitationId() {
    let id = null;

    const params = new URLSearchParams(window.location.search);
    id = params.get("id");

    if (!id) {
      let path = window.location.pathname;
      path = path.replace("/Invites/", "");
      path = path.replace(/^\/|\/$/g, "");
      if (path) {
        id = path;
      }
    }

    return id;
  }

  function validateConfig(config) {
    const required = [
      "layout",
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
        throw new Error(`Falta el campo requerido: ${key}`);
      }
    }
  }

  function render(config) {
    resetBodyClasses();
    document.body.classList.add(`layout-${config.layout || "classic"}`);

    applyTheme(config.theme || {});

    eventTag.textContent = config.eventTypeLabel || "";
    title.textContent = config.title || "";
    subtitle.textContent = config.subtitle || "";
    eventDateText.textContent = config.eventDateText || "";
    eventPlace.textContent = config.place || "";
    eventDescription.textContent = config.description || "";

    hero.style.backgroundImage = `url('${joinPath(config.assetsPath, config.heroImage)}')`;

    if (config.locationUrl) {
      locationBtn.href = config.locationUrl;
      locationBtn.style.display = "";
    } else {
      locationBtn.style.display = "none";
    }

    renderGallery(config);
    renderSchedule(config);
  }

  function resetBodyClasses() {
    document.body.className = "";
  }

  function applyTheme(theme) {
    setCssVar("--bg", theme.bg);
    setCssVar("--surface", theme.surface);
    setCssVar("--text", theme.text);
    setCssVar("--muted", theme.muted);
    setCssVar("--primary", theme.primary);
    setCssVar("--primary-contrast", theme.primaryContrast);
    setCssVar("--overlay", theme.overlay);
    setCssVar("--hero-text", theme.heroText);
  }

  function setCssVar(name, value) {
    if (value) {
      document.documentElement.style.setProperty(name, value);
    }
  }

  function renderGallery(config) {
    gallery.innerHTML = "";

    const items = Array.isArray(config.gallery) ? config.gallery : [];

    if (items.length === 0) {
      gallery.innerHTML = "<p>No hay imágenes disponibles.</p>";
      return;
    }

    items.forEach((fileName) => {
      const img = document.createElement("img");
      img.src = joinPath(config.assetsPath, fileName);
      img.alt = config.title || "Invitación";
      img.addEventListener("error", () => {
        img.style.display = "none";
      });
      gallery.appendChild(img);
    });
  }

  function renderSchedule(config) {
    scheduleList.innerHTML = "";

    if (!Array.isArray(config.schedule) || config.schedule.length === 0) {
      scheduleSection.classList.add("hidden");
      return;
    }

    scheduleSection.classList.remove("hidden");

    config.schedule.forEach((item) => {
      const box = document.createElement("div");
      box.className = "schedule-item";

      const time = document.createElement("div");
      time.className = "schedule-time";
      time.textContent = item.time || "";

      const title = document.createElement("div");
      title.className = "schedule-title";
      title.textContent = item.title || "";

      const desc = document.createElement("div");
      desc.className = "schedule-desc";
      desc.textContent = item.description || "";

      box.appendChild(time);
      box.appendChild(title);
      box.appendChild(desc);

      scheduleList.appendChild(box);
    });
  }

  function initCountdown(dateISO) {
    if (countdownTimer) {
      clearInterval(countdownTimer);
    }

    const target = new Date(dateISO).getTime();

    if (Number.isNaN(target)) {
      setCountdownValues(0, 0, 0, 0);
      return;
    }

    const tick = () => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setCountdownValues(0, 0, 0, 0);
        clearInterval(countdownTimer);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setCountdownValues(days, hours, minutes, seconds);
    };

    tick();
    countdownTimer = setInterval(tick, 1000);
  }

  function setCountdownValues(days, hours, minutes, seconds) {
    daysEl.textContent = String(days);
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  function initMusic(config) {
    musicPlayer.pause();
    musicPlayer.removeAttribute("src");
    musicPlayer.load();

    musicBtn.style.display = "none";
    musicBtn.textContent = "Reproducir música";
    musicBtn.onclick = null;

    if (!config.music || config.music.enabled !== true || !config.music.file) {
      return;
    }

    musicPlayer.src = joinPath(config.assetsPath, config.music.file);
    musicBtn.style.display = "";

    musicBtn.onclick = async () => {
      if (musicPlayer.paused) {
        try {
          await musicPlayer.play();
          musicBtn.textContent = "Pausar música";
        } catch (error) {
          console.error("No se pudo reproducir la música:", error);
        }
      } else {
        musicPlayer.pause();
        musicBtn.textContent = "Reproducir música";
      }
    };
  }

  function initWhatsAppHelp(config) {
    const phone = config.rsvp?.phone || "522226763338";
    const pretty = formatPhoneForDisplay(phone);
    rsvpHelp.textContent = `Tu confirmación será enviada por WhatsApp al ${pretty}.`;
  }

  rsvpForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = guestName.value.trim();
    const reply = attendance.value;
    const id = getInvitationId();

    if (!name) {
      rsvpMessage.textContent = "Por favor escribe tu nombre.";
      return;
    }

    fetch(`data/${id}.json`, { cache: "no-store" })
      .then((response) => response.json())
      .then((config) => {
        const phone = normalizePhone(config.rsvp?.phone || "522226763338");
        const template =
          config.rsvp?.messageTemplate ||
          "Hola, soy {name}. {attendance} a {eventTitle}.";
        const message = buildWhatsAppMessage(template, {
          name,
          attendance: reply,
          eventTitle: config.title || "la invitación",
          eventDateText: config.eventDateText || "",
          place: config.place || ""
        });

        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");

        rsvpMessage.textContent = "Se abrió WhatsApp para enviar tu confirmación.";
      })
      .catch(() => {
        rsvpMessage.textContent = "No fue posible abrir WhatsApp en este momento.";
      });
  });

  function buildWhatsAppMessage(template, data) {
    return template
      .replaceAll("{name}", data.name || "")
      .replaceAll("{attendance}", data.attendance || "")
      .replaceAll("{eventTitle}", data.eventTitle || "")
      .replaceAll("{eventDateText}", data.eventDateText || "")
      .replaceAll("{place}", data.place || "");
  }

  function normalizePhone(phone) {
    return String(phone).replace(/\D/g, "");
  }

  function formatPhoneForDisplay(phone) {
    const digits = normalizePhone(phone);

    if (digits === "522226763338") {
      return "222 676 3338";
    }

    return digits;
  }

  function joinPath(base, fileName) {
    const normalizedBase = base.endsWith("/") ? base : `${base}/`;
    return `${normalizedBase}${fileName}`;
  }

  function setStatus(titleText, descriptionText) {
    statusTitle.textContent = titleText;
    statusText.textContent = descriptionText;
  }

  function hideStatus() {
    app.classList.remove("hidden");
    statusScreen.classList.add("hidden");
    statusScreen.style.display = "none";
  }

  function showError(titleText, descriptionText) {
    app.classList.add("hidden");
    statusScreen.classList.remove("hidden");
    statusScreen.style.display = "grid";
    setStatus(titleText, descriptionText);
  }
})();
