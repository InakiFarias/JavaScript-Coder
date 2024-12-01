function principal(){
    let productos = [
        { id: 1, nombre : "Luigi Bosca Malbec D.O.C", precio : 15000, marca: "Luigi Bosca", rutaImagen: "LBMalbecDOC.jpg"},
        { id: 2, nombre : "Luigi Bosca Malbec", precio : 22000, marca: "Luigi Bosca", rutaImagen: "LBM.jpg"},
        { id: 3, nombre : "La Linda Malbec", precio : 15000, marca: "La Linda", rutaImagen: "LLM.jpeg"},
        { id: 4, nombre : "Luigi Bosca Cabernet Sauvignon", precio : 14000, marca: "Luigi Bosca", rutaImagen: "LBC.jpg"},
        { id: 5, nombre : "Luigi Bosca DE SANGRE Red Blend", precio : 15000, marca: "Luigi Bosca", rutaImagen: "LBRB.jpg"},
        { id: 6, nombre : "Luigi Bosca Pinot Noir", precio : 15000, marca: "Luigi Bosca", rutaImagen: "LBPN.jpg"},
        { id: 7, nombre : "La Linda Rose", precio : 15000, marca: "La Linda", rutaImagen: "LLR.jpg"},
        { id: 8, nombre : "La Linda Sweet Viognier", precio : 14000, marca: "La Linda", rutaImagen: "LLS.jpg"},
        { id: 9, nombre : "La Linda Torrontes", precio : 22000, marca: "La Linda", rutaImagen: "LLT.jpeg"},
        { id: 10, nombre : "Luigi Bosca Extra Brut", precio : 15000, marca: "Luigi Bosca", rutaImagen: "LBEB.jpg"},
        { id: 11, nombre : "Catena Zapata Malbec", precio : 15000, marca: "Catena Zapata", rutaImagen: "CZM.jpg"},
        { id: 12, nombre : "Catena Zapata Chardonnay", precio : 15000, marca: "Catena Zapata", rutaImagen: "CZC.jpg"},
        { id: 13, nombre : "Catena Zapata Cabernet Sauvignon", precio : 15000, marca: "Catena Zapata", rutaImagen: "CZCS.jpg"},
        { id: 14, nombre : "La Linda Malbec Organico", precio : 15000, marca: "La Linda", rutaImagen: "LLOM.png"},
        { id: 15, nombre : "Catena Zapata White Bones", precio : 15000, marca: "Catena Zapata", rutaImagen: "CZWB.jpg"},
    ]

    let carrito = JSON.parse(localStorage.getItem("carrito"))
    if(!carrito){
        carrito = []
    }
    renderizarCarrito(carrito)  

    crearTarjetasProductos(productos, carrito)

    let botonCarrito = document.getElementById("botonCarrito")
    botonCarrito.addEventListener("click", verOcultarCarrito)

    let inputBuscador = document.getElementById("inputBuscador")
    inputBuscador.addEventListener("keyup", (e) => filtrarYRenderizar(e, productos, carrito))

    let botonVaciarCarrito = document.getElementById("botonVaciarCarrito")
    botonVaciarCarrito.addEventListener("click", (e) => vaciarCarrito(e, carrito))

    let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")
    botonFinalizarCompra.addEventListener("click", (e) => finalizarCompra(e, carrito))

    let botonLuigi = document.getElementById("botonLuigi")
    botonLuigi.addEventListener("click", (e) => filtrarPorCategoria(e, productos, "Luigi Bosca", carrito))

    let botonLaLinda = document.getElementById("botonLaLinda")
    botonLaLinda.addEventListener("click", (e) => filtrarPorCategoria(e, productos, "La Linda", carrito))

    let botonCatena = document.getElementById("botonCatena")
    botonCatena.addEventListener("click", (e) => filtrarPorCategoria(e, productos, "Catena Zapata", carrito))

    let botonTodos = document.getElementById("botonTodos")
    botonTodos.addEventListener("click", (e) => crearTarjetasProductos(productos, carrito))


}

principal()

//TRABAJAR STORAGE Y JSON

//EVENTOS 

//FUNCIONES

function crearTarjetasProductos(productos, carrito){
    let contenedor = document.getElementById("contenedorDeProductos")
    contenedor.innerHTML = ""
    productos.forEach(producto => {
        let tarjetaProducto = document.createElement("div")
        tarjetaProducto.className = "tarjetaVino"
        tarjetaProducto.innerHTML = `
            <img src=./imagenes/${producto.rutaImagen}>
            <h3>${producto.nombre}</h3>
            <p>${producto.precio}$</p>
            <button class=botonesProductos id=${producto.id}>Agregar al carrito</button>
        `        
        contenedor.appendChild(tarjetaProducto)
    })
    agregarEventosALosProductos(productos, carrito)
}

function agregarEventosALosProductos(productos, carrito){
    let botonesProductos = document.getElementsByClassName("botonesProductos")
    for(const boton of botonesProductos){
        boton.addEventListener("click", (e) => agregarProductoAlCarrito(e, productos, carrito)) 
    }
}

function agregarProductoAlCarrito(e, productos, carrito){
    let id = Number(e.target.id)
    let productoOriginal = productos.find(producto => producto.id === id)
    let indiceDelProductoEnCarrito = carrito.findIndex(producto => producto.id === id)
    if(indiceDelProductoEnCarrito === -1){
        carrito.push({
            id: productoOriginal.id,
            nombre: productoOriginal.nombre,
            precioUnitario: productoOriginal.precio,
            unidades: 1,
            subtotal: productoOriginal.precio
        })
    }     
    else{
        carrito[indiceDelProductoEnCarrito].unidades++
        carrito[indiceDelProductoEnCarrito].subtotal = carrito[indiceDelProductoEnCarrito].unidades * carrito[indiceDelProductoEnCarrito].precioUnitario
    }
    renderizarCarrito(carrito)
    guardarEnStorage("carrito",carrito)
}

function renderizarCarrito(carrito){
    let contenedorCarrito = document.getElementById("carrito")
    contenedorCarrito.innerHTML = ""
    carrito.forEach(producto => {
        let tarjetaCarrito = document.createElement("div")
        tarjetaCarrito.className = "tarjetaCarrito"
        tarjetaCarrito.innerHTML = `
            <p>${producto.nombre}</p>
            <p>${producto.precioUnitario}</p>
            <p>${producto.unidades}</p>
            <p>${producto.subtotal}$</p>        
        `
        contenedorCarrito.appendChild(tarjetaCarrito)
    })
}

function guardarEnStorage(clave, valor){
    let valorJson = JSON.stringify(valor)
    localStorage.setItem(clave, valorJson)
}

function verOcultarCarrito(e){
    let carrito = document.getElementById("carrito")
    let contenedorDeProductos = document.getElementById("contenedorDeProductos")
    let buscador = document.getElementById("buscador")
    let finalizarCompra = document.getElementById("finalizarCompra")

    carrito.classList.toggle("oculta")  
    contenedorDeProductos.classList.toggle("oculta")
    buscador.classList.toggle("oculta")
    finalizarCompra.classList.toggle("oculta")

    if(e.target.innerText === "Carrito"){
        e.target.innerText = "Productos"
    } 
    else{
        e.target.innerText = "Carrito"
    }
}


function filtrarYRenderizar(e, productos, carrito){
    let filtro = e.target.value
    let productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(filtro.toLowerCase()))
    crearTarjetasProductos(productosFiltrados, carrito)
}

function vaciarCarrito(e, carrito){
    carrito.splice(0, carrito.length); 
    localStorage.removeItem("carrito")
    renderizarCarrito(carrito)
}

function finalizarCompra(e, carrito){
    let total = carrito.reduce((sum, producto) => sum + producto.subtotal, 0);
    alert(`Finalizaste tu compra por: ${total}$`)
    vaciarCarrito(e, carrito)
}

function filtrarPorCategoria(e, productos, marca, carrito){
    crearTarjetasProductos(filtroPorCategoria(productos, marca), carrito)
}

function filtroPorCategoria(productos, marca){
    return productos.filter(producto => producto.marca === marca)
}
