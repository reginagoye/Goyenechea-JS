

//________________________________________________________________________________________________________

//ecommerce
//creación productos

class Producto{
    constructor(id, nombre, precio, imagen, stock){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.stock = stock;
    }
    actualizarStock(){
        this.stock = this.stock - 1
        console.log(`stock de ${this.stock} actualizado`)
    }
}
const banio = new Producto(0, 'baño', 1800, 'banio.jpg', 10);
const banioHigiencio = new Producto(1, 'baño higiénico', 2500, 'baniohigienico.jpeg', 10)
const banioYcorte = new Producto(2, 'baño y corte', 3600, 'banioycorte.jpeg', 10)

const productos = [banio, banioHigiencio, banioYcorte]

//Card Productos DOM
const cardProductos = (listaStock) => {
    for (elem of listaStock){
        let card = document.createElement("div")
        card.innerHTML =    `<div class="card" style="width: 18rem;">
                            <img src="./img/${elem.imagen}" class="card-img-top" alt="...">
                            <div class="card-body">
                            <h5 class="card-title">${elem.nombre}</h5>
                            <p class="card-text">${elem.precio}</p>
                            <input type="button" value="selecciona" class="btn btn-primary" onclick="agregarCarrito(${elem.id})" >
                            </div>
                        </div>`
        document.body.append(card)
    }
}
cardProductos(productos)

//Carrito
const arrayCarrito = []

class itemCarrito{
    constructor(producto, cantidad){
        this.producto = producto;
        this.cantidad = cantidad;
    }
    sumaStock(){
        this.cantidad = this.cantidad + 1
    }
}
function agregarCarrito(prod){
    let existeEnCarrito = arrayCarrito.find((e) => e.producto == prod)
    if (existeEnCarrito != undefined){
        let posicion = arrayCarrito.findIndex(elem => elem.producto == existeEnCarrito.producto)
        arrayCarrito[posicion].sumaStock()
    }else{
        const alCarrito = new itemCarrito(prod, 1)
        arrayCarrito.push(alCarrito)
        let carrito = prompt("desea agregar otro producto?")
        if(carrito != "si"){
        verCarrito(arrayCarrito)
        }else{
            agregarCarrito(prod)
        }
    }
}
function verCarrito(){
    document.body.innerHTML = ''

    for (item of arrayCarrito){
        let card = document.createElement("div")
        let datosProducto = productos.find(elem => elem.id == item.producto)

        card.innerHTML =    `<div class="card" style="width: 18rem;">
                            <img src="./img/${datosProducto.imagen}" class="card-img-top" alt="...">
                            <div class="card-body">
                            <h5 class="card-title">${datosProducto.nombre}</h5>
                            <p class="card-text">${item.cantidad} unidades a ${datosProducto.precio} cada una</p>
                            </div>
                        </div>`
    document.body.append(card)
    }
}
// function filtroBaratos(){
//     const productosBaratos = productos
//     productosBaratos.sort(function (a,b){return a.precio - b.precio})
//     console.table(productosBaratos)
//     cardProductos(productosBaratos)
// }

//Local Storage
const banioJSON = JSON.stringify(banio);
// console.log(banioJSON)
localStorage.setItem('baño', banioJSON);
const productoBanioJSON = localStorage.getItem("baño");
const productoBanio = JSON.parse(productoBanioJSON);
// console.log(productoBanio);

const banioHigienicoJSON = JSON.stringify(banioHigiencio);
// console.log(banioHigienicoJSON)
localStorage.setItem('baño higiénico', banioHigienicoJSON);
const productoBanioHigienicoJSON = localStorage.getItem("baño higiénico");
const productoBanioHigienico = JSON.parse(productoBanioHigienicoJSON);
// console.log(productoBanioHigienico);

const banioYcorteJSON = JSON.stringify(banioYcorte);
// console.log(banioYcorteJSON)
localStorage.setItem('baño y corte', banioYcorteJSON);
const productoYcorteJSON = localStorage.getItem("baño y corte");
const productoYcorte = JSON.parse(productoBanioYcorteJSON);
// console.log(productoBanioYcorte);

//Evento
const botonFondo = document.getElementById("botonFondo")

botonFondo.addEventListener("click", respuestaClick)
function respuestaClick(){
    document.body.classList.toggle("dark")
    if(document.body.classList.contains("dark")){
        localStorage.setItem("modo", "dark")
    }else {
        localStorage.setItem("modo", "light")
    }
}
const modo = localStorage.getItem ("modo");
if (modo === "dark"){
    document.body.classList.add("dark");
}else{
    document.body.classList.remove("dark");
}

const divIG = document.getElementById(divIG)
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '5d9ab9969emsh7882a485da686f2p1a468fjsn6d0163349974',
		'X-RapidAPI-Host': 'instagram47.p.rapidapi.com'
	}
};

fetch('https://instagram47.p.rapidapi.com/hashtag_search?hashtag=perros', options)
	.then(response => response.json())
	.then(response => divIG.innerHTML= console.log(response))
	.catch(err => console.error(err));