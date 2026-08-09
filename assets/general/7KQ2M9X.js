// 2. Inyección de Padrinos + Código de Vestimenta + Lluvia de Sobres
const desc = document.getElementById('eventDescription');

if (desc) {
    // Si todavía existe el marcador, hacemos la inyección
    if (desc.innerText.includes('[PADRINOS]')) {
        const titleElement = document.querySelector('h2');
        const color = titleElement
            ? window.getComputedStyle(titleElement).color
            : '#C38EA6';

        const html = `
            <!-- Padrinos -->
            <div style="
                margin-top:25px;
                border-top:1px solid rgba(0,0,0,0.1);
                padding-top:20px;
                text-align:center;
            ">
                <h4 style="
                    color:${color};
                    font-family:inherit;
                    font-size:1.2em;
                    margin-bottom:15px;
                ">
                    Mis Padrinos
                </h4>

                <div style="
                    display:grid;
                    grid-template-columns:1fr 1fr;
                    gap:10px;
                ">
                    <div>
                        <small style="
                            display:block;
                            opacity:0.7;
                            text-transform:uppercase;
                            font-size:0.7em;
                        ">
                            Padrino
                        </small>

                        <strong>
                            Antonio Alvarado Muñoz
                        </strong>
                    </div>

                    <div>
                        <small style="
                            display:block;
                            opacity:0.7;
                            text-transform:uppercase;
                            font-size:0.7em;
                        ">
                            Madrina
                        </small>

                        <strong>
                            Elizabeth Cervantes Ortiz
                        </strong>
                    </div>
                </div>
            </div>


            <!-- Código de Vestimenta -->
            <div style="
                margin-top:25px;
                border-top:1px solid rgba(0,0,0,0.1);
                padding-top:20px;
                text-align:center;
            ">
                <h4 style="
                    color:${color};
                    font-family:inherit;
                    font-size:1.2em;
                    margin-bottom:8px;
                ">
                    Código de vestimenta
                </h4>

                <strong style="
                    display:block;
                    margin-bottom:10px;
                ">
                    Cóctel formal · Riguroso
                </strong>

                <div style="
                    line-height:1.6;
                    opacity:0.9;
                ">
                    Queremos celebrar este momento con mucha elegancia.<br>
                    Vestido cóctel o midi para ellas, y traje con corbata para ellos.
                </div>
            </div>


            <!-- Lluvia de Sobres -->
            <div style="
                margin-top:25px;
                border-top:1px solid rgba(0,0,0,0.1);
                padding-top:20px;
                text-align:center;
            ">
                <h4 style="
                    color:${color};
                    font-family:inherit;
                    font-size:1.2em;
                    margin-bottom:8px;
                ">
                    Lluvia de sobres
                </h4>

                <div style="
                    line-height:1.6;
                    opacity:0.9;
                ">
                    Tu presencia es nuestro mejor regalo.<br>
                    Si deseas tener un detalle con nosotros,
                    contaremos con la dinámica de
                    <strong>lluvia de sobres</strong> durante el evento.
                </div>
            </div>
        `;

        desc.innerHTML = desc.innerHTML.replace('[PADRINOS]', html);
    }

    // Confirmamos que toda la inyección ya ocurrió
    descriptionApplied =
        !desc.innerText.includes('[PADRINOS]') &&
        desc.innerText.includes('Mis Padrinos') &&
        desc.innerText.includes('Código de vestimenta') &&
        desc.innerText.includes('Lluvia de sobres');
}
