import React, { useState } from 'react';
import './Carousel.css';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPreviousSlide = () => {
    let newIndex = currentIndex - 1;
    if (newIndex < 0) {
      newIndex = images.length - 1;
    }
    setCurrentIndex(newIndex);
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="carousel-container">
      <button onClick={goToPreviousSlide} className="carousel-btn carousel-btn--left">Prev</button>

      <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="carousel-image" />

      <button onClick={goToNextSlide} className="carousel-btn carousel-btn--right">Next</button>
    </div>
  );
};

export default Carousel;
