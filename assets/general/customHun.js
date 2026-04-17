(function () {
  function loadGoogleFont(fontName) {
    const fontId = "gf-" + fontName.replace(/\s+/g, "-").toLowerCase();

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

    if (!document.getElementById(fontId)) {
      const link = document.createElement("link");
      link.id = fontId;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=" +
        fontName.replace(/\s+/g, "+") +
        "&display=swap";
      document.head.appendChild(link);
    }
  }

  function applyFont(selector, fontFamily) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(function (el) {
      el.style.fontFamily = fontFamily;
      el.style.fontWeight = "400";
      el.style.fontStyle = "normal";
    });
  }

  function initInviteC0a87a01() {
    loadGoogleFont("Fontdiner Swanky");

    const title = document.getElementsByClassName("title")[0];
    if (title) {
      title.style.marginTop = "100px";
      title.innerHTML = "Sofi cumple 7 <br>y <br>Carmin cumple 2";
      title.style.fontFamily = '"Fontdiner Swanky", serif';
      title.style.fontWeight = "400";
      title.style.fontStyle = "normal";
    }

    const detailsSection = document.getElementById("detailsSection");
    if (detailsSection) {
      detailsSection.style.top = "520px";
      detailsSection.style.fontFamily = '"Fontdiner Swanky", serif';
      detailsSection.style.fontWeight = "400";
      detailsSection.style.fontStyle = "normal";
    }

    const eventPlace = document.getElementById("eventPlace");
    if (eventPlace) {
      eventPlace.style.fontSize = "1.5rem";
      eventPlace.style.fontFamily = '"Fontdiner Swanky", serif';
    }

    const eventDateText = document.getElementById("eventDateText");
    if (eventDateText) {
      eventDateText.style.fontSize = "1rem";
      eventDateText.style.fontFamily = '"Fontdiner Swanky", serif';
    }

    const eventDescription = document.getElementById("eventDescription");
    if (eventDescription) {
      eventDescription.style.fontSize = "1rem";
      eventDescription.style.fontFamily = '"Fontdiner Swanky", serif';
    }

    // Si quieres aplicar la misma fuente a más textos de esta invitación,
    // agrega aquí sus selectores:
    applyFont(".title", '"Fontdiner Swanky", serif');
    applyFont("#eventPlace", '"Fontdiner Swanky", serif');
    applyFont("#eventDateText", '"Fontdiner Swanky", serif');
    applyFont("#eventDescription", '"Fontdiner Swanky", serif');
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initInviteC0a87a01);
  } else {
    initInviteC0a87a01();
  }
})();
