// ===== REGLAS DE ORO PARA EDITAR ESTE ARCHIVO =====
// 1. Para agregar un producto: copia una línea de producto que ya exista,
//    pégala y cambia los valores. NUNCA la escribas de memoria.
// 2. NUNCA borres llaves, corchetes, dos puntos, comas ni comillas.
// 3. Los precios van en números, sin "S/" (ejemplo: 4.5).
// 4. Después de editar, abre validador.html y espera el mensaje OK.
// 5. Si la web se ve rara o en blanco, deshaz tu último cambio y avisa
//    al proveedor.
// ===================================================

// ============================================================
// clientes/bodega-1.js — BODEGA CAROLINA (ARCHIVO DE PRODUCCIÓN)
// Catálogo REAL según lista de la dueña. Ya NO es EJEMPLO.
// URL de la tienda: index.html?local=bodega-1
// Un producto = UNA línea física. Editar copiando líneas completas.
// Nota: los productos con sabores o marcas usan OPCIONES (no líneas
// repetidas). Los productos vendidos por kilo usan porciones con precio
// FIJO ya redondeado. La web nunca calcula ni divide precios.
// En las opciones de Sabor o Marca, si ninguna choice tiene precio,
// se utiliza el precio del producto principal.
// ============================================================

var LOCAL = {
  id: "bodega-1",
  nombre: "Bodega Carolina",
  logoUrl: "",
  colores: {
    primario: "#0B7A3B",
    fondo: "#FFFDF6",
    texto: "#222222"
  },
  whatsappCaja: "51972604186",
  catalogo: [
    {
      categoria: "Abarrotes y condimentos",
      items: [
        { id: "azucar", nombre: "Azúcar", precio: 4.0, opciones: [{ tipo: "Porción", requerido: true, choices: [{ nombre: "1/4 kg", precio: 1.0 }, { nombre: "1/2 kg", precio: 2.0 }, { nombre: "1 kg", precio: 4.0 }] }] },
        { id: "arroz-bebe", nombre: "Arroz Bebé", precio: 4.5, opciones: [{ tipo: "Porción", requerido: true, choices: [{ nombre: "1/4 kg", precio: 1.2 }, { nombre: "1/2 kg", precio: 2.3 }, { nombre: "1 kg", precio: 4.5 }] }] },
        { id: "arroz-suzuki", nombre: "Arroz Suzuki", precio: 3.5, opciones: [{ tipo: "Porción", requerido: true, choices: [{ nombre: "1/4 kg", precio: 0.9 }, { nombre: "1/2 kg", precio: 1.8 }, { nombre: "1 kg", precio: 3.5 }] }] },
        { id: "papa-blanca", nombre: "Papa blanca", precio: 3.0, opciones: [{ tipo: "Porción", requerido: true, choices: [{ nombre: "1/4 kg", precio: 0.8 }, { nombre: "1/2 kg", precio: 1.5 }, { nombre: "1 kg", precio: 3.0 }] }] },
        { id: "aceite-112", nombre: "Aceite 112 ml", precio: 1.0 },
        { id: "aceite-225", nombre: "Aceite 225 ml", precio: 2.0 },
        { id: "ajo-molido", nombre: "Ajo molido", precio: 1.0 },
        { id: "aji-panca", nombre: "Ají panca", precio: 1.0 },
        { id: "pimienta", nombre: "Pimienta", precio: 0.5 },
        { id: "comino", nombre: "Comino", precio: 0.5 },
        { id: "sazonador-meri", nombre: "Sazonador Meri", precio: 0.6 },
        { id: "palillo-meri", nombre: "Palillo Meri", precio: 0.6 },
        { id: "sazonador-teresita", nombre: "Sazonador Teresita", precio: 0.7 },
        { id: "palillo-teresita", nombre: "Palillo Teresita", precio: 0.7 },
        { id: "tomate", nombre: "Tomate", precio: 6.0, opciones: [{ tipo: "Porción", requerido: true, choices: [{ nombre: "1/4 kg", precio: 1.5 }, { nombre: "1/2 kg", precio: 3.0 }, { nombre: "1 kg", precio: 6.0 }] }] },
        { id: "huevo", nombre: "Huevo (unidad)", precio: 0.5 },
        { id: "mantequilla", nombre: "Mantequilla", precio: 2.0 },
        { id: "maiz-molido", nombre: "Maíz molido", precio: 2.5, opciones: [{ tipo: "Porción", requerido: true, choices: [{ nombre: "1/4 kg", precio: 0.7 }, { nombre: "1/2 kg", precio: 1.3 }, { nombre: "1 kg", precio: 2.5 }] }] },
        { id: "papa-chaucha", nombre: "Papa chaucha", precio: 6.0, opciones: [{ tipo: "Porción", requerido: true, choices: [{ nombre: "1/4 kg", precio: 1.5 }, { nombre: "1/2 kg", precio: 3.0 }, { nombre: "1 kg", precio: 6.0 }] }] },
        { id: "cebolla", nombre: "Cebolla", precio: 3.0, opciones: [{ tipo: "Porción", requerido: true, choices: [{ nombre: "1/4 kg", precio: 0.8 }, { nombre: "1/2 kg", precio: 1.5 }, { nombre: "1 kg", precio: 3.0 }] }] },
        { id: "zanahoria", nombre: "Zanahoria", precio: 4.0, opciones: [{ tipo: "Porción", requerido: true, choices: [{ nombre: "1/4 kg", precio: 1.0 }, { nombre: "1/2 kg", precio: 2.0 }, { nombre: "1 kg", precio: 4.0 }] }] },
        { id: "platano-seda", nombre: "Plátano de seda", precio: 0.4, opciones: [{ tipo: "Cantidad", requerido: true, choices: [{ nombre: "1 unidad", precio: 0.4 }, { nombre: "2 unidades", precio: 0.7 }, { nombre: "3 unidades", precio: 1.0 }] }] },
        { id: "alcon-entero", nombre: "Alcón entero", precio: 4.5, opciones: [{ tipo: "Porción", requerido: true, choices: [{ nombre: "1/4 kg", precio: 1.2 }, { nombre: "1/2 kg", precio: 2.3 }, { nombre: "1 kg", precio: 4.5 }] }] },
        { id: "alcon-fino", nombre: "Alcón fino", precio: 4.5, opciones: [{ tipo: "Porción", requerido: true, choices: [{ nombre: "1/4 kg", precio: 1.2 }, { nombre: "1/2 kg", precio: 2.3 }, { nombre: "1 kg", precio: 4.5 }] }] }
      ]
    },
    {
      categoria: "Leches",
      items: [
        { id: "leche-ideal-amanecer", nombre: "Leche Ideal Amanecer 390g", precio: 3.5 },
        { id: "leche-gloria-zl-390", nombre: "Leche Gloria Zero Lacto 390g", precio: 4.5 },
        { id: "leche-ideal-cremosita", nombre: "Leche Ideal Cremosita 390g", precio: 4.0 },
        { id: "leche-gloria-amarilla", nombre: "Leche Gloria Amarilla", precio: 4.5 },
        { id: "leche-gloria", nombre: "Leche Gloria", precio: 4.2 },
        { id: "leche-bonle-azul", nombre: "Leche Bonlé Azul", precio: 3.0 },
        { id: "leche-bonle-rosada", nombre: "Leche Bonlé Rosada", precio: 2.5 },
        { id: "leche-gloria-caja", nombre: "Leche Gloria en caja", precio: 5.5 },
        { id: "leche-gloria-roja-caja", nombre: "Leche Gloria Roja en caja", precio: 6.0 },
        { id: "leche-gloria-zl-caja", nombre: "Leche Gl. Zero Lacto caja", precio: 6.0 },
        { id: "leche-gloria-170", nombre: "Leche Gloria 170g", precio: 2.3 }
      ]
    },
    {
      categoria: "Gaseosas, refrescos y agua",
      items: [
        { id: "gaseosa-400", nombre: "Gaseosa 400 ml", precio: 1.2, opciones: [{ tipo: "Sabor", requerido: true, choices: [{ nombre: "Big Cola" }, { nombre: "Oro" }, { nombre: "Roja" }, { nombre: "Limón" }, { nombre: "Piña" }, { nombre: "Anaranjada" }] }] },
        { id: "gaseosa-concordia", nombre: "Gaseosa Concordia", precio: 1.0, opciones: [{ tipo: "Sabor", requerido: true, choices: [{ nombre: "Limón" }, { nombre: "Roja" }, { nombre: "Naranja" }, { nombre: "Piña" }] }] },
        { id: "pepsi-750", nombre: "Pepsi 750 ml", precio: 3.0 },
        { id: "gaseosa-1l", nombre: "Gaseosa 1 litro", precio: 3.0, opciones: [{ tipo: "Sabor", requerido: true, choices: [{ nombre: "Big Cola" }, { nombre: "Oro" }, { nombre: "Piña" }, { nombre: "Roja" }] }] },
        { id: "zuko", nombre: "Refresco Zuko", precio: 1.2, opciones: [{ tipo: "Sabor", requerido: true, choices: [{ nombre: "Maracuyá" }, { nombre: "Manzana" }, { nombre: "Pera" }, { nombre: "Piña" }, { nombre: "Emoliente" }, { nombre: "Mango" }, { nombre: "Naranja" }, { nombre: "Chicha morada" }, { nombre: "Uva" }, { nombre: "Limón durazno" }] }] },
        { id: "pulp-1l", nombre: "Pulp 1 litro", precio: 4.5 },
        { id: "pulp-15l", nombre: "Pulp 1.5 litros", precio: 6.0 },
        { id: "pulp-250", nombre: "Pulp 250 ml", precio: 1.5 },
        { id: "pulp-145", nombre: "Pulp 145 ml", precio: 0.8 },
        { id: "agua-sc-500", nombre: "Agua San Carlos 500ml", precio: 1.0 },
        { id: "agua-sc-gas", nombre: "Agua San Carlos gas 500ml", precio: 1.5 },
        { id: "agua-vida", nombre: "Agua Vida 625ml", precio: 1.0 },
        { id: "hielo", nombre: "Hielo", precio: 0.5 }
      ]
    },
    {
      categoria: "Limpieza y cuidado personal",
      items: [
        { id: "jabon-bolivar", nombre: "Jabón Bolívar", precio: 3.0 },
        { id: "jabon-bolivar-bebe", nombre: "Jabón Bolívar Bebé", precio: 3.0 },
        { id: "jabon-popeye", nombre: "Jabón Popeye", precio: 2.0 },
        { id: "jabon-macho", nombre: "Jabón Macho", precio: 6.0 },
        { id: "jabon-trome", nombre: "Jabón Trome", precio: 1.8 },
        { id: "jabon-marsella", nombre: "Jabón Marsella", precio: 2.5 },
        { id: "enjuague", nombre: "Enjuague", precio: 1.0, opciones: [{ tipo: "Marca", requerido: true, choices: [{ nombre: "Suavitel" }, { nombre: "Downy" }] }] },
        { id: "detergente", nombre: "Detergente", precio: 1.0, opciones: [{ tipo: "Marca", requerido: true, choices: [{ nombre: "Ultrex" }, { nombre: "Trome" }, { nombre: "Tres Bebé" }] }] },
        { id: "detergente-patito", nombre: "Detergente Patito", precio: 1.2 },
        { id: "detergente-patito-1k", nombre: "Detergente Patito 1kg", precio: 6.0 },
        { id: "detergente-trome-1k", nombre: "Detergente Trome 1kg", precio: 5.0 },
        { id: "shampoo-pantene", nombre: "Shampoo Pantene", precio: 1.2 },
        { id: "shampoo-hs-18", nombre: "Shampoo H&S 18ml", precio: 1.0 },
        { id: "shampoo-hs-33", nombre: "Shampoo H&S 33ml", precio: 1.5 },
        { id: "desod-rexona", nombre: "Desodorante Rexona", precio: 1.3 },
        { id: "desod-speed", nombre: "Desodorante Speed Stick", precio: 1.2 },
        { id: "desod-lady-speed", nombre: "Desod. Lady Speed Stick", precio: 1.2 }
      ]
    },
    {
      categoria: "Papel y pañales",
      items: [
        { id: "papel-noble", nombre: "Papel higiénico Noble", precio: 1.0, opciones: [{ tipo: "Cantidad", requerido: true, choices: [{ nombre: "1 rollo", precio: 1.0 }, { nombre: "2 rollos", precio: 2.0 }] }] },
        { id: "papel-suave", nombre: "Papel higiénico Suave", precio: 1.0, opciones: [{ tipo: "Cantidad", requerido: true, choices: [{ nombre: "1 rollo", precio: 1.0 }, { nombre: "2 rollos", precio: 2.0 }] }] },
        { id: "panal-g-babysec", nombre: "Pañal G Babysec", precio: 1.0 },
        { id: "panal-xxg-babysec", nombre: "Pañal XXG Babysec", precio: 1.3 },
        { id: "panal-xxg-huggies", nombre: "Pañal XXG Huggies", precio: 1.3 },
        { id: "panal-m-babysec", nombre: "Pañal M Babysec", precio: 0.8 },
        { id: "panal-g-huggies", nombre: "Pañal G Huggies", precio: 1.2 },
        { id: "panal-m-huggies", nombre: "Pañal M Huggies", precio: 1.0 },
        { id: "panal-xg-babysec", nombre: "Pañal XG Babysec", precio: 1.0 }
      ]
    },
    {
      categoria: "Salsas y conservas",
      items: [
        { id: "salsa-china-400", nombre: "Salsa china 400ml", precio: 9.0 },
        { id: "salsa-china-100", nombre: "Salsa china 100ml", precio: 4.0 },
        { id: "sillao-500", nombre: "Sillao 500ml", precio: 4.5 },
        { id: "sillao-150", nombre: "Sillao 150ml", precio: 2.0 },
        { id: "atun-real", nombre: "Atún Real", precio: 5.0 },
        { id: "atun-marbrava", nombre: "Atún Mar Brava", precio: 4.5 },
        { id: "atun-la-duena", nombre: "Atún La Dueña", precio: 4.0 },
        { id: "atun-pimentel", nombre: "Atún Pimentel", precio: 3.0 }
      ]
    },
    {
      categoria: "Fideos y galletas",
      items: [
        { id: "tallarines-alianza", nombre: "Tallarines Alianza", precio: 3.0 },
        { id: "tallarines-grano-oro", nombre: "Tallarines Grano de Oro", precio: 3.0 },
        { id: "fideo-cabello-angel", nombre: "Fideo cabello de ángel", precio: 1.5 },
        { id: "tostadas", nombre: "Tostadas", precio: 0.2 },
        { id: "chancay", nombre: "Chancay", precio: 0.2 },
        { id: "galleta-saltica", nombre: "Galleta Saltica 63g", precio: 1.2 }
      ]
    },
    {
      categoria: "Café y cocoa",
      items: [
        { id: "don-cafe", nombre: "Don Café 10g", precio: 1.5 },
        { id: "cocoa-20", nombre: "Cocoa 20g", precio: 1.8 },
        { id: "cocoa-10", nombre: "Cocoa 10g", precio: 0.8 },
        { id: "altomayo", nombre: "Altomayo", precio: 1.8 },
        { id: "altomayo-grande", nombre: "Altomayo grande", precio: 3.0 }
      ]
    },
    {
      categoria: "Carnes y embutidos",
      items: [
        { id: "pollo", nombre: "Pollo", precio: 10.5, opciones: [{ tipo: "Porción", requerido: true, choices: [{ nombre: "1/4 kg", precio: 2.7 }, { nombre: "1/2 kg", precio: 5.3 }, { nombre: "1 kg", precio: 10.5 }] }] },
        { id: "hot-dog", nombre: "Hot dog (unidad)", precio: 0.7 },
        { id: "mortadela", nombre: "Mortadela", precio: 2.0 }
      ]
    }
  ]
};
