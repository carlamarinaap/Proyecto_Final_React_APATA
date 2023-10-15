import { Button, Card, ButtonGroup } from "react-bootstrap";
import {Link, useParams} from 'react-router-dom'
import { useEffect, useState } from "react";
import {useContext} from 'react'
import  {CarritoContext}  from '../../Context/CarritoContext';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { getDoc, getFirestore, doc, getDocs, collection } from "firebase/firestore";

function ItemDetailContainer () {
  const {productos, setProductos, productosEnCarrito,setProductosEnCarrito,contador,setContador,carrito,setCarrito,total,setTotal} = useContext(CarritoContext)
  const [categorias, setCategorias] = useState([])
  const { itemId } = useParams()
  
  // useEffect( () => {
    const db = getFirestore();
    const item = doc(db,"productos",`${itemId}`);
    const dataCategorias = collection(db,"categorias")
    getDocs(dataCategorias).then(cat => setCategorias( cat.docs.map(doc => ({...doc.data()}))))
    getDoc(item)
    .then( snapshot => { 
      if (snapshot.exists()) {
        setProductos(({id:snapshot.id, ...snapshot.data(), ...categorias.filter(cat => cat.key === snapshot.data().categoria)[0] }))
        }
       });
      // }, [productos, itemId, categorias, setProductos]);

  const incremento = () => {
    if (contador < productos.stock ) {
      setContador(contador + 1)
    }
  }
  const decremento = () => {
    if (contador > 0 ) {
      setContador(contador - 1)
    }
  }
  const agregarAlCarrito = (productos) => {
    // const db = getFirestore();
    // const item = doc(db,"productos",`${itemId}`);
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
      const existe = productosEnCarrito.find((p)=> p.id === productos.id)
      if (existe) {
        existe.cantidad = existe.cantidad + contador
        setTotal(total + contador*existe.precio)
      } else {
        productos.cantidad = contador
        setTotal(total + productos.cantidad*productos.precio)
        setProductosEnCarrito(productosEnCarrito=>[...productosEnCarrito, productos])
      }
      setContador(0)
      setCarrito(carrito + contador)
      // updateDoc(item, {stock: item.stock - contador})
      // productos.stock = productos.stock - contador
    }
  }
  return(
    <>
        {productos !== undefined 
          ? 
          <div className="d-flex justify-content-end mx-5 align-items-end ">
            <Card className='m-auto mt-3' style={{ width: '18rem', padding:'0'}}>
            <Card.Img variant="top" src={productos.imgPath} alt={productos.producto} />
            <Card.Body>
              <Card.Title className="text-center">{productos.producto}</Card.Title>
              <Card.Text>
                {productos.descripcion}
              </Card.Text>
              {(productos.stock === 0) ? 
                (
                  <p className="text-danger text-center">AGOTADO</p>
                ) 
                : 
                (
                  <div className="d-flex justify-content-between">
                    <h3>${productos.precio}</h3>
                    <ButtonGroup aria-label="Basic example">
                      <Button variant="dark" onClick={decremento}>-</Button>
                      <Button disabled variant="light">{contador}</Button>
                      <Button variant="dark" onClick={incremento}>+</Button>
                    </ButtonGroup>
                    <Button variant="dark" onClick={() => agregarAlCarrito(productos,contador)}>Agregar</Button>
                  </div>
                )
              }
              </Card.Body>
              <Card.Footer className="text-muted text-center">Stock: {productos.stock}</Card.Footer>
            </Card>
            <Button as={Link} to="/" variant="outline-dark" >Volver</Button>
          </div>
          : <h4 className='text-danger text-center m-5'>El item que desea consultar no existe</h4>}
        
     
    </>
  )
}
export default ItemDetailContainer;