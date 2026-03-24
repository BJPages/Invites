(() => {
  const statusTitle = document.getElementById("statusTitle");
  const statusText = document.getElementById("statusText");
  const statusScreen = document.getElementById("statusScreen");
  const app = document.getElementById("app");

  const heroSection = document.getElementById("heroSection");
  const eventTag = document.getElementById("eventTag");
  const title = document.getElementById("title");
  const subtitle = document.getElementById("subtitle");
  const heroActions = document.getElementById("heroActions");
  const locationBtn = document.getElementById("locationBtn");
  const musicBtn = document.getElementById("musicBtn");
  const musicPlayer = document.getElementById("musicPlayer");

  const countdownSection = document.getElementById("countdownSection");
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  const detailsSection = document.getElementById("detailsSection");
  const eventDateText = document.getElementById("eventDateText");
  const eventPlace = document.getElementById("eventPlace");
  const eventDescription = document.getElementById("eventDescription");

  const scheduleSection = document.getElementById("scheduleSection");
  const scheduleList = document.getElementById("scheduleList");

  const gallerySection = document.getElementById("gallerySection");
  const gallery = document.getElementById("gallery");

  const giftRegistrySection = document.getElementById("giftRegistrySection");
  const giftRegistryList = document.getElementById("giftRegistryList");

  const mapSection = document.getElementById("mapSection");
  const mapButtonWrapper = document.getElementById("mapButtonWrapper");
  const mapOpenBtn = document.getElementById("mapOpenBtn");
  const mapEmbedWrapper = document.getElementById("mapEmbedWrapper");
  const mapEmbed = document.getElementById("mapEmbed");

  const rsvpSection = document.getElementById("rsvpSection");
  const rsvpForm = document.getElementById("rsvpForm");
  const guestName = document.getElementById("guestName");
  const attendance = document.getElementById("attendance");
  const rsvpHelp = document.getElementById("rsvpHelp");
  const rsvpMessage = document.getElementById("rsvpMessage");

  let countdownTimer = null;
  let currentConfig = null;
  let statusActionButton = null;

  init();

  async function init() {
    const id = getInvitationId();

    if (!id) {
      showError("Invitación no disponible", "No fue posible identificar esta invitación.");
      return;
    }

    try {
      setStatus("Cargando invitación...", "Espera un momento por favor.");
      removeStatusActionButton();

      const response = await fetch(`data/${id}.json`, { cache: "no-store" });
      if (!response.ok) {
        throw new Error("No se encontró la invitación.");
      }

      const config = await response.json();
      validateConfig(config);

      const accessResult = handleAccess(config);
      if (!accessResult.allowed) {
        return;
      }

      currentConfig = config;
      window.InvitesConfig = config;

      const mustUseOpenGate = hasMusic(config) && !config.access;

      if (mustUseOpenGate) {
        showOpenInvitationGate(config);
        return;
      }

      await finalizeInvitationLoad(config, {
        attemptAutoplay: accessResult.autoplayGranted
      });
    } catch (error) {
      showError("No fue posible cargar la invitación", error.message);
    }
  }

  async function finalizeInvitationLoad(config, options = {}) {
    render(config);
    initCountdown(config);
    initMusic(config);
    initWhatsAppHelp(config);
    await loadCustomScript(config);

    hideStatus();

    if (options.attemptAutoplay) {
      await tryAutoplayMusic(config);
    }
  }

  function getInvitationId() {
    const params = new URLSearchParams(window.location.search);
    let id = params.get("id");

    if (!id) {
      let path = window.location.pathname;
      path = path.replace("/Invites/", "");
      path = path.replace(/^\/|\/$/g, "");
      if (path) id = path;
    }

    return id;
  }

  function validateConfig(config) {
    const required = ["layout", "title", "assetsPath"];

    for (const key of required) {
      if (!config[key]) {
        throw new Error(`Falta el campo requerido: ${key}`);
      }
    }

    if (!config.heroImage && !config.hero?.image) {
      throw new Error("Falta el campo requerido: heroImage o hero.image");
    }
  }

  function handleAccess(config) {
    if (!config.access) {
      return { allowed: true, autoplayGranted: false };
    }

    const expectedPassword = String(config.access.password || "");
    const promptTitle = config.access.title || "Acceso restringido";
    const promptMessage = config.access.message || "Ingresa la clave para continuar.";

    if (!expectedPassword) {
      showError("Configuración inválida", "La invitación privada no tiene password definido.");
      return { allowed: false, autoplayGranted: false };
    }

    const provided = window.prompt(`${promptTitle}\n\n${promptMessage}`, "");

    if (provided === null) {
      showError("Acceso cancelado", "No se ingresó ninguna clave.");
      return { allowed: false, autoplayGranted: false };
    }

    if (String(provided) !== expectedPassword) {
      showError("Acceso denegado", "La clave es incorrecta.");
      return { allowed: false, autoplayGranted: false };
    }

    return {
      allowed: true,
      autoplayGranted: hasMusic(config)
    };
  }

  function hasMusic(config) {
    return !!(config.music && config.music.enabled === true && config.music.file);
  }

  function showOpenInvitationGate(config) {
    const titleText =
      config.openGate?.title ||
      "Abrir invitación";

    const messageText =
      config.openGate?.message ||
      "Toca el botón para abrir la invitación y reproducir la música.";

    setStatus(titleText, messageText);

    createStatusActionButton("Abrir invitación", async () => {
      try {
        removeStatusActionButton();
        setStatus("Abriendo invitación...", "Espera un momento por favor.");

        await finalizeInvitationLoad(config, {
          attemptAutoplay: true
        });
      } catch (error) {
        showError("No fue posible abrir la invitación", error.message);
      }
    });
  }

  function createStatusActionButton(label, onClick) {
    removeStatusActionButton();

    statusActionButton = document.createElement("button");
    statusActionButton.type = "button";
    statusActionButton.textContent = label;
    statusActionButton.style.marginTop = "18px";
    statusActionButton.style.padding = "14px 22px";
    statusActionButton.style.border = "none";
    statusActionButton.style.borderRadius = "999px";
    statusActionButton.style.cursor = "pointer";
    statusActionButton.style.fontWeight = "700";
    statusActionButton.style.background = "var(--primary)";
    statusActionButton.style.color = "var(--primary-contrast)";
    statusActionButton.onclick = onClick;

    const box = statusScreen.querySelector(".status-box");
    if (box) {
      box.appendChild(statusActionButton);
    }
  }

  function removeStatusActionButton() {
    if (statusActionButton) {
      statusActionButton.remove();
      statusActionButton = null;
    }
  }

  async function tryAutoplayMusic(config) {
    if (!hasMusic(config)) return false;

    try {
      if (!musicPlayer.src) {
        musicPlayer.src = joinPath(config.assetsPath, config.music.file);
      }

      await musicPlayer.play();
      musicBtn.textContent = "Pausar música";
      return true;
    } catch (error) {
      console.error("No se pudo iniciar autoplay:", error);
      musicBtn.textContent = "Reproducir música";
      return false;
    }
  }

  function render(config) {
    resetBodyClasses();
    resetHeroStyles();

    applyLayout(config);
    applyTheme(config.theme || {});
    renderHero(config);
    renderDetails(config);
    renderSchedule(config);
    renderGallery(config);
    renderGiftRegistry(config);
    renderMap(config);
    renderRsvp(config);
  }

  function resetBodyClasses() {
    document.body.className = "";
  }

  function resetHeroStyles() {
    heroSection.style.backgroundImage = "";
    heroSection.style.backgroundPosition = "";
    heroSection.style.backgroundSize = "";
    heroSection.style.backgroundRepeat = "";
    heroSection.style.minHeight = "";
  }

  function applyLayout(config) {
    const layout = config.layout || "classic";
    document.body.classList.add(`layout-${layout}`);

    if (layout === "compact") {
      const variant = config.layoutVariant || "compact-1";
      document.body.classList.add(variant);
    }
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

  function renderHero(config) {
  const heroImage = config.hero?.image || config.heroImage;

  heroSection.style.backgroundImage = `url('${joinPath(config.assetsPath, heroImage)}')`;
  heroSection.style.backgroundPosition = config.hero?.position || "center center";
  heroSection.style.backgroundSize = config.hero?.size || "cover";
  heroSection.style.backgroundRepeat = config.hero?.repeat || "no-repeat";

  if (config.hero?.height) {
    heroSection.style.minHeight = config.hero.height;
  }

  toggleText(eventTag, config.eventTypeLabel);
  toggleText(title, config.title);
  toggleText(subtitle, config.subtitle);

  locationBtn.classList.add("hidden");

  const showMusicButton = hasMusic(config);
  if (showMusicButton) {
    musicBtn.classList.remove("hidden");
  } else {
    musicBtn.classList.add("hidden");
  }

  if (showMusicButton) {
    heroActions.classList.remove("hidden");
  } else {
    heroActions.classList.add("hidden");
  }
}

  function renderDetails(config) {
    const hasDate = toggleText(eventDateText, config.eventDateText);
    const hasPlace = toggleText(eventPlace, config.place);
    const hasDescription = toggleText(eventDescription, config.description);

    toggleSection(detailsSection, hasDate || hasPlace || hasDescription);
  }

  function renderSchedule(config) {
    scheduleList.innerHTML = "";
    const items = Array.isArray(config.schedule) ? config.schedule : [];

    if (!items.length) {
      toggleSection(scheduleSection, false);
      return;
    }

    items.forEach((item) => {
      const box = document.createElement("div");
      box.className = "schedule-item";

      if (item.time) {
        const time = document.createElement("div");
        time.className = "schedule-time";
        time.textContent = item.time;
        box.appendChild(time);
      }

      if (item.title) {
        const scheduleTitle = document.createElement("div");
        scheduleTitle.className = "schedule-title";
        scheduleTitle.textContent = item.title;
        box.appendChild(scheduleTitle);
      }

      if (item.description) {
        const desc = document.createElement("div");
        desc.className = "schedule-desc";
        desc.textContent = item.description;
        box.appendChild(desc);
      }

      if (box.children.length > 0) {
        scheduleList.appendChild(box);
      }
    });

    toggleSection(scheduleSection, scheduleList.children.length > 0);
  }

  function renderGallery(config) {
    gallery.innerHTML = "";
    const items = Array.isArray(config.gallery) ? config.gallery : [];

    if (!items.length) {
      toggleSection(gallerySection, false);
      return;
    }

    items.forEach((fileName) => {
      const img = document.createElement("img");
      img.src = joinPath(config.assetsPath, fileName);
      img.alt = config.title || "Invitación";
      img.addEventListener("error", () => {
        img.remove();
        if (!gallery.children.length) {
          toggleSection(gallerySection, false);
        }
      });
      gallery.appendChild(img);
    });

    toggleSection(gallerySection, true);
  }

  function renderGiftRegistry(config) {
    giftRegistryList.innerHTML = "";
    const registry = config.giftRegistry;

    if (!registry || typeof registry !== "object" || !Object.keys(registry).length) {
      toggleSection(giftRegistrySection, false);
      return;
    }

    Object.values(registry).forEach((item) => {
      if (!item || !item.url || !item.label) return;

      const link = document.createElement("a");
      link.className = "btn btn-primary";
      link.href = item.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = item.label;

      giftRegistryList.appendChild(link);
    });

    toggleSection(giftRegistrySection, giftRegistryList.children.length > 0);
  }

  function renderMap(config) {
    mapOpenBtn.href = "#";
    mapEmbed.src = "";

    mapButtonWrapper.classList.add("hidden");
    mapEmbedWrapper.classList.add("hidden");
    toggleSection(mapSection, false);

    if (config.mapDisplay === "embed" && config.mapEmbedUrl) {
      mapEmbed.src = config.mapEmbedUrl;
      mapEmbedWrapper.classList.remove("hidden");
      toggleSection(mapSection, true);
      return;
    }

    if (config.mapDisplay === "button" && config.locationUrl) {
      mapOpenBtn.href = config.locationUrl;
      mapButtonWrapper.classList.remove("hidden");
      toggleSection(mapSection, true);
    }
  }

  function renderRsvp(config) {
    const hasRsvp = !!(config.rsvp && config.rsvp.phone);
    toggleSection(rsvpSection, hasRsvp);

    if (!hasRsvp) {
      rsvpHelp.classList.add("hidden");
      rsvpMessage.textContent = "";
      return;
    }

    const pretty = formatPhoneForDisplay(config.rsvp.phone);
    rsvpHelp.textContent = `Tu confirmación será enviada por WhatsApp al ${pretty}.`;
    rsvpHelp.classList.remove("hidden");
  }

  function initCountdown(config) {
    if (countdownTimer) {
      clearInterval(countdownTimer);
    }

    const enabled = config.countdown?.enabled !== false && !!config.eventDateISO;

    if (!enabled) {
      toggleSection(countdownSection, false);
      return;
    }

    const target = new Date(config.eventDateISO).getTime();
    if (Number.isNaN(target)) {
      toggleSection(countdownSection, false);
      return;
    }

    toggleSection(countdownSection, true);

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

    musicBtn.textContent = "Reproducir música";
    musicBtn.onclick = null;

    if (!hasMusic(config)) {
      return;
    }

    musicPlayer.src = joinPath(config.assetsPath, config.music.file);

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
    if (!config.rsvp || !config.rsvp.phone) return;
    const pretty = formatPhoneForDisplay(config.rsvp.phone);
    rsvpHelp.textContent = `Tu confirmación será enviada por WhatsApp al ${pretty}.`;
    rsvpHelp.classList.remove("hidden");
  }

  rsvpForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!currentConfig?.rsvp?.phone) {
      rsvpMessage.textContent = "La confirmación no está disponible para esta invitación.";
      return;
    }

    const name = guestName.value.trim();
    const reply = attendance.value;

    if (!name) {
      rsvpMessage.textContent = "Por favor escribe tu nombre.";
      return;
    }

    const phone = normalizePhone(currentConfig.rsvp.phone);
    const template =
      currentConfig.rsvp.messageTemplate ||
      "Hola, soy {name}. {attendance} a {eventTitle}.";

    const message = buildWhatsAppMessage(template, {
      name,
      attendance: reply,
      eventTitle: currentConfig.title || "la invitación",
      eventDateText: currentConfig.eventDateText || "",
      place: currentConfig.place || ""
    });

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    rsvpMessage.textContent = "Se abrió WhatsApp para enviar tu confirmación.";
  });

  async function loadCustomScript(config) {
    if (!config.customScript) return;

    const scriptPath = joinPath(config.assetsPath, config.customScript);

    return new Promise((resolve, reject) => {
      const existing = document.querySelector(
        `script[data-custom-script="${scriptPath}"]`
      );

      if (existing) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = scriptPath;
      script.defer = true;
      script.dataset.customScript = scriptPath;

      script.onload = () => resolve();
      script.onerror = () =>
        reject(new Error(`No se pudo cargar el script custom: ${scriptPath}`));

      document.body.appendChild(script);
    });
  }

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
    if (digits === "522226763338") return "222 676 3338";
    return digits;
  }

  function joinPath(base, fileName) {
    const normalizedBase = base.endsWith("/") ? base : `${base}/`;
    return `${normalizedBase}${fileName}`;
  }

  function toggleText(el, value) {
    if (value) {
      el.textContent = value;
      el.classList.remove("hidden");
      return true;
    }

    el.textContent = "";
    el.classList.add("hidden");
    return false;
  }

  function toggleSection(section, show) {
    if (show) {
      section.classList.remove("hidden");
    } else {
      section.classList.add("hidden");
    }
  }

  function setStatus(titleText, descriptionText) {
    statusTitle.textContent = titleText;
    statusText.textContent = descriptionText;
  }

  function hideStatus() {
    removeStatusActionButton();
    app.classList.remove("hidden");
    statusScreen.classList.add("hidden");
    statusScreen.style.display = "none";
  }

  function showError(titleText, descriptionText) {
    app.classList.add("hidden");
    statusScreen.classList.remove("hidden");
    statusScreen.style.display = "grid";
    removeStatusActionButton();
    setStatus(titleText, descriptionText);
  }
})();
