import { doc, getDoc, updateDoc } from "firebase/firestore";
import { createContext, useState } from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from 'sweetalert2'
import { app, db } from "../services/firebase/firebaseConfig";
import {  getAuth, signOut } from "firebase/auth";

const auth = getAuth(app)

export const CarritoContext = createContext()

export const CarritoProvider = ({children}) => { 

  const [contador,setContador] = useState(0)
  const [carrito,setCarrito] = useState(0)
  const [productosEnCarrito, setProductosEnCarrito] = useState([])
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);
  
  const [logueado,setLogueado] = useState(false)
  const [userEmail,setUserEmail] = useState(false)
  const [wishList,setWishList] = useState([])

  const agregarAWishList = (prod) => {
    const existe = wishList.find((p)=> p.id === prod.id)
    if (!existe)
      setWishList(wishList => [...wishList, prod])
  
      const MySwal = withReactContent(Swal)
      if (contador !==0) {
        MySwal.fire({
          position: 'center',
          width: '20rem',
          icon: 'success',
          title: 'Agregado a Wish List',
          showConfirmButton: false,
          timer: 2000
        })
      }
    }
  
  const eliminarDeWishList = (prodId) => {
    const nuevoArray = wishList.filter((p)=> p.id !== prodId)
    setWishList(nuevoArray)

  }

  const logout = () => {
    const MySwal = withReactContent(Swal)
    MySwal.fire({
      title: 'Seguro que querés desloguearte?',
      showDenyButton: true,
      confirmButtonText: 'Cerrar Sesión',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        signOut(auth)
        setLogueado(false)
        Swal.fire({
          title: 'Hasta Luego!',
          showConfirmButton: false,
          timer: 1500})
      } 
    })
  }

  const agregarAlCarrito = (prodId) => {
    console.log(prodId);
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
    <CarritoContext.Provider value={{eliminarDeWishList, agregarAWishList, wishList,setWishList, logout, logueado, setLogueado, userEmail, setUserEmail, total,setTotal,eliminarProducto, productosEnCarrito,setProductosEnCarrito,contador,setContador,productos,setProductos,carrito,setCarrito,vaciarCarrito, agregarAlCarrito}}>
      {children}
    </CarritoContext.Provider>
  )
}