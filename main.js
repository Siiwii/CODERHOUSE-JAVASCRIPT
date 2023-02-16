let cart = JSON.parse(localStorage.getItem('cart')) || [];
let shopContent = document.querySelector('#shopContent');

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

const getProducts = async () => {
    const response = await fetch("productos.json");
    const data = await response.json();
    for (const product of data) {
        let bootstrapContainer = document.createElement('div');
        bootstrapContainer.className = 'col-md-4 col-sm-12';
        bootstrapContainer.innerHTML = '';
        shopContent.append(bootstrapContainer);

        let prodContainer = document.createElement('div');
        prodContainer.className = 'product--container';
        prodContainer.innerHTML = "";
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
        <p class="product--price">${product.price}</p>
        <p class="product--installments">3 cuotas <strong>sin interés</strong> de <strong>$${product.price / 3}</strong></p>
        `;
        prodContainer.append(prodDescriptionBox);

        let comprar = document.createElement("button");
        comprar.innerText = "COMPRAR";
        comprar.id = "btnComprar";

        prodDescriptionBox.append(comprar);

        comprar.addEventListener("click", () => {
            const repeat = cart.some((repeatProduct) => repeatProduct.id === product.id);

            if (repeat) {
                carrito.map((prod) => {
                    if (prod.id === product.id) {
                        prod.quantity++;
                    }
                });
            } else {
                cart.push({
                    id: product.id,
                    img: product.img,
                    nombre: product.description,
                    precio: product.price,
                    cantidad: product.quantity,
                });
                saveCart();
            }
        });
    }
};

getProducts();
