"use strict";
// Cart constructor.
// let Cart = function (items) {
// // this.items is an array of CartItem instances.
// Cart.items = items;
// Cart.allCarts.push(this);
// };
// Cart.allCarts = [];

// Cart.prototype.addItem = function (product, quantity) {
// // TODO: Fill in this instance method to create a new CartItem and add it to this.items
// };

// Cart.prototype.saveToLocalStorage = function () {
// // TODO: Fill in this instance method to save the contents of the cart to localStorage
// };

// Cart.prototype.removeItem = function (item) {
// // TODO: Fill in this instance method to remove one item from the cart.
// // Note: You will have to decide what kind of parameter to pass in here!
// };

// var CartItem = function (product, quantity) {
// CartItem.product = product;
// CartItem.quantity = quantity;
// };

var Product = function (filePath, name) {
  this.filePath = filePath;
  this.name = name;
  Product.allProducts.push(this);
};
Product.allProducts = [];

function Cart(name, quantity) {
  this.name = name;
  this.quantity = quantity;
}
// storage of items in the cart
let allCart = [];

function saveToLocalStorage() {
  // TODO: Fill in this instance method to save the contents of the cart to localStorage
  if (localStorage.length === 0) {
    let temp = JSON.stringify(allCart);
    localStorage.setItem("cart", temp);
  } else {
    let temp = JSON.parse(localStorage.getItem("cart"));
    temp.push(allCart[allCart.length - 1]);
    temp = JSON.stringify(temp);
    localStorage.setItem("cart", temp);
  }
}

Cart.prototype.removeItem = function (item) {
  // TODO: Fill in this instance method to remove one item from the cart.
  // Note: You will have to decide what kind of parameter to pass in here!
};

function generateCatalog() {
  new Product("assets/bag.jpg", "Bag");
  new Product("assets/banana.jpg", "Banana");
  new Product("assets/bathroom.jpg", "Bathroom");
  new Product("assets/boots.jpg", "Boots");
  new Product("assets/breakfast.jpg", "Breakfast");
  new Product("assets/bubblegum.jpg", "Bubblegum");
  new Product("assets/chair.jpg", "Chair");
  new Product("assets/cthulhu.jpg", "Cthulhu");
  new Product("assets/dog-duck.jpg", "Dog-Duck");
  new Product("assets/dragon.jpg", "Dragon");
  new Product("assets/pen.jpg", "Pen");
  new Product("assets/pet-sweep.jpg", "Pet Sweep");
  new Product("assets/scissors.jpg", "Scissors");
  new Product("assets/shark.jpg", "Shark");
  new Product("assets/sweep.png", "Sweep");
  new Product("assets/tauntaun.jpg", "Taun-Taun");
  new Product("assets/unicorn.jpg", "Unicorn");
  new Product("assets/usb.gif", "USB");
  new Product("assets/water-can.jpg", "Water Can");
  new Product("assets/wine-glass.jpg", "Wine Glass");
}

// Initialize the app by creating the big list of products with images and names
generateCatalog();
addOptions();
function addOptions() {
  let items = document.querySelector("#items");
  let option = document.createElement("option");
  option.setAttribute("value", "");
  option.textContent = "";
  items.appendChild(option);
  for (let index = 0; index < Product.allProducts.length; index++) {
    option = document.createElement("option");
    option.setAttribute("value", Product.allProducts[index].name);
    option.textContent = Product.allProducts[index].name;
    items.appendChild(option);
  }
}
let submit = document.querySelector("input[type=submit]");
submit.addEventListener("click", onSubmit);
let quantity = document.querySelector("#quantity");
quantity.setAttribute("value", "1");
quantity.setAttribute("min", "1");
function submitMessage(quantityValue, itemsValue) {
  let div = document.createElement("div");
  div.innerHTML = `
  <div class="message animate-left-to-right">
    <p>
      item added: ${itemsValue}
    </p>
    <p>
      quantity: ${quantityValue}
    </p>
    <br>
    <a href="./cart.html">go to cart</a>
    <button>cancel</button>
  </div>
  `;
  document.body.appendChild(div);
}

function onSubmit() {
  event.preventDefault();
  let items = document.querySelector("#items");
  let quantityValue = quantity.value;
  let itemsValue = items.value;
  console.log(itemsValue);
  console.log(quantityValue);
  submitMessage(quantityValue, itemsValue);
  allCart.push(new Cart(itemsValue, quantityValue));
  items.value = quantity.value = "";
  saveToLocalStorage();
  let self = event.target;
  self.setAttribute("disabled", true);
  let message = document.querySelector(".message");
  let cancel = document.querySelector(".message button");
  console.log(cancel);
  cancel.addEventListener("click", () => {
    self.removeAttribute("disabled");
    message.remove();
  });
}
