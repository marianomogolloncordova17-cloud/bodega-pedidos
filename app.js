/* ============================================================
   app.js — Bodega Fase 1 MVP
   Lógica: leer URL (?local=), cargar el catálogo por inyección
   de <script> (16.1), buscador, carrito, confirmación y mensaje
   de WhatsApp. Vanilla JS, sin dependencias, sin build step.
   El carrito vive SOLO en memoria (prohibido localStorage).
   ============================================================ */

(function () {
  'use strict';

  /* ------------------------- Estado ------------------------- */
  var estado = {
    localId: null,
    esDemo: false,
    carrito: [],        // [{ key, itemId, nombre, opciones:[{tipo,nombre,precio}], unitCents, qty }]
    chipActivo: -1,     // índice de categoría activa; -1 = "Todos"
    buscador: '',
    panelAbierto: null  // id del ítem con panel de opciones abierto
  };

  /* ----------------------- Utilidades ----------------------- */
  function $(sel) { return document.querySelector(sel); }

  // "jabon" encuentra "Jabón", "ARROZ" encuentra "Arroz" (sección 7):
  // minúsculas + NFD sin diacríticos.
  function normalizarTexto(s) {
    return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  // Sección 8: TODO cálculo de precios en centavos enteros.
  function aCentavos(v) {
    var n = Number(v);
    if (isFinite(n) && n > 0) { return Math.round(n * 100); }
    return 0;
  }

  // Mostrar SIEMPRE "S/ X.XX" con toFixed(2) (sección 8).
  function fmt(centavos) { return 'S/ ' + (centavos / 100).toFixed(2); }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ------------------------ Pantallas ------------------------ */
  var pantallaCargando = $('#cargando');
  var pantallaError = $('#pantalla-error');
  var app = $('#app');
  var pantallaCarrito = $('#pantalla-carrito');
  var pantallaConfirmar = $('#pantalla-confirmar');

  function overlayAbierto() {
    return !pantallaCarrito.classList.contains('oculto') ||
           !pantallaConfirmar.classList.contains('oculto');
  }

  // Sección 12: jamás pantalla en blanco. Mensajes amables con texto exacto.
  function mostrarError(texto) {
    $('#texto-error').textContent = texto;
    pantallaCargando.classList.add('oculto');
    app.classList.add('oculto');
    pantallaCarrito.classList.add('oculto');
    pantallaConfirmar.classList.add('oculto');
    pantallaError.classList.remove('oculto');
    document.body.classList.remove('sin-scroll');
  }

  function mostrarLista() {
    pantallaCarrito.classList.add('oculto');
    pantallaConfirmar.classList.add('oculto');
    document.body.classList.remove('sin-scroll');
    actualizarBotonCarrito();
  }

  function mostrarCarrito() {
    renderCarrito();
    pantallaConfirmar.classList.add('oculto');
    pantallaCarrito.classList.remove('oculto');
    document.body.classList.add('sin-scroll');
    $('#boton-carrito').classList.add('oculto');
  }

  function mostrarConfirmar() {
    if (!estado.carrito.length) { return; }
    renderConfirmar();
    pantallaCarrito.classList.add('oculto');
    pantallaConfirmar.classList.remove('oculto');
    document.body.classList.add('sin-scroll');
    $('#boton-carrito').classList.add('oculto');
  }

  /* ------------- Arranque y carga del archivo de datos ------------- */
  function iniciar() {
    var params = new URLSearchParams(window.location.search);
    var local = (params.get('local') || '').trim();

    // Sección 3: sin local (o con caracteres no permitidos) -> error amable.
    if (!local || !/^[A-Za-z0-9_-]+$/.test(local)) {
      mostrarError('Local no válido. Escanea el QR de tu bodega o pide el enlace al local.');
      return;
    }
    cargarDatos(local);
  }

  // 16.1: carga inyectando un <script> al final del body.
  // PROHIBIDO fetch/XMLHttpRequest: debe funcionar abriendo el archivo
  // directamente desde el disco (file://).
  function cargarDatos(localId) {
    var s = document.createElement('script');
    s.src = localId === 'demo' ? 'catalogo.js' : 'clientes/' + localId + '.js';
    var terminado = false;

    function cortesia() {
      if (terminado) { return; }
      terminado = true;
      mostrarError('El catálogo no está disponible en este momento. Comunícate directamente con el local.');
    }

    // Caso (a): el archivo no existe.
    s.onerror = cortesia;

    // Caso (b): cargó, pero LOCAL no existe, está vacío o no tiene catálogo.
    // 16.2: comprobación exacta:
    // typeof LOCAL === "undefined" || !LOCAL.catalogo || LOCAL.catalogo.length === 0
    s.onload = function () {
      if (terminado) { return; }
      if (typeof LOCAL === 'undefined' || !LOCAL.catalogo || LOCAL.catalogo.length === 0) {
        cortesia();
        return;
      }
      // Sección 12: catálogo cargado pero con 0 ítems -> mismo mensaje de cortesía.
      var totalItems = 0;
      for (var i = 0; i < LOCAL.catalogo.length; i++) {
        var cat = LOCAL.catalogo[i];
        if (cat && cat.items && cat.items.length) { totalItems += cat.items.length; }
      }
      if (totalItems === 0) {
        cortesia();
        return;
      }
      terminado = true;
      iniciarApp(localId);
    };

    document.body.appendChild(s);
  }

  function iniciarApp(localId) {
    estado.localId = localId;
    estado.esDemo = localId === 'demo';
    document.title = (LOCAL.nombre || 'Bodega') + ' — Pedido';
    aplicarColores();
    configurarHeader();
    construirChips();
    renderLista();
    pantallaCargando.classList.add('oculto');
    pantallaError.classList.add('oculto');
    app.classList.remove('oculto');
  }

  // Colores tomados de LOCAL.colores (sección 11).
  function aplicarColores() {
    var c = LOCAL.colores || {};
    var raiz = document.documentElement;
    raiz.style.setProperty('--color-primario', c.primario || '#0B7A3B');
    raiz.style.setProperty('--color-fondo', c.fondo || '#FFFDF6');
    raiz.style.setProperty('--color-texto', c.texto || '#222222');
  }

  function configurarHeader() {
    $('#nombre-local').textContent = LOCAL.nombre || 'Bodega';
    if (LOCAL.logoUrl) {
      var logo = $('#logo');
      logo.src = LOCAL.logoUrl;
      logo.alt = LOCAL.nombre || 'Bodega';
      logo.classList.remove('oculto');
    }
    // 16.3: el único caso especial del demo es la etiqueta visible "DEMO".
    if (estado.esDemo) { $('#badge-demo').classList.remove('oculto'); }
  }

  /* --------------------- Chips de categorías --------------------- */
  function construirChips() {
    var cont = $('#chips');
    var html = '<button type="button" class="chip activo" data-i="-1">Todos</button>';
    for (var i = 0; i < LOCAL.catalogo.length; i++) {
      var cat = LOCAL.catalogo[i];
      if (cat && cat.items && cat.items.length) {
        html += '<button type="button" class="chip" data-i="' + i + '">' + esc(cat.categoria) + '</button>';
      }
    }
    cont.innerHTML = html;
  }

  /* ------------------- Buscador y lista de productos ------------------- */
  function renderLista() {
    var cont = $('#lista-productos');
    var texto = normalizarTexto(estado.buscador.trim());
    var html = '';
    var hayAlgo = false;

    for (var i = 0; i < LOCAL.catalogo.length; i++) {
      var cat = LOCAL.catalogo[i];
      if (!cat || !cat.items || !cat.items.length) { continue; }
      // Un chip filtra a esa categoría; si hay texto en el buscador, el buscador manda.
      if (!texto && estado.chipActivo !== -1 && estado.chipActivo !== i) { continue; }

      var visibles = [];
      for (var j = 0; j < cat.items.length; j++) {
        var it = cat.items[j];
        if (!it) { continue; }
        if (texto && normalizarTexto(it.nombre || '').indexOf(texto) === -1) { continue; }
        visibles.push(it);
      }
      if (!visibles.length) { continue; }

      hayAlgo = true;
      html += '<h3 class="categoria-titulo">' + esc(cat.categoria) + '</h3>';
      for (var k = 0; k < visibles.length; k++) {
        html += filaProducto(visibles[k]);
      }
    }

    if (!hayAlgo) {
      html = '<p class="sin-resultados">Sin resultados. Agrega lo que necesitas en la nota del paso final.</p>';
    }
    cont.innerHTML = html;
    estado.panelAbierto = null;
  }

  // Precio mostrado en la fila: "S/ X.XX", o "desde S/ X.XX" si tiene
  // opciones con precio (el "desde" es el mínimo definido en los DATOS;
  // el código nunca multiplica ni divide precios, sección 8).
  function precioFila(item) {
    var tieneOpciones = Array.isArray(item.opciones) && item.opciones.length > 0;
    if (!tieneOpciones) {
      return { cents: aCentavos(item.precio), desde: false };
    }
    var minimo = null;
    for (var i = 0; i < item.opciones.length; i++) {
      var op = item.opciones[i];
      if (!op || !op.choices) { continue; }
      for (var j = 0; j < op.choices.length; j++) {
        var p = Number(op.choices[j].precio);
        if (isFinite(p) && p > 0) {
          var c = Math.round(p * 100);
          if (minimo === null || c < minimo) { minimo = c; }
        }
      }
    }
    if (minimo !== null) { return { cents: minimo, desde: true }; }
    return { cents: aCentavos(item.precio), desde: false };
  }

  function filaProducto(item) {
    var agotado = item.agotado === true;
    var tieneOpciones = Array.isArray(item.opciones) && item.opciones.length > 0;
    var precio = precioFila(item);
    var precioTxt = (precio.desde ? 'desde ' : '') + fmt(precio.cents);

    var html = '<div class="producto' + (agotado ? ' agotado' : '') + '">'
      + '<div class="producto-fila">'
      + '<div class="producto-info">'
      + '<span class="producto-nombre">' + esc(item.nombre) + '</span>'
      + '<span class="producto-precio">' + precioTxt + '</span>'
      + (agotado ? '<span class="chip-agotado">AGOTADO</span>' : '')
      + '</div>'
      + (agotado
          ? ''
          : '<button type="button" class="boton-mas" data-id="' + esc(item.id) + '" aria-label="Agregar ' + esc(item.nombre) + '">+</button>')
      + '</div>';
    if (!agotado && tieneOpciones) {
      html += '<div class="panel-opciones oculto" data-panel="' + esc(item.id) + '">'
        + panelOpciones(item) + '</div>';
    }
    html += '</div>';
    return html;
  }

  // Precio de línea según la selección: el precio de la PRIMERA choice
  // elegida que defina precio; si ninguna lo define, el precio del ítem
  // (regla de la sección 5). El código NO calcula precios.
  function precioLinea(item, panel) {
    var cents = null;
    if (panel) {
      var grupos = panel.querySelectorAll('.opcion');
      for (var i = 0; i < grupos.length && i < item.opciones.length; i++) {
        var elegido = grupos[i].querySelector('input:checked');
        if (elegido) {
          var ch = item.opciones[i].choices[parseInt(elegido.value, 10)];
          var p = ch ? Number(ch.precio) : NaN;
          if (isFinite(p) && p > 0) { cents = Math.round(p * 100); break; }
        }
      }
    }
    if (cents === null) { cents = aCentavos(item.precio); }
    return cents;
  }

  // Precio con la selección por defecto (primera choice de cada opción).
  function precioDefault(item) {
    var cents = null;
    if (Array.isArray(item.opciones)) {
      for (var i = 0; i < item.opciones.length; i++) {
        var op = item.opciones[i];
        if (op && op.choices && op.choices.length) {
          var p = Number(op.choices[0].precio);
          if (isFinite(p) && p > 0) { cents = Math.round(p * 100); break; }
        }
      }
    }
    if (cents === null) { cents = aCentavos(item.precio); }
    return cents;
  }

  function panelOpciones(item) {
    var html = '';
    for (var i = 0; i < item.opciones.length; i++) {
      var op = item.opciones[i];
      html += '<div class="opcion"><div class="opcion-tipo">' + esc(op.tipo || 'Opción') + '</div>';
      for (var j = 0; j < op.choices.length; j++) {
        var ch = op.choices[j];
        // En Fase 1 la primera choice va preseleccionada (sección 5).
        html += '<label class="opcion-choice">'
          + '<input type="radio" name="opt-' + esc(item.id) + '-' + i + '" value="' + j + '"' + (j === 0 ? ' checked' : '') + '>'
          + '<span>' + esc(ch.nombre) + '</span>'
          + '</label>';
      }
      html += '</div>';
    }
    html += '<button type="button" class="boton-agregar" data-id="' + esc(item.id) + '">'
      + 'Agregar — ' + fmt(precioDefault(item)) + '</button>';
    return html;
  }

  function buscarItem(id) {
    for (var i = 0; i < LOCAL.catalogo.length; i++) {
      var cat = LOCAL.catalogo[i];
      if (!cat || !cat.items) { continue; }
      for (var j = 0; j < cat.items.length; j++) {
        if (cat.items[j].id === id) { return cat.items[j]; }
      }
    }
    return null;
  }

  function cerrarPaneles() {
    var abiertos = document.querySelectorAll('.panel-opciones:not(.oculto)');
    for (var i = 0; i < abiertos.length; i++) { abiertos[i].classList.add('oculto'); }
    estado.panelAbierto = null;
  }

  /* --------------------------- Carrito --------------------------- */
  // Mismo producto con las mismas opciones -> se consolida en UNA línea
  // sumando cantidad (decisión deliberada de la sección 7).
  function agregarAlCarrito(item, seleccion) {
    var nombres = seleccion.map(function (s) { return s.nombre; });
    var key = item.id + '|' + nombres.join('||');
    for (var i = 0; i < estado.carrito.length; i++) {
      if (estado.carrito[i].key === key) {
        estado.carrito[i].qty += 1;
        return;
      }
    }
    estado.carrito.push({
      key: key,
      itemId: item.id,
      nombre: item.nombre,
      opciones: seleccion,
      unitCents: precioUnitario(item, seleccion),
      qty: 1
    });
  }

  function precioUnitario(item, seleccion) {
    for (var i = 0; i < seleccion.length; i++) {
      var p = Number(seleccion[i].precio);
      if (isFinite(p) && p > 0) { return Math.round(p * 100); }
    }
    return aCentavos(item.precio);
  }

  function agregarConPanel(item, panel) {
    var seleccion = [];
    var grupos = panel.querySelectorAll('.opcion');
    for (var i = 0; i < grupos.length && i < item.opciones.length; i++) {
      var op = item.opciones[i];
      var elegido = grupos[i].querySelector('input:checked');
      var ch = op.choices[parseInt(elegido.value, 10)];
      seleccion.push({ tipo: op.tipo, nombre: ch.nombre, precio: ch.precio });
    }
    agregarAlCarrito(item, seleccion);
    renderCarrito();
    renderLista(); // cierra el panel y restablece las selecciones por defecto
  }

  // Totales SIEMPRE en centavos enteros (sección 8).
  function totalCentavos() {
    var t = 0;
    for (var i = 0; i < estado.carrito.length; i++) {
      t += estado.carrito[i].unitCents * estado.carrito[i].qty;
    }
    return t;
  }

  function totalCantidad() {
    var n = 0;
    for (var i = 0; i < estado.carrito.length; i++) { n += estado.carrito[i].qty; }
    return n;
  }

  function actualizarBotonCarrito() {
    var btn = $('#boton-carrito');
    var n = totalCantidad();
    if (n > 0 && !overlayAbierto()) {
      btn.textContent = 'Ver pedido (' + n + ') — ' + fmt(totalCentavos());
      btn.classList.remove('oculto');
    } else {
      btn.classList.add('oculto');
    }
  }

  function renderCarrito() {
    var cont = $('#contenido-carrito');
    var html = '';
    if (!estado.carrito.length) {
      html = '<p class="carrito-vacio">Tu pedido está vacío. Agrega productos desde la lista.</p>';
    } else {
      html = '<ul class="lista-carrito">';
      for (var i = 0; i < estado.carrito.length; i++) {
        var l = estado.carrito[i];
        var lineCents = l.unitCents * l.qty;
        var opcionesTxt = l.opciones.map(function (o) { return o.nombre; }).join(', ');
        html += '<li class="linea-carrito" data-idx="' + i + '">'
          + '<div class="linea-txt">'
          + '<div class="linea-nombre">' + esc(l.nombre)
          + (opcionesTxt ? ' <span class="linea-opciones">(' + esc(opcionesTxt) + ')</span>' : '')
          + '</div>'
          + '<div class="linea-precio">' + fmt(lineCents) + '</div>'
          + '</div>'
          + '<div class="linea-controles">'
          + '<button type="button" class="boton-qty" data-accion="menos"'
          + (l.qty <= 1 ? ' disabled aria-disabled="true"' : '')
          + ' aria-label="Quitar uno">−</button>'
          + '<span class="qty">' + l.qty + '</span>'
          + '<button type="button" class="boton-qty" data-accion="mas" aria-label="Agregar uno">+</button>'
          + '<button type="button" class="boton-quitar" data-accion="quitar">Quitar</button>'
          + '</div>'
          + '</li>';
      }
      html += '</ul>';
    }
    cont.innerHTML = html;
    $('#total-carrito').textContent = 'TOTAL: ' + fmt(totalCentavos());
    $('#ver-pedido').disabled = estado.carrito.length === 0;
    actualizarBotonCarrito();
  }

  /* ------------------------ Confirmación ------------------------ */
  function renderConfirmar() {
    var cont = $('#resumen-confirmar');
    var html = '<h3 class="resumen-titulo">Resumen</h3><ul class="lista-resumen">';
    for (var i = 0; i < estado.carrito.length; i++) {
      var l = estado.carrito[i];
      var opcionesTxt = l.opciones.map(function (o) { return o.nombre; }).join(', ');
      html += '<li class="linea-resumen"><span>' + l.qty + 'x ' + esc(l.nombre)
        + (opcionesTxt ? ' (' + esc(opcionesTxt) + ')' : '')
        + '</span><strong>' + fmt(l.unitCents * l.qty) + '</strong></li>';
    }
    html += '</ul><div class="total-confirmar">TOTAL: ' + fmt(totalCentavos()) + '</div>';
    cont.innerHTML = html;
    actualizarValidacion();
  }

  function horaSeleccionada() {
    var elegido = document.querySelector('input[name="hora"]:checked');
    return elegido ? elegido.value : '15';
  }

  function pagoSeleccionado() {
    var elegido = document.querySelector('input[name="pago"]:checked');
    return elegido ? elegido.value : 'exacto';
  }

  // Sección 9: validación de pago (a) bloqueante, (b) aviso no bloqueante)
  // + "Otra hora" sin hora (sección 12). Se revalida al confirmar.
  function actualizarValidacion() {
    var total = totalCentavos();
    var pago = pagoSeleccionado();
    var bloqueado = false;

    // "Otra hora" sin hora elegida: no se puede confirmar, aviso inline.
    var esOtra = horaSeleccionada() === 'otra';
    $('#campo-hora-otra').classList.toggle('oculto', !esOtra);
    var errorHora = $('#error-hora');
    if (esOtra && !$('#hora-otra').value) {
      errorHora.textContent = 'Elige la hora a la que pasarás por el local.';
      errorHora.classList.remove('oculto');
      bloqueado = true;
    } else {
      errorHora.classList.add('oculto');
    }

    var errorPago = $('#error-pago');
    var avisoBillete = $('#aviso-billete');
    var vueltoInfo = $('#vuelto-info');
    errorPago.classList.add('oculto');
    avisoBillete.classList.add('oculto');
    vueltoInfo.classList.add('oculto');

    if (pago !== 'exacto') {
      var billeteCents = parseInt(pago, 10) * 100;
      if (billeteCents < total) {
        // (a) billete < total: BLOQUEAR confirmar.
        errorPago.textContent = 'El billete es menor que el total. Elige otro billete o monto exacto.';
        errorPago.classList.remove('oculto');
        bloqueado = true;
      } else {
        // (b) billete > 3 x total: aviso visible pero NO bloqueante.
        if (billeteCents > total * 3) {
          avisoBillete.textContent = 'Para compras pequeñas el local podría no tener vuelto para billetes grandes. Considera pagar monto exacto.';
          avisoBillete.classList.remove('oculto');
        }
        // Vuelto = billete - total (sección 8).
        var vuelto = billeteCents - total;
        if (vuelto > 0) {
          vueltoInfo.textContent = 'Vuelto a preparar: ' + fmt(vuelto);
          vueltoInfo.classList.remove('oculto');
        }
      }
    }

    $('#confirmar').disabled = bloqueado;
  }

  /* --------------------- Mensaje de WhatsApp --------------------- */
  // Sección 10: plantilla exacta. Los emojis SOLO encabezan líneas.
  function construirMensaje() {
    var total = totalCentavos();
    var lineas = [];

    lineas.push('🛒 NUEVO PEDIDO — ' + LOCAL.nombre);

    for (var i = 0; i < estado.carrito.length; i++) {
      var l = estado.carrito[i];
      var opcionesTxt = l.opciones.map(function (o) { return o.nombre; }).join(', ');
      lineas.push(l.qty + 'x ' + l.nombre + (opcionesTxt ? ' (' + opcionesTxt + ')' : '')
        + ' — ' + fmt(l.unitCents * l.qty));
    }

    var hora = horaSeleccionada();
    if (hora === '15') { lineas.push('⏱️ Recojo: en 15 min'); }
    else if (hora === '30') { lineas.push('⏱️ Recojo: en 30 min'); }
    else if (hora === '60') { lineas.push('⏱️ Recojo: en 1 hora'); }
    else { lineas.push('⏱️ Recojo: hoy ' + $('#hora-otra').value); }

    var pago = pagoSeleccionado();
    if (pago === 'exacto') {
      lineas.push('💳 Pago: efectivo, monto exacto');
    } else {
      lineas.push('💳 Pago: efectivo, billete S/ ' + pago);
      var vuelto = parseInt(pago, 10) * 100 - total;
      if (vuelto > 0) { lineas.push('💵 Vuelto a preparar: ' + fmt(vuelto)); }
    }

    lineas.push('💰 TOTAL: ' + fmt(total));

    // Nota opcional: si está vacía, se OMITE la línea completa.
    var nota = $('#nota').value.trim();
    if (nota) { lineas.push('📝 Nota: ' + nota); }

    lineas.push('Si algo no hay, avísame antes de armar. ¡Gracias!');

    return lineas.join('\n');
  }

  // En móvil wa.me; en desktop web.whatsapp.com/send con el mismo texto.
  // El cliente presiona Enviar manualmente.
  function abrirWhatsApp(texto) {
    var codificado = encodeURIComponent(texto);
    var esMovil = /Android|iPhone|iPad|iPod|Mobile|Windows Phone/i.test(navigator.userAgent);
    var url = esMovil
      ? 'https://wa.me/' + LOCAL.whatsappCaja + '?text=' + codificado
      : 'https://web.whatsapp.com/send?phone=' + LOCAL.whatsappCaja + '&text=' + codificado;

    // 16.4: techo duro 1200 caracteres codificados; el enlace se genera igual.
    if (typeof console !== 'undefined' && console.info) {
      console.info('Mensaje WhatsApp (caracteres codificados):', codificado.length);
    }

    var a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  /* -------------------------- Eventos -------------------------- */
  // Buscador: filtra en tiempo real.
  $('#buscador').addEventListener('input', function () {
    estado.buscador = $('#buscador').value;
    renderLista();
  });

  // Chips de categorías.
  $('#chips').addEventListener('click', function (e) {
    var chip = e.target.closest('.chip');
    if (!chip) { return; }
    estado.chipActivo = parseInt(chip.getAttribute('data-i'), 10);
    var chips = document.querySelectorAll('#chips .chip');
    for (var i = 0; i < chips.length; i++) {
      chips[i].classList.toggle('activo', chips[i] === chip);
    }
    renderLista();
    window.scrollTo(0, 0);
  });

  // Lista de productos: "+" (directo o despliega opciones) y "Agregar — S/ X.XX".
  $('#lista-productos').addEventListener('click', function (e) {
    var t = e.target;
    var botonMas = t.closest('.boton-mas');
    if (botonMas) {
      var item = buscarItem(botonMas.getAttribute('data-id'));
      if (!item) { return; }
      var tieneOpciones = Array.isArray(item.opciones) && item.opciones.length > 0;
      if (!tieneOpciones) {
        // Producto sin opciones: "+" agrega directo.
        agregarAlCarrito(item, []);
        renderCarrito();
        return;
      }
      // Producto con opciones: "+" despliega las opciones inline.
      var panel = botonMas.closest('.producto').querySelector('.panel-opciones');
      if (!panel) { return; }
      var estabaAbierto = !panel.classList.contains('oculto');
      cerrarPaneles();
      if (!estabaAbierto) {
        panel.classList.remove('oculto');
        estado.panelAbierto = item.id;
      }
      return;
    }
    var botonAgregar = t.closest('.boton-agregar');
    if (botonAgregar) {
      var itemAgr = buscarItem(botonAgregar.getAttribute('data-id'));
      var panelAgr = botonAgregar.closest('.panel-opciones');
      if (itemAgr && panelAgr) { agregarConPanel(itemAgr, panelAgr); }
    }
  });

  // Cambio de choice: actualiza el precio dinámico del botón "Agregar".
  $('#lista-productos').addEventListener('change', function (e) {
    if (e.target && e.target.type === 'radio') {
      var panel = e.target.closest('.panel-opciones');
      var boton = panel.querySelector('.boton-agregar');
      var item = buscarItem(boton.getAttribute('data-id'));
      boton.textContent = 'Agregar — ' + fmt(precioLinea(item, panel));
    }
  });

  // Carrito: - / + / Quitar.
  $('#contenido-carrito').addEventListener('click', function (e) {
    var boton = e.target.closest('[data-accion]');
    if (!boton) { return; }
    var lineaEl = boton.closest('.linea-carrito');
    if (!lineaEl) { return; }
    var idx = parseInt(lineaEl.getAttribute('data-idx'), 10);
    var l = estado.carrito[idx];
    if (!l) { return; }
    var accion = boton.getAttribute('data-accion');
    if (accion === 'mas') { l.qty += 1; }
    else if (accion === 'menos') { if (l.qty > 1) { l.qty -= 1; } }
    else if (accion === 'quitar') { estado.carrito.splice(idx, 1); }
    renderCarrito();
  });

  // Navegación entre pantallas.
  $('#boton-carrito').addEventListener('click', mostrarCarrito);
  $('#volver-lista').addEventListener('click', mostrarLista);
  $('#ver-pedido').addEventListener('click', mostrarConfirmar);
  $('#volver-carrito').addEventListener('click', mostrarCarrito);
  $('#editar-pedido').addEventListener('click', mostrarCarrito);

  // Confirmación: hora y pago revalidan en vivo.
  function enRadios(selector, fn) {
    var nodos = document.querySelectorAll(selector);
    for (var i = 0; i < nodos.length; i++) { nodos[i].addEventListener('change', fn); }
  }
  enRadios('input[name="hora"]', actualizarValidacion);
  enRadios('input[name="pago"]', actualizarValidacion);
  $('#hora-otra').addEventListener('input', actualizarValidacion);

  // Nota: contador de caracteres (máximo 80).
  $('#nota').addEventListener('input', function () {
    $('#contador-nota').textContent = $('#nota').value.length;
  });

  // Confirmar: revalida (sección 9) y abre el enlace de WhatsApp.
  $('#confirmar').addEventListener('click', function () {
    actualizarValidacion();
    var esOtra = horaSeleccionada() === 'otra';
    if (esOtra && !$('#hora-otra').value) { return; }
    var pago = pagoSeleccionado();
    var total = totalCentavos();
    if (pago !== 'exacto' && parseInt(pago, 10) * 100 < total) { return; }
    abrirWhatsApp(construirMensaje());
  });

  iniciar();
})();
