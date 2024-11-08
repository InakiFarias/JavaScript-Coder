let productos = [
    { id: 1, nombre : "Malbec MilDemonios", precio : 15000, tipo : "tinto", marca: "Malbec"},
    { id: 2, nombre : "Malbec Luigi Bosca", precio : 14000, tipo : "tinto", marca: "Malbec"},
    { id: 3, nombre : "Malbec El Enemigo", precio : 22000, tipo : "tinto", marca: "Malbec"},
    { id: 4, nombre : "Malbec Los Nobles", precio : 15000, tipo : "tinto", marca: "Malbec"},
    { id: 5, nombre : "Champagne Don Perignon", precio : 15000, tipo : "espumante", marca: "Dom Perignon"},
    { id: 6, nombre : "Cafayate Reserva Torrontes Blanco", precio : 15000, tipo : "blanco", marca: "Cayafate"},
]

let productosFiltrados = productos
let carrito = []
let opcion 
let totalAPagar = 0


do{
    opcion = Number(prompt("0-Salir\n1-Agregar al carrito\n2-Filtrar por categoria\n3-Finalizar compra"))

    if(opcion === 1){
        let mensaje = "Seleccione producto por id:\n"
        productosFiltrados.forEach(producto => mensaje += `${producto.id} - ${producto.nombre} - ${producto.precio}\n`)
        let idProducto = parseInt(prompt(mensaje))
        let cantidad = Number(prompt("Ingrese cantidad: "))

        if(productosFiltrados.findIndex(producto => producto.id === idProducto) !== -1 && cantidad > 0){
            carrito = actualizarCarrito(carrito, productosFiltrados, idProducto, cantidad)
        }
        else{
            alert("Id no encontrado o cantidad invalida")
        }
    }
    else if(opcion === 2){
        let filtro = prompt("Todos\nTinto\nEspumante\nBlanco")
        productosFiltrados = filtrar(productos, filtro)
    }
    else if(opcion === 3){
        carrito.forEach(producto => totalAPagar += producto.precio * producto.unidades)

        totalAPagar = aplicarDescuento(totalAPagar)
        alert("El total a pagar es: " + totalAPagar.toLocaleString('es-AR', {style: 'currency', currency: 'ARS'}))
        opcion = 0
    }
    else if(opcion !== 0){
        alert("Metodo no valido")
    }
}while(opcion != 0)

function filtrar(productos, filtro){
    if(productos.findIndex(producto => producto.tipo === filtro) !== -1){
        productos = productos.filter(producto => producto.tipo === filtro)
    }
    else if(filtro.toLowerCase() !== "todos"){
        alert("Filtro no valido")
    }
    return productos
}

function actualizarCarrito(carrito, productos, idProducto, cantidad){
    let productoPedido = productos.find(producto => producto.id === idProducto)
    let productoEnCarrito = carrito.find(producto => producto.id === idProducto);
    if(productoEnCarrito){
        productoEnCarrito.unidades += cantidad;
    }
    else{
        carrito.push({
            id : productoPedido.id,
            nombre : productoPedido.nombre,
            precio : productoPedido.precio,
            unidades : cantidad
        })    
    }
    return carrito
}

function aplicarDescuento(totalAPagar){
    let metodo = Number(prompt("Metodo de pago\n1-Efectivo (20% de descuento)\n2-Mercado Pago (10% de descuento)\n3-Tarjeta de debito (10% de descuento)\n4-Tarjeta de credito"))
    let descuento = 0
        if(metodo === 1){
            descuento = 20
        }else if(metodo === 2){
            descuento = 10
        }else if(metodo === 3){
            descuento = 10
        }
    return totalAPagar - (totalAPagar * descuento / 100)
}