//=========================================
// MEZDI
// cotizacion.js
//=========================================

// Leer carrito

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Elementos

const productosCotizacion = document.getElementById("productosCotizacion");

const totalProductos = document.getElementById("totalProductos");

const totalMetros = document.getElementById("totalMetros");

//=========================================
// Mostrar productos
//=========================================

function cargarResumen() {

    productosCotizacion.innerHTML = "";

    if (carrito.length === 0) {

        productosCotizacion.innerHTML = `

        <div class="alert alert-warning">

            No existen productos en la cotización.

        </div>

        `;

        totalProductos.textContent = 0;

        totalMetros.textContent = 0;

        return;

    }

    let metros = 0;

    carrito.forEach(producto => {

        metros += producto.metros;

        productosCotizacion.innerHTML += `

        <div class="d-flex justify-content-between align-items-center border-bottom py-3">

            <div>

                <strong>

                    ${producto.nombre}

                </strong>

                <br>

                <small class="text-secondary">

                    ${producto.categoria}

                </small>

            </div>

            <div>

                <strong>

                    ${producto.metros.toLocaleString()} PIEZAS

                </strong>

            </div>

        </div>

        `;

    });

    totalProductos.textContent = carrito.length;

    totalMetros.textContent = metros.toLocaleString() + " PIEZAS";

}

//=========================================
// Validar formulario
//=========================================

const boton = document.getElementById("btnEnviar");

boton.addEventListener("click", function () {

    if (carrito.length === 0) {

        Swal.fire({
            icon: "warning",
            title: "Carrito vacío",
            html: `
        Agrega al menos un producto antes de solicitar una cotización.
    `,
            confirmButtonColor: "#0A4A8A"
        });

        return;

    }

    const nombre = document.getElementById("nombre").value.trim();

    const empresa = document.getElementById("empresa").value.trim();

    const correo = document.getElementById("correo").value.trim();

    const telefono = document.getElementById("telefono").value.trim();

    if (nombre === "") {

        Swal.fire({
            icon: "warning",
            title: "Nombre requerido",
            text: "Por favor ingresa tu nombre completo.",
            confirmButtonColor: "#0A4A8A"
        });

        document.getElementById("nombre").focus();

        return;

    }

    if (empresa === "") {

        Swal.fire({
            icon: "warning",
            title: "Empresa requerida",
            text: "Ingresa el nombre de tu empresa.",
            confirmButtonColor: "#0A4A8A"
        });

        document.getElementById("empresa").focus();

        return;

    }

    if (correo === "") {

        Swal.fire({
            icon: "warning",
            title: "Correo requerido",
            text: "Ingresa un correo electrónico válido.",
            confirmButtonColor: "#0A4A8A"
        });

        document.getElementById("correo").focus();

        return;

    }

    if (telefono === "") {

        Swal.fire({
            icon: "warning",
            title: "Teléfono requerido",
            text: "Ingresa un número de teléfono.",
            confirmButtonColor: "#0A4A8A"
        });

        document.getElementById("telefono").focus();

        return;

    }

    enviarCorreo();

});


function enviarCorreo() {

    let listaProductos = "";

    carrito.forEach(producto => {

        listaProductos +=
            `• ${producto.nombre} - ${producto.metros.toLocaleString()} metros\n`;

    });

    const totalMetros = carrito.reduce((total, p) => total + p.metros, 0);

    let parametros = {

        nombre: document.getElementById("nombre").value,

        empresa: document.getElementById("empresa").value,

        correo: document.getElementById("correo").value,

        telefono: document.getElementById("telefono").value,

        pais: document.getElementById("pais").value,

        estado: document.getElementById("estado").value,

        ciudad: document.getElementById("ciudad").value,

        rfc: document.getElementById("rfc").value,

        observaciones: document.getElementById("observaciones").value,

        productos: listaProductos,

        total_productos: carrito.length,

        total_metros: totalMetros

    };

    // Pantalla de carga
    Swal.fire({

        title: "Enviando solicitud",

        html: `
            <div class="text-center">

                <div class="spinner-border text-primary mb-3"
                     style="width:4rem;height:4rem;">
                </div>

                <p class="mb-0">

                    Estamos enviando tu solicitud de cotización...

                </p>

                <small class="text-muted">

                    Esto puede tardar unos segundos.

                </small>

            </div>
        `,

        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false

    });

    emailjs.send(

        "service_o3yzqb1",

        "template_ijrp2n7",

        parametros

    )

        .then(function () {

            // Guardar información para gracias.html
            localStorage.setItem("ultimoPedido", JSON.stringify({

                total_productos: carrito.length,

                total_metros: totalMetros,

                cliente: document.getElementById("nombre").value,

                empresa: document.getElementById("empresa").value,

                fecha: new Date().toLocaleDateString("es-MX"),

                hora: new Date().toLocaleTimeString("es-MX")

            }));

            // Vaciar carrito
            localStorage.removeItem("carrito");

            // Ir a la página de confirmación
            window.location.href = "gracias.html";

        })

        .catch(function (error) {

            console.error(error);

            Swal.fire({

                icon: "error",

                title: "Error al enviar",

                html: `
                <h5>

                    No fue posible enviar la solicitud.

                </h5>

                <p>

                    Inténtalo nuevamente dentro de unos minutos.

                </p>

                <hr>

                <small class="text-danger">

                    ${error.text}

                </small>
            `,

                confirmButtonColor: "#dc3545"

            });

        });

}
//=========================================

cargarResumen();