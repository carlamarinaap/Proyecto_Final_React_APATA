import { createContext, useState } from "react";

export const CarritoContext = createContext()

export const CarritoProvider = ({children}) =>{ 
  const [contador,setContador] = useState(0)
  const [carrito,setCarrito] = useState(0)
  const [productosEnCarrito, setProductosEnCarrito] = useState([])
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);


  const eliminarProducto = (productoId) => {
    const prodAEliminar = productosEnCarrito.find((p)=> p.id === productoId)
    prodAEliminar.stock = prodAEliminar.stock + prodAEliminar.cantidad
    setTotal(total - prodAEliminar.cantidad*prodAEliminar.precio)
    setCarrito(carrito - prodAEliminar.cantidad)
    const nuevoCarrito = productosEnCarrito.filter((p)=> p.id !== productoId)
    setProductosEnCarrito(nuevoCarrito)
  }
  const vaciarCarrito = () => {
    productosEnCarrito.forEach((prod)=>{
      prod.stock = prod.stock + prod.cantidad
      prod.cantidad = 0
    })
    setCarrito(0)
    setProductosEnCarrito([])
    setTotal(0)
    setContador(0)
  }

  return (
    <CarritoContext.Provider value={{total,setTotal,eliminarProducto, productosEnCarrito,setProductosEnCarrito,contador,setContador,productos,setProductos,carrito,setCarrito,vaciarCarrito}}>
      {children}
    </CarritoContext.Provider>
  )
}