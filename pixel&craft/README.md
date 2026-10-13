# Pixel&Craft web

Editor estático de HTML, CSS y JavaScript, servido en `/pixel%26craft/` por GitHub Pages. No requiere compilación ni servidor de aplicación. Los proyectos y las imágenes se procesan en el navegador.

## Funciones

- Dibujo: lápiz, goma, cuentagotas, relleno conectado, pinceles independientes, selector HSV/HEX/transparencia, recientes y colores con nombre.
- Capas: hasta 32, reordenamiento por arrastre, nombre editable, visibilidad, opacidad y foto de referencia en Fondo.
- Visualizador: patrón de letras, cuadrícula opcional, contador de filas/columnas y paleta con cantidades.
- Trabajo: cruces por clic/arrastre, colores de cruz/números, letras y contadores.
- Forma cuadrada/circular, tamaño 1–256, zoom, desplazamiento y movimiento de píxeles con flechas. Los píxeles fuera del lienzo se conservan.
- Botones **↶ / ↷** para deshacer/rehacer, además de Ctrl+Z / Ctrl+Y; abrir/guardar `.pixeljson` compatible con WPF, importar/exportar paletas y exportar PNG con vista previa, escala, letras, fondo, cuadrícula, contadores y leyenda.
- Flechas **▴ / ▾** junto al porcentaje del pincel: pasos de uno en uno, repetición al mantener pulsado, límites 1–1000 y tamaños independientes para lápiz y goma.
- Español/inglés, preferencia persistida en el navegador y ayuda de la pestaña activa.

En el navegador, **Guardar** descarga el proyecto; no sobrescribe automáticamente el archivo original. **Guardar como**, igual que en escritorio, abre la exportación PNG. La leyenda se descarga con su botón separado para que el navegador no bloquee varias descargas automáticas. El exportador limita las imágenes a 25 millones de píxeles y los patrones con letras a los 52 símbolos del programa de escritorio.

## Descarga de escritorio

El botón del sitio apunta directamente a:

`https://github.com/EamEsse/EamEsse.github.io/releases/latest/download/Pixel%26Craft.exe`

Para activarlo, crear una Release publicada (no borrador ni prerelease) en https://github.com/EamEsse/EamEsse.github.io/releases y adjuntar el ejecutable **con el nombre exacto `Pixel&Craft.exe`**.

Archivo actual: `C:\Users\Sara\Desktop\pixel\dist\Pixel&Craft\Pixel&Craft.exe` (versión 1.0.0, 140.780.608 bytes; Windows x64, incluye .NET).

El ejecutable se adjunta a la Release, no al repositorio de Pages. Si se publica otra Release como última, debe incluir también este asset para conservar el enlace `latest/download`.

## Comprobación del modelo

Desde la raíz del sitio: `node --test "pixel&craft/core.test.js"`.
