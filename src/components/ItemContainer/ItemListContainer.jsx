import { useContext, useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import { Link, useParams } from 'react-router-dom';
import { getDocs, collection, query, where } from 'firebase/firestore'
import { CarritoContext } from "../../Context/CarritoContext";
import { db } from "../../services/firebase/firebaseConfig";

function ItemListContainer({greeting}) {  
  const [loading, setLoading] = useState(true)
  const { categoriaId } = useParams() 
  const { setProductos, productos } = useContext(CarritoContext)

  useEffect( () => {

    setLoading(true)
    
    const coleccionRef = categoriaId
      ? query(collection(db, "productos"), where("categoria","==",categoriaId))
      : collection(db, "productos")

      getDocs(coleccionRef)
        .then( response => {
          setProductos(response.docs.map( doc => ({ id: doc.id, ...doc.data() }) ))
        })
        .catch(error => console.log(error))
        .finally(setLoading(false))

    }, [categoriaId,setProductos]);

  return (
    <>
      <h1 className="text-center m-3">{ categoriaId ? categoriaId : greeting}</h1> 
      <div className="d-grid m-5">
      <div className="row justify-content-around">
        
        {loading ? <p className="text-center text-dark">Cargando ...</p> :
        productos.map((prod) => (
          <Card key={prod.id} className='text-center m-1 bg-light' style={{ width: '18rem' }}> 
            <Card.Body  >{prod.producto}</Card.Body>
            {prod.stock === 0 ? (<p className="text-danger">AGOTADO</p>) :(<p>Stock: {prod.stock}</p>)}
            <Card.Title as={Link} to={`/item/${prod.id}`}>Ver Producto</Card.Title>
          </Card>
        ))}
      </div>
    </div>
    </>
  )
}

export default ItemListContainer;