const btnCart = document.getElementById('btnCart');
const cartContainer = document.getElementById('cartContainer');

function updateCart() {
    cartContainer.className = 'cart-container';
    cartContainer.innerHTML = "";
    cartContainer.style.display = 'flex';
    const cartHeader = document.createElement('div');
    cartHeader.className = 'cart-header';
    cartHeader.innerHTML = `<h3 class= "cart-header-title">Carrito de Compras </h3>`;
    cartContainer.append(cartHeader);

    const btnCloseCart = document.createElement('span');
    btnCloseCart.className = 'close-cart';
    btnCloseCart.innerText = 'x';
    btnCloseCart.addEventListener('click', () => {
        cartContainer.style.display = 'none';
    })

    cartHeader.append(btnCloseCart);

    cart.forEach((product) => {
        let cartContent = document.createElement('div');
        cartContent.className = 'cart-content';
        cartContent.innerHTML = `
        <img src="${product.img}"
        <span>${product.description}</span>
        <p>$${product.price}</p>
        <span class="substract"> - </span>
        <p>${product.quantity}</p>
        <span class="add"> + </span>
        <p>Subtotal: $${product.quantity * product.price}</p>
        <span class="delete-product"> X </span>
        `;

        cartContainer.append(cartContent);

        let substractP = cartContent.getElementsByClassName('substractP');
        substractP.addEventListener('click', () => {
            if (product.quantity !== 1) {
                product.quantity--;
            }
            saveCart();
            updateCart();
        });

        let addP = cartContent.getElementsByClassName('addP');
        addP.addEventListener('click', () => {
            product.quantity++;
            saveCart();
            updateCart();
        });

        let deleteP = cartContent.getElementsByClassName('delP');
        deleteP.addEventListener('click', () => {
            delProduct(product.id);
        });

        const total = cart.reduce((acc, prod) => acc + prod.price, 0);

        const cartFooter = document.createElement('div');
        cartFooter.className = 'cart-footer';
        cartFooter.innerHTML = `<p>Total $${product.price}</p>`;
        cartContainer.append(cartFooter);
    })
}

btnCart.addEventListener('click', updateCart);

function delProduct(id) {
    const foundId = cart.find((element) => element.id === id);

    cart = cart.filter((cartId) => {
        return cartId !== foundId;
    });

    saveCart();
    updateCart();
}