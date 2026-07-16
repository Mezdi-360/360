//==================================================
// MEZDI - PRODUCTOS
//==================================================

//==========================
// BASE DE PRODUCTOS
//==========================

const productos = [

    {
        id: 1,
        nombre: "MEZDI BLACK",
        categoria: "Denim",
        precio: 395,
        imagen: "images/rigida.jpg"
    },

    {
        id: 2,
        nombre: "MEZDI BLUE",
        categoria: "Denim",
        precio: 420,
        imagen: "images/rigida.jpg"
    },

    {
        id: 3,
        nombre: "MEZDI STRETCH",
        categoria: "Stretch",
        precio: 450,
        imagen: "images/rigida.jpg"
    },

    {
        id: 4,
        nombre: "MEZDI GRIS",
        categoria: "Premium",
        precio: 390,
        imagen: "images/rigida.jpg"
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

            <div class="card h-100 shadow-sm">

                <img
                    src="${producto.imagen}"
                    class="card-img-top"
                    alt="${producto.nombre}">

                <div class="card-body d-flex flex-column">

                    <h5 class="fw-bold">
                        ${producto.nombre}
                    </h5>

                    <p class="text-muted">
                        ${producto.categoria}
                    </p>


                    <button
                        class="btn btn-primary mt-auto"
                        onclick="agregarCotizacion(${producto.id})">

                        Solicitar Cotización

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

function agregarCotizacion(id) {

    const producto = productos.find(p => p.id === id);

    if (!producto) {

        alert("Producto no encontrado.");

        return;

    }

    let metros = prompt(

        `Ingrese la cantidad de metros.

Pedido mínimo: 5000 metros

Incrementos de: 100 metros`

        , "5000");

    if (metros === null) {

        return;

    }

    metros = parseInt(metros);

    if (isNaN(metros)) {

        alert("Ingrese una cantidad válida.");

        return;

    }

    if (metros < 5000) {

        alert("El pedido mínimo es de 5,000 metros.");

        return;

    }

    if (metros % 100 !== 0) {

        alert("Solo se permiten múltiplos de 100.");

        return;

    }

    // Buscar si ya existe

    const existe = carrito.find(item => item.id === id);

    if (existe) {

        existe.metros += metros;

    } else {

        carrito.push({

            id: producto.id,

            nombre: producto.nombre,

            categoria: producto.categoria,

            imagen: producto.imagen,

            metros: metros

        });

    }

    localStorage.setItem(

        "carrito",

        JSON.stringify(carrito)

    );

    alert(

        `${producto.nombre}

Agregado correctamente.

Cantidad total:

${carrito.find(item => item.id === id).metros} metros`

    );

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