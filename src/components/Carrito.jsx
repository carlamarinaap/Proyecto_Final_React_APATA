import {useContext} from 'react'
import  {CarritoContext}  from '../Context/CarritoContext';
import { Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Carrito () {

  const {productosEnCarrito, eliminarProducto, vaciarCarrito,total} = useContext(CarritoContext)

  if(productosEnCarrito.length === 0){
    return(<h4 className='text-danger text-center m-5'>No posee productos en el carrito</h4>)
  } else {
    return(
      <>
      <h1 className='text-center m-2'>Tu Carrito</h1>
        {productosEnCarrito.map((prod)=> (
          <ListGroup key={prod.id}>
            <ListGroup.Item className='d-flex justify-content-between'>
              <div className='d-flex'>
                <img className='mx-3' src={prod.imgPath} alt={prod.producto} style={{width:"8%"}} />
                <h5 className='text-secondary my-auto'>{prod.producto} X <span className='text-dark fs-3'>{prod.cantidad}</span></h5>
              </div>
              <div className='my-auto'>
                <Button variant='dark' onClick={() => eliminarProducto(prod.id)}>Eliminar</Button>
              </div>
            </ListGroup.Item>
          </ListGroup>  
        ))}
        <ListGroup.Item className='d-flex justify-content-between'>
          <h5>Total:</h5>
          <h4 className='px-3'>${total}</h4>
        </ListGroup.Item>
        <div className='d-flex justify-content-end'>
          <Button variant='outline-dark' className='m-2' onClick={() => vaciarCarrito()}>Vaciar Carrito</Button>
          <Button as={Link} to='/checkOut' variant='outline-success' className='m-2 mx-3'>Check Out</Button>
        </div>
      </>
    )
  }
}

export default Carrito;