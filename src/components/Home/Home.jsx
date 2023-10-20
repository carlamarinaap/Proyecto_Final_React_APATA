import CarouselBienvenida from './CarouselBienvenida';
import ItemListContainer from '../ItemContainer/ItemListContainer';

function Home() {

  return (
    <>
      <CarouselBienvenida/>
      <ItemListContainer greeting={'Mirá nuestros productos'}   />
    </>
  );
}

export default Home;