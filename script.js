let carrito = [];
let total = 0;

// Función para generar el código QR
function generarCodigoQR() {
    const url = window.location.href; // Obtener la URL actual de la página
    const qrcodeElement = document.getElementById('qrcode'); // Contenedor del código QR

    // Limpiar el contenedor antes de generar un nuevo código QR
    qrcodeElement.innerHTML = '';

    // Generar el código QR
    const qrcode = new QRCode(qrcodeElement, {
        text: url, // URL o texto que quieras codificar
        width: 128, // Tamaño del código QR
        height: 128,
        colorDark: "#000000", // Color oscuro
        colorLight: "#ffffff", // Color claro
        correctLevel: QRCode.CorrectLevel.H // Nivel de corrección de errores (alto)
    });
}

// Llamar a la función para generar el código QR cuando la página cargue
window.onload = function () {
    generarCodigoQR(); // Generar el código QR al cargar la página
};

// 3. Función para agregar productos al carrito (tu función existente)
function agregarAlCarrito(nombre, precio) {
    const productoExistente = carrito.find(item => item.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }

    total += precio;
    actualizarCarrito();
}

// 4. Función para actualizar el carrito (tu función existente)
function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const totalElement = document.getElementById('total');

    listaCarrito.innerHTML = '';

    carrito.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.nombre} - $${item.precio} x ${item.cantidad}`;

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.classList.add('eliminar-button');
        botonEliminar.onclick = () => eliminarDelCarrito(index);

        li.appendChild(botonEliminar);
        listaCarrito.appendChild(li);
    });

    totalElement.textContent = total;
}

// 5. Función para eliminar productos del carrito (tu función existente)
function eliminarDelCarrito(index) {
    total -= carrito[index].precio * carrito[index].cantidad;
    carrito.splice(index, 1);
    actualizarCarrito();
}

// 6. Función para redirigir a WhatsApp (tu función existente)
function redirigirAWhatsApp() {
    let mensaje = "Hola, estoy interesado en los siguientes productos:\n";

    carrito.forEach(item => {
        mensaje += `- ${item.nombre}: $${item.precio} x ${item.cantidad}\n`;
    });

    mensaje += `Total: $${total}\n`;
    mensaje += "¿Podrías ayudarme con el proceso de pago?";

    const mensajeCodificado = encodeURIComponent(mensaje);
    window.open(`https://wa.me/573115541747?text=${mensajeCodificado}`, '_blank');
}

// 7. Función para finalizar la compra por WhatsApp (tu función existente)
function finalizarCompraWhatsApp() {
    redirigirAWhatsApp();
}

// 8. Función para buscar productos (tu función existente)
function buscarProducto() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const productos = document.querySelectorAll('.producto h3');
    productos.forEach(producto => {
        const nombreProducto = producto.textContent.toLowerCase();
        if (nombreProducto.includes(searchTerm)) {
            producto.parentElement.style.display = 'block';
        } else {
            producto.parentElement.style.display = 'none';
        }
    });
}

// 9. Función para desplazarse a una sección específica (tu función existente)
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    } else {
        console.error(`No se encontró la sección con ID: ${sectionId}`);
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function recargarYVolverAlInicio() {
    window.location.reload(); // Recargar la página
    window.scrollTo(0, 0);   // Mover al inicio
}

function volverAlInicio() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Animación suave
    });
}

// Función para abrir imágenes en un modal
var modal = document.getElementById("myModal");
var modalImg = document.getElementById("modalImage");
var images = document.querySelectorAll("img");

images.forEach(function(img) {
    img.onclick = function() {
        modal.style.display = "block";
        modalImg.src = this.src;
    }
});

var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    modal.style.display = "none";
}

function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('total', total.toString());
}

function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    const totalGuardado = localStorage.getItem('total');

    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        total = parseFloat(totalGuardado);
        actualizarCarrito();
    }
}

function agregarAlCarrito(nombre, precio) {
    const productoExistente = carrito.find(item => item.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }

    total += precio;
    actualizarCarrito();
    guardarCarritoEnLocalStorage(); // Guardar el carrito en localStorage
}

function eliminarDelCarrito(index) {
    total -= carrito[index].precio * carrito[index].cantidad;
    carrito.splice(index, 1);
    actualizarCarrito();
    guardarCarritoEnLocalStorage(); // Guardar el carrito en localStorage
}

window.onload = function () {
    generarCodigoQR(); // Generar el código QR al cargar la página
    cargarCarritoDesdeLocalStorage(); // Cargar el carrito desde localStorage
};

function limpiarCarrito() {
    carrito = [];
    total = 0;
    actualizarCarrito();
    guardarCarritoEnLocalStorage(); // Guardar el carrito vacío en localStorage
}

