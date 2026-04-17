(function () {
  const FONT_NAME = "Fontdiner Swanky";
  const FONT_FAMILY = '"Fontdiner Swanky", serif';

  function loadGoogleFont(fontName) {
    const safeId = "gf-" + fontName.replace(/\s+/g, "-").toLowerCase();

    if (!document.querySelector('link[data-font-preconnect="googleapis"]')) {
      const preconnect1 = document.createElement("link");
      preconnect1.rel = "preconnect";
      preconnect1.href = "https://fonts.googleapis.com";
      preconnect1.setAttribute("data-font-preconnect", "googleapis");
      document.head.appendChild(preconnect1);
    }

    if (!document.querySelector('link[data-font-preconnect="gstatic"]')) {
      const preconnect2 = document.createElement("link");
      preconnect2.rel = "preconnect";
      preconnect2.href = "https://fonts.gstatic.com";
      preconnect2.crossOrigin = "anonymous";
      preconnect2.setAttribute("data-font-preconnect", "gstatic");
      document.head.appendChild(preconnect2);
    }

    if (!document.getElementById(safeId)) {
      const link = document.createElement("link");
      link.id = safeId;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=" +
        fontName.replace(/\s+/g, "+") +
        "&display=swap";
      document.head.appendChild(link);
    }
  }

  function setFont(selector) {
    document.querySelectorAll(selector).forEach(function (el) {
      el.style.fontFamily = FONT_FAMILY;
      el.style.fontWeight = "400";
      el.style.fontStyle = "normal";
    });
  }

  function applyInviteTexts() {
    const title = document.querySelector(".title");
    const subtitle = document.getElementById("subtitle");
    const detailsSection = document.getElementById("detailsSection");
    const eventPlace = document.getElementById("eventPlace");
    const eventDateText = document.getElementById("eventDateText");
    const eventDescription = document.getElementById("eventDescription");

    if (title) {
      title.style.marginTop = "100px";
      title.innerHTML = "Sofi cumple 7 <br>y <br>Carmin cumple 2";
      title.style.fontFamily = FONT_FAMILY;
      title.style.fontWeight = "400";
      title.style.fontStyle = "normal";
    }

    if (subtitle) {
      subtitle.style.fontFamily = FONT_FAMILY;
      subtitle.style.fontWeight = "400";
      subtitle.style.fontStyle = "normal";
    }

    if (detailsSection) {
      detailsSection.style.top = "500px";
      detailsSection.style.fontFamily = FONT_FAMILY;
      detailsSection.style.fontWeight = "400";
      detailsSection.style.fontStyle = "normal";
    }

    if (eventPlace) {
      eventPlace.style.fontSize = "1.5rem";
      eventPlace.style.fontFamily = FONT_FAMILY;
      eventPlace.style.fontWeight = "400";
      eventPlace.style.fontStyle = "normal";
    }

    if (eventDateText) {
      eventDateText.style.fontSize = "1rem";
      eventDateText.style.fontFamily = FONT_FAMILY;
      eventDateText.style.fontWeight = "400";
      eventDateText.style.fontStyle = "normal";
    }

    if (eventDescription) {
      eventDescription.style.fontSize = "1rem";
      eventDescription.style.fontFamily = FONT_FAMILY;
      eventDescription.style.fontWeight = "400";
      eventDescription.style.fontStyle = "normal";
    }

    setFont(".title");
    setFont("#subtitle");
    setFont("#detailsSection");
    setFont("#eventPlace");
    setFont("#eventDateText");
    setFont("#eventDescription");
  }

  function runAfterBaseLayout() {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        applyInviteTexts();
      });
    });
  }

  function init() {
    loadGoogleFont(FONT_NAME);
    runAfterBaseLayout();

    if (document.fonts && document.fonts.load) {
      document.fonts.load('400 1em "' + FONT_NAME + '"').then(function () {
        runAfterBaseLayout();
      });
    }

    setTimeout(runAfterBaseLayout, 150);
    setTimeout(runAfterBaseLayout, 400);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.addEventListener("load", runAfterBaseLayout);
  window.addEventListener("resize", runAfterBaseLayout);
})();
