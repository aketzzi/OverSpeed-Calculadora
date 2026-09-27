// ==========================================
//              OVERSPEED
//          SISTEMA DE PRECIOS
// ==========================================


// ==========================================
//              PRECIOS TUNING
// ==========================================

const tuning = [

    {
        nombre: "MOTOR V8",
        precio: 50000
    },

    {
        nombre: "FRENOS CERÁMICOS",
        precio: 15000
    },

    {
        nombre: "TURBOCHARGING",
        precio: 30000
    },

    {
        nombre: "TRACCIÓN AWD",
        precio: 10000
    },

    {
        nombre: "TRACCIÓN RWD",
        precio: 9000
    },

    {
        nombre: "TRACCIÓN FWD",
        precio: 8000
    },

    {
        nombre: "NEUMÁTICOS SLICKS",
        precio: 7000
    },

    {
        nombre: "NEUMÁTICOS SEMI-SLICK",
        precio: 6500
    },

    {
        nombre: "NEUMÁTICOS OFFROAD",
        precio: 6000
    }

];


// ==========================================
//          PRECIOS MODIFICACIONES
// ==========================================

const modificaciones = [

    {
        nombre: "COSMÉTICOS",
        precio: 3500
    },

    {
        nombre: "RENDIMIENTO",
        precio: 9500
    },

    {
        nombre: "SET DE RINES",
        precio: 8500
    },

    {
        nombre: "KIT DE SUSPENSIÓN",
        precio: 3000
    },

    {
        nombre: "REPARACIÓN",
        precio: 700
    },

    {
        nombre: "PINTURA",
        precio: 1500
    },

    {
        nombre: "KIT DE HUMO",
        precio: 8000
    },

    {
        nombre: "KIT DE EXTRAS",
        precio: 5000
    },

    {
        nombre: "KIT DE LIMPIEZA",
        precio: 350
    }

];


// ==========================================
//          VARIABLES
// ==========================================

// false = cliente
// true = convenio

let precioConvenio = false;


// Guardamos las cantidades seleccionadas

let cantidades = {};


// ==========================================
//          OBTENER PRECIO
// ==========================================

function obtenerPrecio(precio) {

    if (precioConvenio) {

        return precio * 0.90;

    }

    return precio;

}


// ==========================================
//          FORMATEAR PRECIO
// ==========================================

function formatearPrecio(precio) {

    return Math.round(precio).toLocaleString("es-ES") + " $";

}


// ==========================================
//          CREAR PRODUCTO
// ==========================================

function crearProducto(producto) {

    const elemento = document.createElement("div");

    elemento.className = "producto";

    const cantidad = cantidades[producto.nombre] || 0;

    const precioActual = obtenerPrecio(producto.precio);

    elemento.innerHTML = `

        <div class="informacion-producto">

            <div class="nombre-producto">
                ${producto.nombre}
            </div>

            <div class="precio-producto">
                ${formatearPrecio(precioActual)}
            </div>

        </div>


        <div class="controles">

            <button
                class="boton-cantidad menos"
                onclick="quitarProducto('${producto.nombre}')">

                −

            </button>


            <span
                class="cantidad"
                id="cantidad-${producto.nombre}">

                ${cantidad}

            </span>


            <button
                class="boton-cantidad mas"
                onclick="anadirProducto('${producto.nombre}')">

                +

            </button>


            <button
                class="boton-eliminar"
                onclick="eliminarProducto('${producto.nombre}')">

                🗑

            </button>

        </div>

    `;

    return elemento;

}


// ==========================================
//          CARGAR PRODUCTOS
// ==========================================

function cargarPrecios() {

    const contenedorTuning =
        document.getElementById("tuning");

    const contenedorModificaciones =
        document.getElementById("modificaciones");


    contenedorTuning.innerHTML = "";

    contenedorModificaciones.innerHTML = "";


    tuning.forEach(producto => {

        contenedorTuning.appendChild(
            crearProducto(producto)
        );

    });


    modificaciones.forEach(producto => {

        contenedorModificaciones.appendChild(
            crearProducto(producto)
        );

    });


    actualizarResumen();

}


// ==========================================
//          AÑADIR PRODUCTO
// ==========================================

function anadirProducto(nombre) {

    if (!cantidades[nombre]) {

        cantidades[nombre] = 0;

    }


    cantidades[nombre]++;


    cargarPrecios();

}


// ==========================================
//          QUITAR PRODUCTO
// ==========================================

function quitarProducto(nombre) {

    if (!cantidades[nombre]) {

        return;

    }


    cantidades[nombre]--;


    if (cantidades[nombre] <= 0) {

        delete cantidades[nombre];

    }


    cargarPrecios();

}


// ==========================================
//          ELIMINAR PRODUCTO
// ==========================================

function eliminarProducto(nombre) {

    delete cantidades[nombre];

    cargarPrecios();

}


// ==========================================
//          PRECIO CLIENTE
// ==========================================

function seleccionarCliente() {

    precioConvenio = false;

    document
        .getElementById("cliente")
        .classList.add("activo");

    document
        .getElementById("convenio")
        .classList.remove("activo");


    cargarPrecios();

}


// ==========================================
//          PRECIO CONVENIO
// ==========================================

function seleccionarConvenio() {

    precioConvenio = true;

    document
        .getElementById("convenio")
        .classList.add("activo");

    document
        .getElementById("cliente")
        .classList.remove("activo");


    cargarPrecios();

}


// ==========================================
//              TOTAL
// ==========================================

function actualizarResumen() {

    let cantidadTotal = 0;

    let precioTotal = 0;


    const todosLosProductos = [
        ...tuning,
        ...modificaciones
    ];


    todosLosProductos.forEach(producto => {

        const cantidad =
            cantidades[producto.nombre] || 0;


        cantidadTotal += cantidad;


        const precio =
            obtenerPrecio(producto.precio);


        precioTotal += precio * cantidad;

    });


    document.getElementById(
        "cantidad-total"
    ).textContent = cantidadTotal;


    document.getElementById(
        "precio-total"
    ).textContent = formatearPrecio(precioTotal);

}


// ==========================================
//              REINICIAR
// ==========================================

function reiniciar() {

    cantidades = {};

    cargarPrecios();

}


// ==========================================
//          INICIAR PÁGINA
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        cargarPrecios();

    }
);