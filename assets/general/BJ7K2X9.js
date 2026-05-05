(function() {
    const applyLayoutStyles = () => {
        const isMobile = window.innerWidth < 600;

        // 1. AJUSTE DEL EVENT TAG (Tamaño solicitado)
        const tag = document.getElementById('eventTag');
        if (tag) {
            tag.style.fontSize = isMobile ? '2rem' : '2.5rem';
            tag.style.display = 'block';
        }

        // 2. CORRECCIÓN PARA EL CONTADOR (Mobile y Desktop)
        const countdownParent = document.getElementById('countdown') || document.querySelector('.countdown-container');
        const countBoxes = document.querySelectorAll('.count-box');

        if (countdownParent) {
            countdownParent.style.cssText += `
                display: flex !important;
                justify-content: center !important;
                gap: ${isMobile ? '5px' : '15px'} !important;
                width: 100% !important;
                max-width: 100vw !important;
                padding: 0 5px !important;
            `;

            countBoxes.forEach(box => {
                box.style.cssText += `
                    flex: 1 1 auto !important;
                    min-width: 0 !important;
                    max-width: ${isMobile ? '23%' : 'none'} !important;
                    margin: 0 !important;
                    padding: ${isMobile ? '8px 2px' : '15px'} !important;
                `;
                
                // Ajuste de textos internos del contador
                const spans = box.querySelectorAll('span, p, div');
                spans.forEach(el => {
                    if (isMobile) {
                        if (el.innerText.match(/^\d+$/)) {
                            el.style.fontSize = '1.2rem !important';
                        } else {
                            el.style.fontSize = '0.65rem !important';
                        }
                    }
                });
            });
        }
    };

    const injectPadrinos = () => {
        const descriptionElement = document.getElementById('eventDescription');
        const titleElement = document.querySelector('h1') || document.querySelector('h2');

        if (descriptionElement && descriptionElement.innerText.includes('[PADRINOS]')) {
            // Robamos el color del título del tema (ahora será el Rosa #C38EA6)
            const activePrimaryColor = titleElement ? window.getComputedStyle(titleElement).color : '#C38EA6';
            const activeTextColor = window.getComputedStyle(descriptionElement).color;

            const padrinosHTML = `
                <div class="padrinos-container" style="margin-top: 25px; border-top: 1px solid rgba(0,0,0,0.1); padding-top: 20px;">
                    <h4 style="color: ${activePrimaryColor}; font-family: inherit; font-size: 1.2em; margin-bottom: 15px; text-align: center;">
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
            return true; 
        }
        return false;
    };

    // Ejecución con reintentos para asegurar que el motor de la invitación ya renderizó
    const runAll = () => {
        applyLayoutStyles();
        return injectPadrinos();
    };

    if (!runAll()) {
        const retryInterval = setInterval(() => {
            if (runAll()) clearInterval(retryInterval);
        }, 100);
        setTimeout(() => clearInterval(retryInterval), 5000);
    }

    window.addEventListener('resize', applyLayoutStyles);
})();
