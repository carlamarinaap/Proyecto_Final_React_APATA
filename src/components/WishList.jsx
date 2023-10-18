import React, { useContext } from 'react'
import { Button, ListGroup } from "react-bootstrap";
import { CarritoContext } from '../Context/CarritoContext';
import { Link } from 'react-router-dom';


function WishList() {
  const {wishList, eliminarDeWishList} = useContext(CarritoContext)

  return (
    wishList.map((prod) => (
      <ListGroup key={prod.id}>
            <ListGroup.Item className='d-flex justify-content-between align-items-center'>
              <div className='d-flex'>
                <img className='mx-3' src={prod.imgPath} alt={prod.producto} style={{width:"8%"}} />
                <h5 className='text-secondary my-auto'>{prod.producto} </h5>
              </div>
              {(prod.stock === 0) ? 
                  <p className="text-danger text-center mx-4 ">AGOTADO</p>
                  : 
                  <div className='m-auto d-flex mx-4'>
                    <Button variant="dark" as={Link} to={`/item/${prod.id}`}>Ver Producto</Button>
                  </div>
              }
                <Button variant='dark' onClick={() => eliminarDeWishList(prod.id)}>Eliminar</Button>
            </ListGroup.Item>
          </ListGroup>
    )))
  
}

export default WishList