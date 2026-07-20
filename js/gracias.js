const pedido = JSON.parse(localStorage.getItem("ultimoPedido"));

const resumen = document.getElementById("resumenPedido");

if (pedido) {

    resumen.innerHTML = `

<p>

<strong>Productos:</strong>

${pedido.total_productos}

</p>

<p>

<strong>Total Metros:</strong>

${pedido.total_metros.toLocaleString()} m

</p>

`;

}