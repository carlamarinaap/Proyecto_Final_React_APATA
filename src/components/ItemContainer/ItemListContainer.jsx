import { useContext, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import { Link, useParams } from 'react-router-dom';
import { getFirestore, getDocs, collection, query, where } from 'firebase/firestore'
import { CarritoContext } from "../../Context/CarritoContext";

function ItemListContainer({greeting}) {  
  const { categoriaId } = useParams() 
  const {productos, setProductos} = useContext(CarritoContext)

  // useEffect( () => {
    const db = getFirestore();
    const coleccionProd = collection(db, "productos")
    if (categoriaId) {
      const q = query(collection(db, "productos"), where("categoria","==",categoriaId));
      getDocs(q)
        .then( snapshot => setProductos(snapshot.docs.map( doc => ({id: doc.id, ...doc.data()}))))
    } else {
      getDocs(coleccionProd)
        .then( 
          snapshotP => {
            setProductos(snapshotP.docs.map(snapP => ({id: snapP.id, ...snapP.data()})))}
        )
    }
    // }, [categoriaId, setProductos]);

  return (
    <>
      <h1 className="text-center m-3">{ categoriaId ? categoriaId : greeting}</h1> 
      <div className="d-grid m-5">
      <div className="row justify-content-around">
        {productos.map((prod) => (
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