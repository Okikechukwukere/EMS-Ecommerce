let products = [
  {
    tag: "samsungTv",
    name: "SAMSUNG TV",
    price: 800,
    inCart: 0,
  },
  {
    tag: "pixel",
    name: "PIXEL 4a",
    price: 250,
    inCart: 0,
  },
  {
    tag: "playStation",
    name: "PS 5",
    price: 200,
    inCart: 0,
  },
  {
    tag: "macBook",
    name: "MACBOOK AIR",
    price: 550,
    inCart: 0,
  },
  {
    tag: "appleWatch",
    name: "APPLE WATCH",
    price: 100,
    inCart: 0,
  },
  {
    tag: "airpods",
    name: "AIR PODS",
    price: 25,
    inCart: 0,
  },
];

let addToCart = document.querySelectorAll(".adding-to-cart");
let item = document.querySelector(".cart-item");
let cartItemNumber = document.querySelector(".item-no");
let cart = document.querySelector(".cart");
let form = document.querySelector(".cart-form");
let overlay = document.querySelector(".black");
// let quantity = document.querySelectorAll(".quantity-btn");

//add a class of added to cart, check if it contains a classlist of added to cart. if it does run this function on click, if noyt run the remove from cart function

for (let i = 0; i < addToCart.length; i++) {
  addToCart[i].addEventListener("click", (e) => {
    e.preventDefault();
    addItem(products[i], addToCart[i]);
    totalCost(products[i]);
    form.classList.remove("show");
    overlay.classList.remove("body-overlay");
  });
}

//added the remembrance feature by checking if the tag/classname exist, if it does look for coresponding button and add "added" class

let onLoadPage = () => {
  let cartNumber = localStorage.getItem("cartNumbers");
  let cartStatus = JSON.parse(localStorage.getItem("cartItemStatus"));
  let cartCost = parseInt(localStorage.getItem("totalCost"));

  cartNumber
    ? ((cartItemNumber.textContent = cartNumber),
      (document.querySelector(".pay-in-fig").innerHTML = `$${cartCost}`))
    : (cartItemNumber.textContent = 0);

  for (i of addToCart) {
    let elementId = i.id;
    if (cartStatus) {
      Object.keys(cartStatus).forEach((key) => {
        if (key == elementId) {
          i.classList.add("added");
          i.textContent = "REMOVE FROM CART";
        }
      });
    }
  }
};

let addItemNo = () => {
  let cartNumber = parseInt(localStorage.getItem("cartNumbers"));
  let addToCartItems = JSON.parse(localStorage.getItem("addToCartItems"));

  if (addToCartItems == undefined) {
    localStorage.setItem("cartNumbers", 1);
    cartItemNumber.textContent = 1;
    cartNumber = parseInt(localStorage.getItem("cartNumbers"));
  } else {
    cartNumber = Object.keys(addToCartItems).length;
    localStorage.setItem("cartNumbers", cartNumber);
    cartItemNumber.textContent = cartNumber;
  }
};

let removeFunction = (product, addedToCart) => {
  addedToCart.textContent = "ADD TO CART";
  localStorage.setItem("cartNumbers", cartNumber - 1);
  newTotal =
    addToCartItems[product.tag].price * addToCartItems[product.tag].inCart;
  localStorage.setItem("totalCost", cartCost - newTotal);
  delete addToCartItems[product.tag];
  delete cartItemStatus[product.tag];
  localStorage.setItem("addToCartItems", JSON.stringify(addToCartItems));
  localStorage.setItem("cartItemStatus", JSON.stringify(cartItemStatus));

  cartNumber = parseInt(localStorage.getItem("cartNumbers"));
  // cartCost = parseInt(localStorage.getItem("totalCost"));
  cartItemNumber.textContent = cartNumber;
  let elTag = (e) => e.target.parentElement.remove(product.tag);
  document.querySelector(".pay-in-fig").innerHTML = `$${cartCost}`;
};

let cartStatus = (product, addedToCart) => {
  addedToCart.classList.toggle("added");
  addToCartItems = JSON.parse(localStorage.getItem("addToCartItems"));
  cartItemStatus = JSON.parse(localStorage.getItem("cartItemStatus"));
  cartCost = parseInt(localStorage.getItem("totalCost"));
  cartNumber = parseInt(localStorage.getItem("cartNumbers"));
  if (addedToCart.classList.contains("added")) {
    addedToCart.textContent = "REMOVE FROM CART";
  } else {
    removeFunction(product, addedToCart);
  }
};

let addItem = (product, addedToCart) => {
  let addToCartItems = JSON.parse(localStorage.getItem("addToCartItems"));
  let cartItemStatus = JSON.parse(localStorage.getItem("cartItemStatus"));

  if (addToCartItems != undefined) {
    if (addToCartItems[product.tag] == undefined) {
      addToCartItems = {
        ...addToCartItems,
        [product.tag]: product,
      };
      product.inCart = 0;
      // console.log(addedToCart.parentElement.parentElement);
    }
    addToCartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    addToCartItems = {
      [product.tag]: product,
    };
    // console.log(addedToCart);
  }

  cartItemStatus = { ...cartItemStatus, [product.tag]: "REMOVE" };

  localStorage.setItem("addToCartItems", JSON.stringify(addToCartItems));
  localStorage.setItem("cartItemStatus", JSON.stringify(cartItemStatus));

  addItemNo(product);
  cartStatus(product, addedToCart);
};

let totalCost = (product) => {
  cartCost = parseInt(localStorage.getItem("totalCost"));

  if (cartCost) {
    localStorage.setItem("totalCost", (cartCost += product.price));
    document.querySelector(".pay-in-fig").innerHTML = `$${cartCost}`;
  } else {
    localStorage.setItem("totalCost", product.price);
    document.querySelector(".pay-in-fig").innerHTML = `$${product.price}`;
  }
};

let removed = (e) => {
  e.preventDefault();
  let itemId = e.target.parentElement.id;
  document.getElementById(itemId).classList.remove("added");
  document.getElementById(itemId).textContent = "ADD TO CART";

  cartNumber = parseInt(localStorage.getItem("cartNumbers"));
  cartCost = parseInt(localStorage.getItem("totalCost"));
  cartItemStatus = JSON.parse(localStorage.getItem("cartItemStatus"));

  //get the nodelist of the add to cart buttons and loop through, find the classname that matches. change the button back to add to cart. remove classslist of added

  //add the feature to remember the button status

  // console.log(document.querySelector(".{itemId}"));

  if (cartItems) {
    cartItems = JSON.parse(localStorage.getItem("addToCartItems"));
    if (cartNumber == NaN) {
      localStorage.setItem("cartNumbers", 0);
    } else {
      localStorage.setItem("cartNumbers", cartNumber - 1);

      newTotal = cartItems[itemId].price * cartItems[itemId].inCart;
      localStorage.setItem("totalCost", cartCost - newTotal);

      delete cartItems[itemId];
      delete cartItemStatus[itemId];

      localStorage.setItem("addToCartItems", JSON.stringify(cartItems));
      localStorage.setItem("cartItemStatus", JSON.stringify(cartItemStatus));
    }
    cartCost = parseInt(localStorage.getItem("totalCost"));
    cartNumber = parseInt(localStorage.getItem("cartNumbers"));
    cartItemNumber.textContent = cartNumber;
    e.target.parentElement.remove(itemId);
    document.querySelector(".pay-in-fig").innerHTML = `$${cartCost}`;
  }
  // console.log(item.parentElement);
  // i.classList.remove("added");
  // i.textContent = "ADD TO CART";
};

let displayCart = () => {
  form.classList.toggle("show");
  overlay.classList.toggle("body-overlay");

  cartItems = JSON.parse(localStorage.getItem("addToCartItems"));

  item.innerHTML = "";
  if (cartItems) {
    Object.values(cartItems).map((product, index) => {
      item.innerHTML += `<div class="cart-details" id=${
        product.tag
      }><div class="items serial" id="item-serial">${index + 1}</div>
      <div class="items title" id="item-title">${product.name}</div>
      <div class="items price" id="item-price">$${
        product.price * product.inCart
      }</div>
      <div class="items quantity" id="item-quantity"><span class="quantity-btn" id="minus">-</span><span id="quantity-fig">
      ${
        product.inCart
      }</span><span class="quantity-btn" id="plus">+</span></div>
      <button class="item-remove empty" id="deleted">Remove</button></div>`;
    });
    // let removeItem = document.querySelectorAll(".item-remove");

    // removeItem.forEach((item) => {
    //   // item.addEventListener("click", removed);
    // });

    cartDetails = document.querySelectorAll(".cart-details");

    cartDetails.forEach((detail) => {
      detail.addEventListener("click", (e) => {
        // let elementId = e.target.parentElement.parentElement.id;
        let cartItems = JSON.parse(localStorage.getItem("addToCartItems"));
        let cartCost = parseInt(localStorage.getItem("totalCost"));

        if (cartItems[detail.id]) {
          let newQuantity = cartItems[detail.id].inCart;

          if (e.target.id == "minus") {
            if (newQuantity <= 1) {
              alert(
                "Can not select quantity less than 1, click remove to remove item"
              );
            } else {
              newQuantity--;
              cartItems[detail.id] = {
                ...cartItems[detail.id],
                inCart: newQuantity,
              };
              e.target.nextElementSibling.textContent = newQuantity;

              localStorage.setItem(
                "totalCost",
                (cartCost -= cartItems[detail.id].price)
              );
            }

            e.target.parentElement.previousElementSibling.innerHTML = `$${
              cartItems[detail.id].inCart * cartItems[detail.id].price
            }`;
            document.querySelector(".pay-in-fig").innerHTML = `$${cartCost}`;
            localStorage.setItem("addToCartItems", JSON.stringify(cartItems));

            // console.log(btn.nextElementSibling.textContent);

            // console.log(cartItems[detail.id].inCart);
          } else if (e.target.id == "plus") {
            newQuantity++;
            cartItems[detail.id] = {
              ...cartItems[detail.id],
              inCart: newQuantity,
            };
            e.target.previousElementSibling.textContent = newQuantity;

            localStorage.setItem(
              "totalCost",
              (cartCost += cartItems[detail.id].price)
            );

            e.target.parentElement.previousElementSibling.innerHTML = `$${
              cartItems[detail.id].inCart * cartItems[detail.id].price
            }`;
            document.querySelector(".pay-in-fig").innerHTML = `$${cartCost}`;
            localStorage.setItem("addToCartItems", JSON.stringify(cartItems));

            // console.log(cartItems[detail.id].inCart);
          } else if (e.target.id == "deleted") {
            e.preventDefault();
            removed(e);
            // console.log(e.target.parentElement.parentElement);
          }
        }
      });
    });

    // document.querySelectorAll(".quantity-btn").forEach((btn) => {
    //   btn.addEventListener("click", (e) => {
    //     let elementId = e.target.parentElement.parentElement.id;
    //     let cartItems = JSON.parse(localStorage.getItem("addToCartItems"));
    //     let cartCost = parseInt(localStorage.getItem("totalCost"));

    //     // check if item still exists in cart, if it doesnt then it has been deleted, removed incart*price of the item from totalcost

    //     // i will attempt to run the remove and quantity functions outside of the display cart function

    //     Object.values(cartItems).forEach((value) => {
    //       if (value.tag == elementId) {
    //         let newQuantity = value.inCart;
    //         if (btn.textContent == "-") {
    //           if (newQuantity <= 1) {
    //             alert(
    //               "Can not select quantity less than 1, click remove to remove item"
    //             );
    //           } else {
    //             newQuantity = value.inCart -= 1;
    //             value = {
    //               ...value,
    //               inCart: newQuantity,
    //             };
    //             btn.nextElementSibling.textContent = newQuantity;

    //             localStorage.setItem("totalCost", (cartCost -= value.price));
    //           }
    //           // console.log(btn.nextElementSibling.textContent);
    //         } else {
    //           newQuantity = value.inCart += 1;
    //           value = {
    //             ...value,
    //             inCart: newQuantity,
    //           };
    //           btn.previousElementSibling.textContent = newQuantity;

    //           localStorage.setItem("totalCost", (cartCost += value.price));

    //           // console.log(value);
    //         }
    //         btn.parentElement.previousElementSibling.innerHTML = `$${
    //           value.inCart * value.price
    //         }`;

    //         document.querySelector(".pay-in-fig").innerHTML = `$${cartCost}`;

    //         localStorage.setItem("addToCartItems", JSON.stringify(cartItems));
    //       }

    //       if (removeClicked) {
    //         console.log("removed");
    //       }
    //     });
    //   });
    // });
  }
};
cart.addEventListener("click", displayCart);

document.querySelector(".continue-btn").addEventListener("click", (e) => {
  e.preventDefault();
  form.classList.remove("show");
  overlay.classList.remove("body-overlay");
});

onLoadPage();
