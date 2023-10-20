
import { app, db } from "../services/firebase/firebaseConfig";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {doc,getDoc,updateDoc} from "firebase/firestore";
import { createContext, useState } from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const auth = getAuth(app);

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [contador, setContador] = useState(0);
  const [carrito, setCarrito] = useState(0);
  const [productosEnCarrito, setProductosEnCarrito] = useState([]);
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);
  const [wishList, setWishList] = useState([]);
  const [logueado, setLogueado] = useState(false);
  const [userEmail, setUserEmail] = useState(false);
  const [registrando, setRegistrando] = useState(false);

  const mostrarMensaje = (message, type) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      position: "center",
      width: "20rem",
      icon: type,
      title: message,
      showConfirmButton: false,
      timer: 2000,
    });
  };


  const autenticacion = async (e) => {
    e.preventDefault();
    const correo = e.target.correo.value;
    const contrasena = e.target.contrasena.value;

    if (!correo.trim() || !contrasena.trim()) {
      mostrarMensaje("Debe completar todos los campos", "error");
    } else if (contrasena.length < 6) {
      mostrarMensaje("La contraseña debe tener más de 6 caracteres", "error");
    } else {
      if (!registrando) {
        try {
          await createUserWithEmailAndPassword(auth, correo, contrasena);
          mostrarMensaje("Usuario creado con éxito", "success");
        } catch (error) {
          mostrarMensaje("Este usuario ya está registrado", "error");
        }
      } else {
        try {
          await signInWithEmailAndPassword(auth, correo, contrasena);
          mostrarMensaje("Bienvenido", "success");
          setLogueado(true);
        } catch (error) {
          mostrarMensaje("Usuario o Contraseña Incorrecta", "error");
        }
      }
    }
  };

  const logout = () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Seguro que querés desloguearte?",
      showDenyButton: true,
      confirmButtonText: "Cerrar Sesión",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        signOut(auth);
        setLogueado(false);
        setWishList([]);
        mostrarMensaje("Hasta Luego!", "success");
      }
    });
  };


  const agregarAWishList = (prod) => {
    const existe = wishList.find((p) => p.id === prod.id);
    if (!existe) {
      setWishList([...wishList, prod]);
      mostrarMensaje("Agregado a Wish List", "success");
    }
  };

  const eliminarDeWishList = (prodId) => {
    const nuevoArray = wishList.filter((p) => p.id !== prodId);
    setWishList(nuevoArray);
  };


  const agregarAlCarrito = (prodId) => {
    const itemRef = doc(db, "productos", prodId);
    getDoc(itemRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const existe = productosEnCarrito.find((p) => p.id === prodId);
          if (existe) {
            existe.cantidad += contador;
            setTotal(total + contador * existe.precio);
          } else {
            productos[0].cantidad = contador;
            setTotal(total + productos[0].cantidad * productos[0].precio);
            setProductosEnCarrito([...productosEnCarrito, productos[0]]);
          }
          productos[0].stock -= contador;
          updateDoc(itemRef, { stock: productos[0].stock });
          setCarrito(carrito + contador);
          setContador(0);
        } else {
          console.log("El documento no existe.");
        }
      })
      .catch((error) => {
        console.error("Error al obtener el documento:", error);
      });
      mostrarMensaje("Agregado al Carrito", "success");
  }

  const eliminarProducto = (prodId) => {
    const itemRef = doc(db, "productos", prodId);
    getDoc(itemRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const prodAEliminar = productosEnCarrito.find((p) => p.id === prodId);
          prodAEliminar.stock += prodAEliminar.cantidad;
          updateDoc(itemRef, { stock: prodAEliminar.stock });
          setTotal(total - prodAEliminar.cantidad * prodAEliminar.precio);
          setCarrito(carrito - prodAEliminar.cantidad);
          const nuevoCarrito = productosEnCarrito.filter((p) => p.id !== prodId);
          setProductosEnCarrito(nuevoCarrito);
        } else {
          console.log("El documento no existe[0].");
        }
      })
      .catch((error) => {
        console.error("Error al obtener el documento:", error);
      });
  };

  const vaciarCarrito = () => {
    productosEnCarrito.forEach((prod) => {
      const itemRef = doc(db, "productos", prod.id);
      getDoc(itemRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            prod.stock += prod.cantidad;
            updateDoc(itemRef, { stock: prod.stock });
            prod.cantidad = 0;
          }
        });
    });
    setContador(0);
    setTotal(0);
    setCarrito(0);
    setProductosEnCarrito([]);
  };

   return (
    <CarritoContext.Provider value={{ autenticacion, registrando, setRegistrando, eliminarDeWishList, agregarAWishList, wishList,setWishList, logout, logueado, setLogueado, userEmail, setUserEmail, total,setTotal,eliminarProducto, productosEnCarrito,setProductosEnCarrito,contador,setContador,productos,setProductos,carrito,setCarrito,vaciarCarrito, agregarAlCarrito}}>
      {children}
    </CarritoContext.Provider>
  )
}
