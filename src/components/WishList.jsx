import React, { useContext } from 'react'
import { Button, ListGroup } from "react-bootstrap";
import { CarritoContext } from '../Context/CarritoContext';
import { Link } from 'react-router-dom';


function WishList() {
  const {eliminarDeWishList,wishList} = useContext(CarritoContext)

  return (
    wishList.length === 0 
    ? <h3 className='text-center text-danger m-5'>No posee productos en la wish list</h3>
    :
    wishList.map((prod) => (
      <ListGroup key={prod.id}>
            <ListGroup.Item className='d-flex'>
              <div className='d-flex my-auto align-items-center'>
                <img className='mx-3' src={prod.imgPath} alt={prod.producto} style={{width:"8%"}} />
                <h5 className='text-secondary'>{prod.producto} </h5>
              </div>
              <div className='d-flex my-auto align-items-center'>

              {(prod.stock === 0) ? 
                  <p className="text-danger text-center mx-4 ">AGOTADO</p>
                  : 
                  <div className='d-flex mx-2'>
                    <Button style={{width:"100px"}} variant="dark" as={Link} to={`/item/${prod.id}`}>Ver Producto</Button>
                  </div>
              }
              </div>
              <div className=' d-flex mx-2 my-auto'>
                <Button  variant='dark' onClick={() => eliminarDeWishList(prod.id)}>Eliminar</Button>
                </div>
            </ListGroup.Item>
          </ListGroup>
    )))
  
}

export default WishList;