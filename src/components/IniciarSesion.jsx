import 'firebaseui/dist/firebaseui.css'
import { Button, Card, Form } from 'react-bootstrap';
import { useContext } from 'react';
import { CarritoContext } from '../Context/CarritoContext';

function IniciarSesion() {
  
  const{ logueado, logout, registrando, setRegistrando, autenticacion} = useContext(CarritoContext)

  return(
    logueado ? 
    <div className='d-flex justify-content-center'>
      <h4 className='m-5'>Ya estás logueado</h4>
      <Button className='my-auto' onClick={logout} variant='outline-dark'>Cerrar Sesión</Button>
    </div>
    :
    <>
    <h1 className='text-center m-5'>{registrando ? "Iniciá Sesión": "Registrate"}</h1>
    <Card className='mx-auto my-5 shadow' style={{ width: '25rem', padding:'0'}}>
      <Card.Body>
        <Form id='myform' onSubmit={autenticacion}>
          <Form.Group className="mt-3" controlId="correo">
            <Form.Control name='correo' type="email" placeholder="Correo Electrónico" />
          </Form.Group>
          <Form.Group className="mt-3" controlId="contrasena">
            <Form.Control name='contrasena' type="password" placeholder="Contraseña" />
          </Form.Group>
          <div className='d-flex justify-content-end'>
            <Button type='submit' variant='dark' className='m-2'>{registrando ? "Iniciar": "Registrarse"}</Button>
          </div>
        </Form>
      </Card.Body>
          <p className='text-center my-auto'> {registrando ?  "¿No tenés cuenta?" : "¿Ya tenés una cuenta?"} </p>
          <Button className='d-block m-3' onClick={() => setRegistrando(!registrando)} variant='outline-dark'>{registrando ? "Registrate": "Iniciá sesión" }</Button>
    </Card>
    </>
    
  )
}

export default IniciarSesion;