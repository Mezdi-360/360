//=====================================
// CARRITO FLOTANTE
//=====================================

function actualizarCarritoFlotante() {

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const contador = document.getElementById("contadorFlotante");

    if (contador) {

        contador.textContent = carrito.length;

        contador.style.display = carrito.length > 0 ? "flex" : "none";

    }

}

actualizarCarritoFlotante();