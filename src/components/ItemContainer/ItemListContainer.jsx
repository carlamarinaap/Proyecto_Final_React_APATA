import { useContext, useEffect} from "react";
import Card from 'react-bootstrap/Card';
import { Link, useParams } from 'react-router-dom';
import { getDocs, collection, query, where } from 'firebase/firestore'
import { CarritoContext } from "../../Context/CarritoContext";
import { db } from "../../services/firebase/firebaseConfig";
import { Button } from "react-bootstrap";

function  ItemListContainer({greeting}) {  
  const { categoriaId } = useParams() 
  const { setProductos, productos, logueado, agregarAWishList } = useContext(CarritoContext)
  useEffect( () => {
    const coleccionRef = categoriaId
      ? query(collection(db, "productos"), where("categoria","==",categoriaId))
      : collection(db, "productos")

      getDocs(coleccionRef)
        .then( response => {
          setProductos(response.docs.map( doc => ({ id: doc.id, ...doc.data() }) ))
        })
        .catch(error => console.log(error))
    }, [categoriaId,setProductos]);
  return (
    <>
      <h1 className="text-center m-3">{ categoriaId ? categoriaId : greeting}</h1> 
      <div className="d-grid m-5">
      <div className="row justify-content-around">
        
        {productos.map((prod) => (
          <Card key={prod.id} className='text-center m-1 bg-light' style={{ width: '18rem' }}> 
            <Card.Body >{prod.producto}</Card.Body>
            {prod.stock === 0 ? (<p className="text-danger">AGOTADO</p>) :(<p>Stock: {prod.stock}</p>)}
            <Card.Title> 
              <Button variant="dark" as={Link} to={`/item/${prod.id}`}>Ver Producto</Button>
              {logueado
              ? <Button variant="outline-danger mx-2" onClick={() => agregarAWishList(prod)}><i className="fa fa-heart"></i></Button>
              : <></>
            }
            </Card.Title>
          </Card>
        ))}
      </div>
    </div>
    </>
  )
}

export default ItemListContainer;