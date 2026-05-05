(function() {
    const applyFixes = () => {
        const isMobile = window.innerWidth < 600;

        // 1. ANTI-SCROLL: Aseguramos que el contenedor principal no se desborde
        document.documentElement.style.overflowX = 'hidden';
        document.body.style.overflowX = 'hidden';

        // 2. Corregimos el Grid del contador
        const countdown = document.querySelector('.countdown');
        if (countdown) {
            countdown.style.gridTemplateColumns = isMobile ? 'repeat(4, minmax(55px, 1fr))' : 'repeat(4, minmax(90px, 1fr))';
            countdown.style.gap = isMobile ? '5px' : '16px';
            countdown.style.width = '100%';
            countdown.style.padding = isMobile ? '0 5px' : '0';
        }

        // 3. Ajuste del CountBox y sus Spans (0.7rem para el número)
        const boxes = document.querySelectorAll('.count-box');
        boxes.forEach(box => {
            if (isMobile) {
                box.style.padding = '8px 4px'; // Reducimos el padding interno para que la caja encoja
                box.style.minWidth = '0';
            }
            
            const num = box.querySelector('span');
            if (num) {
                num.style.fontSize = isMobile ? '0.7rem' : '2.5rem';
            }
            
            const label = box.querySelector('small');
            if (label && isMobile) {
                label.style.fontSize = '0.5rem';
                label.style.marginTop = '2px';
            }
        });

        // 4. Ajuste del Event Tag
        const tag = document.getElementById('eventTag');
        if (tag) tag.style.fontSize = isMobile ? '1.8rem' : '2.5rem';
    };

    const injectPadrinos = () => {
        const desc = document.getElementById('eventDescription');
        if (desc && desc.innerText.includes('[PADRINOS]')) {
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

    applyFixes();
    
    let attempts = 0;
    const interval = setInterval(() => {
        applyFixes(); 
        if (injectPadrinos() || attempts > 15) clearInterval(interval);
        attempts++;
    }, 200);

    window.addEventListener('resize', applyFixes);
})();
