(function() {
    // 1. Ajuste de eventTag (lo que ya teníamos)
    const tag = document.getElementById('eventTag');
    if (tag) tag.style.fontSize = '2.5rem';

    // 2. CORRECCIÓN PARA MOBILE (Cajas del contador)
    const countBoxes = document.querySelectorAll('.count-box');
    if (window.innerWidth < 600) { // Si es pantalla pequeña
        countBoxes.forEach(box => {
            box.style.minWidth = '60px'; // Reducimos el ancho mínimo
            box.style.margin = '5px';     // Estrechamos el margen
            box.style.padding = '10px';   // Ajustamos el padding interno
            
            // Si tienen un número grande adentro, bajamos un poco el tamaño
            const num = box.querySelector('span') || box; 
            if(num) num.style.fontSize = '1.2rem'; 
        });
    }
    
    const injectPadrinos = () => {
        const descriptionElement = document.getElementById('eventDescription');
        // Buscamos h1 o h2 para extraer el color "primary" del tema
        const titleElement = document.querySelector('h2');

        if (descriptionElement && descriptionElement.innerText.includes('[PADRINOS]')) {
            
            // Extraemos colores del estilo computado
            const activePrimaryColor = titleElement ? window.getComputedStyle(titleElement).color : '#C38EA6';
            const activeTextColor = window.getComputedStyle(descriptionElement).color;

            const padrinosHTML = `
                <div class="padrinos-container" style="margin-top: 25px; border-top: 1px solid rgba(0,0,0,0.1); padding-top: 20px;">
                    <h4 style="color: ${activePrimaryColor}; font-family: inherit; font-size: 1.2em; margin-bottom: 15px;">
                        Mis Padrinos
                    </h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; text-align: center;">
                        <div>
                            <span style="display: block; font-size: 0.8em; opacity: 0.7; color: ${activeTextColor}; text-transform: uppercase;">Padrino</span>
                            <strong style="color: ${activeTextColor}; font-size: 1.1em;">Pendiente Nombre</strong>
                        </div>
                        <div>
                            <span style="display: block; font-size: 0.8em; opacity: 0.7; color: ${activeTextColor}; text-transform: uppercase;">Madrina</span>
                            <strong style="color: ${activeTextColor}; font-size: 1.1em;">Pendiente Nombre</strong>
                        </div>
                    </div>
                </div>
            `;

            descriptionElement.innerHTML = descriptionElement.innerHTML.replace('[PADRINOS]', padrinosHTML);
            return true; // Éxito
        }
        return false;
    };

    // Intentamos ejecutarlo de inmediato
    if (!injectPadrinos()) {
        // Si no lo encuentra (porque el JSON sigue cargando), reintentamos cada 100ms
        const retryInterval = setInterval(() => {
            if (injectPadrinos()) clearInterval(retryInterval);
        }, 100);
        
        // Cancelamos después de 5 segundos por seguridad
        setTimeout(() => clearInterval(retryInterval), 5000);
    }
})();window.addEventListener('load', () => {
    const descriptionElement = document.getElementById('eventDescription');
    const titleElement = document.querySelector('h1') || document.querySelector('h2'); // Buscamos el título para copiar su color

    if (descriptionElement && descriptionElement.innerText.includes('[PADRINOS]')) {
        
        // 1. Extraemos el color dinámicamente
        // Si el título tiene el color "primary", lo tomamos de ahí. 
        // Si no, usamos un color de respaldo.
        const activePrimaryColor = titleElement ? window.getComputedStyle(titleElement).color : '#8aaed1';
        const activeTextColor = window.getComputedStyle(descriptionElement).color;

        const padrinosHTML = `
            <div class="padrinos-container" style="margin-top: 25px; border-top: 1px solid rgba(0,0,0,0.1); padding-top: 20px;">
                <h4 style="color: ${activePrimaryColor}; font-family: inherit; font-size: 1.2em; margin-bottom: 15px;">
                    Mis Padrinos
                </h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; text-align: center;">
                    <div>
                        <span style="display: block; font-size: 0.8em; opacity: 0.7; color: ${activeTextColor}; text-transform: uppercase;">Padrino</span>
                        <strong style="color: ${activeTextColor}; font-size: 1.1em;">Pendiente Nombre</strong>
                    </div>
                    <div>
                        <span style="display: block; font-size: 0.8em; opacity: 0.7; color: ${activeTextColor}; text-transform: uppercase;">Madrina</span>
                        <strong style="color: ${activeTextColor}; font-size: 1.1em;">Pendiente Nombre</strong>
                    </div>
                </div>
                <p style="margin-top: 20px; font-style: italic; font-size: 0.9em; opacity: 0.8; color: ${activeTextColor};">
                    "Gracias por aceptar este compromiso de amor y guiarme en el camino de la fe."
                </p>
            </div>
        `;

        descriptionElement.innerHTML = descriptionElement.innerHTML.replace('[PADRINOS]', padrinosHTML);
    }
});
