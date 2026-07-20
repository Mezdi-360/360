//==================================================
// MEZDI - PRODUCTOS
//==================================================

//==========================
// BASE DE PRODUCTOS
//==========================

const productos = [

    {
        id: 1,
        nombre: "JEANS MISTICA",
        categoria: "Denim",
        peso: "14 oz",
        composicion: "100% Algodón",
        color: "INDIGO",
        acabado: "STRECH",
        disponibilidad: "En existencia",
        imagen: "images/mistica2.webp"
    },
    {
        id: 2,
        nombre: "JEANS TITANIO",
        categoria: "Denim",
        peso: "13 oz",
        composicion: "100% Algodón",
        ancho: "170 cm",
        color: "Azul Índigo",
        acabado: "Rígido",
        disponibilidad: "En existencia",
        imagen: "images/titanio1.webp"
    },

    {
        id: 3,
        nombre: "JEANS IRON",
        categoria: "Stretch",
        peso: "12 oz",
        composicion: "98% Alg / 2% E",
        ancho: "170 cm",
        color: "Azul Medio",
        acabado: "Stretch",
        disponibilidad: "En existencia",
        imagen: "images/iron2.webp"
    },

    {
        id: 4,
        nombre: "JEANS BUFALO",
        categoria: "Premium",
        peso: "14 oz",
        composicion: "100% Algodón",
        color: "INDIGO",
        acabado: "Sanforizado",
        disponibilidad: "En existencia",
        imagen: "images/bufalo3.webp"
    },

    {
        id: 5,
        nombre: "JEANS GALAXIA",
        categoria: "Premium",
        peso: "13.5 oz",
        composicion: "100% Algodón",
        ancho: "170 cm",
        color: "Azul Vintage",
        acabado: "Lavado Vintage",
        disponibilidad: "En producción",
        imagen: "images/galaxia2.webp"
    },

    {
        id: 6,
        nombre: "JEANS ELEKTRA",
        categoria: "Denim",
        peso: "14 oz",
        composicion: "100% Algodón",
        ancho: "170 cm",
        color: "NEGRO",
        acabado: "Rígido",
        disponibilidad: "En existencia",
        imagen: "images/elektra2.webp"
    },
    {
        id: 7,
        nombre: "JEANS VALQUIRIA",
        categoria: "Denim",
        peso: "14 oz",
        composicion: "100% Algodón",
        ancho: "170 cm",
        color: "NEGRO",
        acabado: "Rígido",
        disponibilidad: "En existencia",
        imagen: "images/valquiria.webp"
    },
    {
        id: 8,
        nombre: "JEANS TRITON",
        categoria: "Denim",
        peso: "14 oz",
        composicion: "100% Algodón",
        ancho: "170 cm",
        color: "INDIGO",
        acabado: "Rígido",
        disponibilidad: "En existencia",
        imagen: "images/triton.webp"
    },
    {
        id: 9,
        nombre: "JEANS TANHOS",
        categoria: "Denim",
        peso: "14 oz",
        composicion: "100% Algodón",
        ancho: "170 cm",
        color: "NEGRO",
        acabado: "Rígido",
        disponibilidad: "En existencia",
        imagen: "images/tanos.webp"
    },
    {
        id:10,
        nombre: "JEANS PANTERA NEGRA",
        categoria: "Denim",
        peso: "14 oz",
        composicion: "100% Algodón",
        ancho: "170 cm",
        color: "NEGRO",
        acabado: "Rígido",
        disponibilidad: "En existencia",
        imagen: "images/pnegra.webp"
    }

];

//==========================
// CONTENEDOR
//==========================

const contenedor = document.getElementById("contenedor-productos");

//==========================
// CARRITO
//==========================

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//==========================
// MOSTRAR PRODUCTOS
//==========================

function mostrarProductos(lista) {

    contenedor.innerHTML = "";

    lista.forEach(producto => {

        contenedor.innerHTML += `

        <div class="col-xl-3 col-lg-4 col-md-6 mb-4">

    <div class="producto-card h-100">

        <div class="producto-imagen">

            <img
                src="${producto.imagen}"
                alt="${producto.nombre}">

            <span class="badge-categoria">

                ${producto.categoria}

            </span>

        </div>

        <div class="producto-info">

            <div class="estrellas">

                ★★★★★

            </div>

            <h4>

                ${producto.nombre}

            </h4>

            <ul>
                <li>${producto.composicion}</li>

                <li>${producto.peso}</li>

            </ul>

            <div class="estado">

                <span class="circulo"></span>

                Disponible

            </div>

            <button
                class="btn btn-mezdi w-100 mt-4"
                onclick="abrirModal(${producto.id})">

                Ver Detalles

            </button>

        </div>

    </div>

</div>
        `;

    });

}

//==========================
// AGREGAR AL CARRITO
//==========================
async function agregarCotizacion(id) {

    const producto = productos.find(p => p.id === id);

    if (!producto) {

        alertaError(
            "Producto no encontrado",
            "No fue posible localizar el producto seleccionado."
        );

        return;

    }

    const { value: metros } = await Swal.fire({

        title: producto.nombre,

        html: `
            <p class="mb-2">
                Ingresa la cantidad de metros
            </p>

            <small class="text-muted">
                Pedido mínimo: <b>5,000 m</b><br>
                Incrementos de <b>100 m</b>
            </small>
        `,

        input: "number",

        inputValue: 5000,

        inputAttributes: {

            min: 25,

            step: 1

        },

        showCancelButton: true,

        confirmButtonText: "Agregar",

        cancelButtonText: "Cancelar",

        confirmButtonColor: "#0A4A8A",

        cancelButtonColor: "#6c757d"

    });

    if (metros === undefined) {

        return;

    }

    const cantidad = parseInt(metros);

    if (isNaN(cantidad)) {

        alertaError(
            "Cantidad inválida",
            "Ingresa un número válido."
        );

        return;

    }

    if (cantidad < 25) {

        alertaAdvertencia(
            "Pedido mínimo",
            "La compra mínima es de <b>5,000 metros</b>."
        );

        return;

    }

    if (cantidad % 1 !== 0) {

        alertaError(
            "Cantidad inválida",
            "Solo se permiten múltiplos de <b>1</b>."
        );

        return;

    }

    const existe = carrito.find(item => item.id === id);

    if (existe) {

        existe.metros += cantidad;

    } else {

        carrito.push({

            id: producto.id,

            nombre: producto.nombre,

            categoria: producto.categoria,

            imagen: producto.imagen,

            metros: cantidad

        });

    }

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    Swal.fire({

        icon: "success",

        title: "Producto agregado",

        html: `
            <h4>${producto.nombre}</h4>

            <p>

                Cantidad total:

                <b>${carrito.find(item => item.id === id).metros.toLocaleString()} m</b>

            </p>

            ¿Qué deseas hacer?

        `,

        showCancelButton: true,

        confirmButtonText: "🛒 Ver Cotización",

        cancelButtonText: "Seguir Comprando",

        confirmButtonColor: "#0A4A8A",

        cancelButtonColor: "#6c757d"

    }).then((result) => {

        if (result.isConfirmed) {

            window.location.href = "carrito.html";

        }

    });

}
//==========================
// FILTRAR
//==========================

const botonesFiltro = document.querySelectorAll(".btn-filtro");

botonesFiltro.forEach(boton => {

    boton.addEventListener("click", () => {

        const categoria = boton.dataset.categoria;

        if (categoria === "Todos") {

            mostrarProductos(productos);

        } else {

            const filtrados = productos.filter(

                producto => producto.categoria === categoria

            );

            mostrarProductos(filtrados);

        }

    });

});

//==========================
// BUSCADOR
//==========================

const buscador = document.getElementById("buscador");

if (buscador) {

    buscador.addEventListener("keyup", () => {

        const texto = buscador.value.toLowerCase();

        const resultado = productos.filter(producto =>

            producto.nombre.toLowerCase().includes(texto)

        );

        mostrarProductos(resultado);

    });

}

//==========================
// INICIAR
//==========================

mostrarProductos(productos);