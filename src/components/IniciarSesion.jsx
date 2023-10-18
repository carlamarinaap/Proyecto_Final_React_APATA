import 'firebaseui/dist/firebaseui.css'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Button, Card, Form } from 'react-bootstrap';
import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { app } from "../services/firebase/firebaseConfig";
import withReactContent from "sweetalert2-react-content";
import Swal from 'sweetalert2'

const auth = getAuth(app);

function IniciarSesion() {
  const [registrado, setRegistrado] = useState(true)

  const autenticacion = async (e) => {
    e.preventDefault();
    const correo = e.target.correo.value
    const contrasena = e.target.contrasena.value

    if (!correo.trim() || !contrasena.trim() ) {
      const MySwal = withReactContent(Swal)
      MySwal.fire({
        icon: 'error',
        title: 'Debe completar todos los campos',
      })
    } else {
      if (registrado){
        await createUserWithEmailAndPassword(auth, correo, contrasena)
      } else {
        await signInWithEmailAndPassword(auth, correo, contrasena)
      }
    }
  }
  return(
    <>
    <h1 className='text-center m-5'>{registrado ? "Iniciá Sesión": "Registrate"}</h1>
    <Card className='mx-auto my-5 shadow' style={{ width: '25rem', padding:'0'}}>
      <Card.Body>
        <Form onSubmit={autenticacion}>
          <Form.Group className="mt-3" controlId="correo">
            <Form.Control name='correo' type="email" placeholder="Correo Electrónico" />
          </Form.Group>
          <Form.Group className="mt-3" controlId="contrasena">
            <Form.Control name='contrasena' type="password" placeholder="Contraseña" />
          </Form.Group>
          <div className='d-flex justify-content-end'>
            <Button type='submit' variant='dark' className='m-2'>{registrado ? "Iniciar": "Registrar"}</Button>
          </div>
        </Form>
        <div className='d-flex justify-content-between m-2'>
          <p className=' my-auto'> {registrado ?  "¿No tenés cuenta?" : "¿Ya tenés una cuenta?"} </p>
          <Button onClick={()=> setRegistrado(!registrado)} variant='outline-dark'>{registrado ? "Registrate": "Iniciá sesión" }</Button>
      </div>
      </Card.Body>
    </Card>
    </>
    
  )
}

export default IniciarSesion;