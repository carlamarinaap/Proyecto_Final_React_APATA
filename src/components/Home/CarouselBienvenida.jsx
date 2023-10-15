import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import imagen1 from '../../img/img1.jpg'
import imagen2 from '../../img/img2.jpg'

function CarouselBienvenida() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img src={imagen1} className="img-fluid" alt='...'></img>
      </Carousel.Item>
      <Carousel.Item>
        <img src={imagen2} className="img-fluid" alt='...'></img>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselBienvenida;