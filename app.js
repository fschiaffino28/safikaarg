
const products = {
remeras:[
{name:"Black Tee",price:29000,class:"dark"},
{name:"Brown Tee",price:31000,class:"brown"},
{name:"Grey Tee",price:28000,class:"grey"}
],
pantalones:[
{name:"Grey Cargo",price:48000,class:"grey"},
{name:"Black Pant",price:52000,class:"dark"},
{name:"Brown Utility",price:50000,class:"brown"}
],
buzos:[
{name:"Urban Hoodie",price:59000,class:"dark"},
{name:"Brown Hoodie",price:62000,class:"brown"},
{name:"Grey Crewneck",price:56000,class:"grey"}
],
accesorios:[
{name:"Safika Cap",price:18000,class:"dark"},
{name:"Shoulder Bag",price:24000,class:"brown"},
{name:"Beanie",price:16000,class:"grey"}
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

<div class="productImageCard ${product.class}">
${product.name}
</div>

<div class="productInfo">
<h3>${product.name}</h3>
<p>$${product.price}</p>
</div>

</div>
`;

});

}

function openProduct(product){

currentProduct = product;

document.getElementById("productTitle").innerText = product.name;
document.getElementById("productPrice").innerText = "$" + product.price;

const image = document.getElementById("productImage");

image.className = "productImage " + product.class;

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
