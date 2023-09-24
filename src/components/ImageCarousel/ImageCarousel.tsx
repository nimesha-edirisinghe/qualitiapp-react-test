import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './ImageCarousel.css';

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextHandler = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevHandler = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="image-carousel">
      <button onClick={prevHandler}>
        <FaArrowLeft />
      </button>
      <img src={images[currentIndex]} alt={''} />
      <button onClick={nextHandler}>
        {' '}
        <FaArrowRight />
      </button>
    </div>
  );
};

export default ImageCarousel;
