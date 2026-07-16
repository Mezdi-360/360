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

                    ${producto.metros.toLocaleString()} m

                </strong>

            </div>

        </div>

        `;

    });

    totalProductos.textContent = carrito.length;

    totalMetros.textContent = metros.toLocaleString() + " m";

}

//=========================================
// Validar formulario
//=========================================

const boton = document.getElementById("btnEnviar");

boton.addEventListener("click", function () {

    if (carrito.length === 0) {

        alert("Debe agregar productos antes de solicitar una cotización.");

        return;

    }

    const nombre = document.getElementById("nombre").value.trim();

    const empresa = document.getElementById("empresa").value.trim();

    const correo = document.getElementById("correo").value.trim();

    const telefono = document.getElementById("telefono").value.trim();

    if (nombre === "") {

        alert("Ingrese su nombre.");

        return;

    }

    if (empresa === "") {

        alert("Ingrese el nombre de la empresa.");

        return;

    }

    if (correo === "") {

        alert("Ingrese su correo.");

        return;

    }

    if (telefono === "") {

        alert("Ingrese su teléfono.");

        return;

    }

    enviarCorreo();

});


function enviarCorreo() {

    let listaProductos = "";

    carrito.forEach(producto => {

        listaProductos +=
            producto.nombre +
            " - " +
            producto.metros.toLocaleString() +
            " metros\n";

    });

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

        total_metros: carrito.reduce((total, p) => total + p.metros, 0)

    };

    emailjs.send(

        "service_o3yzqb1",

        "template_ijrp2n7",

        parametros

    )

        .then(function () {

            alert("✅ Cotización enviada correctamente.");

            localStorage.removeItem("carrito");

            window.location.href = "index.html";

        })

        .catch(function (error) {

            console.error("ERROR EMAILJS:", error);

            alert(
                "Error: " +
                JSON.stringify(error)
            );

        });

}
//=========================================

cargarResumen();