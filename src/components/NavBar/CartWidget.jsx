import {Badge, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CartWidget({carrito}) {
  return (
      <Button as={Link} to="/cart" variant="dark" className='mt-1' >
        <i className="fa-solid fa-cart-shopping"></i> <Badge bg="danger">{carrito}</Badge>
      </Button>
  );
}

export default CartWidget;