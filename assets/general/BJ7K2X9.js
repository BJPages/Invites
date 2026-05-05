(function() {
    const applyFixes = () => {
        const isMobile = window.innerWidth < 600;

        // 1. Corregimos el Grid del contador (La raíz del problema)
        const countdown = document.querySelector('.countdown');
        if (countdown) {
            countdown.style.gridTemplateColumns = isMobile ? 'repeat(4, minmax(60px, 1fr))' : 'repeat(4, minmax(90px, 1fr))';
            countdown.style.gap = isMobile ? '6px' : '16px';
        }

        // 2. Ajuste del tamaño de los números (Para que no se desborden)
        const countNumbers = document.querySelectorAll('.count-box span');
        countNumbers.forEach(num => {
            num.style.fontSize = isMobile ? '1.3rem' : '2.5rem';
        });

        // 3. Ajuste del tamaño del Event Tag
        const tag = document.getElementById('eventTag');
        if (tag) tag.style.fontSize = isMobile ? '1.8rem' : '2.5rem';
    };

    const injectPadrinos = () => {
        const desc = document.getElementById('eventDescription');
        if (desc && desc.innerText.includes('[PADRINOS]')) {
            // Buscamos únicamente el h2 como pediste
            const titleElement = document.querySelector('h2');
            const color = titleElement ? window.getComputedStyle(titleElement).color : '#C38EA6';

            const html = `
                <div style="margin-top:25px; border-top:1px solid rgba(0,0,0,0.1); padding-top:20px; text-align:center;">
                    <h4 style="color:${color}; font-family:inherit; font-size:1.2em; margin-bottom:15px;">Mis Padrinos</h4>
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
                        <div><small style="display:block; opacity:0.7; text-transform:uppercase; font-size:0.7em;">Padrino</small><strong>Pendiente</strong></div>
                        <div><small style="display:block; opacity:0.7; text-transform:uppercase; font-size:0.7em;">Madrina</small><strong>Pendiente</strong></div>
                    </div>
                </div>`;
            desc.innerHTML = desc.innerHTML.replace('[PADRINOS]', html);
            return true;
        }
        return false;
    };

    // Ejecución inicial y reintentos para asegurar carga del motor
    applyFixes();
    
    let attempts = 0;
    const interval = setInterval(() => {
        applyFixes(); 
        if (injectPadrinos() || attempts > 15) clearInterval(interval);
        attempts++;
    }, 200);

    window.addEventListener('resize', applyFixes);
})();
