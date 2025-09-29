
const productos = [
  {
    nombre: "Pc Gamer ",
    caracteristicas: "Ryzen 5 7600x Rtx 4060 Ssd 1tb 32gb de ram",
    precio: 1485000,
    imagen: "/img/pc1.jpg",
    cantidad: 10,
  },
  {
    nombre: "Mini Pc Bmax B6 Plus",
    caracteristicas: "Intel I3 1000ng4 12gb de ram Ssd 512gb",
    precio: 367000,
    imagen: "/img/pc2.jpg",
    cantidad: 11,
  },
  {
    nombre: "Notebook Lenovo Ideapad Slim",
    caracteristicas: "Ryze5 8gb de ram Ssd 512gb",
    precio: 1499999,
    imagen: "/img/pc3.jpg",
    cantidad: 6,
  },
  {
    nombre: "ALL In One",
    caracteristicas: "TouchScreen Intel I5 8gb de ram Ssd 480gb",
    precio: 2141602,
    imagen: "/img/pc4.jpg",
    cantidad: 20,
  }
];


function imprimirProductos(productos) {
  const contenedor = document.getElementById("cards-container");
  contenedor.innerHTML = ""; 
  for (const producto of productos) {
    const card = document.createElement("div");
    card.className = "producto";
    card.innerHTML = `
      <h3>${producto.nombre}</h3>
      <img src="${producto.imagen}" width="150" alt="${producto.nombre}">
      <p>Stock Restante: ${producto.cantidad}</p>
      <p>Precio: $${producto.precio}</p>
      <button id="${producto.nombre}">Agregar</button>
    `;
    contenedor.appendChild(card);

    const boton = document.getElementById(`${producto.nombre}`);
    boton.addEventListener("click", () => agregarAlCarrito(producto));
  }
}

// Agregar productos al carrito
function agregarAlCarrito(producto) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const index = carrito.findIndex(item => item.nombre === producto.nombre);

  if (index !== -1) {
    if (carrito[index].cantidadSelecionada < producto.cantidad) {
      carrito[index].cantidadSelecionada += 1;
    } else {
      // Sweet alert
      Swal.fire({
        icon: 'warning',
        title: 'Lo sentimos',
        text: 'No hay más stock de este producto.',
      })
    }
  } else {
    carrito.push({ ...producto, cantidadSelecionada: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

// Mostrar carrito
function mostrarCarrito() {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let contenedorCarrito = document.getElementById("carrito");
  if (!contenedorCarrito) {
    contenedorCarrito = document.createElement("div");
    contenedorCarrito.id = "carrito";
    document.body.appendChild(contenedorCarrito);
  }
  contenedorCarrito.innerHTML = "<h2>Carrito</h2>";

  if (carrito.length === 0) {
    contenedorCarrito.innerHTML += "<p>El carrito está vacío.</p>";
    return;
  }

  let totalCompra = 0;

  carrito.forEach((producto, index) => {
  
    const subtotal = producto.precio * producto.cantidadSelecionada;
    totalCompra += subtotal;

    contenedorCarrito.innerHTML += `
      <div>
        <p>${producto.nombre} x${producto.cantidadSelecionada} - $${subtotal}</p>
        <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
      </div>
    `;
  });

  // Mostrar total y comprar
  contenedorCarrito.innerHTML += `<hr><h3>Total: $${totalCompra}</h3>`;
  contenedorCarrito.innerHTML += `<button onclick="procesarCompra()">Comprar</button>`;
}
function procesarCompra() {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.forEach(itemCarrito => {
    const indexProducto = productos.findIndex(producto => producto.nombre === itemCarrito.nombre);
    if (indexProducto !== -1) {
      productos[indexProducto].cantidad -= itemCarrito.cantidadSelecionada;
    }
  });

  
  localStorage.removeItem("carrito");
  mostrarCarrito();
  imprimirProductos(productos);

  // Toastfy
  Toastify({
  text: "Gracias por su compra",
  duration: 3000,
  destination: "https://github.com/apvarun/toastify-js",
  newWindow: true,
  close: true,
  gravity: "top", // `top` or `bottom`
  position: "right", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "linear-gradient(to right, #00b09b, #96c93d)",
  },
  onClick: function(){} // Callback after click
}).showToast();
}

// Eliminar productos del carrito
function eliminarDelCarrito(index) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}


window.onload = () => {
  imprimirProductos(productos);
  mostrarCarrito();
};

