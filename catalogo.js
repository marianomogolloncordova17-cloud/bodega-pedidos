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
// catalogo.js — MODO DEMO (datos de EJEMPLO)
// Se carga con la URL index.html?local=demo (sección 16.3).
// Declara la variable con var, NUNCA con const (16.2): así queda
// como propiedad global verificable desde app.js.
// TODOS los datos de este archivo son EJEMPLO: el dueño edita su
// propio archivo en clientes/, no este.
//
// Reglas de edición del catálogo (sección 5):
// - Precios en números, sin "S/": escribe 4.5, no "4.50".
// - Ids únicos, estables, en minúsculas y sin espacios.
// - UN PRODUCTO = UNA LÍNEA: copia una línea existente y cambia valores.
// - Nombre de producto: máximo 28 caracteres.
// - agotado: true lo muestra tachado y NO se puede agregar; sin el
//   campo (o false) el producto es normal.
// - "opciones": en Fase 1 TODAS son requeridas y la primera choice va
//   seleccionada por defecto. Si una choice lleva precio, TODAS las
//   choices de esa opción deben llevarlo.
// - GRANEL: las porciones son precios fijos escritos aquí. La web NO
//   multiplica ni divide precios.
// - Categorías en orden de rotación (la más vendida primero).
// - Fase 1: entre 40 y 100 ítems en total (guía para el catálogo real).
// ============================================================

var LOCAL = {
  id: "demo",
  nombre: "Bodega Demo (EJEMPLO)",
  logoUrl: "",
  colores: {
    primario: "#0B7A3B", // EJEMPLO
    fondo: "#FFFDF6",    // EJEMPLO
    texto: "#222222"     // EJEMPLO
  }, // EJEMPLO
  whatsappCaja: "51900000000", // EJEMPLO — sin "+" ni espacios

  // Catálogo EJEMPLO de la sección 5. Los precios son EJEMPLO:
  // el dueño los reemplaza en su archivo de clientes/.
  catalogo: [
    {
      categoria: "Víveres y abarrotes",
      items: [
        {
          id: "arroz-sup",
          nombre: "Arroz Superior granel",
          precio: 4.5,
          opciones: [
            {
              tipo: "Porción",
              requerido: true,
              choices: [
                { nombre: "1/4 kg", precio: 1.2 },
                { nombre: "1/2 kg", precio: 2.3 },
                { nombre: "1 kg", precio: 4.5 }
              ]
            }
          ]
        },
        {
          id: "azucar-rub",
          nombre: "Azúcar rubia granel",
          precio: 4.0,
          opciones: [
            {
              tipo: "Porción",
              requerido: true,
              choices: [
                { nombre: "1/4 kg", precio: 1.1 },
                { nombre: "1/2 kg", precio: 2.1 },
                { nombre: "1 kg", precio: 4.0 }
              ]
            }
          ]
        },
        { id: "aceite-1l", nombre: "Aceite girasol 1L", precio: 8.9 },
        { id: "fideos-950", nombre: "Fideos spaghetti 950g", precio: 4.5 },
        { id: "atun-170", nombre: "Atún en aceite 170g", precio: 5.5 },
        { id: "leche-eva", nombre: "Leche evaporada 400g", precio: 4.2 }
      ]
    },
    {
      categoria: "Bebidas",
      items: [
        { id: "inka-15", nombre: "Inca Kola 1.5L", precio: 10 },
        { id: "gaseosa-pers", nombre: "Gaseosa personal 500ml", precio: 2.5 },
        { id: "agua-620", nombre: "Agua 620ml", precio: 1.5 }
      ]
    },
    {
      categoria: "Hogar y limpieza",
      items: [
        { id: "deter-700", nombre: "Detergente polvo 700g", precio: 6.5 },
        { id: "lejia-1l", nombre: "Lejía 1L", precio: 3.5 },
        { id: "jabon-bano", nombre: "Jabón de baño", precio: 1.2 }
      ]
    },
    {
      categoria: "Ferretería y gas",
      items: [
        {
          id: "gas-10",
          nombre: "Balón Gas 10kg",
          precio: 50,
          opciones: [
            {
              tipo: "Envase",
              requerido: true,
              choices: [
                { nombre: "Con intercambio", precio: 42 },
                { nombre: "Sin envase (nuevo)", precio: 50 }
              ]
            }
          ]
        },
        { id: "foco-led", nombre: "Foco LED 9W", precio: 9.5 },
        { id: "cinta-aisl", nombre: "Cinta aislante", precio: 2.5 }
      ]
    },
    {
      categoria: "Mercería y costura",
      items: [
        {
          id: "hilo",
          nombre: "Hilo",
          precio: 1.0,
          opciones: [
            {
              tipo: "Tipo",
              requerido: true,
              choices: [
                { nombre: "Capotera", precio: 2.0 },
                { nombre: "Normal Nº5", precio: 1.0 }
              ]
            },
            {
              tipo: "Color",
              requerido: true,
              choices: [
                { nombre: "Negro" },
                { nombre: "Blanco" }
              ]
            }
          ]
        }
      ]
    },
    {
      categoria: "Salud y botiquín",
      items: [
        { id: "paracet-500", nombre: "Paracetamol 500mg", precio: 1.5 },
        { id: "curitas", nombre: "Curitas caja", precio: 1.0 },
        { id: "alcohol-250", nombre: "Alcohol 250ml", precio: 3.0 }
      ]
    },
    {
      categoria: "Escolar y oficina",
      items: [
        { id: "cuad-100", nombre: "Cuaderno 100 hojas", precio: 3.5 },
        { id: "lapicero", nombre: "Lapicero", precio: 1.0 }
      ]
    }
  ]
};
