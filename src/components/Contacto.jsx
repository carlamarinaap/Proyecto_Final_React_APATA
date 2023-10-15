import { Button, Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

function Contacto() {
  return(
    <Container className='p-5'>
    <h2 className='text-center'>Escribinos</h2>
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Correo electrónico</Form.Label>
        <Form.Control type="email" placeholder="correo@ejemplo.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Consulta, queja o sugerencia:</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <Button variant='dark'>Enviar</Button>
    </Form>
    </Container>

  )
}

export default Contacto;