import { Button, Card, ButtonGroup } from "react-bootstrap";
import { Link, useParams } from 'react-router-dom'
import { useEffect } from "react";
import { useContext } from 'react'
import { CarritoContext } from '../../Context/CarritoContext';
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConfig";

function ItemDetailContainer() {
  const { agregarAlCarrito, productos, setProductos, contador, setContador, logueado, agregarAWishList } = useContext(CarritoContext)
  const { itemId } = useParams()

  useEffect(() => {
    const item = doc(db, "productos", `${itemId}`);
    getDoc(item)
      .then(snapshot => {
        if (snapshot.exists()) {
          setProductos(([{ id: snapshot.id, ...snapshot.data() }]))
        }
      });
  }, [itemId, setProductos]);


  const incremento = () => {
    if (contador < productos[0].stock) {
      setContador(contador + 1)
    }
  }
  const decremento = () => {
    if (contador > 0) {
      setContador(contador - 1)
    }
  }

  return (
    <>
      {productos.length !== 0
        ?
        <div className="d-flex justify-content-end mx-5 align-items-end ">
          <Card className='m-auto mt-3' style={{ width: '18rem', padding: '0' }}>
            {logueado
              ? <>
                <div className="d-flex justify-content-end m-2 ">
                  <Button variant="outline-danger" onClick={() => agregarAWishList(productos[0])}><i className="fa fa-heart"></i></Button>
                </div>
              </>
              : <></>
            }
            <Card.Img variant="top" src={productos[0].imgPath} alt={productos[0].producto} />
            <Card.Body>
              <Card.Title className="text-center">{productos[0].producto}</Card.Title>
              <Card.Text>
                {productos[0].descripcion}
              </Card.Text>
              {(productos[0].stock === 0) ?
                (
                  <p className="text-danger text-center">AGOTADO</p>
                )
                :
                (
                  <div className="d-flex justify-content-between">
                    <h3>${productos[0].precio}</h3>
                    <ButtonGroup aria-label="Basic example">
                      <Button variant="dark" onClick={decremento}>-</Button>
                      <Button disabled variant="light">{contador}</Button>
                      <Button variant="dark" onClick={incremento}>+</Button>
                    </ButtonGroup>
                    <Button variant="dark" onClick={ () => agregarAlCarrito(productos[0].id)}>Agregar</Button>
                  </div>
                )
              }
            </Card.Body>
            <Card.Footer className="text-muted text-center">Stock: {productos[0].stock}</Card.Footer>
          </Card>
          <Button as={Link} to="/" variant="outline-dark" >Volver</Button>
        </div>
        : <h4 className='text-danger text-center m-5'>El item que desea consultar no existe</h4>}

    </>
  )
}
export default ItemDetailContainer;