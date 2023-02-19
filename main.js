let cart = JSON.parse(localStorage.getItem('cart')) || [];
let shopContent = document.querySelector('#shopContent');
const btnNewsletter = document.getElementById('btnNewsletter');

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

async function getProducts() {
    const response = await fetch("productos.json");
    const data = await response.json();
    rowConstructor(data);
};

function rowConstructor(data) {
    const halfwayIndex = Math.floor(data.length / 2);
    let firstRow = document.createElement('div');
    firstRow.className = 'row';
    let secondRow = document.createElement('div');
    secondRow.className = 'row';
    data.forEach((product, index) => {
        let bootstrapContainer = document.createElement('div');
        bootstrapContainer.className = 'col-md-4 col-sm-12';
        if (index < halfwayIndex) {
            firstRow.append(bootstrapContainer);
        } else {
            secondRow.append(bootstrapContainer);
        };

        let prodContainer = document.createElement('div');
        prodContainer.className = 'product--container';
        bootstrapContainer.append(prodContainer);

        let prodImg = document.createElement('div');
        prodImg.className = 'product--img';
        prodImg.innerHTML = `
            <a href="#"><img src="${product.img}"></a>
            `;
        prodContainer.append(prodImg);
        let prodDescriptionBox = document.createElement('div');
        prodDescriptionBox.className = 'product--description-box';
        prodDescriptionBox.innerHTML = `
            <a href="#" class="product--title">${product.description}</a>
            <p class="product--price">$${product.price}</p>
            <p class="product--installments">3 cuotas <strong>sin interés</strong> de <strong>$${Math.round(product.price / 3)}</strong></p>
            `;
        prodContainer.append(prodDescriptionBox);

        let buy = document.createElement("button");
        buy.innerText = "COMPRAR";
        buy.id = "btnComprar";

        prodDescriptionBox.append(buy);

        buy.addEventListener("click", () => {
            const repeat = cart.some((repeatProduct) => repeatProduct.id === product.id);
            if (repeat) {
                cart.map((prod) => {
                    if (prod.id === product.id) {
                        prod.quantity++;
                    }
                    return prod;
                });
            } else {
                cart.push({
                    id: product.id,
                    img: product.img,
                    description: product.description,
                    price: product.price,
                    quantity: 1,
                });
                saveCart();
            }
            showToast(`¡Agregaste correctamente ${product.description} al carrito!`, addStyle);
            updateCart();
        });
    });
    shopContent.append(firstRow);
    shopContent.append(secondRow);
}

getProducts();

function saveSubscriptionStatus() {
    localStorage.setItem('isSubscribed', 'true');
}

function isAlreadySubscribed() {
    return localStorage.getItem('isSubscribed') === 'true';
}

btnNewsletter.addEventListener('click', () => {
    if (isAlreadySubscribed()) {
        showToast(`¡Ya estabas suscrito a la Newsletter!`, deleteStyle);
    }
    else {
        saveSubscriptionStatus();
        showToast(`¡Ahora estás suscrito a la Newsletter!`, buyTotalStyle);
    }
})