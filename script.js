// E-COMERCE: Simular la compra de unos vinos y al finalizar mostrar el total a pagar. Aplicar descuentos por metodo de pago. 
let total = 0
let opcion
let cantidad 
let metodo
let descuento

alert("Bienvenido a nuestra bodega de vinos!")

do{
    opcion = Number(prompt("0-Salir\n1-Malbec Mil Demonios 15.000$\n2-Malbec Luigi Bosca 14.000$\n3-El enemigo 22.000$\n4-Malbec Los Nobles 60.000$\n5-Finalizar compra"))

    if(opcion === 1){
        cantidad = Number(prompt("Ingrese cantidad: "))
        total += cantidad * 15000
    }else if(opcion === 2){
        cantidad = Number(prompt("Ingrese cantidad: "))
        total += cantidad * 14000
    }else if(opcion === 3){
        cantidad = Number(prompt("Ingrese cantidad: "))
        total += cantidad * 22000
    }else if(opcion === 4){
        cantidad = Number(prompt("Ingrese cantidad: "))
        total += cantidad * 60000
    }else if(opcion === 5){
        metodo = Number(prompt("Metodo de pago\n1-Efectivo (20% de descuento)\n2-Mercado Pago (10% de descuento)\n3-Tarjeta de debito (10% de descuento)\n4-Tarjeta de credito"))
        
        if(metodo === 1){
            descuento = 20
        }else if(metodo === 2){
            descuento = 10
        }else if(metodo === 3){
            descuento = 10
        }else if(metodo === 4){
            descuento = 0
        }

        total = aplicarDescuento(total, descuento)
        alert("El precio final a pagar es: " + total + "$")
    }else if(opcion > 5 || opcion < 0 || isNaN(opcion)){
        alert("Opcion no valida!")
    }

}while(opcion !== 0 && opcion !== 5)

function aplicarDescuento(total, descuento){
    return total - (total * descuento / 100)
}