//=========================================
// CARGAR CARRITO
//=========================================

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contenedor = document.getElementById("carrito-items");

const totalProductos = document.getElementById("total-productos");

const totalMetros = document.getElementById("total-metros");

//=========================================
// MOSTRAR CARRITO
//=========================================

function mostrarCarrito() {

    contenedor.innerHTML = "";

    if (carrito.length === 0) {

        contenedor.innerHTML = `

            <div class="alert alert-info">

                No hay productos agregados.

            </div>

        `;

        totalProductos.textContent = 0;
        totalMetros.textContent = 0;

        return;

    }

    let metros = 0;

    carrito.forEach((producto, index) => {

        metros += producto.metros;

        contenedor.innerHTML += `

        <div class="card mb-4 shadow-sm">

            <div class="row g-0">

                <div class="col-md-3">

                    <img
                        src="${producto.imagen}"
                        class="img-fluid rounded-start"
                        alt="${producto.nombre}">

                </div>

                <div class="col-md-9">

                    <div class="card-body">

                        <h4>

                            ${producto.nombre}

                        </h4>

                        <p>

                            Categoría:
                            ${producto.categoria}

                        </p>

                        <div class="d-flex align-items-center gap-2 mt-3">

    <button
        class="btn btn-outline-secondary"
        onclick="disminuirCantidad(${index})">

        -

    </button>

    <span class="fw-bold fs-5">

        ${producto.metros.toLocaleString()} m

    </span>

    <button
        class="btn btn-outline-primary"
        onclick="aumentarCantidad(${index})">

        +

    </button>

</div>

<button
    class="btn btn-danger mt-4"
    onclick="eliminarProducto(${index})">

    Eliminar

</button>

                    </div>

                </div>

            </div>

        </div>

        `;

    });

    totalProductos.textContent = carrito.length;

    totalMetros.textContent = metros;

}

//=========================================
// ELIMINAR
//=========================================

function eliminarProducto(index) {

    carrito.splice(index, 1);

    localStorage.setItem(

        "carrito",

        JSON.stringify(carrito)

    );

    mostrarCarrito();

}

//=========================================

mostrarCarrito();


function aumentarCantidad(index) {

    carrito[index].metros += 100;

    localStorage.setItem(

        "carrito",

        JSON.stringify(carrito)

    );

    mostrarCarrito();

}

function disminuirCantidad(index) {

    if (carrito[index].metros <= 5000) {

        alert("El pedido mínimo es de 5,000 metros.");

        return;

    }

    carrito[index].metros -= 100;

    localStorage.setItem(

        "carrito",

        JSON.stringify(carrito)

    );

    mostrarCarrito();

}

function irCotizacion() {

    if (carrito.length === 0) {

        alert("Agrega al menos un producto.");

        return;

    }

    window.location.href = "cotizacion.html";

}