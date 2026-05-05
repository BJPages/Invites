// Esperamos a que el DOM esté listo o a que el motor cargue el JSON
window.addEventListener('load', () => {
    const descriptionElement = document.getElementById('eventDescription');
    
    if (descriptionElement && descriptionElement.innerText.includes('[PADRINOS]')) {
        
        // Estructura del div de honor
        const padrinosHTML = `
            <div class="padrinos-container" style="margin-top: 25px; border-top: 1px solid #eee; padding-top: 20px;">
                <h4 style="color: #A294B0; font-family: 'Georgia', serif; font-size: 1.2em; margin-bottom: 15px;">
                    Mis Padrinos
                </h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; text-align: center;">
                    <div>
                        <span style="display: block; font-size: 0.8em; color: #6f7b88; text-transform: uppercase; letter-spacing: 1px;">Padrino</span>
                        <strong style="color: #434A54; font-size: 1.1em;">Pendiente Nombre</strong>
                    </div>
                    <div>
                        <span style="display: block; font-size: 0.8em; color: #6f7b88; text-transform: uppercase; letter-spacing: 1px;">Madrina</span>
                        <strong style="color: #434A54; font-size: 1.1em;">Pendiente Nombre</strong>
                    </div>
                </div>
                <p style="margin-top: 20px; font-style: italic; font-size: 0.9em; color: #6f7b88; line-height: 1.4;">
                    "Gracias por aceptar este compromiso de amor y guiarme en el camino de la fe."
                </p>
            </div>
        `;

        // Reemplazamos el placeholder [PADRINOS] por el nuevo HTML
        descriptionElement.innerHTML = descriptionElement.innerHTML.replace('[PADRINOS]', padrinosHTML);
    }
});
