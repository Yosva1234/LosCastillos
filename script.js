// Lista de productos
const productos = [
    {
        id: 1,
        nombre: "Queso Fundido 1kg",
        precio: 2000,
        imagen: "media/queso.jpg",
        descripcion: "Queso fresco elaborado artesanalmente con leche de vaca. Perfecto para sandwiches y ensaladas."
    },
    {
        id: 2,
        nombre: "Yogurt  500ml",
        precio: 450,
        imagen: "media/pomo youg.jpg",
        descripcion: "Yogurt con azúcar añadida. Rico en probióticos y perfecto para el desayuno."
    },
   
    {
        id: 3,
        nombre: "Cajas de Helado de 4L ",
        precio: 2100,
        imagen: "",
        descripcion: "Helado Cremoso emvasado en caja de carton"
    },
    {
        id: 4,
        nombre: "cubeta de Helado de 4L ",
        precio: 2300,
        imagen: "",
        descripcion: "Helado Cremoso emvasado en cubeta plastica"
    },
    {
        id: 5,
        nombre: "paletica con cobertura de chocolate",
        precio: 100,
        imagen: "media/pale.jpg",
        descripcion: "Paletica de sabor con una cobertura gruesa de chocolate"
    },
    {
        id: 6,
        nombre: "Bolsa de Pan ",
        precio: 350,
        imagen: "media/pan.jpg",
        descripcion: "bolsa de 8 panes recien hechos envsado al vacio "
    },

    {
        id: 7,
        nombre: "bolitas de queso",
        precio: 300,
        imagen: "media/bolas de queso.jpg",
        descripcion: "bolsita sellada de 10 bolitas de queso ideales para entrantes"
    },

    {
        id: 8,
        nombre: "bolsa 24 de bocaditos",
        precio:450, 
        imagen: "media/bocaditos.jpg",
        descripcion: "bocaditos semidulces"
    },
    {
        id: 9,
        nombre: "cubeta de Yogurt de 4L ",
        precio: 2100,
        imagen: "media/cubeta yog.jpg",
        descripcion: "Cubeta Plastica de yogurt probiotico de 4lts"
    },
    {
        id: 10,
        nombre: "pan desmayado",
        precio: 130,
        imagen: "media/desmayado.jpg",
        descripcion: "libra de pan al estilo desmayado semidulce"
    },


     

];

// Carrito de compras
let carrito = [];

// Elementos del DOM
const productGrid = document.getElementById('product-grid');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const checkoutBtn = document.getElementById('checkout-btn');
const closeModal = document.querySelector('.close');

// Cargar productos en la página
function cargarProductos() {
    productGrid.innerHTML = '';
    
    productos.forEach(producto => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${producto.imagen}" alt="${producto.nombre}">
            </div>
            <div class="product-info">
                <h3>${producto.nombre}</h3>
                <p class="product-price">$${producto.precio.toFixed(2)}</p>
                <p class="product-description">${producto.descripcion}</p>
                <div class="quantity-selector">
                    <button class="quantity-btn minus" data-id="${producto.id}">-</button>
                    <input type="number" class="quantity-input" id="qty-${producto.id}" value="1" min="1">
                    <button class="quantity-btn plus" data-id="${producto.id}">+</button>
                </div>
                <button class="add-to-cart" data-id="${producto.id}">Añadir al Carrito</button>
            </div>
        `;
        
        productGrid.appendChild(productCard);
    });
    
    // Agregar event listeners a los botones
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', agregarAlCarrito);
    });
    
    document.querySelectorAll('.quantity-btn.plus').forEach(button => {
        button.addEventListener('click', aumentarCantidad);
    });
    
    document.querySelectorAll('.quantity-btn.minus').forEach(button => {
        button.addEventListener('click', disminuirCantidad);
    });
}

// Aumentar cantidad de producto
function aumentarCantidad(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const input = document.getElementById(`qty-${productId}`);
    input.value = parseInt(input.value) + 1;
}

// Disminuir cantidad de producto
function disminuirCantidad(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const input = document.getElementById(`qty-${productId}`);
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

// Agregar producto al carrito
function agregarAlCarrito(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const producto = productos.find(p => p.id === productId);
    const cantidad = parseInt(document.getElementById(`qty-${productId}`).value);
    
    // Verificar si el producto ya está en el carrito
    const itemExistente = carrito.find(item => item.id === productId);
    
    if (itemExistente) {
        itemExistente.cantidad += cantidad;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: cantidad
        });
    }
    
    // Actualizar la interfaz
    actualizarCarrito();
    
    // Mostrar mensaje de confirmación
    alert(`¡${cantidad} ${producto.nombre} añadido(s) al carrito!`);
}

// Actualizar el carrito en la interfaz
function actualizarCarrito() {
    cartItems.innerHTML = '';
    let total = 0;
    let count = 0;
    
    carrito.forEach(item => {
        const itemTotal = item.precio * item.cantidad;
        total += itemTotal;
        count += item.cantidad;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.nombre}</div>
                <div class="cart-item-price">$${item.precio.toFixed(2)} c/u</div>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                <input type="number" value="${item.cantidad}" min="1" class="cart-qty" data-id="${item.id}">
                <button class="quantity-btn plus" data-id="${item.id}">+</button>
                <span class="remove-item" data-id="${item.id}">&times;</span>
            </div>
            <div class="cart-item-total">$${itemTotal.toFixed(2)}</div>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = count;
    
    // Agregar event listeners a los botones del carrito
    document.querySelectorAll('.cart-item .quantity-btn.plus').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            const item = carrito.find(item => item.id === id);
            item.cantidad += 1;
            actualizarCarrito();
        });
    });
    
    document.querySelectorAll('.cart-item .quantity-btn.minus').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            const item = carrito.find(item => item.id === id);
            if (item.cantidad > 1) {
                item.cantidad -= 1;
                actualizarCarrito();
            }
        });
    });
    
    document.querySelectorAll('.cart-qty').forEach(input => {
        input.addEventListener('change', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            const item = carrito.find(item => item.id === id);
            item.cantidad = parseInt(e.target.value);
            actualizarCarrito();
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            carrito = carrito.filter(item => item.id !== id);
            actualizarCarrito();
        });
    });
}

// Abrir modal del carrito
cartCount.parentElement.addEventListener('click', () => {
    cartModal.style.display = 'block';
});

// --- Mobile menu functionality ---
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuClose = document.querySelector('.mobile-menu-close');
const overlayEl = document.getElementById('overlay');

function openMobileMenu() {
    mobileMenu.classList.add('active');
    overlayEl.classList.add('active');
}

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    overlayEl.classList.remove('active');
}

mobileMenuBtn.addEventListener('click', openMobileMenu);
mobileMenuClose.addEventListener('click', closeMobileMenu);
overlayEl.addEventListener('click', () => {
    // cerrar tanto el menú como el carrito si están abiertos
    closeMobileMenu();
    if (cartModal.style.display === 'block') {
        cartModal.style.display = 'none';
    }
});

// cerrar menu al seleccionar una opción de navegación
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});


// Cerrar modal del carrito
closeModal.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// Completar pedido por WhatsApp
checkoutBtn.addEventListener('click', () => {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío. Agrega algunos productos primero.');
        return;
    }
    
    let mensaje = '¡Hola! Me gustaría hacer el siguiente pedido:%0A%0A';
    
    carrito.forEach(item => {
        mensaje += `- ${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}%0A`;
    });
    
    mensaje += `%0ATotal: $${carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0).toFixed(2)}`;
    mensaje += '%0A%0AMi nombre es: [Tu Nombre]';
    
    const telefono = '+5356272873';
    const url = `https://wa.me/${telefono}?text=${mensaje}`;
    
    window.open(url, '_blank');
});

// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
});