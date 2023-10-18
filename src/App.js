import Home from './components/Home/Home';
import ItemListContainer from './components/ItemContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemContainer/ItemDetailContainer';
import NavBar from './components/NavBar/NavBar';
import QuienesSomos from './components/QuienesSomos';
import Contacto from './components/Contacto';
import Footer from './components/Footer';
import Carrito from './components/Carrito';
import CheckOut from './components/CheckOut';
import IniciarSesion from './components/IniciarSesion';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CarritoProvider } from './Context/CarritoContext';
import { SesionProvider } from './Context/SesionContext';

function App() {
  return (
    <BrowserRouter className='App'>
      <SesionProvider>
      <CarritoProvider>
        <NavBar/>
        <Routes className='cuerpo'>
          <Route path='/' element={<Home />}/>
          <Route path='/categoria/:categoriaId' element={<ItemListContainer greeting={''}/>}/>
          <Route path='/item/:itemId' element={<ItemDetailContainer />}/>
          <Route path='/quienes-somos' element={<QuienesSomos />}/>
          <Route path='/contacto' element={<Contacto />}/>
          <Route path='/cart' element={<Carrito />}/>
          <Route path='/checkOut' element={<CheckOut />}/>
          <Route path='/inicio-sesion' element={<IniciarSesion />}/>
        </Routes>
      </CarritoProvider>
      </SesionProvider>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
