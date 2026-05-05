(function() {
    const applyLocalFixes = () => {
        // 1. Ajuste del Event Tag (Solo para esta invitación)
        const eventTag = document.getElementById('eventTag');
        if (eventTag) {
            eventTag.style.fontSize = 'clamp(1.6rem, 5vw, 2.5rem)';
            eventTag.style.fontWeight = '700';
        }

        // 2. Inyección de Padrinos
        const desc = document.getElementById('eventDescription');
        if (desc && desc.innerText.includes('[PADRINOS]')) {
            const titleElement = document.querySelector('h2');
            const color = titleElement ? window.getComputedStyle(titleElement).color : '#C38EA6';

            const html = `
                <div style="margin-top:25px; border-top:1px solid rgba(0,0,0,0.1); padding-top:20px; text-align:center;">
                    <h4 style="color:${color}; font-family:inherit; font-size:1.2em; margin-bottom:15px;">Mis Padrinos</h4>
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
                        <div>
                            <small style="display:block; opacity:0.7; text-transform:uppercase; font-size:0.7em;">Padrino</small>
                            <strong>Pendiente</strong>
                        </div>
                        <div>
                            <small style="display:block; opacity:0.7; text-transform:uppercase; font-size:0.7em;">Madrina</small>
                            <strong>Pendiente</strong>
                        </div>
                    </div>
                </div>`;
            
            desc.innerHTML = desc.innerHTML.replace('[PADRINOS]', html);
            return true; 
        }
        return false;
    };

    let attempts = 0;
    const interval = setInterval(() => {
        // Ejecutamos los ajustes. Si ya se pusieron los padrinos, dejamos de intentar.
        if (applyLocalFixes() || attempts > 15) {
            clearInterval(interval);
        }
        attempts++;
    }, 200);
})();
