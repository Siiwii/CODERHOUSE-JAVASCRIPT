const btnCart = document.getElementById('btnCart');
const cartContainer = document.querySelector('.cart-container');
const cartContent = document.createElement('div');
const buyCartContainer = document.createElement('div');
const btnBuyTotal = document.createElement('button');

function updateCart() {
    let cartHeader = cartContainer.querySelector('.cart-header');
    if (!cartHeader) {
        cartHeader = document.createElement('div');
        cartHeader.className = 'cart-header';
        cartHeader.innerHTML = `<h3 class="cart-header-title">Carrito de Compras</h3>`;
        cartContainer.append(cartHeader);

        const btnCloseCart = document.createElement('span');
        btnCloseCart.className = 'close-cart';
        btnCloseCart.innerHTML = '<i class="bi bi-x-circle"></i>';

        btnCloseCart.addEventListener('click', () => {
            cartContainer.classList.remove('cart-container--active');
        });

        cartHeader.append(btnCloseCart);
    }

    let cartContent = cartContainer.querySelector('.cart-content');
    if (!cartContent) {
        cartContent = document.createElement('div');
        cartContent.className = 'cart-content container';
        cartContainer.append(cartContent);
    }

    cartContent.innerHTML = '';

    cart.forEach((product) => {
        let cartItem = document.createElement('div');
        cartItem.className = 'row cart-item';

        cartItem.innerHTML = `
        <div class="col-2 p-0"><img src="${product.img}" alt="${product.description}" class="cart-item-img"></div>
        <div class="col-10 d-flex align-items-center">
            <div class="w-100">
                <h6 class="cart-item-name">${product.description}</h6>
                <div class="cart-item-quantity">
                    <div class="row m-0 align-items-center">
                        <div class="col p-0 text-center"><span class="substractP">-</span></div>
                        <div class="col p-0 text-center">
                            <p class="m-0">${product.quantity}</p>
                        </div>
                        <div class="col p-0 text-center"><span class="addP">+</span></div>
                    </div>
                </div>
                <h5 class="cart-item-subtotal">$${product.price * product.quantity}</h5>
            </div>
        </div>
        <div class="cart-item-delete col-1 text-right">
            <button class="delP"><i class="bi bi-trash"></i></button>
        </div>
      `;
        cartContent.append(cartItem);

        let substractP = cartItem.querySelector('.substractP');
        substractP.addEventListener('click', () => {
            substractProduct(product);
        });

        let addP = cartItem.querySelector('.addP');
        addP.addEventListener('click', () => {
            addProduct(product);
        });

        let deleteP = cartItem.querySelector('.delP');
        deleteP.addEventListener('click', () => {
            delProduct(product);
        });

        const total = cart.reduce((acc, prod) => acc + prod.price * prod.quantity, 0);

        let cartFooter = cartContainer.querySelector('.cart-footer');
        if (!cartFooter) {
            cartFooter = document.createElement('div');
            cartFooter.className = 'cart-footer container';
            cartFooter.innerHTML = `
                <div class="row font-weight-bold cart-total">
                    <span class="col">Total:</span>
                    <span class="col text-end" id="totalBuy"></span>
                </div>
                <div class="text-end font-weight-bold"><span class="cart-total" id="totalBuyInstallments"></span></div>
            `
        }

        cartFooter.querySelector('#totalBuy').textContent = `$${total}`;
        cartFooter.querySelector('#totalBuyInstallments').textContent = `O hasta 3 cuotas sin interés de $${Math.round(total / 3)}`;

        cartContainer.append(cartFooter);

        buyCartContainer.className = 'row cart-footer-buy';
        cartFooter.appendChild(buyCartContainer);

        btnBuyTotal.id = ('btnBuyTotal');
        btnBuyTotal.innerText = 'INICIAR COMPRA';
        buyCartContainer.append(btnBuyTotal);
    });
}

btnBuyTotal.addEventListener('click', buyCart);

btnCart.addEventListener('click', () => {
    cartContainer.style.display = 'flex';
    cartContainer.classList.add('cart-container--active');
    updateCart();
});



const addStyle = {
    background: "green",
    color: "white",
};

const substractStyle = {
    background: "orange",
    color: "white",
};

const deleteStyle = {
    background: "red",
    color: "white",
};

const buyTotalStyle = {
    background: "green",
    color: "white",
};



function delProduct(product) {
    cart = cart.filter((cartProduct) => {
        return cartProduct.id !== product.id;
    });
    saveCart();
    updateCart();
    showToast(`¡Borraste correctamente ${product.description} del carrito!`, deleteStyle);
}

function addProduct(product) {
    product.quantity++;
    saveCart();
    updateCart();
    showToast(`¡Agregaste 1 ${product.description} al carrito!`, addStyle);
}

function substractProduct(product) {
    if (product.quantity > 1) {
        product.quantity--;
        saveCart();
        updateCart();
        showToast(`¡Quitaste correctamente 1 ${product.description} del carrito!`, substractStyle);
    }
}

function showToast(message, style) {
    Toastify({
        text: message,
        duration: 1000,
        close: false,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: style,
        offset: {
            x: '1rem',
            y: '2rem'
        },
    }).showToast();
}

function buyCart() {
    showToast(`¡Gracias por tu compra!`, buyTotalStyle);

    setTimeout(() => {
        cart = [];
        saveCart();
        location.reload();
    }, 1000);
}