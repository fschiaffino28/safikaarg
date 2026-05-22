
const products = {
remeras:[
{name:"Black Tee",price:29000},
{name:"Brown Tee",price:31000}
],
pantalones:[
{name:"Grey Cargo",price:48000},
{name:"Black Pant",price:52000}
],
buzos:[
{name:"Urban Hoodie",price:59000},
{name:"Grey Crewneck",price:56000}
],
accesorios:[
{name:"Safika Cap",price:18000},
{name:"Shoulder Bag",price:24000}
]
};

let currentProduct = null;
let cart = [];

function showCategory(category){

const container = document.getElementById("products");

container.innerHTML = "";

products[category].forEach(product => {

container.innerHTML += `
<div class="product" onclick='openProduct(${JSON.stringify(product)})'>
<h3>${product.name}</h3>
<p>$${product.price}</p>
</div>
`;

});

}

function openProduct(product){

currentProduct = product;

document.getElementById("productTitle").innerText = product.name;
document.getElementById("productPrice").innerText = "$" + product.price;

document.getElementById("productModal").style.display = "flex";

}

function closeProduct(){
document.getElementById("productModal").style.display = "none";
}

function addToCart(){

const item = {
name:currentProduct.name,
price:currentProduct.price,
size:document.getElementById("size").value,
color:document.getElementById("color").value
};

cart.push(item);

updateCart();

closeProduct();

}

function updateCart(){

document.getElementById("cartCount").innerText = cart.length;

const cartItems = document.getElementById("cartItems");

cartItems.innerHTML = "";

let total = 0;

cart.forEach(item => {

total += item.price;

cartItems.innerHTML += `
<div class="cartItem">
<strong>${item.name}</strong><br>
Talle: ${item.size}<br>
Color: ${item.color}<br>
$${item.price}
</div>
`;

});

document.getElementById("cartTotal").innerText = "Total: $" + total;

}

function openCart(){
document.getElementById("cartModal").style.display = "flex";
}

function closeCart(){
document.getElementById("cartModal").style.display = "none";
}
