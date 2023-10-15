import {useContext} from 'react'
import  {CarritoContext}  from '../Context/CarritoContext';
import { Button, Form, ListGroup } from 'react-bootstrap';

function CheckOut () {
  const {productosEnCarrito,total} = useContext(CarritoContext)

  const realizarCompra = (e) => {
    e.preventDefault();

  }

  return (
    <>
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
          <h3>Completá tus datos para continuar con la compra</h3>
          <Form>
            <Form.Group controlId="nombre">
              <Form.Control type="text" placeholder="Nombre" />
            </Form.Group>
            <Form.Group className="mt-3" controlId="apellido">
              <Form.Control type="text" placeholder="Apellido" />
            </Form.Group>
            <Form.Group className="mt-3" controlId="telefono">
              <Form.Control type="text" placeholder="Telefono" />
            </Form.Group>
            <Form.Group className="mt-3" controlId="correo">
              <Form.Control type="text" placeholder="Correo Electrónico" />
            </Form.Group>
            <Form.Group className="mt-3" controlId="confirmacion">
              <Form.Control type="text" placeholder="Repita Correo Electrónico" />
            </Form.Group>
            <div className='d-flex justify-content-end'>
                <Button type='submit' onClick={realizarCompra} variant='dark' className='m-2'>Realizar Compra</Button>
            </div>
          </Form>
        </div>
      </div>

      </>
      /*
      Input para nombre, apellido y teléfono
○ Input para email y lógica de repetir el email 2 veces (a excepción de
que realicen el desafío extra de auth, en ese caso no sería necesario) */
  )
}

export default CheckOut