import {Button, Container, Dropdown, Nav,NavDropdown,Navbar} from 'react-bootstrap';
import logo from '../../img/logo.png';
import CartWidget from './CartWidget';
import { Link } from 'react-router-dom';
import './navBar.css'
import  {CarritoContext}  from '../../Context/CarritoContext';
import { useContext } from 'react';


function NavBar() {
  const {carrito, logout,logueado} = useContext(CarritoContext)

  return (
    <Navbar expand="lg" className="bg-light"  >
      <Container>
        <Navbar.Brand as={Link} to={'/'}><img src={logo} width="150" alt="logo"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav ">
          <Nav className="m-auto">
            <Nav.Link as={Link} to="/" className='m-0 m-lg-3 fs-5'>Inicio</Nav.Link>
            <Nav.Link as={Link} to="/quienes-somos" className='m-0 m-lg-3 fs-5'>Quienes somos</Nav.Link>
            <Nav.Link as={Link} to="/contacto" className='m-0 m-lg-3 fs-5'>Contactanos</Nav.Link>
            <NavDropdown className='m-0 m-lg-3 fs-5' title="Categorias" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/categoria/cafeina">Cafeína</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/categoria/barra">Barras Protéicas</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/categoria/proteina">Proteina</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/categoria/vitamina">Multivitaminas</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/categoria/creatina">Creatina</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/categoria/gel">Energy Gel</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/categoria/carnitina">Carnitina</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/categoria/ultra">Ultra Mass </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          { logueado 
          ? <>
            <Dropdown className='mt-lg-1 mx-lg-3 mt-2'>
              <Dropdown.Toggle variant="dark" id="dropdown-basic">
                <i className='fa fa-user'></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/wish-list">Wish List</Dropdown.Item>
                <Dropdown.Item onClick={logout}>Cerrar Sesion</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </> 
          : <Button as={Link} to="/inicio-sesion" variant='dark' className=' mt-lg-1 mx-lg-1 mt-2'>Inicia Sesion</Button>
        }
        <CartWidget carrito={carrito}/>
        </Navbar.Collapse>
        </Container>
    </Navbar>
  );
}

export default NavBar;