//=====================================
// NAVBAR INTELIGENTE
//=====================================

// Cambio de color al hacer scroll

window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar-mezdi");

    if (window.scrollY > 80) {

        navbar.classList.add("navbar-scroll");

    } else {

        navbar.classList.remove("navbar-scroll");

    }

});

//=====================================
// CONTADOR DEL CARRITO
//=====================================

function actualizarContadorNavbar() {

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const contador = document.getElementById("contadorCarrito");

    if (contador) {

        contador.textContent = carrito.length;

    }

}

actualizarContadorNavbar();

//=====================================
// RESALTAR PÁGINA ACTUAL
//=====================================

const paginaActual = window.location.pathname.split("/").pop();

document.querySelectorAll(".nav-mezdi").forEach(link => {

    const href = link.getAttribute("href");

    if (href === paginaActual || (paginaActual === "" && href === "index.html")) {

        link.classList.add("active");

    } else {

        link.classList.remove("active");

    }

});