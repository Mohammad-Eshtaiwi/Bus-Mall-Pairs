/* global Cart */
"use strict";

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var tableBody = document.querySelector("table tbody");
console.log(tableBody);
var cart;

function loadCart() {
  var cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {
  // TODO: Find the table body
  // TODO: Iterate over the items in the cart
  // TODO: Create a TR
  // TODO: Create a TD for the delete link, quantity,  and the item
  // TODO: Add the TR to the TBODY and each of the TD's to the TR
}

function removeItemFromCart(event) {
  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  // TODO: Save the cart back to local storage
  // TODO: Re-draw the cart table
}

// This will initialize the page and draw the cart on screen
// renderCart();

function fillTable() {
  let products = JSON.parse(localStorage.getItem("cart"));
  console.log(products);
  products.forEach((product, index) => {
    let tr = document.createElement("tr");
    let remove = document.createElement("td");
    remove.innerHTML = "<button onclick='removeItemFromCart()'>X</button>";

    tr.appendChild(remove);

    let quantity = document.createElement("td");
    quantity.setAttribute("quantity", product.quantity);
    quantity.innerHTML = product.quantity;
    tr.appendChild(quantity);
    let item = document.createElement("td");
    item.setAttribute("name", product.name);
    item.innerHTML = product.name;
    tr.appendChild(item);
    tableBody.appendChild(tr);
  });
}
fillTable();
function removeItemFromCart() {
  let product = {};
  let tr = event.path[2];
  let name = tr.querySelector("td[name]").innerHTML;
  let quantity = tr.querySelector("td[quantity]").innerHTML;
  product.name = name;
  product.quantity = quantity;
  console.log(product);
  tr.remove();
  let products = JSON.parse(localStorage.getItem("cart"));
  let index = products.indexOf(product);
  products.splice(index);
  products = JSON.stringify(products);
  localStorage.setItem("cart", products);
}
function displayForm() {
  let form = document.createElement("form");
  form.innerHTML = `<fieldset>
  <legend>Confirm</legend>
  <label>name <input type="text" required></label>
  <br>
  <br>
  <label>street <input type="text" required></label>
  <br>
  <br>
  <label>city <input type="text" required></label>
  <br>
  <br>
  <label>state <input type="text" required></label>
  <br>
  <br>
  <label>zip code <input type="text" required></label>
  <br>
  <br>
  <label>phone numer <input type="text" required></label>
  <br>
  <br>
  <label>credit card number <input type="number" onchange="onChange()" required></label>
  <br>
  <br>
  <button type="submit"  disabled=true onclick="onSubmit()">confirm</button>
</fieldset>`;
  document.body.appendChild(form);
}
displayForm();
function onChange() {
  console.log("abc");
  let input = event.path[0];
  console.log(event.path);
  let button = document.querySelector("button[type=submit]");
  console.log(button);
  input = input.value;
  console.log(input.length);
  if (input.length !== 16) {
    button.setAttribute("disabled", true);
  } else {
    button.removeAttribute("disabled");
  }
}

function onSubmit() {
  let form = document.querySelector("form");
  form.remove();
  displayForm();
  localStorage.removeItem("cart");
  console.log("done");
  location.reload();
}
