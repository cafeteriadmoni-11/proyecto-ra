document.addEventListener('DOMContentLoaded', () => {
    const marcador = document.getElementById('marcadorPrincipal');
    const estado = document.getElementById('estado');
    const cajaInfo = document.getElementById('cajaInfo');
    const textoInfo = document.getElementById('textoInfo');

    // Detectar imagen
    marcador.addEventListener('markerFound', () => {
        estado.textContent = '✅ ¡Imagen detectada! Toca los libros';
        estado.style.color = '#bbf7d0';
    });

    marcador.addEventListener('markerLost', () => {
        estado.textContent = '🔍 Apunta la cámara hacia la imagen';
        estado.style.color = 'inherit';
    });

    // Información de cada época
    const info = {
        libroAntiguedad: {
            titulo: "🏛️ Antigüedad",
            texto: "Sócrates, Platón y Aristóteles sentaron las bases de la educación.\nBuscaban formar el carácter, la razón y la virtud.\nLa enseñanza incluía filosofía, retórica, política y gimnasia."
        },
        libroMedia: {
            titulo: "⛪ Edad Media",
            texto: "La educación estuvo muy ligada a la religión.\nMonasterios y catedrales fueron los centros de saber.\nSe enseñaba latín, teología y escritura hasta el Renacimiento."
        },
        libroModerna: {
            titulo: "🏫 Actualidad",
            texto: "Hoy la educación es inclusiva, digital y para todos.\nSe fomenta el pensamiento crítico, la tecnología y los valores.\nLas escuelas forman ciudadanos capaces de transformar el mundo."
        }
    };

    // Mostrar información al tocar
    function mostrar(clave) {
        const { titulo, texto } = info[clave];

        cajaInfo.setAttribute('visible', 'true');
        textoInfo.setAttribute('visible', 'true');
        textoInfo.setAttribute('value', `${titulo}\n\n${texto}`);

        clearTimeout(window.timer);
        window.timer = setTimeout(() => {
            cajaInfo.setAttribute('visible', 'false');
            textoInfo.setAttribute('visible', 'false');
        }, 7000);
    }

    // Conectar toques a cada libro
    document.getElementById('libroAntiguedad').addEventListener('click', () => mostrar('libroAntiguedad'));
    document.getElementById('libroMedia').addEventListener('click', () => mostrar('libroMedia'));
    document.getElementById('libroModerna').addEventListener('click', () => mostrar('libroModerna'));

    // Botón de ayuda
    document.getElementById('btnInfo').addEventListener('click', () => {
        alert(
            "📖 Cómo funciona:\n" +
            "1. Permite acceso a la cámara 📷\n" +
            "2. Apunta a tu imagen impresa o en pantalla\n" +
            "3. Toca los libros de colores para ver la información\n\n" +
            "💡 Mantén la imagen plana, bien iluminada y sin inclinar mucho."
        );
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const marcador = document.getElementById('marcadorImagen2');
    const estado = document.getElementById('estado');
    const bocadillo = document.getElementById('bocadillo');
    const textoMensaje = document.getElementById('textoMensaje');
    const mensajeFinal = document.getElementById('mensajeFinal');
    const particulas = document.querySelectorAll('.nota');

    // El texto que se va escribiendo
    const textoCompleto = "Desde tiempos antiguos, la filosofía ha buscado entender el papel crucial de la educación en el desarrollo humano. Un medio para iluminar el pensamiento, fortalecer la personalidad, y preparar a las personas para enfrentar los desafíos de la vida.";

    let animacionActiva = false;

    // Detectar cuando la imagen aparece
    marcador.addEventListener('markerFound', () => {
        estado.textContent = '✅ ¡Imagen detectada! Leyendo...';
        estado.style.color = '#bbf7d0';
        
        if (!animacionActiva) iniciarAnimacion();
    });

    marcador.addEventListener('markerLost', () => {
        estado.textContent = '🔍 Apunta la cámara hacia la imagen';
        estado.style.color = 'inherit';
    });

    // Función principal de animación
    function iniciarAnimacion() {
        animacionActiva = true;
        
        // Reiniciar todo
        bocadillo.setAttribute('visible', 'false');
        textoMensaje.setAttribute('visible', 'false');
        textoMensaje.setAttribute('value', '');
        mensajeFinal.setAttribute('visible', 'false');
        particulas.forEach(p => p.setAttribute('visible', 'false'));

        // Paso 1: Mostrar bocadillo
        setTimeout(() => {
            bocadillo.setAttribute('visible', 'true');
            textoMensaje.setAttribute('visible', 'true');
            escribirTexto(textoCompleto, 0);
        }, 600);
    }

    // Efecto "máquina de escribir"
    function escribirTexto(texto, indice) {
        if (indice < texto.length) {
            textoMensaje.setAttribute('value', texto.substring(0, indice + 1));
            setTimeout(() => escribirTexto(texto, indice + 1), 35);
        } else {
            // Cuando termina de escribir → mostrar partículas
            setTimeout(() => {
                particulas.forEach((p, i) => {
                    setTimeout(() => p.setAttribute('visible', 'true'), i * 200);
                });
            }, 500);

            // Mostrar mensaje final
            setTimeout(() => {
                mensajeFinal.setAttribute('visible', 'true');
            }, 2500);
        }
    }

    // Botón para repetir la animación
    document.getElementById('btnReiniciar').addEventListener('click', () => {
        animacionActiva = false;
        setTimeout(iniciarAnimacion, 300);
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const marcador = document.getElementById('marcadorImagen3');
    const estado = document.getElementById('estado');
    
    // Bocadillos y textos
    const bocadilloPregunta = document.getElementById('bocadilloPregunta');
    const textoPregunta = document.getElementById('textoPregunta');
    const bocadilloRespuesta = document.getElementById('bocadilloRespuesta');
    const textoRespuesta = document.getElementById('textoRespuesta');
    const mensajeFinal = document.getElementById('mensajeFinal');
    
    // Libros decorativos
    const libros = [
        document.getElementById('libro1'),
        document.getElementById('libro2'),
        document.getElementById('libro3')
    ];

    // Diálogo
    const pregunta = "¿Cómo se originó...?";
    const respuesta = "Para entender la educación de hoy, viajaremos al pasado, donde grandes pensadores sentaron sus bases...";

    let animacionActiva = false;

    // Detectar imagen
    marcador.addEventListener('markerFound', () => {
        estado.textContent = '✅ ¡Imagen detectada! Iniciando diálogo...';
        estado.style.color = '#bbf7d0';
        
        if (!animacionActiva) iniciarDialogo();
    });

    marcador.addEventListener('markerLost', () => {
        estado.textContent = '🔍 Apunta la cámara hacia la imagen';
        estado.style.color = 'inherit';
    });

    // Reiniciar animación
    document.getElementById('btnReiniciar').addEventListener('click', () => {
        animacionActiva = false;
        setTimeout(iniciarDialogo, 300);
    });

    // Secuencia completa del diálogo
    function iniciarDialogo() {
        animacionActiva = true;
        
        // Reiniciar todo
        bocadilloPregunta.setAttribute('visible', 'false');
        textoPregunta.setAttribute('visible', 'false');
        textoPregunta.setAttribute('value', '');
        bocadilloRespuesta.setAttribute('visible', 'false');
        textoRespuesta.setAttribute('visible', 'false');
        textoRespuesta.setAttribute('value', '');
        mensajeFinal.setAttribute('visible', 'false');
        libros.forEach(libro => libro.setAttribute('visible', 'false'));

        // PASO 1 — Aparece la niña y pregunta
        setTimeout(() => {
            bocadilloPregunta.setAttribute('visible', 'true');
            textoPregunta.setAttribute('visible', 'true');
            escribirTexto(pregunta, 0, textoPregunta, () => {
                // PASO 2 — Responde la maestra
                setTimeout(() => {
                    bocadilloRespuesta.setAttribute('visible', 'true');
                    textoRespuesta.setAttribute('visible', 'true');
                    escribirTexto(respuesta, 0, textoRespuesta, () => {
                        // PASO 3 — Aparecen libros decorativos
                        setTimeout(() => {
                            libros.forEach((libro, i) => {
                                setTimeout(() => libro.setAttribute('visible', 'true'), i * 250);
                            });
                        }, 600);
                        
                        // PASO 4 — Mensaje final
                        setTimeout(() => {
                            mensajeFinal.setAttribute('visible', 'true');
                        }, 2000);
                    });
                }, 800);
            });
        }, 700);
    }

    // Efecto máquina de escribir
    function escribirTexto(texto, indice, elemento, callback) {
        if (indice < texto.length) {
            elemento.setAttribute('value', texto.substring(0, indice + 1));
            setTimeout(() => escribirTexto(texto, indice + 1, elemento, callback), 40);
        } else if (callback) {
            callback();
        }
    }
});