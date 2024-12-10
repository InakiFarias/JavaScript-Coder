pedirProductos()

function pedirProductos(){
    fetch('./productos.json')
        .then(info => info.json())
        .then(productos => cargarPagina(productos))
        .catch(error => {
            console.error(error)
            Swal.fire({
                title: 'Error',
                text: 'No se pudieron cargar los productos. Inténtelo más tarde.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
        })
}

function cargarPagina(productos){
    

    let carrito = JSON.parse(localStorage.getItem("carrito"))
    carrito = carrito || []
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



function crearTarjetasProductos(productos, carrito){
    let contenedor = document.getElementById("contenedorDeProductos")
    contenedor.innerHTML = ""
    productos.forEach(producto => {
        let tarjetaProducto = document.createElement("div")
        tarjetaProducto.className = "tarjetaVino"
        tarjetaProducto.innerHTML = `
            <img src=./imagenes/${producto.rutaImagen}>
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio.toLocaleString('es-AR')}</p>
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
    Swal.fire({
        title: 'Producto agregado!',
        text: `${productoOriginal.nombre} se ha añadido al carrito`,
        showConfirmButton: false,
        timer: 3000,
        position: 'bottom-end',
        toast: true
    })
    renderizarCarrito(carrito)
    guardarEnStorage(carrito)
}

function renderizarCarrito(carrito){
    let contenedorCarrito = document.getElementById("carrito")
    contenedorCarrito.innerHTML = ""
    carrito.forEach(producto => {
        let tarjetaCarrito = document.createElement("div")
        tarjetaCarrito.className = "tarjetaCarrito"
        tarjetaCarrito.innerHTML = `
            <p>${producto.nombre}</p>
            <p>$${producto.precioUnitario.toLocaleString('es-AR')}</p> 
            <p>${producto.unidades}</p>
            <p>$${producto.subtotal.toLocaleString('es-AR')}</p>  
            <button id=${producto.id} class=botonCarrito>Eliminar</button>     
        `
        contenedorCarrito.appendChild(tarjetaCarrito)
    })
    agregarEventosAlCarrito(carrito)
}

function agregarEventosAlCarrito(carrito){
    let botonesCarrito = document.getElementsByClassName("botonCarrito")
    for(const boton of botonesCarrito){
        boton.addEventListener("click", (e) => eliminarDelCarrito(e, carrito))
    }
}

function eliminarDelCarrito(e, carrito){
    let idProductoEnCarrito = Number(e.target.id)
    let indiceCarrito = carrito.findIndex(producto => producto.id === idProductoEnCarrito)
    if (indiceCarrito !== -1) {
        carrito.splice(indiceCarrito, 1)
        e.target.parentElement.remove()
    }
    guardarEnStorage(carrito)
}

function guardarEnStorage(valor){
    let valorJson = JSON.stringify(valor)
    localStorage.setItem("carrito", valorJson)
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

    e.target.innerText = e.target.innerText === "Carrito" ? "Productos" : "Carrito"

}


function filtrarYRenderizar(e, productos, carrito){
    let filtro = e.target.value
    let productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(filtro.toLowerCase()))
    crearTarjetasProductos(productosFiltrados, carrito)
}

function vaciarCarrito(e, carrito){
    if(carrito.length > 0){
        carrito.splice(0, carrito.length); 
        localStorage.removeItem("carrito")
        renderizarCarrito(carrito)
    }
}

function finalizarCompra(e, carrito){
    if(carrito.length){
        let total = carrito.reduce((sum, producto) => sum + producto.subtotal, 0);
        Swal.fire({
            title: 'Gracias por su compra!',
            text: `Su pago por $${total.toLocaleString('es-AR')} ha sido realizado con éxito`,
            icon: 'success',
            confirmButtonText: 'Continuar'
        })
        vaciarCarrito(e, carrito)
    }
}

function filtrarPorCategoria(e, productos, marca, carrito){
    crearTarjetasProductos(filtroPorCategoria(productos, marca), carrito)
}

function filtroPorCategoria(productos, marca){
    return productos.filter(producto => producto.marca === marca)
}
