const productos = [
    { id: 1, nombre: "AK-47", precio: 2700 },
    { id: 2, nombre: "M4A1", precio: 3100 },
    { id: 3, nombre: "AWP", precio: 4750 },
    { id: 4, nombre: "Chaleco + Casco", precio: 1000 },
    { id: 5, nombre: "Granada HE", precio: 300 }
];


let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const botonVaciar = document.getElementById("vaciar");

botonVaciar.addEventListener("click", () => {
    carrito = [];
    localStorage.removeItem("carrito");
    mostrarCarrito();
    
});


const contenedorProductos = document.getElementById("productos");
const contenedorCarrito = document.getElementById("carrito");


function mostrarProductos() {
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.className = "producto";

        div.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button data-id="${producto.id}">Agregar</button>
        `;

        contenedorProductos.appendChild(div);
    });
}


function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

function mostrarCarrito() {
    contenedorCarrito.innerHTML = "";

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = "<p>No hay productos en el carrito</p>";
        return;
    }

    let total = 0;

    carrito.forEach(producto => {
        const p = document.createElement("p");
        p.textContent = `${producto.nombre} - $${producto.precio}`;
        contenedorCarrito.appendChild(p);

        total += producto.precio;
    });

    const totalHTML = document.createElement("p");
    totalHTML.style.marginTop = "10px";
    totalHTML.innerHTML = `<strong>Total: $${total}</strong>`;
    contenedorCarrito.appendChild(totalHTML);
}


contenedorProductos.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        const id = Number(e.target.dataset.id);
        agregarAlCarrito(id);
    }
});

mostrarProductos();
mostrarCarrito();