import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Carousel.css';

import image1 from '../../assets/img/set-up.jpg';
import image2 from '../../assets/img/set-up2.jpg';
import image3 from '../../assets/img/purple-set-up.jpg';

interface Image {
  src: string;
  alt: string;
}

const Gallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images: Image[] = [
    { src: image2, alt: 'Oferta 1' },
    { src: image1, alt: 'Oferta 2' },
    { src: image3, alt: 'Oferta 3' },
  ];

  const handleImageChange = (index: number) => {
    setCurrentIndex(index);
  };

  const handleImageClick = () => {
    if (currentIndex === images.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="box-gallery">
      <Carousel className="carousel" onChange={handleImageChange} onClickItem={handleImageClick} selectedItem={currentIndex}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image.src} alt={image.alt} className="gallery-image" />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Gallery;
