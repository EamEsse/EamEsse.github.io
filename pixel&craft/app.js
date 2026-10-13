/* Browser UI. All drawing and project files stay on the user's device. */
(() => {
  'use strict';
  const C = PixelCore, $ = id => document.getElementById(id);
  const texts = {
    es: {
      new:'Nuevo', open:'Abrir', save:'Guardar', saveAs:'Guardar como', export:'Exportar', import:'Importar', size:'Tamaño', width:'Ancho', height:'Alto',
      shape:'Alternar forma cuadrada / circular', help:'Ayuda', draw:'Dibujo', preview:'Visualizador', work:'Trabajo', tools:'Herramientas',
      pencil:'Lápiz', eraser:'Goma', eyedropper:'Cuentagotas', bucket:'Cubo de relleno', clearLayer:'Limpiar capa activa', brushSize:'Tamaño del pincel',
      currentColor:'Color actual', picker:'Selector de color', sv:'Saturación y brillo', hue:'Matiz', transparency:'Transparencia', saveColor:'Guardar color',
      recent:'Recientes', clearRecent:'Limpiar recientes', saved:'Guardados', canvas:'Lienzo de pixel art', fit:'Centrar', layers:'Capas', addLayer:'Añadir capa',
      opacity:'Opacidad de capa', viewOptions:'Opciones de vista', letterPattern:'Patrón con letras', countRows:'Contar filas', countColumns:'Contar columnas',
      grid:'Cuadrícula', usedPalette:'Paleta usada', crossColor:'Color cruz', numberColor:'Color números', letters:'Letras',
      lettersHint:'Muestra una letra para cada color.', rowsHint:'Numera las celdas consecutivas del mismo color por fila.', columnsHint:'Numera las celdas consecutivas del mismo color por columna.',
      clearMarks:'Limpiar cruces', cancel:'Cancelar', accept:'Aceptar', exportTitle:'Exportar imagen', filename:'Nombre del archivo', scale:'Escala (píxeles por celda)',
      background:'Fondo blanco', showPalette:'Incluir paleta', showCounts:'Cantidad de cada color', exportHint:'La foto de referencia no se exporta. Con letras, descarga también la leyenda .txt.',
      downloadPNG:'Descargar PNG', downloadLegend:'Descargar leyenda .txt', empty:'Vacío', untitled:'Sin título', ready:'Listo · Rueda: zoom · Botón central: mover vista',
      selected:'seleccionado', confirmNew:'¿Crear un dibujo nuevo? Se sustituirá el proyecto actual.', confirmOpen:'Hay cambios sin guardar. ¿Sustituir el proyecto actual?',
      confirmClear:'¿Borrar lo pintado en la capa activa?', confirmMarks:'¿Limpiar todas las cruces?', colorName:'Nombre del color', layerName:'Nombre de capa',
      unnamed:'Sin nombre', brushPrompt:'Tamaño en píxeles (1–1000). El porcentaje equivale al lado del trazo.', downloaded:'Archivo preparado para descargar',
      opened:'Proyecto abierto', error:'No se pudo completar la operación', invalidHex:'HEX no válido. Usa #RRGGBB o #AARRGGBB.', invalidProject:'Archivo de proyecto no válido',
      imageError:'No se pudo abrir la imagen de referencia', maxLayers:'Puedes tener hasta 32 capas.', visibility:'Mostrar / ocultar capa', remove:'Eliminar',
      reference:'Cargar o reemplazar foto de referencia', rename:'Cambiar nombre', copy:'Copiar código', colorMenu:'Opciones del color',
      undo:'Cambio deshecho', redo:'Cambio rehecho', nothingUndo:'No hay cambios que deshacer', nothingRedo:'No hay cambios que rehacer',
      undoAction:'Deshacer', redoAction:'Rehacer', undoTip:'Deshacer (Ctrl + Z)', redoTip:'Rehacer (Ctrl + Y / Ctrl + Mayús + Z)',
      increaseSize:'Aumentar tamaño en 1%', decreaseSize:'Reducir tamaño en 1%',
      exportLarge:'La imagen es demasiado grande. Reduce la escala (máximo 25 millones de píxeles).', lettersLimit:'El patrón con letras admite hasta 52 colores. Reduce la paleta.',
      paletteLoaded:'Paleta importada', copied:'Código copiado', drawing:'dibujo', palette:'paleta', dragLayer:'Arrastra para ordenar; doble clic para cambiar nombre',
      helpCommon:['Nuevo crea un documento con el tamaño actual. Abrir y Guardar usan .pixeljson compatible con el programa de escritorio.',
        'Guardar descarga el proyecto a tu dispositivo. Guardar como y Exportar abren las opciones PNG y la leyenda de letras.',
        'Botones ↶ / ↷ o Ctrl+Z: deshacer; Ctrl+Y o Ctrl+Mayús+Z: rehacer. Ctrl+S: guardar. La edición de texto conserva sus propios atajos.',
        'Rueda: zoom. Botón central o Espacio + arrastrar: mover la vista. Centrar ajusta el lienzo. En pantallas táctiles, selecciona una herramienta y arrastra para pintar.',
        'Forma alterna cuadrado / círculo. El cuadrado usa el lado menor; un círculo con ancho y alto distintos se convierte en óvalo. Se conservan los píxeles ocultos.'],
      helpDraw:['Lápiz, goma, cuentagotas y cubo de relleno. El botón derecho borra. El cubo rellena solo la zona conectada del mismo color de la capa activa.',
        'El lápiz y la goma tienen tamaños independientes (1–1000). Las flechas junto al porcentaje cambian el tamaño de uno en uno; mantenerlas pulsadas repite el ajuste. Doble clic en el porcentaje o en la barra para escribir el tamaño.',
        'Flechas con el lienzo enfocado: mover un píxel la capa activa. Los píxeles que salen se conservan y reaparecen al volver.',
        'Capas: + añade; − elimina; el ojo muestra u oculta. Arrastra un nombre para ordenar, o haz doble clic para renombrar. Fondo está fijo abajo.',
        'El + de Fondo carga una foto para calcar. Con Fondo seleccionado, arrastra para moverla y usa la rueda para cambiar su tamaño. Ctrl+rueda hace zoom. El cuentagotas también toma colores de la foto.',
        'HEX admite #RRGGBB o #AARRGGBB. En Transparencia, izquierda = transparente y derecha = opaco. Clic derecho en un color guardado permite renombrar, copiar o eliminar. Importar admite también arrastrar una paleta .pixeljson.'],
      helpPreview:['Vista limpia sin referencia. Activa letras, cuadrícula o el contador de filas/columnas a la derecha.', 'La paleta usada muestra colores, nombres guardados y cantidades de celdas.'],
      helpWork:['Clic o arrastre izquierdo: añadir cruces. Clic o arrastre derecho: quitar cruces.', 'Las letras identifican colores. Los contadores empiezan en 1 en cada tramo consecutivo del mismo color. Filas y columnas son excluyentes.', 'Puedes cambiar el color de cruces y números y limpiar todas las marcas. Las marcas se guardan en el proyecto.']
    },
    en: {
      new:'New', open:'Open', save:'Save', saveAs:'Save as', export:'Export', import:'Import', size:'Size', width:'Width', height:'Height',
      shape:'Toggle square / circle shape', help:'Help', draw:'Draw', preview:'Viewer', work:'Work', tools:'Tools', pencil:'Pencil', eraser:'Eraser',
      eyedropper:'Eyedropper', bucket:'Fill bucket', clearLayer:'Clear active layer', brushSize:'Brush size', currentColor:'Current color', picker:'Color picker',
      sv:'Saturation and brightness', hue:'Hue', transparency:'Transparency', saveColor:'Save color', recent:'Recent', clearRecent:'Clear recent', saved:'Saved',
      canvas:'Pixel art canvas', fit:'Fit', layers:'Layers', addLayer:'Add layer', opacity:'Layer opacity', viewOptions:'View options', letterPattern:'Letter pattern',
      countRows:'Count rows', countColumns:'Count columns', grid:'Grid', usedPalette:'Used palette', crossColor:'Cross color', numberColor:'Number color', letters:'Letters',
      lettersHint:'Show a letter for each color.', rowsHint:'Number consecutive cells of the same color in each row.', columnsHint:'Number consecutive cells of the same color in each column.',
      clearMarks:'Clear crosses', cancel:'Cancel', accept:'OK', exportTitle:'Export image', filename:'File name', scale:'Scale (pixels per cell)', background:'White background',
      showPalette:'Include palette', showCounts:'Count each color', exportHint:'The reference photo is not exported. With letters, also download the .txt legend.',
      downloadPNG:'Download PNG', downloadLegend:'Download .txt legend', empty:'Empty', untitled:'Untitled', ready:'Ready · Wheel: zoom · Middle button: pan',
      selected:'selected', confirmNew:'Create a new drawing? This will replace the current project.', confirmOpen:'There are unsaved changes. Replace the current project?',
      confirmClear:'Clear all painted cells in the active layer?', confirmMarks:'Clear all crosses?', colorName:'Color name', layerName:'Layer name', unnamed:'Unnamed',
      brushPrompt:'Size in pixels (1–1000). The percentage is the square stroke width.', downloaded:'File ready to download', opened:'Project opened',
      error:'The operation could not be completed', invalidHex:'Invalid HEX. Use #RRGGBB or #AARRGGBB.', invalidProject:'Invalid project file',
      imageError:'Could not open reference image', maxLayers:'You can have up to 32 layers.', visibility:'Show / hide layer', remove:'Delete', reference:'Load or replace reference photo',
      rename:'Rename', copy:'Copy code', colorMenu:'Color options', undo:'Change undone', redo:'Change redone', nothingUndo:'Nothing to undo', nothingRedo:'Nothing to redo',
      undoAction:'Undo', redoAction:'Redo', undoTip:'Undo (Ctrl + Z)', redoTip:'Redo (Ctrl + Y / Ctrl + Shift + Z)',
      increaseSize:'Increase size by 1%', decreaseSize:'Decrease size by 1%',
      exportLarge:'Image too large. Reduce the scale (maximum 25 million pixels).', lettersLimit:'Letter patterns support up to 52 colors. Reduce the palette.',
      paletteLoaded:'Palette imported', copied:'Code copied', drawing:'drawing', palette:'palette', dragLayer:'Drag to reorder; double-click to rename',
      helpCommon:['New creates a document using the current size. Open and Save use .pixeljson, compatible with the desktop app.',
        'Save downloads the project to your device. Save as and Export open PNG options and the letter legend.',
        'Buttons ↶ / ↷ or Ctrl+Z: undo; Ctrl+Y or Ctrl+Shift+Z: redo. Ctrl+S: save. Text fields keep their own editing shortcuts.',
        'Mouse wheel: zoom. Middle button or Space + drag: pan. Fit centers the canvas. On touchscreens, choose a tool and drag to paint.',
        'Shape toggles square / circle. Squares use the shorter side; circles become ellipses when width and height differ. Hidden pixels are preserved.'],
      helpDraw:['Pencil, eraser, eyedropper and fill bucket. Right button erases. Bucket fills only the connected same-color region of the active layer.',
        'Pencil and eraser have independent sizes (1–1000). The arrows next to the percentage adjust by one; hold to repeat. Double-click the percentage or slider to enter the size.',
        'Arrow keys with the canvas focused: move the active layer by one pixel. Off-canvas pixels are kept and reappear when moved back.',
        'Layers: + adds; − deletes; the eye toggles visibility. Drag a name to reorder; double-click to rename. Background stays at the bottom.',
        'The Background + loads a tracing photo. With Background selected, drag to move it; wheel resizes it. Ctrl+wheel zooms the canvas. Eyedropper also samples the photo.',
        'HEX accepts #RRGGBB or #AARRGGBB. Transparency: left = transparent, right = opaque. Right-click a saved color to rename, copy or delete it. Import also accepts dropping a .pixeljson palette.'],
      helpPreview:['Clean view without the reference. Toggle letters, grid or row/column counts on the right.', 'The used palette shows colors, saved names and cell counts.'],
      helpWork:['Left-click or drag: add crosses. Right-click or drag: remove crosses.', 'Letters identify colors. Counts start at 1 for each consecutive run of the same color. Rows and columns are mutually exclusive.', 'Change the cross and number colors, or clear all marks. Marks are saved in the project.']
    }
  };
  let language = 'es';
  try { language = localStorage.getItem('pixelcraft-language') === 'en' ? 'en' : 'es'; } catch (_) { /* Private storage may be unavailable. */ }
  const t = key => texts[language][key] || key;
  let project = new C.Project(), history = new C.History(project), name = '', tab = 'draw', tool = 'pencil', current = '#FF8B5CF6';
  let brush = 1, eraser = 1, hsv = { h:258, s:.626, v:.965 }, frame = 0, cached = null, reference = null, referenceData = null;
  let pointer = null, space = false, draggedLayer = null, exportImage = null;
  const views = { draw:{ zoom:1, x:0, y:0, fitted:false }, preview:{ zoom:1, x:0, y:0, fitted:false }, work:{ zoom:1, x:0, y:0, fitted:false } };
  const canvas = $('canvas'), ctx = canvas.getContext('2d'), bitmap = document.createElement('canvas');
  function status(key) { $('status').textContent = t(key); }
  function updateLanguage() {
    document.documentElement.lang = language;
    document.querySelectorAll('[data-i18n]').forEach(e => e.textContent = t(e.dataset.i18n));
    document.querySelectorAll('[data-title]').forEach(e => e.title = t(e.dataset.title));
    document.querySelectorAll('[data-label]').forEach(e => e.setAttribute('aria-label', t(e.dataset.label)));
    $('language').textContent = language === 'es' ? 'EN' : 'ES';
    renderHelp(); refresh(); status('ready');
  }
  function renderHelp() {
    const ul = document.createElement('ul');
    [...texts[language]['help' + ({draw:'Draw', preview:'Preview', work:'Work'}[tab])], ...texts[language].helpCommon].forEach(text => {
      const li = document.createElement('li'); li.textContent = text; ul.append(li);
    });
    $('help-content').replaceChildren(ul);
  }
  function request(title, message, value) {
    if ($('prompt-dialog').open) return Promise.resolve(null);
    $('prompt-title').textContent = title; $('prompt-message').textContent = message;
    const input = $('prompt-input'); input.hidden = value === undefined; input.value = value ?? '';
    const dlg = $('prompt-dialog'); dlg.returnValue = 'cancel'; dlg.showModal();
    if (!input.hidden) { input.focus(); input.select(); }
    return new Promise(resolve => dlg.addEventListener('close', () => resolve(dlg.returnValue === 'ok' ? value === undefined ? true : input.value : null), { once:true }));
  }
  async function confirm(key) { endPointer(); return await request(t('new'), t(key)) === true; }
  function mutate(fn) {
    endPointer(); history.begin(project);
    try { fn(); } catch (e) { status('error'); }
    history.end(project); invalidate(); refresh();
  }
  function refresh() {
    cached = null;
    $('width').value = project.Width; $('height').value = project.Height;
    $('shape').textContent = project.Shape === 'Circle' ? project.Width === project.Height ? '○' : '⬭' : '□';
    $('doc-info').textContent = `${project.Width} × ${project.Height} · ${name || t('untitled')}${history.dirty(project) ? ' *' : ''}`;
    document.title = `${name || t('untitled')}${history.dirty(project) ? ' *' : ''} – Pixel&Craft`;
    $('tool-label').textContent = `${t(tool)} ${t('selected')}`;
    syncBrushSize();
    $('undo').disabled = !history.past.length;
    $('redo').disabled = !history.future.length;
    $('opacity').value = project.active.opacity * 100; $('opacity-value').textContent = Math.round(project.active.opacity * 100) + '%';
    renderLayers(); renderPalettes(); renderUsed(); schedule();
  }
  function invalidate() { cached = null; schedule(); }
  function schedule() { if (!frame) frame = requestAnimationFrame(() => { frame = 0; render(); }); }
  function makeCache() {
    const w = project.Width, h = project.Height, cells = project.cells(), mask = new Path2D(), outline = new Path2D();
    for (let y = 0; y < h; y++) {
      let first = -1, last = -1;
      for (let x = 0; x < w; x++) if (project.contains(x, y)) {
        if (first < 0) first = x; last = x;
        if (!project.contains(x - 1, y)) { outline.moveTo(x,y); outline.lineTo(x,y+1); }
        if (!project.contains(x + 1, y)) { outline.moveTo(x+1,y); outline.lineTo(x+1,y+1); }
        if (!project.contains(x, y - 1)) { outline.moveTo(x,y); outline.lineTo(x+1,y); }
        if (!project.contains(x, y + 1)) { outline.moveTo(x,y+1); outline.lineTo(x+1,y+1); }
      }
      if (first >= 0) mask.rect(first, y, last - first + 1, 1);
    }
    const used = new Map(); cells.forEach(c => { if (c !== C.CLEAR) used.set(c, (used.get(c) || 0) + 1); });
    cached = { cells, mask, outline, used, letters:C.letters(cells) };
    return cached;
  }
  function options(prefix) {
    return { letters:$(prefix+'-letters').checked, grid:prefix === 'work' || $(prefix+'-grid').checked,
      count:$(prefix+'-rows').checked ? 'row' : $(prefix+'-columns').checked ? 'column' : '' };
  }
  function render() {
    const rect = canvas.getBoundingClientRect(); if (!rect.width || !rect.height) return;
    const dpr = window.devicePixelRatio || 1, pw = Math.round(rect.width * dpr), ph = Math.round(rect.height * dpr);
    if (canvas.width !== pw || canvas.height !== ph) { canvas.width = pw; canvas.height = ph; }
    ctx.setTransform(dpr,0,0,dpr,0,0); ctx.clearRect(0,0,rect.width,rect.height);
    const v = views[tab]; if (!v.fitted) fit();
    const s = v.zoom, ox = rect.width / 2 - project.Width * s / 2 + v.x, oy = rect.height / 2 - project.Height * s / 2 + v.y;
    ctx.save(); ctx.translate(ox,oy); ctx.scale(s,s);
    const data = cached || makeCache(), opts = tab === 'draw' ? { grid:true, letters:false, count:'' } : options(tab);
    ctx.save(); ctx.clip(data.mask);
    if (tab !== 'preview') {
      ctx.fillStyle = '#343440'; ctx.fillRect(0,0,project.Width,project.Height); ctx.fillStyle = '#292934';
      for (let y=0;y<project.Height;y++) for(let x=0;x<project.Width;x++) if ((x+y)%2) ctx.fillRect(x,y,1,1);
    }
    if (tab === 'draw' && reference && project.ReferenceImage && project.Layers[0].visible) {
      const r = project.ReferenceImage; ctx.globalAlpha = project.Layers[0].opacity; ctx.drawImage(reference,r.x,r.y,r.width,r.height); ctx.globalAlpha = 1;
    }
    drawCells(ctx, data, opts, s);
    ctx.restore(); ctx.strokeStyle = '#c5c5d180'; ctx.lineWidth = 1/s; ctx.stroke(data.outline);
    ctx.restore(); $('zoom').textContent = Math.round(s / 16 * 100) + '%';
  }
  function drawCells(context, data, opts, scale, exporting = false) {
    const w = project.Width, h = project.Height;
    bitmap.width = w; bitmap.height = h;
    const bc = bitmap.getContext('2d'), image = bc.createImageData(w,h);
    data.cells.forEach((c,i) => {
      const [a,r,g,b] = C.rgba(c), j = i*4;
      const lighten = opts.letters && data.letters.has(c);
      image.data[j] = lighten ? r+(255-r)*.85 : r; image.data[j+1] = lighten ? g+(255-g)*.85 : g;
      image.data[j+2] = lighten ? b+(255-b)*.85 : b; image.data[j+3] = lighten ? 255 : a;
    });
    bc.putImageData(image,0,0); context.imageSmoothingEnabled = false; context.drawImage(bitmap,0,0,w,h);
    if (opts.grid && scale >= 4) {
      context.beginPath(); context.strokeStyle = exporting ? '#80808078' : '#c5c5d155'; context.lineWidth = 1/scale;
      for (let x=0;x<=w;x++) { context.moveTo(x,0); context.lineTo(x,h); }
      for (let y=0;y<=h;y++) { context.moveTo(0,y); context.lineTo(w,y); } context.stroke();
    }
    const run = C.counts(data.cells,w,h,opts.count);
    const xMin = exporting ? 0 : Math.max(0, Math.floor((project.Width/2)-(canvas.clientWidth/2+views[tab].x)/scale)-1);
    const xMax = exporting ? w : Math.min(w, Math.ceil(project.Width/2+(canvas.clientWidth/2-views[tab].x)/scale)+1);
    const yMin = exporting ? 0 : Math.max(0, Math.floor(project.Height/2-(canvas.clientHeight/2+views[tab].y)/scale)-1);
    const yMax = exporting ? h : Math.min(h, Math.ceil(project.Height/2+(canvas.clientHeight/2-views[tab].y)/scale)+1);
    context.textAlign='center'; context.textBaseline='middle';
    for (let y=yMin;y<yMax;y++) for(let x=xMin;x<xMax;x++) {
      const idx=y*w+x, c=data.cells[idx];
      if (opts.letters && scale >= 6 && data.letters.has(c)) { context.fillStyle='#111'; context.font='bold .65px Segoe UI'; context.fillText(data.letters.get(c),x+.5,y+.52,.9); }
      if (run[idx] && scale >= 8) { context.fillStyle = exporting ? '#555555' : $('number-color').value; context.font='bold .55px Segoe UI'; context.fillText(run[idx],x+.5,y+.52,.9); }
    }
    if (tab === 'work' && !exporting) {
      context.strokeStyle=$('cross-color').value; context.lineWidth=Math.max(1.5/scale,.07); context.beginPath();
      project.Marks.forEach(([x,y]) => { if (!project.contains(x,y)) return; context.moveTo(x+.18,y+.18);context.lineTo(x+.82,y+.82);context.moveTo(x+.82,y+.18);context.lineTo(x+.18,y+.82); });context.stroke();
    }
  }
  function fit() {
    const v=views[tab]; v.zoom = Math.max(.5, Math.min(32,(canvas.clientWidth-60)/project.Width,(canvas.clientHeight-60)/project.Height)); v.x=0;v.y=0;v.fitted=true;schedule();
  }
  function point(event) {
    const r=canvas.getBoundingClientRect(),v=views[tab];
    return { x:(event.clientX-r.left-r.width/2-v.x)/v.zoom+project.Width/2, y:(event.clientY-r.top-r.height/2-v.y)/v.zoom+project.Height/2 };
  }
  function pick(x,y) {
    let c = project.get(Math.floor(x),Math.floor(y));
    if (c === C.CLEAR && reference && project.ReferenceImage && project.Layers[0].visible && project.Layers[0].opacity > 0) {
      const r=project.ReferenceImage, px=Math.floor((x-r.x)/r.width*reference.width),py=Math.floor((y-r.y)/r.height*reference.height);
      if (px>=0 && py>=0 && px<reference.width && py<reference.height) {
        const a = reference.sample.getContext('2d').getImageData(px,py,1,1).data; c=C.hex([a[3],a[0],a[1],a[2]]);
      }
    }
    setColor(c === C.CLEAR ? '#FF000000' : c);
  }
  function paint(event, first=false) {
    const p=point(event),x=Math.floor(p.x),y=Math.floor(p.y);
    if (!project.contains(x,y)) { if(pointer) pointer.last=null; return; }
    if (tab==='draw' && tool==='eyedropper' && pointer.button!==2) { pick(p.x,p.y);return; }
    if (tab==='preview') return;
    const prev=pointer.last||[x,y];
    if(tab==='work') {
      // Rasterize drag movement so fast drags do not skip crosses.
      const steps=Math.max(Math.abs(x-prev[0]),Math.abs(y-prev[1]),1);
      for(let i=0;i<=steps;i++) project.mark(Math.round(prev[0]+(x-prev[0])*i/steps),Math.round(prev[1]+(y-prev[1])*i/steps),pointer.button===2);
    } else if(tool==='bucket' && pointer.button!==2) { if(first) { project.fill(x,y,current);project.touch(current); } }
    else { const erase=pointer.button===2||tool==='eraser';project.stroke(...prev,x,y,erase?eraser:brush,erase?C.CLEAR:current); if(!erase)project.touch(current); }
    pointer.last=[x,y];invalidate();
  }
  canvas.addEventListener('contextmenu',e=>e.preventDefault());
  canvas.addEventListener('pointerdown',e=>{
    if(pointer || ![0,1,2].includes(e.button))return;
    e.preventDefault();canvas.focus();canvas.setPointerCapture(e.pointerId);
    const p=point(e);let mode='paint';
    if(e.button===1||space)mode='pan';
    else if(tab==='draw'&&e.button===0&&tool!=='eyedropper'&&tool!=='bucket'&&project.ActiveLayer===0&&project.ReferenceImage&&project.contains(Math.floor(p.x),Math.floor(p.y)))mode='reference';
    pointer={ id:e.pointerId,button:e.button,mode,cx:e.clientX,cy:e.clientY,x:p.x,y:p.y,last:null };
    if(mode==='pan')return;
    history.begin(project);if(mode==='paint')paint(e,true);
  });
  canvas.addEventListener('pointermove',e=>{
    if(!pointer||pointer.id!==e.pointerId)return;
    if(pointer.mode==='pan') {views[tab].x+=e.clientX-pointer.cx;views[tab].y+=e.clientY-pointer.cy;pointer.cx=e.clientX;pointer.cy=e.clientY;schedule();}
    else if(pointer.mode==='reference') {
      const p=point(e),r=project.ReferenceImage;r.x+=p.x-pointer.x;r.y+=p.y-pointer.y;pointer.x=p.x;pointer.y=p.y;invalidate();
    } else paint(e);
  });
  function endPointer() {
    if(!pointer)return;const id=pointer.id;pointer=null;
    if(canvas.hasPointerCapture(id))canvas.releasePointerCapture(id);
    history.end(project);refresh();
  }
  ['pointerup','pointercancel','lostpointercapture'].forEach(event=>canvas.addEventListener(event,endPointer));
  window.addEventListener('blur',()=>{space=false;endPointer();});
  canvas.addEventListener('wheel',e=>{
    e.preventDefault();endPointer();const p=point(e),factor=e.deltaY<0?1.12:1/1.12;
    if(tab==='draw'&&project.ActiveLayer===0&&project.ReferenceImage&&!e.ctrlKey&&!['eyedropper','bucket'].includes(tool)) {
      mutate(()=>{const r=project.ReferenceImage,size=Math.max(r.width,r.height),f=C.clamp(size*factor,.25,Math.max(project.Width,project.Height)*64)/size;
        r.x=p.x+(r.x-p.x)*f;r.y=p.y+(r.y-p.y)*f;r.width*=f;r.height*=f;});
    } else {
      const v=views[tab],z=C.clamp(v.zoom*factor,.25,160),f=z/v.zoom,rect=canvas.getBoundingClientRect();
      const cx=e.clientX-rect.left-rect.width/2,cy=e.clientY-rect.top-rect.height/2;v.x=cx+(v.x-cx)*f;v.y=cy+(v.y-cy)*f;v.zoom=z;schedule();
    }
  },{passive:false});
  new ResizeObserver(()=>schedule()).observe($('canvas-stage'));
  function setTab(next) {
    endPointer();tab=next;$('workspace').className='workspace '+tab;$('workspace').setAttribute('aria-labelledby','tab-'+tab);
    $('draw-sidebar').hidden=tab!=='draw';$('layers-dock').hidden=tab!=='draw';$('preview-sidebar').hidden=tab!=='preview';$('work-sidebar').hidden=tab!=='work';
    document.querySelectorAll('[data-tab]').forEach(b=>{const selected=b.dataset.tab===tab;b.setAttribute('aria-selected',selected);b.tabIndex=selected?0:-1;});
    renderHelp();renderUsed();schedule();
  }
  document.querySelectorAll('[data-tab]').forEach(b=>{
    b.addEventListener('click',()=>setTab(b.dataset.tab));
    b.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();const tabs=['draw','preview','work'];setTab(tabs[(tabs.indexOf(tab)+(e.key==='ArrowRight'?1:2))%3]);$('tab-'+tab).focus();});
  });
  $('fit').onclick=fit;
  document.querySelectorAll('[data-tool]').forEach(b=>b.onclick=()=>{
    endPointer();tool=b.dataset.tool;document.querySelectorAll('[data-tool]').forEach(bt=>bt.classList.toggle('selected',bt===b));refresh();
  });
  function syncBrushSize() {
    const enabled=['pencil','eraser'].includes(tool),size=tool==='eraser'?eraser:brush;
    $('brush-size').disabled=!enabled;$('brush-value').disabled=!enabled;
    $('brush-size').value=size;$('brush-value').textContent=size+'%';
    $('brush-up').disabled=!enabled||size>=1000;$('brush-down').disabled=!enabled||size<=1;
  }
  function setBrushSize(value) {
    if(!['pencil','eraser'].includes(tool))return;
    const size=C.clamp(Math.round(value),1,1000);if(tool==='eraser')eraser=size;else brush=size;syncBrushSize();
  }
  $('brush-size').oninput=()=>setBrushSize(+$('brush-size').value);
  let brushRepeat=null,brushDelay=null;
  function stopBrushRepeat() {clearTimeout(brushDelay);clearInterval(brushRepeat);brushDelay=brushRepeat=null;}
  for(const [id,delta] of [['brush-up',1],['brush-down',-1]]) {
    const button=$(id),step=()=>{if(!button.disabled)setBrushSize((tool==='eraser'?eraser:brush)+delta);};
    button.onclick=e=>{if(e.detail===0)step();};
    button.onpointerdown=e=>{if(e.button!==0||button.disabled)return;e.preventDefault();stopBrushRepeat();button.setPointerCapture(e.pointerId);step();brushDelay=setTimeout(()=>brushRepeat=setInterval(step,100),400);};
    for(const event of ['pointerup','pointercancel','lostpointercapture'])button.addEventListener(event,stopBrushRepeat);
  }
  window.addEventListener('blur',stopBrushRepeat);
  async function editBrush() {if($('brush-size').disabled)return;const v=await request(t('brushSize'),t('brushPrompt'),String(tool==='eraser'?eraser:brush));if(v!==null&&Number.isFinite(+v)) {const n=C.clamp(Math.round(+v),1,1000);if(tool==='eraser')eraser=n;else brush=n;refresh();}}
  $('brush-value').ondblclick=editBrush;$('brush-size').ondblclick=editBrush;$('brush-value').onclick=e=>{if(e.detail===0)editBrush();};
  function hsvRGB(h,s,v) {
    const f=n=>{const k=(n+h/60)%6;return Math.round(255*v*(1-s*Math.max(0,Math.min(k,4-k,1))));};return [f(5),f(3),f(1)];
  }
  function setColor(c, sync=true) {
    current=C.color(c);const [a,r,g,b]=C.rgba(current);
    if(sync) {const max=Math.max(r,g,b),min=Math.min(r,g,b),d=max-min;let h=hsv.h;
      if(d)h=(max===r?(g-b)/d+(g<b?6:0):max===g?(b-r)/d+2:(r-g)/d+4)*60;
      hsv={h,s:max?d/max:0,v:max/255};$('hue').value=h;}
    $('sv-picker').style.setProperty('--hue',hsv.h);$('sv-dot').style.left=hsv.s*100+'%';$('sv-dot').style.top=(1-hsv.v)*100+'%';
    $('sv-picker').setAttribute('aria-valuetext',`${Math.round(hsv.s*100)}%, ${Math.round(hsv.v*100)}%`);
    $('sv-picker').setAttribute('aria-valuemin','0');$('sv-picker').setAttribute('aria-valuemax','100');$('sv-picker').setAttribute('aria-valuenow',Math.round(hsv.s*100));
    $('alpha').value=Math.round(a/255*100);$('hex').value=current;$('hex').setAttribute('aria-invalid','false');$('current-hex').textContent=current;
    $('current-rgb').textContent=`R ${r}  G ${g}  B ${b}  T ${Math.round((1-a/255)*100)}%`;$('current-swatch').style.background=C.css(current);
  }
  function colorFromHSV() { setColor(C.hex([+$('alpha').value/100*255,...hsvRGB(hsv.h,hsv.s,hsv.v)]),false); }
  $('hue').oninput=()=>{hsv.h=+$('hue').value;colorFromHSV();};$('alpha').oninput=colorFromHSV;
  function applyHex() {try{setColor($('hex').value);}catch(e){$('hex').setAttribute('aria-invalid','true');status('invalidHex');}}
  $('hex').onchange=applyHex;$('hex').onkeydown=e=>{if(e.key==='Enter')applyHex();};
  let pickerPointer=null;
  function movePicker(e){const r=$('sv-picker').getBoundingClientRect();hsv.s=C.clamp((e.clientX-r.left)/r.width,0,1);hsv.v=1-C.clamp((e.clientY-r.top)/r.height,0,1);colorFromHSV();}
  $('sv-picker').onpointerdown=e=>{if(e.button!==0)return;e.preventDefault();pickerPointer=e.pointerId;$('sv-picker').setPointerCapture(e.pointerId);movePicker(e);};
  $('sv-picker').onpointermove=e=>{if(pickerPointer===e.pointerId)movePicker(e);};
  $('sv-picker').onlostpointercapture=()=>pickerPointer=null;
  $('sv-picker').onkeydown=e=>{if(!e.key.startsWith('Arrow'))return;e.preventDefault();if(e.key==='ArrowLeft')hsv.s-=.01;if(e.key==='ArrowRight')hsv.s+=.01;if(e.key==='ArrowUp')hsv.v+=.01;if(e.key==='ArrowDown')hsv.v-=.01;hsv.s=C.clamp(hsv.s,0,1);hsv.v=C.clamp(hsv.v,0,1);colorFromHSV();};
  function renderPalettes() {
    $('recent').replaceChildren(...project.Recent.map(c=>swatch(c)));
    $('saved').replaceChildren(...project.Saved.map(s=>{const b=swatch(s.hex,s.name);b.oncontextmenu=e=>{e.preventDefault();colorMenu(s);};return b;}));
  }
  function swatch(c,name='') {const b=document.createElement('button');b.style.setProperty('--color',C.css(c));b.title=(name?name+' · ':'')+c;b.setAttribute('aria-label',b.title);b.onclick=()=>setColor(c);return b;}
  async function colorMenu(s) {
    const dlg=$('prompt-dialog');if(dlg.open)return;
    $('prompt-title').textContent=t('colorMenu');$('prompt-message').textContent=`${s.name} · ${s.hex}`;$('prompt-input').hidden=true;
    const form=dlg.querySelector('form'),menu=document.createElement('div');menu.className='palette-actions';
    for(const action of ['rename','copy','remove']) {const b=document.createElement('button');b.value=action;b.textContent=t(action);menu.append(b);}
    form.insertBefore(menu,form.querySelector('.dialog-actions'));dlg.returnValue='cancel';dlg.showModal();
    const result=await new Promise(resolve=>dlg.addEventListener('close',()=>resolve(dlg.returnValue),{once:true}));menu.remove();
    if(result==='remove')mutate(()=>{project.Saved=project.Saved.filter(c=>c.hex!==s.hex);});
    if(result==='rename') {const n=await request(t('colorName'),s.hex,s.name);if(n!==null)mutate(()=>s.name=n.trim()||t('unnamed'));}
    if(result==='copy') {try{await navigator.clipboard.writeText(s.hex);status('copied');}catch(e){await request(t('copy'),s.hex,s.hex);}}
  }
  $('save-color').onclick=async()=>{
    if(current===C.CLEAR)return;const exists=project.Saved.find(s=>s.hex===current),n=await request(t('colorName'),current,exists?.name||'');
    if(n!==null)mutate(()=>{if(exists)exists.name=n.trim()||t('unnamed');else project.Saved.push({name:n.trim()||t('unnamed'),hex:current});});
  };
  $('clear-recent').onclick=()=>mutate(()=>project.Recent=[]);
  function layerName(l) {return l.defaultNameNumber===0?(language==='en'?'Background':'Fondo'):l.defaultNameNumber>0?(language==='en'?'Layer ':'Capa ')+l.defaultNameNumber:l.name;}
  function renderLayers() {
    const list=$('layer-list');list.replaceChildren();
    for(let i=project.Layers.length-1;i>=0;i--) {
      const l=project.Layers[i],row=document.createElement('div');row.className='layer-row'+(i===project.ActiveLayer?' active':'')+(!l.visible?' invisible':'');
      const n=document.createElement('button');n.className='layer-name';n.textContent=layerName(l);n.title=t('dragLayer');n.draggable=i>0;
      n.onclick=()=>{endPointer();project.ActiveLayer=i;refresh();};
      n.ondblclick=async()=>{const value=await request(t('layerName'),'',layerName(l));if(value!==null&&value.trim())mutate(()=>{l.name=value.trim();l.defaultNameNumber=null;});};
      n.ondragstart=e=>{endPointer();draggedLayer=i;e.dataTransfer.setData('text/plain',String(i));e.dataTransfer.effectAllowed='move';};
      n.ondragend=()=>{draggedLayer=null;list.querySelectorAll('.drop').forEach(r=>r.classList.remove('drop'));};
      row.ondragover=e=>{if(draggedLayer===null||i===0)return;e.preventDefault();list.querySelectorAll('.drop').forEach(r=>r.classList.remove('drop'));row.classList.add('drop');const r=list.getBoundingClientRect();if(e.clientY<r.top+25)list.scrollTop-=8;if(e.clientY>r.bottom-25)list.scrollTop+=8;};
      row.ondrop=e=>{if(draggedLayer===null||i===0)return;e.preventDefault();const from=draggedLayer;draggedLayer=null;mutate(()=>project.reorder(from,i));};
      const eye=document.createElement('button');eye.className='small';eye.textContent=l.visible?'◉':'○';eye.title=t('visibility');eye.setAttribute('aria-label',`${t('visibility')}: ${layerName(l)}`);eye.onclick=()=>mutate(()=>l.visible=!l.visible);
      const action=document.createElement('button');action.className='small';action.textContent=i===0?'+':'−';action.title=t(i===0?'reference':'remove');action.setAttribute('aria-label',action.title+': '+layerName(l));
      action.onclick=()=>{if(i===0)$('reference-file').click();else mutate(()=>project.removeLayer(i));};
      row.append(n,eye,action);list.append(row);
    }
    $('add-layer').disabled=project.Layers.length>=32;
  }
  $('add-layer').onclick=()=>mutate(()=>project.addLayer());
  $('layers-toggle').onclick=()=>{const hide=!$('layers-modules').hidden;$('layers-modules').hidden=hide;$('layers-toggle').textContent=hide?'⌃':'⌄';$('layers-toggle').setAttribute('aria-expanded',!hide);};
  $('opacity').onpointerdown=()=>{endPointer();history.begin(project);};
  $('opacity').oninput=()=>{history.begin(project);project.active.opacity=+$('opacity').value/100;$('opacity-value').textContent=$('opacity').value+'%';invalidate();};
  $('opacity').onchange=()=>{history.end(project);refresh();};
  $('opacity').onlostpointercapture=()=>{history.end(project);refresh();};
  function renderUsed() {
    const data=cached||makeCache(),entries=[];
    data.used.forEach((count,c)=>{
      const row=document.createElement('div');row.className='used-color';const sw=document.createElement('span');sw.className='swatch';sw.style.background=C.css(c);
      const info=document.createElement('div');info.className='name';const n=document.createElement('div');n.textContent=project.Saved.find(s=>s.hex===c)?.name||'';
      const hex=document.createElement('code');hex.textContent=c;info.append(n,hex);const qty=document.createElement('small');qty.textContent='×'+count;row.append(sw,info,qty);entries.push(row);
    });
    if(!entries.length) {const p=document.createElement('p');p.className='muted';p.textContent=t('empty');entries.push(p);}$('used-palette').replaceChildren(...entries);
  }
  ['preview','work','export'].forEach(prefix=>{
    ['letters','rows','columns',...(prefix==='work'?[]:['grid'])].forEach(key=>$(prefix+'-'+key).onchange=()=>{
      if(['rows','columns'].includes(key)&&$(prefix+'-'+key).checked)$(prefix+'-'+(key==='rows'?'columns':'rows')).checked=false;
      if(prefix==='export')renderExport();else schedule();
    });
  });
  $('cross-color').oninput=schedule;$('number-color').oninput=schedule;
  $('clear-marks').onclick=async()=>{if(await confirm('confirmMarks'))mutate(()=>project.Marks=[]);};
  $('clear-layer').onclick=async()=>{if(await confirm('confirmClear'))mutate(()=>{for(let y=0;y<project.Height;y++)for(let x=0;x<project.Width;x++)project.set(x,y,C.CLEAR);});};
  $('width').onchange=$('height').onchange=()=>{
    const w=C.clamp(Math.round(+$('width').value||1),1,256),h=C.clamp(Math.round(+$('height').value||1),1,256);mutate(()=>project.resize(w,h));
  };
  $('shape').onclick=()=>mutate(()=>project.Shape=project.Shape==='Square'?'Circle':'Square');
  async function decodeReference(r) {
    if(!r)return null;
    const img=new Image();img.src='data:image/png;base64,'+r.data;await img.decode();
    const sample=document.createElement('canvas');sample.width=img.naturalWidth;sample.height=img.naturalHeight;sample.getContext('2d',{willReadFrequently:true}).drawImage(img,0,0);img.sample=sample;return img;
  }
  async function syncReference() {
    const data=project.ReferenceImage?.data||null;
    if(data===referenceData)return;
    referenceData=data;reference=null;
    try {const img=await decodeReference(project.ReferenceImage);if(referenceData===data){reference=img;schedule();}}catch(e){status('imageError');}
  }
  $('reference-file').onchange=async e=>{
    const f=e.target.files[0];e.target.value='';if(!f)return;
    try {
      const url=URL.createObjectURL(f),img=new Image();
      try{img.src=url;await img.decode();}finally{URL.revokeObjectURL(url);}
      // Normalize browser-supported formats to PNG, readable by the desktop application.
      const source=document.createElement('canvas');source.width=img.naturalWidth;source.height=img.naturalHeight;source.getContext('2d').drawImage(img,0,0);
      const data=source.toDataURL('image/png').split(',')[1],fit=Math.min(project.Width/img.naturalWidth,project.Height/img.naturalHeight);
      const width=img.naturalWidth*fit,height=img.naturalHeight*fit;
      mutate(()=>project.ReferenceImage={data,x:(project.Width-width)/2,y:(project.Height-height)/2,width,height});await syncReference();
    }catch(e){status('imageError');}
  };
  function download(blob, filename) {const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=filename;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);status('downloaded');}
  function baseName(v) {return String(v).replace(/[<>:"/\\|?*\x00-\x1F]/g,'_').replace(/\.(pixeljson|png|txt|json)$/i,'').trim()||t('drawing');}
  function save() {endPointer();name=baseName(name||t('drawing'));download(new Blob([JSON.stringify(JSON.parse(project.serialize()),null,2)],{type:'application/json'}),name+'.pixeljson');history.saved=project.serialize();refresh();}
  $('save').onclick=save;
  $('new').onclick=async()=>{
    if(!await confirm('confirmNew'))return;project=new C.Project(project.Width,project.Height);history.reset(project);history.saved='';name='';
    reference=null;referenceData=null;Object.values(views).forEach(v=>v.fitted=false);refresh();status('ready');
  };
  $('open').onclick=()=>{endPointer();$('project-file').click();};
  $('project-file').onchange=async e=>{
    const f=e.target.files[0];e.target.value='';if(!f)return;
    try {const next=C.Project.load(await f.text()),img=await decodeReference(next.ReferenceImage);
      if(history.dirty(project)&&!await confirm('confirmOpen'))return;
      endPointer();project=next;name=baseName(f.name);history.reset(project);reference=img;referenceData=next.ReferenceImage?.data||null;
      Object.values(views).forEach(v=>v.fitted=false);refresh();status('opened');
    }catch(e){status('invalidProject');await request(t('error'),t('invalidProject'));}
  };
  $('export-palette').onclick=()=>download(new Blob([JSON.stringify({Width:1,Height:1,Cells:[],Recent:[],Saved:project.Saved,Marks:[]},null,2)],{type:'application/json'}),t('palette')+'.pixeljson');
  $('import-palette').onclick=()=>$('palette-file').click();
  async function importPalette(f) {
    try {const incoming=C.palette(JSON.parse(await f.text()));mutate(()=>incoming.forEach(s=>{if(!project.Saved.some(c=>c.hex===s.hex))project.Saved.push(s);}));status('paletteLoaded');}catch(e){status('invalidProject');}
  }
  $('palette-file').onchange=e=>{const f=e.target.files[0];e.target.value='';if(f)importPalette(f);};
  $('import-palette').ondragover=e=>{e.preventDefault();e.dataTransfer.dropEffect='copy';};$('import-palette').ondrop=e=>{e.preventDefault();const f=e.dataTransfer.files[0];if(f)importPalette(f);};
  function openExport() {endPointer();$('export-name').value=name||t('drawing');$('export-dialog').showModal();renderExport();}
  $('save-as').onclick=$('export').onclick=openExport;$('export-close').onclick=()=>$('export-dialog').close();
  ['scale','background','palette-option','counts'].forEach(key=>{$('export-'+key).oninput=renderExport;});
  function renderExport() {
    const out=$('export-canvas'),s=C.clamp(Math.round(+$('export-scale').value||1),1,128),opts=options('export'),data=cached||makeCache();
    const palette=$('export-palette-option').checked,counts=$('export-counts').checked,bg=$('export-background').checked;
    const w=project.Width*s,h=project.Height*s,band=palette||counts;
    const font=Math.max(10,s*.375),sw=Math.max(10,s*.5),measure=out.getContext('2d');measure.font=`${font}px Segoe UI`;
    const entries=[...data.used].map(([c,n])=>({c,n,name:project.Saved.find(a=>a.hex===c)?.name||''}));
    function caption(e) {return [palette?'#'+e.c.slice(3):'',e.name,counts?'×'+e.n:''].filter(Boolean).join(' · ');}
    const itemWidth=Math.min(Math.max(1,w),Math.max(80,...entries.map(e=>sw+measure.measureText(caption(e)).width+20)));
    const cols=Math.max(1,Math.floor(w/itemWidth)),rowH=sw+12,bandH=band?Math.ceil(entries.length/cols)*rowH+20:0;
    const totalW=w,totalH=h+bandH;
    exportImage=null;$('export-download').disabled=true;$('export-legend').hidden=!opts.letters;
    if(totalW*totalH>25000000){$('export-info').textContent=t('exportLarge');out.width=1;out.height=1;return;}
    if(opts.letters&&data.used.size>52){$('export-info').textContent=t('lettersLimit');out.width=1;out.height=1;return;}
    out.width=totalW;out.height=totalH;const c=out.getContext('2d');c.save();c.scale(s,s);c.clip(data.mask);
    if(bg){c.fillStyle='#fff';c.fillRect(0,0,project.Width,project.Height);}drawCells(c,data,opts,s,true);c.restore();
    if(band){if(bg){c.fillStyle='#fff';c.fillRect(0,h,w,bandH);}c.strokeStyle='#80808078';c.beginPath();c.moveTo(0,h+5);c.lineTo(w,h+5);c.stroke();
      c.font=`${font}px Segoe UI`;c.textBaseline='middle';entries.forEach((e,i)=>{const x=(i%cols)*itemWidth,y=h+16+Math.floor(i/cols)*rowH;c.fillStyle=C.css(e.c);c.fillRect(x,y,sw,sw);c.fillStyle='#555';c.fillText(caption(e),x+sw+4,y+sw/2,Math.max(1,itemWidth-sw-8));});}
    exportImage=out;$('export-download').disabled=false;$('export-info').textContent=`${totalW} × ${totalH} px`;
  }
  $('export-download').onclick=()=>{if(exportImage)exportImage.toBlob(blob=>{if(blob)download(blob,baseName($('export-name').value)+'.png');else status('error');},'image/png');};
  $('export-legend').onclick=()=>{
    const data=cached||makeCache();if(data.used.size>52){status('lettersLimit');return;}
    const lines=[`Pixel Art - Letter Map (${project.Width}x${project.Height})`,`Image: ${baseName($('export-name').value)}.png`,'','Legend:'];
    data.letters.forEach((letter,c)=>lines.push(`  ${letter} = #${c.slice(3)}`));lines.push('','Matrix:');
    for(let y=0;y<project.Height;y++)lines.push(data.cells.slice(y*project.Width,(y+1)*project.Width).map(c=>data.letters.get(c)||'.').join(' '));
    download(new Blob([lines.join('\r\n')],{type:'text/plain;charset=utf-8'}),baseName($('export-name').value)+'.txt');
  };
  function undo(redo=false) {
    endPointer();const available=redo?history.future.length:history.past.length;project=redo?history.redo(project):history.undo(project);syncReference();refresh();status(available?redo?'redo':'undo':redo?'nothingRedo':'nothingUndo');
  }
  $('undo').onclick=()=>undo(false);$('redo').onclick=()=>undo(true);
  window.addEventListener('keydown',e=>{
    const editable=e.target.matches('input,textarea,[contenteditable=true]');
    if(e.key==='Escape'){space=false;$('help').hidden=true;$('help-button').setAttribute('aria-expanded','false');draggedLayer=null;return;}
    if(e.key===' '&&!editable&&e.target===canvas){e.preventDefault();space=true;}
    if($('prompt-dialog').open||$('export-dialog').open)return;
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='s'){e.preventDefault();save();return;}
    if(editable)return;
    if((e.ctrlKey||e.metaKey)&&['z','y'].includes(e.key.toLowerCase())){e.preventDefault();undo(e.key.toLowerCase()==='y'||e.shiftKey);return;}
    if(e.target===canvas&&tab==='draw'&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&e.key.startsWith('Arrow')) {
      const delta={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[e.key];if(delta){e.preventDefault();mutate(()=>project.move(...delta));}
    }
  });
  window.addEventListener('keyup',e=>{if(e.key===' ')space=false;});
  window.addEventListener('beforeunload',e=>{if(history.dirty(project)){e.preventDefault();e.returnValue='';}});
  $('language').onclick=()=>{language=language==='es'?'en':'es';try{localStorage.setItem('pixelcraft-language',language);}catch(e){}updateLanguage();};
  $('help-button').onclick=()=>{$('help').hidden=!$('help').hidden;$('help-button').setAttribute('aria-expanded',!$('help').hidden);};
  $('help-button').onmouseenter=()=>{$('help').hidden=false;$('help-button').setAttribute('aria-expanded','true');};
  // Expose only the model for diagnostics; UI interactions remain event-driven.
  window.PixelCraft={get project(){return project;},get history(){return history;}};
  setColor(current);updateLanguage();setTab('draw');
})();
