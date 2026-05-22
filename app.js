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

cart.forEach((item,index) => {
total += item.price;

cartItems.innerHTML += `
<div class="cartItem">
<strong>${item.name}</strong><br>
Talle: ${item.size}<br>
Color: ${item.color}<br>
$${item.price}<br>
<button onclick="removeItem(${index})">Eliminar</button>
</div>
`;
});

document.getElementById("cartTotal").innerText = "Total: $" + total;
}

function removeItem(index){
cart.splice(index,1);
updateCart();
}

function openCart(){
document.getElementById("cartMessage").innerText = "";
document.getElementById("cartModal").style.display = "flex";
}

function closeCart(){
document.getElementById("cartModal").style.display = "none";
}

function openCheckout(){
if(cart.length === 0){
document.getElementById("cartMessage").innerText = "Primero agregá productos al carrito.";
return;
}

closeCart();
document.getElementById("checkoutMessage").innerText = "";
document.getElementById("checkoutModal").style.display = "flex";
}

function closeCheckout(){
document.getElementById("checkoutModal").style.display = "none";
}

function payAndSend(){
const name = document.getElementById("clientName").value.trim();
const phone = document.getElementById("clientPhone").value.trim();
const email = document.getElementById("clientEmail").value.trim();
const address = document.getElementById("clientAddress").value.trim();
const postal = document.getElementById("clientPostal").value.trim();
const city = document.getElementById("clientCity").value.trim();
const paymentMethod = document.getElementById("paymentMethod").value;
const message = document.getElementById("checkoutMessage");

if(!name || !phone || !email || !address || !postal || !city){
message.innerText = "Completá todos los datos.";
return;
}

message.innerText = "Procesando pago demo y enviando pedido...";

const requests = cart.map(item => {
const order = {
prenda:item.name,
talle:item.size,
color:item.color,
cliente:name,
telefono:phone,
email:email,
direccion:address + " - " + city,
codigoPostal:postal,
precio:"$" + item.price,
estado:"Pendiente",
medioPago:paymentMethod
};

return fetch("https://cloud.activepieces.com/api/v1/webhooks/UgAY0jdMygg6hWDUgfMRQ",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(order)
});
});

Promise.all(requests)
.then(() => {
message.innerText = "Pago demo aprobado ✅ Pedido enviado.";
cart = [];
updateCart();
})
.catch(() => {
message.innerText = "Error al enviar. Revisá Activepieces.";
});
}
