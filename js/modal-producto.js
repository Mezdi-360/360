//===========================================
// MODAL PRODUCTO
//===========================================

let productoSeleccionado = null;

let cantidad = 5000;

//===========================================
// ABRIR MODAL
//===========================================

function abrirModal(id) {

    productoSeleccionado = productos.find(

        p => p.id === id

    );

    if (!productoSeleccionado) {

        return;

    }

    cantidad = 25;

    document.getElementById("modalImagen").src =
        productoSeleccionado.imagen;

    document.getElementById("modalNombre").textContent =
        productoSeleccionado.nombre;

    document.getElementById("modalCategoria").textContent =
        productoSeleccionado.categoria;

    document.getElementById("modalPeso").textContent =
        productoSeleccionado.peso;

    document.getElementById("modalComposicion").textContent =
        productoSeleccionado.composicion;


    document.getElementById("modalAcabado").textContent =
        productoSeleccionado.acabado;

    document.getElementById("cantidadMetros").textContent =
        cantidad.toLocaleString();

    const modal = new bootstrap.Modal(

        document.getElementById("modalProducto")

    );

    modal.show();

}


//===========================================
// BOTÓN +
//===========================================

document.getElementById("btnMas").addEventListener("click", () => {

    cantidad += 1;

    document.getElementById("cantidadMetros").textContent =

        cantidad.toLocaleString();

});

//===========================================
// BOTÓN -
//===========================================

document.getElementById("btnMenos").addEventListener("click", () => {

    if (cantidad > 25) {

        cantidad -= 1;

    }

    document.getElementById("cantidadMetros").textContent =

        cantidad.toLocaleString();

});

//===========================================
// AGREGAR AL CARRITO
//===========================================

document.getElementById("btnAgregarModal").addEventListener("click", () => {

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const existe = carrito.find(item => item.id === productoSeleccionado.id);

    if (existe) {

        existe.metros += cantidad;

    } else {

        carrito.push({

            id: productoSeleccionado.id,

            nombre: productoSeleccionado.nombre,

            categoria: productoSeleccionado.categoria,

            imagen: productoSeleccionado.imagen,

            metros: cantidad

        });

    }

    // Guardar carrito
    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    // Actualizar contador del navbar
    actualizarContador();

    // Actualizar contador del carrito flotante
    if (typeof actualizarCarritoFlotante === "function") {
        actualizarCarritoFlotante();
    }

    // Animación del carrito flotante
    const carritoFlotante = document.getElementById("carritoFlotante");

    if (carritoFlotante) {

        carritoFlotante.animate(
            [
                { transform: "scale(1)" },
                { transform: "scale(1.25)" },
                { transform: "scale(1)" }
            ],
            {
                duration: 400,
                easing: "ease-in-out"
            }
        );

    }

    // Cerrar modal
    bootstrap.Modal.getInstance(
        document.getElementById("modalProducto")
    ).hide();

    actualizarContador();

    Swal.fire({

        icon: "success",

        title: "Producto agregado",

        html: `

            <img
                src="${productoSeleccionado.imagen}"
                class="img-fluid rounded mb-3"
                style="max-height:180px;">

            <h4>

                ${productoSeleccionado.nombre}

            </h4>

            <p>

                Cantidad:

                <strong>

                    ${cantidad.toLocaleString()} metros

                </strong>

            </p>

            <hr>

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

});

//===========================================
// CONTADOR DEL CARRITO
//===========================================
function actualizarContador() {

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const contador = document.getElementById("contadorCarrito");

    if (contador) {

        contador.textContent = carrito.length;

        // Mostrar u ocultar el contador
        contador.style.display = carrito.length > 0 ? "inline-flex" : "none";

    }

}