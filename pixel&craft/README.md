# Pixel&Craft web

Editor estático de HTML, CSS y JavaScript, servido en `/pixel%26craft/` por GitHub Pages. No requiere compilación ni servidor de aplicación. Los proyectos y las imágenes se procesan en el navegador.

## Funciones

- Dibujo: lápiz, goma, cuentagotas, relleno conectado, pinceles independientes, selector HSV/HEX/transparencia, recientes y colores con nombre.
- Capas: hasta 32, reordenamiento por arrastre, nombre editable, visibilidad, opacidad y foto de referencia en Fondo.
- Visualizador: patrón de letras, cuadrícula opcional, contador de filas/columnas y paleta con cantidades.
- Trabajo: cruces por clic/arrastre, colores de cruz/números, letras y contadores.
- Forma rectangular/circular, tamaño 1–256. La forma rectangular usa todas las celdas del ancho × alto indicados; la circular recorta las esquinas como círculo u óvalo. Zoom, desplazamiento y movimiento de píxeles con flechas. Los píxeles fuera del lienzo se conservan.
- Botones **↶ / ↷** al extremo derecho de la fila de pestañas para deshacer/rehacer, además de Ctrl+Z / Ctrl+Y; abrir/guardar `.pixeljson` compatible con WPF, importar/exportar paletas y exportar PNG con vista previa, escala, letras, fondo, cuadrícula, contadores y leyenda.
- Flechas **▴ / ▾** junto al porcentaje del pincel: pasos de uno en uno, repetición al mantener pulsado, límites 1–1000 y tamaños independientes para lápiz y goma. Porcentaje de arriba, lectura debajo de la barra, relleno y deslizador permanecen sincronizados.
- En la pestaña **Dibujo**, las flechas **↑ ↓ ← →** desplazan la capa activa una celda por pulsación, aunque el lienzo no tenga foco; **Ctrl+Z** restaura el movimiento. Los píxeles que salen del área se conservan y reaparecen al moverlos de vuelta.
- Español/inglés, preferencia persistida en el navegador y ayuda de la pestaña activa.

Las revisiones del editor web se publican de forma independiente de la versión del ejecutable de escritorio.

En el navegador, **Guardar** descarga el proyecto; no sobrescribe automáticamente el archivo original. **Guardar como**, igual que en escritorio, abre la exportación PNG. La leyenda se descarga con su botón separado para que el navegador no bloquee varias descargas automáticas. El exportador limita las imágenes a 25 millones de píxeles y los patrones con letras a los 52 símbolos del programa de escritorio.

## Descarga de escritorio

El botón del sitio apunta directamente a:

`https://github.com/EamEsse/EamEsse.github.io/releases/latest/download/Pixel.Craft.exe`

La [Release v1.0.2](https://github.com/EamEsse/EamEsse.github.io/releases/tag/v1.0.2) incluye el ejecutable actualizado. GitHub normaliza el nombre del asset de `Pixel&Craft.exe` a **`Pixel.Craft.exe`**, por eso el enlace de descarga utiliza ese nombre.

Archivo actual: `C:\Users\Sara\Desktop\pixel\dist\Pixel&Craft\Pixel&Craft.exe` (versión 1.0.2, Windows x64, incluye .NET). Las tres pestañas de escritorio también incluyen el botón Centrar, en la esquina superior derecha del lienzo.

El ejecutable se adjunta a la Release, no al repositorio de Pages. Si se publica otra Release como última, debe incluir también este asset para conservar el enlace `latest/download`.

## Comprobación del modelo

Desde la raíz del sitio: `node --test "pixel&craft/core.test.js"`.
