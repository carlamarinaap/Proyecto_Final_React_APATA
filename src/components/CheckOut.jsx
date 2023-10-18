import {useContext, useState} from 'react'
import  {CarritoContext}  from '../Context/CarritoContext';
import { Button, Form, ListGroup } from 'react-bootstrap';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { app, db } from '../services/firebase/firebaseConfig';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import IniciarSesion from './IniciarSesion';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth(app)

function CheckOut () {
  const {setProductosEnCarrito,productosEnCarrito,total,setCarrito, logueado, userEmail, logout} = useContext(CarritoContext)
  const [ordenGenerada, setOrdenGenerada] = useState(false)
  const [orderId, setOrderId] = useState('')

  const hoy = new Date(); 
  const anio = hoy.getFullYear();
  const mes = hoy.getMonth() + 1; 
  const dia = hoy.getDate();
  const fechaDeHoy = `${dia}/${mes}/${anio}`

  const realizarCompra = (e) => {
    setOrdenGenerada(false)
    e.preventDefault();
    
    const nombre = e.target.nombre.value
    const apellido = e.target.apellido.value
    const telefono = e.target.telefono.value

    if(nombre.trim() && apellido.trim() && telefono.trim() ){
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const order = {
            buyer: {nombre: `${nombre} ${apellido}`, 
                    telefono: telefono,
                    correo: user.email,
                    },
            items: productosEnCarrito,
            total: total
          };
          const orderCollection = collection(db, "orders");
          addDoc(orderCollection, order)
            .then(({ id }) =>  {
              const itemRef = doc(db,"orders",id);
              getDoc(itemRef)
                .then((resp) => { 
                  setOrderId(id)
                  updateDoc(itemRef, {id: id, fecha: fechaDeHoy})
                })
              }) 
          const MySwal = withReactContent(Swal)
          MySwal.fire({
            position: 'center',
            width: '20rem',
            icon: 'success',
            title: 'Compra realizada con éxito',
            showConfirmButton: false,
            timer: 2000
          })
          setOrdenGenerada(true)
          setCarrito(0)
          setProductosEnCarrito([])
        }
      })
    } else {
      const MySwal = withReactContent(Swal)
      MySwal.fire({
        icon: 'error',
        title: 'Debe completar todos los campos',
      })
    }
  }

  return (
    ordenGenerada 
    ? <>
      <h2 className='text-center m-5'>Muchas gracias por su compra</h2>
      <p className='text-center m-5'>Su identificador es: {orderId}</p>
    </>
    
    : productosEnCarrito.length === 0 
    ? <h3 className='text-center text-danger m-5'>Debe tener productos en el carrito para continuar</h3>
    : <>
      <h1 className='text-center m-2'>Check Out</h1>
      <div className='d-flex'>
        <div className='container my-auto'>
        {productosEnCarrito.map((prod)=> (
          <ListGroup key={prod.id}>
            <ListGroup.Item className='d-flex justify-content-between'>
            <div className='d-flex'>
                <img src={prod.imgPath} alt={prod.producto} style={{width:"8%"}} />
                <h5 className='text-secondary my-auto'>{prod.producto} X <span className='text-dark fs-3'>{prod.cantidad}</span></h5>
              </div>
              <div className='d-flex'>
                <h4 className='px-3'>${prod.precio*prod.cantidad}</h4>
              </div>
            </ListGroup.Item>
          </ListGroup>
          ))}
          <ListGroup.Item className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h4 className='px-3'>${total}</h4>
          </ListGroup.Item>
        </div>
        <div className='container my-auto'>
          {logueado 
          ? <>
              <h3 className='text-center'>Estas comprando como <span className='text-danger'> { userEmail } </span></h3>
              <h5 className='text-center'>Si no sos vos <Button className='my-auto btn-sm' onClick={logout} variant='outline-dark'>Cerrá Sesión</Button></h5>
              <h5 className='text-center'>Completá tus datos para continuar con la compra</h5>
              <Form onSubmit={realizarCompra}>
              <Form.Group controlId="nombre">
                <Form.Control name='nombre' type="text" placeholder="Nombre" />
              </Form.Group>
              <Form.Group className="mt-3" controlId="apellido">
                <Form.Control name='apellido' type="text" placeholder="Apellido" />
              </Form.Group>
              <Form.Group className="mt-3" controlId="telefono">
                <Form.Control name='telefono' type="text" placeholder="Telefono" />
              </Form.Group>
                <div className='d-flex justify-content-end'>
                    <Button type='submit' variant='dark' className='m-2'>Realizar Compra</Button>
                </div>
              </Form>
            </>
          :
        <IniciarSesion/>
          }
        </div>
      </div>
      </>
  )
}

export default CheckOut