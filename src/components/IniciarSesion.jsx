import 'firebaseui/dist/firebaseui.css'
import { Button, Card, Form } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { CarritoContext } from '../Context/CarritoContext';
import withReactContent from "sweetalert2-react-content";
import Swal from 'sweetalert2'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../services/firebase/firebaseConfig';

const auth = getAuth(app)

function IniciarSesion() {
  
  const{ setLogueado, logueado, logout} = useContext(CarritoContext)
  const [registrando, setRegistrando] = useState(false)

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
    } else if (contrasena.length < 6 ) {
      const MySwal = withReactContent(Swal)
      MySwal.fire({
        icon: 'error',
        title: 'La contraseña debe tener más de 6 caracteres',
      })
    
    } else {
      if (!registrando) {

        try {
          await createUserWithEmailAndPassword(auth, correo, contrasena)
          const MySwal = withReactContent(Swal)
          MySwal.fire({
            position: 'center',
            width: '20rem',
            icon: 'success',
            title: 'Usuario creado con éxito',
            showConfirmButton: false,
            timer: 2000
          })
        } catch (error) {
          console.log(error);
          const MySwal = withReactContent(Swal)
          MySwal.fire({
            icon: 'error',
            title: 'Este usuario ya está registrado',
          })
        }

      } else {
        try {
          await signInWithEmailAndPassword(auth, correo, contrasena)
          const MySwal = withReactContent(Swal)
          MySwal.fire({
            position: 'center',
            width: '20rem',
            icon: 'success',
            title: 'Bienvenido',
            showConfirmButton: false,
            timer: 2000
          })
          setLogueado(true)
        } catch (error) {
          const MySwal = withReactContent(Swal)
          MySwal.fire({
            icon: 'error',
            title: 'Usuario o Contraseña Incorrecta',
          })
        }
      }
    }
  }
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