console.log("Custom script cargado para boda001");

// ejemplo: cambiar texto después de cargar
document.addEventListener("DOMContentLoaded", () => {
  const title = document.getElementById("title");
  if (title) {
    title.style.letterSpacing = "0.04em";
  }
});
