(function() {
    const applyFixes = () => {
        // 1. Corregimos el Grid del contador para que quepa en cualquier cel
        const countdown = document.querySelector('.countdown');
        if (countdown) {
            // Cambiamos el minmax de 90px a algo que sí quepa (70px o menos)
            countdown.style.gridTemplateColumns = 'repeat(4, minmax(65px, 1fr))';
            countdown.style.gap = '8px'; // Reducimos el espacio entre cuadros
        }

        // 2. Ajuste del tamaño del Event Tag
        const tag = document.getElementById('eventTag');
        if (tag) tag.style.fontSize = '2.5rem';
    };

    const injectPadrinos = () => {
        const desc = document.getElementById('eventDescription');
        if (desc && desc.innerText.includes('[PADRINOS]')) {
            const title = document.querySelector('h1, h2');
            const color = title ? window.getComputedStyle(title).color : '#C38EA6';

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

    // Ejecución
    applyFixes();
    
    let attempts = 0;
    const interval = setInterval(() => {
        applyFixes(); // Re-aplicamos por si el motor sobreescribe
        if (injectPadrinos() || attempts > 15) clearInterval(interval);
        attempts++;
    }, 200);
})();
