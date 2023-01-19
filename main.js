
let cart = [];

let products = [];

function addToCart(id) {
  let product = products.find(function (product) {
    return product.id === id;
  });

  cart.push(product);

  alert("Producto agregado al carrito!");
}
function addProduct() {
  let id = prompt("Ingresa el id del producto:");
  let description = prompt("Ingresá la descripción del producto:");
  let price = Number(prompt("Ingresá el precio del producto:"));

  let product = {
    id: id,
    description: description,
    price: price
  };
  products.push(product);

  alert("Producto agregado!");
}

while (true) {
  let menu = "1. Ver productos\n2. Agregar producto\n3. Agregar al carrito\n4. Ver carrito\n5. Salir\nIngresá tu opción:";
  let choice = prompt(menu);
  if (choice === "1") {
    for (let i = 0; i < products.length; i++) {
      let product = products[i];
      alert(`${product.id}: ${product.description} - $${product.price}`);
    }
  } else if (choice === "2") {
    if (products.length === 8) {
      alert('Tu carrito está lleno! Por favor borra algunos productos antes de agregar más')
    } else {
      addProduct();
    }
  } else if (choice === "3") {
    if (cart.length === 8) {
      alert("Tu carrito está lleno! Por favor borra algunos productos antes de agregar más");
    } else {
      let id = prompt("Ingresá el id del producto que deseas agregar al carrito:");
      let product = products.find(product => {
        return product.id === id;
      })
      cart.push(product);
      alert('Producto agregado al carrito!');
    }
  } else if (choice === "4") {
    if (cart.length === 0) {
      alert("Tu carrito está vacío!");
    } else {
      let total = 0;
      let productDescriptions = [];

      for (let i = 0; i < cart.length; i++) {
        let item = cart[i];
        total += item.price;

        productDescriptions.push(`${item.id}: ${item.description} - $${item.price}`);
      }

      let cartContents = productDescriptions.join("\n");

      alert(`Contenidos del carrito:\n${cartContents}\nTotal: $${total}`);
    }
  } else if (choice === "5") {
    break;
  } else {
    alert("Opción inválida, por favor ingrese una opción válida");
  }
}