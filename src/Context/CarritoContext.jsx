import { doc, getDoc, updateDoc } from "firebase/firestore";
import { createContext, useState } from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from 'sweetalert2'
import { db } from "../services/firebase/firebaseConfig";


export const CarritoContext = createContext()

export const CarritoProvider = ({children}) =>{ 
  const [contador,setContador] = useState(0)
  const [carrito,setCarrito] = useState(0)
  const [productosEnCarrito, setProductosEnCarrito] = useState([])
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);


  const agregarAlCarrito = (prodId) => {
    const itemRef = doc(db,"productos",prodId);
    getDoc(itemRef)
    .then((snapshot) => {
    if (snapshot.exists()) {
      const existe = productosEnCarrito.find((p)=> p.id === prodId)
      if (existe) {
        existe.cantidad = existe.cantidad + contador
        setTotal(total + contador*existe.precio)
      } else {
        productos[0].cantidad = contador
        setTotal(total + productos[0].cantidad*productos[0].precio)
        setProductosEnCarrito(productosEnCarrito => [...productosEnCarrito, productos[0]])
      }
      productos[0].stock = productos[0].stock - contador
      updateDoc(itemRef, {stock: productos[0].stock})
      setCarrito(carrito + contador)
      setContador(0)
      localStorage.setItem(productosEnCarrito, carrito)
    } else {
      console.log("El documento no existe.");
    }
  })
  .catch((error) => {
    console.error("Error al obtener el documento:", error);
  });

    const MySwal = withReactContent(Swal)
    if (contador !==0) {
      MySwal.fire({
        position: 'center',
        width: '20rem',
        icon: 'success',
        title: 'Agregado al Carrito',
        showConfirmButton: false,
        timer: 2000
      })
    }
  }

  const eliminarProducto = (prodId) => {
    const itemRef = doc(db,"productos",prodId);
    getDoc(itemRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const prodAEliminar = productosEnCarrito.find((p)=> p.id === prodId)
        prodAEliminar.stock = prodAEliminar.stock + prodAEliminar.cantidad
        updateDoc(itemRef, {stock: prodAEliminar.stock})
        setTotal(total - prodAEliminar.cantidad*prodAEliminar.precio)
        setCarrito(carrito - prodAEliminar.cantidad)
        const nuevoCarrito = productosEnCarrito.filter((p)=> p.id !== prodId)
        setProductosEnCarrito(nuevoCarrito)

      } else {
        console.log("El documento no existe[0].");
      }
    })
    .catch((error) => {
      console.error("Error al obtener el documento:", error);
    });
  }

  const vaciarCarrito = () => {
    productosEnCarrito.forEach((prod)=>{
    const itemRef = doc(db,"productos",prod.id);
    getDoc(itemRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        prod.stock = prod.stock + prod.cantidad
        updateDoc(itemRef, {stock: prod.stock})
      prod.cantidad = 0
      }
    })
    setCarrito(0)
    setProductosEnCarrito([])
    setTotal(0)
    setContador(0)
    })
  }
  return (
    <CarritoContext.Provider value={{total,setTotal,eliminarProducto, productosEnCarrito,setProductosEnCarrito,contador,setContador,productos,setProductos,carrito,setCarrito,vaciarCarrito, agregarAlCarrito}}>
      {children}
    </CarritoContext.Provider>
  )
}