
document.addEventListener("DOMContentLoaded", () => {
    const estado = document.getElementById("estado");
    const contenedor = document.getElementById("contenedor-escena");
    const botones = document.querySelectorAll("[data-imagen]");

    const configuraciones = {
        1: {
            nombre: "Evolución de la educación",
            archivo: "./imagen1/imagen1/Imagen1.mind",
            plantilla: "contenidoImagen1"
        },
        2: {
            nombre: "Reflexión educativa",
            archivo: "./imagen1/imagen2/Imagen2.mind",
            plantilla: "contenidoImagen2"
        },
        3: {
            nombre: "Diálogo en el tiempo",
            archivo: "./imagen1/imagen3/Imagen3.mind",
            plantilla: "contenidoImagen3"
        }
    };

    let escenaActual = null;
    let sistemaActual = null;
    let numeroActual = 0;
    let generacion = 0;
    let temporizadores = [];

    function programar(callback, demora) {
        const id = setTimeout(callback, demora);
        temporizadores.push(id);
        return id;
    }

    function limpiarTemporizadores() {
        temporizadores.forEach(clearTimeout);
        temporizadores = [];
    }

    function elemento(id) {
        return escenaActual
            ? escenaActual.querySelector("#" + id)
            : null;
    }

    function visible(id, valor) {
        const nodo = elemento(id);
        if (nodo) {
            nodo.setAttribute("visible", valor);
        }
    }

    function cambiarTexto(id, texto) {
        const nodo = elemento(id);
        if (nodo) {
            nodo.setAttribute("value", texto);
        }
    }

    function reiniciarContenido() {
        limpiarTemporizadores();

        const idsOcultos = [
            "cajaInfo",
            "textoInfo",
            "bocadillo",
            "textoMensaje",
            "mensajeFinalReflexion",
            "bocadilloPregunta",
            "textoPregunta",
            "bocadilloRespuesta",
            "textoRespuesta",
            "mensajeFinalDialogo",
            "libroDialogo1",
            "libroDialogo2",
            "libroDialogo3"
        ];

        idsOcultos.forEach(id => visible(id, false));

        const textoMensaje = elemento("textoMensaje");
        if (textoMensaje) textoMensaje.setAttribute("value", "");

        const textoPregunta = elemento("textoPregunta");
        if (textoPregunta) textoPregunta.setAttribute("value", "");

        const textoRespuesta = elemento("textoRespuesta");
        if (textoRespuesta) textoRespuesta.setAttribute("value", "");

        const notas = escenaActual
            ? escenaActual.querySelectorAll(".nota")
            : [];

        notas.forEach(nota => nota.setAttribute("visible", false));
    }

    // ==================================================
    // IMAGEN 1: INFORMACIÓN DE LAS ÉPOCAS
    // ==================================================

    function configurarImagen1() {
        const info = {
            libroAntiguedad: {
                titulo: "🏛️ Antigüedad",
                texto:
                    "Sócrates, Platón y Aristóteles sentaron las bases de la educación.\n" +
                    "Buscaban formar el carácter, la razón y la virtud.\n" +
                    "La enseñanza incluía filosofía, retórica, política y gimnasia."
            },
            libroMedia: {
                titulo: "⛪ Edad Media",
                texto:
                    "La educación estuvo muy ligada a la religión.\n" +
                    "Monasterios y catedrales fueron los centros de saber.\n" +
                    "Se enseñaba latín, teología y escritura hasta el Renacimiento."
            },
            libroModerna: {
                titulo: "🏫 Actualidad",
                texto:
                    "Hoy la educación busca ser inclusiva y aprovechar las herramientas digitales.\n" +
                    "Se fomenta el pensamiento crítico, la tecnología y los valores.\n" +
                    "Las escuelas forman ciudadanos capaces de transformar el mundo."
            }
        };

        function mostrar(clave) {
            const datos = info[clave];
            if (!datos) return;

            visible("cajaInfo", true);
            visible("textoInfo", true);
            cambiarTexto(
                "textoInfo",
                datos.titulo + "\n\n" + datos.texto
            );

            programar(() => {
                visible("cajaInfo", false);
                visible("textoInfo", false);
            }, 7000);
        }

        Object.keys(info).forEach(id => {
            const libro = elemento(id);

            if (libro) {
                libro.classList.add("clickeable");

                libro.addEventListener("click", () => {
                    mostrar(id);
                });
            }
        });
    }

    // ==================================================
    // IMAGEN 2: REFLEXIÓN Y PARTÍCULAS
    // ==================================================

    function configurarImagen2() {
        const textoCompleto =
            "Desde tiempos antiguos, la filosofía ha buscado entender el papel crucial de la educación en el desarrollo humano. Un medio para iluminar el pensamiento, fortalecer la personalidad y preparar a las personas para enfrentar los desafíos de la vida.";

        let animacionActiva = false;

        function escribirTexto(texto, indice, alTerminar) {
            if (numeroActual !== 2) return;

            if (indice < texto.length) {
                cambiarTexto("textoMensaje", texto.substring(0, indice + 1));

                programar(() => {
                    escribirTexto(texto, indice + 1, alTerminar);
                }, 35);
            } else if (alTerminar) {
                alTerminar();
            }
        }

        function iniciarAnimacion() {
            if (animacionActiva) return;

            animacionActiva = true;
            reiniciarContenido();

            programar(() => {
                visible("bocadillo", true);
                visible("textoMensaje", true);

                escribirTexto(textoCompleto, 0, () => {
                    programar(() => {
                        const notas = escenaActual
                            ? escenaActual.querySelectorAll(".nota")
                            : [];

                        notas.forEach((nota, indice) => {
                            programar(() => {
                                nota.setAttribute("visible", true);
                            }, indice * 200);
                        });
                    }, 500);

                    programar(() => {
                        visible("mensajeFinalReflexion", true);
                    }, 2500);
                });
            }, 600);
        }

        // Se guarda la función para el botón de reinicio.
        window.reiniciarAnimacionActual = () => {
            animacionActiva = false;
            iniciarAnimacion();
        };

        iniciarAnimacion();
    }

    // ==================================================
    // IMAGEN 3: DIÁLOGO
    // ==================================================

    function configurarImagen3() {
        const pregunta = "¿Cómo se originó...?";
        const respuesta =
            "Para entender la educación de hoy, viajaremos al pasado, donde grandes pensadores sentaron sus bases...";

        let animacionActiva = false;

        function escribirTexto(texto, indice, destino, alTerminar) {
            if (numeroActual !== 3) return;

            if (indice < texto.length) {
                destino.setAttribute(
                    "value",
                    texto.substring(0, indice + 1)
                );

                programar(() => {
                    escribirTexto(texto, indice + 1, destino, alTerminar);
                }, 40);
            } else if (alTerminar) {
                alTerminar();
            }
        }

        function iniciarDialogo() {
            if (animacionActiva) return;

            animacionActiva = true;
            reiniciarContenido();

            const textoPregunta = elemento("textoPregunta");
            const textoRespuesta = elemento("textoRespuesta");

            if (!textoPregunta || !textoRespuesta) return;

            programar(() => {
                visible("bocadilloPregunta", true);
                visible("textoPregunta", true);

                escribirTexto(pregunta, 0, textoPregunta, () => {
                    programar(() => {
                        visible("bocadilloRespuesta", true);
                        visible("textoRespuesta", true);

                        escribirTexto(respuesta, 0, textoRespuesta, () => {
                            programar(() => {
                                [
                                    "libroDialogo1",
                                    "libroDialogo2",
                                    "libroDialogo3"
                                ].forEach((id, indice) => {
                                    programar(() => {
                                        visible(id, true);
                                    }, indice * 250);
                                });
                            }, 600);

                            programar(() => {
                                visible("mensajeFinalDialogo", true);
                            }, 2000);
                        });
                    }, 800);
                });
            }, 700);
        }

        window.reiniciarAnimacionActual = () => {
            animacionActiva = false;
            iniciarDialogo();
        };

        iniciarDialogo();
    }

    // ==================================================
    // CARGAR UNA ESCENA PARA CADA ARCHIVO .MIND
    // ==================================================

    async function detenerEscenaActual() {
        limpiarTemporizadores();
        window.reiniciarAnimacionActual = null;

        const escenaAnterior = escenaActual;
        const sistemaAnterior = sistemaActual;

        escenaActual = null;
        sistemaActual = null;

        if (escenaAnterior && sistemaAnterior) {
            try {
                await sistemaAnterior.stop();
            } catch (error) {
                console.warn("No se pudo detener la escena anterior:", error);
            }
        }

        if (escenaAnterior && escenaAnterior.parentNode) {
            escenaAnterior.parentNode.removeChild(escenaAnterior);
        }

        contenedor.replaceChildren();
    }

    async function cargarImagen(numero) {
        numero = Number(numero);

        const config = configuraciones[numero];
        if (!config) return;

        const miGeneracion = ++generacion;
        numeroActual = numero;

        estado.textContent = "⏳ Cargando " + config.nombre + "...";
        estado.style.color = "";

        await detenerEscenaActual();

        if (miGeneracion !== generacion) return;

        const plantilla = document.getElementById(config.plantilla);

        if (!plantilla) {
            estado.textContent = "❌ No se encontró la plantilla " + config.plantilla;
            return;
        }

        const escena = document.createElement("a-scene");

        escena.setAttribute(
            "mindar-image",
            `imageTargetSrc: ${config.archivo};
             autoStart: true;
             uiLoading: yes;
             uiScanning: yes;
             maxTrack: 1;`
        );

        escena.setAttribute("color-space", "sRGB");
        escena.setAttribute("renderer", "colorManagement: true");
        escena.setAttribute("vr-mode-ui", "enabled: false");
        escena.setAttribute(
            "device-orientation-permission-ui",
            "enabled: false"
        );

        // Marcador: cada archivo .mind contiene su propio objetivo 0.
        const marcador = document.createElement("a-entity");
        marcador.setAttribute("id", "marcadorActivo");
        marcador.setAttribute("mindar-image-target", "targetIndex: 0");

        marcador.appendChild(plantilla.content.cloneNode(true));
        escena.appendChild(marcador);

        // Cámara y controles de interacción.
        const camara = document.createElement("a-camera");
        camara.setAttribute("position", "0 0 0");
        camara.setAttribute("look-controls", "enabled: false");
        camara.setAttribute("cursor", "rayOrigin: mouse");
        camara.setAttribute("raycaster", "objects: .clickeable");

        escena.appendChild(camara);
        contenedor.appendChild(escena);

        escenaActual = escena;

        const alCargar = () => {
            if (miGeneracion !== generacion) return;

            sistemaActual = escena.systems["mindar-image-system"] || null;

            estado.textContent =
                "📷 Cámara preparada. Muestra la imagen de " + config.nombre + ".";
        };

        escena.addEventListener("loaded", alCargar, { once: true });

        marcador.addEventListener("targetFound", () => {
            if (miGeneracion !== generacion) return;

            estado.textContent = "✅ Imagen detectada: " + config.nombre;
            estado.style.color = "#15803d";

            if (numero === 2 && !window.reiniciarAnimacionActual) {
                configurarImagen2();
            }

            if (numero === 3 && !window.reiniciarAnimacionActual) {
                configurarImagen3();
            }
        });

        marcador.addEventListener("targetLost", () => {
            if (miGeneracion !== generacion) return;

            estado.textContent =
                "🔍 Apunta la cámara hacia la imagen de " + config.nombre + ".";
            estado.style.color = "";
        });

        // Esperar a que A-Frame inicialice la escena.
        if (escena.hasLoaded) {
            alCargar();
        } else {
            await new Promise(resolve => {
                escena.addEventListener("loaded", resolve, { once: true });
            });

            alCargar();
        }

        if (miGeneracion !== generacion) return;

        if (numero === 1) configurarImagen1();

        // Las animaciones de las imágenes 2 y 3 se inician
        // cuando se detecta el marcador correspondiente.
    }

    // Selección de imágenes.
    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            botones.forEach(otro => {
                otro.classList.toggle("seleccionado", otro === boton);
            });

            cargarImagen(boton.dataset.imagen);
        });
    });

    // Ayuda.
    const botonInfo = document.getElementById("btnInfo");

    botonInfo.addEventListener("click", () => {
        alert(
            "📖 Cómo funciona:\n\n" +
            "1. Permite el acceso a la cámara.\n" +
            "2. Selecciona la imagen que deseas explorar.\n" +
            "3. Apunta la cámara hacia esa imagen.\n" +
            "4. En la primera imagen, toca los libros para leer su información.\n" +
            "5. En las otras imágenes, observa las animaciones.\n\n" +
            "Mantén las imágenes bien iluminadas y visibles."
        );
    });

    // Reiniciar animación de la escena actual.
    document.getElementById("btnReiniciar").addEventListener("click", () => {
        if (typeof window.reiniciarAnimacionActual === "function") {
            window.reiniciarAnimacionActual();
        } else if (numeroActual === 1) {
            estado.textContent =
                "ℹ️ En la imagen 1, toca uno de los libros para ver su información.";
        } else {
            estado.textContent =
                "Primero espera a que la cámara detecte la imagen.";
        }
    });

    // Iniciar con la imagen 1.
    cargarImagen(1);
});
