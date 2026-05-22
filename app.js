const products=[{id:1,category:"remeras",title:"Black Essential Tee",price:29000,desc:"Remera negra boxy fit, algodón pesado y estética minimal.",class:"p1"},{id:2,category:"remeras",title:"Brown Oversized Tee",price:31000,desc:"Remera marrón oversize con corte urbano elegante.",class:"p2"},{id:3,category:"remeras",title:"White Logo Tee",price:27000,desc:"Remera blanca con logo chico y fit relajado.",class:"p5"},{id:4,category:"pantalones",title:"Grey Cargo",price:48000,desc:"Pantalón cargo gris con bolsillos laterales.",class:"p3"},{id:5,category:"pantalones",title:"Black Wide Pant",price:52000,desc:"Pantalón negro ancho, urbano y cómodo.",class:"p4"},{id:6,category:"pantalones",title:"Brown Utility Pant",price:50000,desc:"Pantalón marrón estilo utility con corte premium.",class:"p6"},{id:7,category:"buzos",title:"Urban Hoodie",price:59000,desc:"Buzo negro con capucha, fit oversize y estilo streetwear.",class:"p4"},{id:8,category:"buzos",title:"Brown Hoodie",price:62000,desc:"Buzo marrón premium, cómodo y minimal.",class:"p2"},{id:9,category:"buzos",title:"Grey Crewneck",price:56000,desc:"Buzo gris sin capucha, básico y elegante.",class:"p3"},{id:10,category:"accesorios",title:"Safika Cap",price:18000,desc:"Gorra negra con logo Safika bordado.",class:"p1"},{id:11,category:"accesorios",title:"Shoulder Bag",price:24000,desc:"Morral urbano negro para completar el outfit.",class:"p4"},{id:12,category:"accesorios",title:"Brown Beanie",price:16000,desc:"Gorro marrón simple, cómodo y minimalista.",class:"p2"}];

const categoryNames={remeras:"Remeras",pantalones:"Pantalones",buzos:"Buzos",accesorios:"Accesorios"};
let currentProduct=null;
let selectedSize="M";
let cart=JSON.parse(localStorage.getItem("safika_cart")||"[]");
let user=JSON.parse(localStorage.getItem("safika_user")||"null");

updateHeader();
updateCart();

function updateHeader(){document.getElementById("accountBtn").textContent=user?user.nombre.split(" ")[0]:"Crear cuenta"}
function saveCart(){localStorage.setItem("safika_cart",JSON.stringify(cart));updateCart()}

function showCategory(category){
const filtered=products.filter(product=>product.category===category);
document.getElementById("productos").classList.remove("hidden");
document.getElementById("categoryTitle").textContent=categoryNames[category];
document.getElementById("categoryMini").textContent="Sección de "+categoryNames[category];
const grid=document.getElementById("productGrid");
grid.innerHTML="";
filtered.forEach(product=>{
grid.innerHTML+=`<article class="product" onclick="openProduct(${product.id})"><div class="photo ${product.class}">${product.title}</div><div class="info"><h3>${product.title}</h3><p>$${product.price.toLocaleString("es-AR")}</p></div></article>`;
});
document.getElementById("productos").scrollIntoView({behavior:"smooth"});
}

function backToCategories(){document.getElementById("productos").classList.add("hidden");document.getElementById("categorias").scrollIntoView({behavior:"smooth"})}

function openProduct(id){
currentProduct=products.find(product=>product.id===id);
document.getElementById("productPanel").classList.add("show");
document.getElementById("productTitle").textContent=currentProduct.title;
document.getElementById("productPrice").textContent="$"+currentProduct.price.toLocaleString("es-AR");
document.getElementById("productDesc").textContent=currentProduct.desc;
const image=document.getElementById("mainImage");
image.className="detail-main "+currentProduct.class;
image.textContent=currentProduct.title;
document.getElementById("productMsg").textContent="";
setSize("M");
}

function closeProduct(){document.getElementById("productPanel").classList.remove("show")}

function setSize(size){
selectedSize=size;
document.querySelectorAll(".sizes button").forEach(button=>{button.classList.toggle("active",button.textContent===size)});
}

function addToCart(){
const item={title:currentProduct.title,price:currentProduct.price,size:selectedSize,color:document.getElementById("color").value};
cart.push(item);
saveCart();
document.getElementById("productMsg").textContent="Producto agregado al carrito ✅";
}

function openAccount(){document.getElementById("accountModal").style.display="flex"}
function closeAccount(){document.getElementById("accountModal").style.display="none"}

function createAccount(){
const nombre=document.getElementById("regName").value.trim();
const email=document.getElementById("regEmail").value.trim();
const telefono=document.getElementById("regPhone").value.trim();
const pass=document.getElementById("regPass").value.trim();
const msg=document.getElementById("accountMsg");
if(!nombre||!email||!telefono||!pass){msg.textContent="Completá todos los datos para crear la cuenta.";return}
user={nombre,email,telefono};
localStorage.setItem("safika_user",JSON.stringify(user));
msg.textContent="Cuenta demo creada ✅";
updateHeader();
setTimeout(()=>closeAccount(),900);
}

function updateCart(){
document.getElementById("cartCount").textContent=cart.length;
const container=document.getElementById("cartItems");
if(!container)return;
container.innerHTML="";
let total=0;
cart.forEach((item,index)=>{
total+=item.price;
container.innerHTML+=`<div class="cart-line"><strong>${item.title}</strong><br>Talle: ${item.size}<br>Color: ${item.color}<br>$${item.price.toLocaleString("es-AR")}<br><button onclick="removeItem(${index})">Eliminar</button></div>`;
});
document.getElementById("cartTotal").textContent="Total: $"+total.toLocaleString("es-AR");
}

function openCart(){updateCart();document.getElementById("cartModal").style.display="flex"}
function closeCart(){document.getElementById("cartModal").style.display="none"}
function removeItem(index){cart.splice(index,1);saveCart();openCart()}

function startCheckout(){
const msg=document.getElementById("cartMsg");
if(cart.length===0){msg.textContent="Primero agregá un producto al carrito.";return}
if(!user){msg.textContent="Para comprar tenés que crear una cuenta primero.";openAccount();return}
closeCart();
document.getElementById("shippingModal").style.display="flex";
}

function closeShipping(){document.getElementById("shippingModal").style.display="none"}

function finishOrder(){
const direccion=document.getElementById("shipAddress").value.trim();
const codigoPostal=document.getElementById("shipPostal").value.trim();
const ciudad=document.getElementById("shipCity").value.trim();
const msg=document.getElementById("shippingMsg");
if(!direccion||!codigoPostal||!ciudad){msg.textContent="Completá los datos de envío.";return}
msg.textContent="Procesando pago demo y guardando pedido...";
const medioPago=document.getElementById("paymentMethod").value;
const requests=cart.map(item=>{
const order={prenda:item.title,talle:item.size,color:item.color,cliente:user.nombre,telefono:user.telefono,email:user.email,direccion:direccion+" - "+ciudad,codigoPostal:codigoPostal,precio:"$"+item.price.toLocaleString("es-AR"),estado:"Pendiente",medioPago:medioPago};
return fetch(window.GOOGLE_SCRIPT_URL,{method:"POST",mode:"no-cors",body:JSON.stringify(order)});
});
Promise.all(requests).then(()=>{msg.textContent="Pago demo aprobado ✅ Pedido enviado al Google Sheet.";cart=[];saveCart();}).catch(()=>{msg.textContent="No se pudo enviar. Probá desde Netlify."});
}
