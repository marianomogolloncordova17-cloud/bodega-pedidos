// ===== REGLAS DE ORO PARA EDITAR ESTE ARCHIVO =====
// 1. Para agregar un producto: copia una línea de producto que ya exista,
//    pégala y cambia los valores. NUNCA la escribas de memoria.
// 2. NUNCA borres llaves, corchetes, dos puntos, comas ni comillas.
// 3. Los precios van en números, sin "S/" (ejemplo: 4.5).
//    Para agotado usa true o false.
// 4. Después de editar, abre validador.html y espera el mensaje OK.
// 5. Si la web se ve rara o en blanco, deshaz tu último cambio y avisa
//    al proveedor.
// ===================================================

// ============================================================
// clientes/bodega-1.js — Config + catálogo del negocio
// Se carga con la URL index.html?local=bodega-1 (sección 3).
// Declara la variable con var, NUNCA con const (16.2): así queda
// como propiedad global verificable desde app.js.
// Un archivo por negocio en clientes/: el dueño edita SOLO este
// archivo (precios, agotado, nombres, agregar o borrar líneas).
//
// TODOS los datos de abajo son EJEMPLO y deben reemplazarse por
// los reales del negocio antes de publicar.
//
// Reglas de edición del catálogo (sección 5):
// - UN PRODUCTO = UNA LÍNEA FÍSICA: copia la línea completa de un
//   producto y cambia los valores. No la repartas en varias líneas.
// - Precios en números, sin "S/": escribe 4.5, no "4.50".
// - Ids únicos, estables, en minúsculas y sin espacios.
// - Nombre de producto: máximo 28 caracteres.
// - agotado: true lo muestra tachado y NO se puede agregar; sin el
//   campo (o false) el producto es normal.
// - "opciones": en Fase 1 TODAS son requeridas y la primera choice va
//   seleccionada por defecto. Si una choice lleva precio, TODAS las
//   choices de esa opción deben llevarlo.
// - GRANEL: las porciones son precios fijos escritos aquí. La web NO
//   multiplica ni divide precios.
// - Categorías en orden de rotación (la más vendida primero).
// - Fase 1: entre 40 y 100 ítems (índice razonable: ~60).
// ============================================================

var LOCAL = {
  id: "bodega-1", // igual al nombre del archivo y al ?local=
  nombre: "Bodega Doña María", // EJEMPLO — reemplazar
  logoUrl: "", // opcional, ruta relativa
  colores: {
    primario: "#0B7A3B", // EJEMPLO
    fondo: "#FFFDF6", // EJEMPLO
    texto: "#222222" // EJEMPLO
  },
  whatsappCaja: "51900000000", // EJEMPLO — sin "+" ni espacios

  // Catálogo EJEMPLO (~60 productos de bodega peruana). Precios EJEMPLO.
  catalogo: [
    {
      categoria: "Víveres y abarrotes",
      items: [
        { id: "arroz-sup", nombre: "Arroz Superior granel", precio: 4.5, opciones: [{ tipo: "Porción", requerido: true, choices: [{ nombre: "1/4 kg", precio: 1.2 }, { nombre: "1/2 kg", precio: 2.3 }, { nombre: "1 kg", precio: 4.5 }] }] },
        { id: "arroz-bolsa", nombre: "Arroz extra bolsa 1kg", precio: 5.5 },
        { id: "azucar-rub", nombre: "Azúcar rubia granel", precio: 4.0, opciones: [{ tipo: "Porción", requerido: true, choices: [{ nombre: "1/4 kg", precio: 1.1 }, { nombre: "1/2 kg", precio: 2.1 }, { nombre: "1 kg", precio: 4.0 }] }] },
        { id: "azucar-bla", nombre: "Azúcar blanca granel", precio: 4.2, opciones: [{ tipo: "Porción", requerido: true, choices: [{ nombre: "1/4 kg", precio: 1.2 }, { nombre: "1/2 kg", precio: 2.2 }, { nombre: "1 kg", precio: 4.2 }] }] },
        { id: "lenteja-granel", nombre: "Lenteja serrana granel", precio: 6.5, opciones: [{ tipo: "Porción", requerido: true, choices: [{ nombre: "1/4 kg", precio: 1.8 }, { nombre: "1/2 kg", precio: 3.4 }, { nombre: "1 kg", precio: 6.5 }] }] },
        { id: "frejol-granel", nombre: "Frejol canario granel", precio: 7.0, opciones: [{ tipo: "Porción", requerido: true, choices: [{ nombre: "1/4 kg", precio: 1.9 }, { nombre: "1/2 kg", precio: 3.6 }, { nombre: "1 kg", precio: 7.0 }] }] },
        { id: "arveja-granel", nombre: "Arveja partida granel", precio: 5.5, opciones: [{ tipo: "Porción", requerido: true, choices: [{ nombre: "1/4 kg", precio: 1.5 }, { nombre: "1/2 kg", precio: 2.9 }, { nombre: "1 kg", precio: 5.5 }] }] },
        { id: "avena-500", nombre: "Avena en hojuelas 500g", precio: 3.5 },
        { id: "aceite-girasol-1l", nombre: "Aceite girasol 1L", precio: 8.9 },
        { id: "aceite-vegetal-1l", nombre: "Aceite vegetal 1L", precio: 7.9 },
        { id: "fideos-spaghetti", nombre: "Fideos spaghetti 950g", precio: 4.5 },
        { id: "fideos-tallarin", nombre: "Fideos tallarín 1kg", precio: 4.9 },
        { id: "atun-aceite-170", nombre: "Atún en aceite 170g", precio: 5.5 },
        { id: "atun-grated-170", nombre: "Atún grated 170g", precio: 6.5, agotado: true },
        { id: "leche-evap-400", nombre: "Leche evaporada 400g", precio: 4.2 },
        { id: "leche-gloria-395", nombre: "Leche Gloria entera 395g", precio: 4.8 },
        { id: "huevo-unidad", nombre: "Huevo rosado x unidad", precio: 0.9 },
        { id: "mantequilla-200", nombre: "Mantequilla con sal 200g", precio: 6.9 }
      ]
    },
    {
      categoria: "Bebidas",
      items: [
        { id: "inka-15", nombre: "Inca Kola 1.5L", precio: 10 },
        { id: "inka-3l", nombre: "Inca Kola 3L", precio: 15 },
        { id: "gaseosa-pers", nombre: "Gaseosa personal 500ml", precio: 2.5 },
        { id: "coca-3l", nombre: "Coca Cola 3L", precio: 14.5 },
        { id: "agua-620", nombre: "Agua 620ml", precio: 1.5 },
        { id: "agua-25l", nombre: "Agua sin gas 2.5L", precio: 3.5 },
        { id: "yogurt-1l", nombre: "Yogurt frutado 1L", precio: 7.5 },
        { id: "gatorade-500", nombre: "Gatorade 500ml", precio: 4.5 },
        { id: "cerveza-cusquena", nombre: "Cerveza Cusqueña 620ml", precio: 7.5 }
      ]
    },
    {
      categoria: "Hogar y limpieza",
      items: [
        { id: "deter-700", nombre: "Detergente polvo 700g", precio: 6.5 },
        { id: "deter-3kg", nombre: "Detergente bolsa 3kg", precio: 18 },
        { id: "lejia-1l", nombre: "Lejía 1L", precio: 3.5 },
        { id: "jabon-tocador", nombre: "Jabón de tocador", precio: 1.2 },
        { id: "jabon-lava-210", nombre: "Jabón lavar ropa 210g", precio: 3.2 },
        { id: "lavavajilla-400", nombre: "Lavavajilla crema 400ml", precio: 5.5 },
        { id: "papel-hig-x4", nombre: "Papel higiénico x4", precio: 4.5 },
        { id: "bolsas-basura", nombre: "Bolsas de basura x10", precio: 2.5 }
      ]
    },
    {
      categoria: "Ferretería y gas",
      items: [
        { id: "gas-10", nombre: "Balón Gas 10kg", precio: 50, opciones: [{ tipo: "Envase", requerido: true, choices: [{ nombre: "Con intercambio", precio: 42 }, { nombre: "Sin envase (nuevo)", precio: 50 }] }] },
        { id: "gas-5", nombre: "Balón Gas 5kg", precio: 30, opciones: [{ tipo: "Envase", requerido: true, choices: [{ nombre: "Con intercambio", precio: 25 }, { nombre: "Sin envase (nuevo)", precio: 30 }] }] },
        { id: "foco-led", nombre: "Foco LED 9W", precio: 9.5 },
        { id: "foco-ahorr-20w", nombre: "Foco ahorrador 20W", precio: 6.5 },
        { id: "cinta-aisl", nombre: "Cinta aislante", precio: 2.5 },
        { id: "pilas-aa-x2", nombre: "Pilas AA x2", precio: 3.5 },
        { id: "enchufe-simple", nombre: "Enchufe simple", precio: 3 }
      ]
    },
    {
      categoria: "Mercería y costura",
      items: [
        { id: "hilo", nombre: "Hilo", precio: 1.0, opciones: [{ tipo: "Tipo", requerido: true, choices: [{ nombre: "Capotera", precio: 2.0 }, { nombre: "Normal Nº5", precio: 1.0 }] }, { tipo: "Color", requerido: true, choices: [{ nombre: "Negro" }, { nombre: "Blanco" }, { nombre: "Azul" }] }] },
        { id: "agujas-surt", nombre: "Agujas surtidas", precio: 2.5 },
        { id: "botones-doc", nombre: "Botones x docena", precio: 3.5 },
        { id: "cierre-60", nombre: "Cierre 60cm", precio: 4 },
        { id: "cinta-metrica", nombre: "Cinta métrica 1.5m", precio: 4.5, agotado: true },
        { id: "tijera-costura", nombre: "Tijera de costura", precio: 12 }
      ]
    },
    {
      categoria: "Salud y botiquín",
      items: [
        { id: "paracet-500", nombre: "Paracetamol 500mg", precio: 1.5 },
        { id: "ibuprofeno-400", nombre: "Ibuprofeno 400mg", precio: 2.5, agotado: true },
        { id: "curitas", nombre: "Curitas caja", precio: 1.0 },
        { id: "alcohol-250", nombre: "Alcohol 250ml", precio: 3.0 },
        { id: "agua-oxi-120", nombre: "Agua oxigenada 120ml", precio: 2.5 },
        { id: "gasa-esteril", nombre: "Gasa estéril sobre", precio: 2 }
      ]
    },
    {
      categoria: "Escolar y oficina",
      items: [
        { id: "cuad-100", nombre: "Cuaderno 100 hojas", precio: 3.5 },
        { id: "lapicero-azul", nombre: "Lapicero azul", precio: 1.0 },
        { id: "lapiz-2b", nombre: "Lápiz 2B", precio: 1.0 },
        { id: "borrador", nombre: "Borrador blanco", precio: 0.8 },
        { id: "tajador-metal", nombre: "Tajador metal", precio: 1.2 },
        { id: "goma-barra", nombre: "Goma en barra 8g", precio: 2.5 }
      ]
    }
  ]
};
