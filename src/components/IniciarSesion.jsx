import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import { app } from '../services/firebase/firebaseConfig';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Button, Card, Form } from 'react-bootstrap';
import { useContext } from 'react';
import { SesionContext } from '../Context/SesionContext';
const auth = getAuth(app);

function IniciarSesion() {
  const {registrado,autenticacion} = useContext(SesionContext) 


  const inicio = (e) => {
    
    const correo = e.target.correo.value
    const contrasena = e.target.contrasena.value
    
    signInWithEmailAndPassword(auth, correo, contrasena)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  return(
  registrado
  ? <>
    <h1 className='text-center m-5'>Iniciá Sesión</h1>
    <Card className='mx-auto my-5 shadow' style={{ width: '25rem', padding:'0'}}>
      <Card.Body>
        <Form onSubmit={inicio}>
          <Form.Group className="mt-3" controlId="correo">
            <Form.Control name='correo' type="email" placeholder="Correo Electrónico" />
          </Form.Group>
          <Form.Group className="mt-3" controlId="contrasena">
            <Form.Control name='contrasena' type="password" placeholder="Contraseña" />
          </Form.Group>
          <div className='d-flex justify-content-end'>
            <Button type='submit' variant='dark' className='m-2'>Iniciar</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
    </>
    : <>
      <h1 className='text-center m-5'>Registrate</h1>
      <Card className='mx-auto my-5 shadow' style={{ width: '25rem', padding:'0'}}>
        <Card.Body>
          <Form className='m-auto' onSubmit={autenticacion}>
            <Form.Group className="mt-3" controlId="nombre">
              <Form.Control name='nombre' type="text" placeholder="Nombre" />
            </Form.Group>
            <Form.Group className="mt-3" controlId="apellido">
              <Form.Control name='apellido' type="text" placeholder="Apellido" />
            </Form.Group>
            <Form.Group className="mt-3" controlId="telefono">
              <Form.Control name='telefono' type="text" placeholder="Teléfono" />
            </Form.Group>
            <Form.Group className="mt-3" controlId="correo">
              <Form.Control name='correo' type="email" placeholder="Correo Electrónico" />
            </Form.Group>
            <Form.Group className="mt-3" controlId="contrasena">
              <Form.Control name='contrasena' type="password" placeholder="Contraseña" />
            </Form.Group>
            <Form.Group className="mt-3" controlId="confirmacion">
              <Form.Control name='confirmacion' type="password" placeholder="Repita la contraseña" />
            </Form.Group>
            <div className='d-flex justify-content-end'>
              <Button type='submit' variant='dark' className='m-2'>Registrarse</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
    
  )
}

export default IniciarSesion;