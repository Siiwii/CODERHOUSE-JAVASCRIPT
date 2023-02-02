let products = [];
      let productId = 1;

      function addProduct() {
        let productDescription = document.getElementById("productDescription").value;
        let productPrice = document.getElementById("productPrice").value;

        let existingProduct = products.find(product => product.description === productDescription);
        if (existingProduct) {
          existingProduct.quantity++;
        } else {
          let product = {
            id: productId,
            description: productDescription,
            price: productPrice,
            quantity: 1
          };

          products.push(product);
          productId++;
        }

        updateProducts();
        updateCart();
      }

      function updateProducts() {
        let productsDiv = document.getElementById("products");
        productsDiv.innerHTML = "";

        for (let i = 0; i < products.length; i++) {
          let product = products[i];
          productsDiv.innerHTML += product.description + " - $" + product.price + "<br>";
        }
      }

      function updateCart() {
        let cartDiv = document.getElementById("cart");
        cartDiv.innerHTML = "";

        let total = 0;
        for (let i = 0; i < products.length; i++) {
          let product = products[i];
          cartDiv.innerHTML +=
           "(" + product.id + ")" + product.description + " - $" + product.price + " x " + product.quantity + "<br>";
          total += product.price * product.quantity;
        }

        cartDiv.innerHTML += "Total: $" + total;
      }