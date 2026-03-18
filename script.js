let images = [];
let currentIndex = 0;

function openModal(title, desc, imgs) {
  images = imgs;
  currentIndex = 0;

  document.getElementById("modal-title").innerText = title;
  document.getElementById("modal-desc").innerText = desc;
  document.getElementById("modal-img").src = images[0];

  document.getElementById("modal").style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

const prevBtn = document.getElementById("prevBtn");
if (prevBtn) {
  prevBtn.onclick = function () {
    if (currentIndex > 0) {
      currentIndex--;
      document.getElementById("modal-img").src = images[currentIndex];
    }
  };
}

const nextBtn = document.getElementById("nextBtn");
if (nextBtn) {
  nextBtn.onclick = function () {
    if (currentIndex < images.length - 1) {
      currentIndex++;
      document.getElementById("modal-img").src = images[currentIndex];
    }
  };
}

let productImages = [];
let currentProductImgIndex = 0;

async function openProduct(id) {
  const productId = id.toLowerCase();
  currentProductImgIndex = 0;
  productImages = [];

  document.querySelectorAll(".module").forEach(m => m.style.display = "none");
  document.getElementById("product-view").style.display = "block";
  document.getElementById("backArrow").style.display = "block";

  // Definir datos específicos si existen, sino usar genéricos
  const productData = {
    "producto1": { title: "Funda para Pendrive con Forma de Patita de Gato", desc: "Una funda con medida personalizada para transformar cualquier pendrive/ usb en una bonita pata de gato.", link: "https://cults3d.com/es/modelo-3d/artilugios/funda-pendrive-usb-pata-de-gato" },
    "producto2": { title: "Marcapáginas con Forma de Gatos", desc: "Unos bonitos marcapáginas para tus libros con forma de diferentes gatitos, incluye una pequeña caja de almacenaje.", link: "https://cults3d.com/es/modelo-3d/variado/pack-marcapaginas-de-gatos" },
    "producto3": { title: "Fidget \"Ouchie\", Juguete Sensorial", desc: "Un juguete sensorial con textura para aliviar el estrés.", link: "https://cults3d.com/es/modelo-3d/juegos/fidget-ouchie-juguete-sensorial" },
    "producto4": { title: "Lapicero Ovni", desc: "Un lapicero con forma de platillo volante, perfecto para tener tus boligrafos en la mesa.", link: "https://cults3d.com/es/modelo-3d/casa/lapicero-ovni" },
    "producto5": { title: "Cajones Modulares Apilables", desc: "Unos cajones modulares apilables, tiene diferentes módulos con diferentes tamaños de cajones, puedes usar y apilar tantos como quieras.", link: "https://cults3d.com/es/modelo-3d/casa/cajones-modulares-apilables" },
    "producto6": { title: "Sujetalibro Portal de Tentáculos", desc: "Un soporte para el libro que quieras con temática de portal con tentáculos.", link: "https://cults3d.com/es/modelo-3d/casa/soporte-libro-eamesse" },
    "producto7": { title: "Hacha con Estética Cute", desc: "Un hacha con estética cute \"magical girl\", perfecta para cosplay, sesiones de fotos o decoración.", link: "https://cults3d.com/es/modelo-3d/moda/hacha-cute-eamesse" },
    "producto8": { title: "Porta-anillos con Forma de Helado Derretido", desc: "Guarda tus anillos en este portanillos con forma de helado derretido.", link: "https://cults3d.com/es/modelo-3d/joyas/helado-soporte-para-anillos-eamesse" },
    "producto9": { title: "Cinturón de Estrellitas", desc: "Un cinturón con estrellitas.", link: "https://cults3d.com/es/modelo-3d/moda/cinturon-de-estrellas" },
    "producto10": { title: "Posavasos con Forma de Tela de Araña", desc: "Unos posavasos con forma de tela de araña.", link: "https://cults3d.com/es/modelo-3d/variado/posavasos-tela-de-arana-eamesse" },
    "producto11": { title: "Soporte para Incienso con Forma de Bol de Cereales", desc: "Es un pequeño soporte para incienso.", link: "" },
    "producto12": { title: "Suculenta con Almacenaje", desc: "Es una pequeña planta decorativa, la parte de la planta y la tierra se pueden quitar y permite guardar cosas dentro de la maceta.", link: "https://cults3d.com/es/modelo-3d/casa/planta-artificial-mini-suculenta-con-almacenaje" },
    "producto13": { title: "Seta Porta Pinceles y Lápices", desc: "Es una pequeña casita seta en la que puedes dejar tus pinceles pientras pintas o usar como lapicero.", link: "https://cults3d.com/es/modelo-3d/arte/seta-porta-pinceles-y-lapices" },
    "producto14": { title: "Soporte para Móvil con Forma de Tentáculo", desc: "Es un soporte con forma de tentáculo para el teléfono móvil.", link: "https://cults3d.com/es/modelo-3d/artilugios/soporte-tentaculo-para-movil" },
    "producto15": { title: "Marcapáginas con Regla para Post-it", desc: "Es un punto de libro con con regla para colocar tus postits / posits ordenados y a la misma distancia. también te permite almacenarlos.", link: "https://cults3d.com/es/modelo-3d/variado/marcapaginas-con-regla-para-post-it" },
    "producto16": { title: "Fidget Clicker \"i love you\"", desc: "Es un fidget clicker con tres teclas en las que pone \"i ♥ u\". Es compatible con switches cherry o similares (con la misma cruz), también se puede usar con switches con pines sin romperlos doblarlos ni quitarlos, por si en algún momento los necesitas para algo.", link: "https://cults3d.com/es/modelo-3d/juegos/fidget-clicker-i-love-you" },
    "producto17": { title: "Juguete para Gato: Lagartija", desc: "Es una pequeña lagartija que puedes poner en la pared para que tus gatos se entretengan. Se puede escalar al tamaño que quieras.", link: "https://cults3d.com/es/modelo-3d/juegos/juguete-para-gato-lagartija-eamesse" },
    "producto18": { title: "Estación de Lubricado de Switches de Teclado Mecánico", desc: "Estación de lubricado de switches (lube station) de teclado mecánico. Hay dos versiones, una pequeña para un solo switch y una grande. Tiene para abrir los switches, para ponerlos y otras zonas en las que poner el lubricante y los accesorios.\nEnlaces: Grande: https://cults3d.com/... Pequeña: https://cults3d.com/...", link: "https://cults3d.com/es/modelo-3d/herramientas/estacion-de-lubricado-de-switches-de-teclado-mecanico" },
    "producto19": { title: "Sujetalibros", desc: "Un sujetalibros para guardar libros o documentos en tus estanterías.", link: "https://cults3d.com/es/modelo-3d/casa/sujetalibros-eamesse-2" },
    "producto20": { title: "Maceta", desc: "Una pequeña maceta.", link: "https://cults3d.com/es/modelo-3d/casa/maceta-eamesse" },
    "producto21": { title: "Imán Pulpo", desc: "Es un pequeño pulpo en el que puedes poner un imán.", link: "https://cults3d.com/es/modelo-3d/casa/pulpo-iman" },
    "producto22": { title: "Posa-vasos Personalizados con Logo o Imagen", desc: "Diseño personalizado de posa-vasos, te lo hago con la forma y la imagen/ logo que tu quieras!\n✨ Escríbeme para acordar todos los detalles (imagen, logo, forma...).", link: "https://cults3d.com/es/modelo-3d/casa/posa-vasos-personalizados-con-logo-o-imagen" },
    "producto23": { title: "Cola Articulada", desc: "Es una cola articulada con formas de corazoncitos, perfecta para cosplay, disfraz o como accesorio.", link: "https://cults3d.com/es/modelo-3d/moda/cola-articulada" },
    "producto24": { title: "Marcos para Fotos con formas de Cámaras", desc: "", link: "" },
    "producto25": { title: "Soporte para Incienso con Forma de Pastel", desc: "Un peequeño soporte para incienso con forma de pastelito con fresas.", link: "" },
    "producto26": { title: "Chincheta de Almacenaje para Chinchetas", desc: "Una gran chincheta para almacenar tus chinchetas.", link: "https://cults3d.com/es/modelo-3d/casa/pushpin-storage-for-pushpins" },
    "producto27": { title: "Cuadro \"nothing\" DHMIS (don't hug me i'm scared)", desc: "Es un fan-art de un cuadro que aparece en la serie de youtube \"don't hug me i'm scared\".", link: "https://cults3d.com/es/modelo-3d/arte/cuadro-nothing-dhmis-don-t-hug-me-i-m-scared" },
    "producto28": { title: "Accesorio para Cascos Orejas Gato y Antenas", desc: "Son unos accesorios para cascos: orejas de gato alienígena, y antenas que se mueven.", link: "https://cults3d.com/es/modelo-3d/moda/accesorio-orejas-gato-y-antenas-para-cascos" },
    "producto29": { title: "Funda para Pendrive con Forma de Helado", desc: "Una funda con medida personalizada para transformar cualquier pendrive/ usb en un pequeño helado.", link: "https://cults3d.com/es/modelo-3d/casa/funda-pendrive-usb-helado" },
    "producto30": { title: "Decoracíon Navidad - Copos de Nieve", desc: "Copos de nieve para decorar tu árbol de navidad y lo que quieras.", link: "https://cults3d.com/es/modelo-3d/variado/decoracion-navidad-copos-de-nieve" },
    "producto31": { title: "Ojo Agamotto, Versión Cómic", desc: "Es la versión original de los cómics del ojo de agamotto de Doctor Strange. Tiene una versión lisa por detrás y otra con un gancho. Puedes intercambiar entre el ojo cerrado o abierto mediante imanes de 6x2mm, o imprimir las dos partes juntas.", link: "https://cults3d.com/es/modelo-3d/moda/ojo-agamotto-comic" },
    "producto32": { title: "Imanes Ratón de Ordenador", desc: "Son unos imanes con forma de ratón de ordenador.", link: "https://cults3d.com/es/modelo-3d/casa/imanes-con-forma-de-raton-de-ordenador" },
    "producto33": { title: "Collar y Anillo de Gotas de Sangre", desc: "Son un collar choker y un anillo con la forma de gotas de sangre, perfecto para disfraz o como accesorio.", link: "https://cults3d.com/es/modelo-3d/moda/collar-y-anillo-de-gotas-de-sangre" },
    "producto34": { title: "Dedo Articulado", desc: "Es un dedo articulado, se monta por piezas! La parte de la \"cuchilla\" se puede sacar y poner,o se puede pegar con pegamento si prefieres.", link: "https://cults3d.com/es/modelo-3d/moda/dedo-articulado" },
    "producto35": { title: "Lapicero con Forma de Tortuga", desc: "Una pequeña tortuga en la que puedes guardar tus pinceles y lápices.", link: "" },
    "producto36": { title: "Diadema con Antenas de Alien", desc: "Es una diadema con antenas de extraterrestre que se mueven, ideal para disfraz.", link: "https://cults3d.com/es/modelo-3d/moda/diadema-con-antenas-de-alienigena" },
    // 37-41 vacíos
    "producto42": { title: "Decoración Navidad Gótica", desc: "Decoraciones creepy para decorar tu árbol de navidad y lo que quieras.", link: "https://cults3d.com/es/modelo-3d/variado/decoracion-navidad-gotica" },
    // 43 vacío
    "producto44": { title: "Letras \"Get Creative\" DHMIS (don't hug me i'm scared)", desc: "Es un fan-art de las letras \"get creative\" que aparecen en el primer episodio de la serie de youtube Don't Hug Me I'm Scared, tienen un hueco en los que puedes poner un imán para ponerlas en tu nevera o donde desees.", link: "https://cults3d.com/es/modelo-3d/casa/letras-get-creative-dhmis-don-t-hug-me-i-m-scared-imanes-para-la-nevera" },
    "producto45": { title: "Contenedor Simple de Gel de Sílice para AMS", desc: "Unos pequeños contenedores para AMS en los que poner gel de sílice, para mantenerlo sin humedad.", link: "https://cults3d.com/es/modelo-3d/herramientas/contenedor-simple-de-gel-de-silice-para-ams" },
    "producto46": { title: "Imanes Decoración Gato Alien", desc: "Unos imanes de gatos alien para pegar donde quieras.", link: "https://cults3d.com/es/modelo-3d/casa/imanes-decoracion-gato-alien" }
  };

  if (productId.startsWith("render")) {
    document.getElementById("product-title").innerText = "Render " + productId.replace("render", "");
    document.getElementById("product-desc").innerText = "Visualización 3D artística realizada con Blender/Cycles.";
    document.getElementById("product-link").style.display = "none";
  } else {
    const data = productData[productId] || {
      title: "Producto " + productId.replace("producto", ""),
      desc: "Diseño exclusivo de modelo para impresión 3D.",
      link: "https://cults3d.com/"
    };
    document.getElementById("product-title").innerText = data.title;
    document.getElementById("product-desc").innerText = data.desc;
    
    if (data.link && data.link !== "") {
      document.getElementById("product-link").href = data.link;
      document.getElementById("product-link").style.display = "inline-block";
    } else {
      document.getElementById("product-link").style.display = "none";
    }
  }

  // CARGA DINÁMICA DE IMÁGENES
  const basePath = productId.startsWith("render") ? "fotos_renders" : "fotos_productos_3d";
  const extensions = [".jpg", ".JPG"];
  for (let i = 1; i <= 10; i++) {
    let found = false;
    for (const ext of extensions) {
      const url = `${basePath}/${productId}/${i}${ext}`;
      const exists = await new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
      });

      if (exists) {
        productImages.push(url);
        found = true;
        break;
      }
    }
    if (!found) {
      if (i === 1) {
        productImages = ["https://via.placeholder.com/600x400?text=Imagen+no+disponible"];
      }
      break;
    }
  }

  updateMainImage();
  renderThumbnails();
}

function updateMainImage() {
  const mainImg = document.getElementById("product-main-img");
  mainImg.src = productImages[currentProductImgIndex];

  // Ocultar flechas si solo hay una imagen
  const arrows = document.querySelectorAll(".slider-arrow");
  arrows.forEach(arrow => {
    arrow.style.display = productImages.length > 1 ? "block" : "none";
  });
}

function renderThumbnails() {
  const container = document.getElementById("product-thumbnails");
  container.innerHTML = "";

  if (productImages.length <= 1) {
    container.style.display = "none";
    return;
  }

  container.style.display = "flex";
  productImages.forEach((img, index) => {
    const thumb = document.createElement("img");
    thumb.src = img;
    thumb.classList.toggle("active", index === currentProductImgIndex);
    thumb.onclick = () => {
      currentProductImgIndex = index;
      updateMainImage();
      renderThumbnails();
    };
    container.appendChild(thumb);
  });
}

function changeImage(step) {
  currentProductImgIndex += step;
  if (currentProductImgIndex < 0) currentProductImgIndex = productImages.length - 1;
  if (currentProductImgIndex >= productImages.length) currentProductImgIndex = 0;
  updateMainImage();
  renderThumbnails();
}

function goBack() {
  document.getElementById("product-view").style.display = "none";
  document.querySelectorAll(".module").forEach(m => m.style.display = "block");
  document.getElementById("backArrow").style.display = "none";
}

function showSection(sectionId) {
  if (sectionId === 'renders') {
    // Si estamos en index.html, ocultamos los otros módulos y mostramos solo el de renders
    // O podríamos simplemente hacer scroll si estuvieran todos en la misma página
    // Dado el diseño actual, 'Ver todo' en Renders podría filtrar o redirigir.
    // De momento, mantendremos la coherencia con lo que el usuario espera.
    // Si no hay una página dedicada a renders, simplemente mostramos el módulo.
    document.querySelectorAll(".module").forEach(m => {
      const h2 = m.querySelector("h2");
      if (h2 && h2.innerText.toLowerCase().includes("renders")) {
        m.style.display = "block";
      } else {
        m.style.display = "none";
      }
    });
  }
}

