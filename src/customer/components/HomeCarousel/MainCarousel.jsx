import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { mainCarouselData } from "./MainCarouselData";
import { Paper, Button } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import "./Carousel.css";

const responsive = {
  0: {
    items: 1,
  },
  720: { items: 1 },
  1024: { items: 1 },
};

const items = mainCarouselData.map((item, index) => {
  const style = { height: "100%", width: "100%" };
  return (
    <img
      className="cursor-pointer carousel-container"
      role="presentation"
      src={item.image}
      alt=""
      style={style}
    />
  );
});

const MainCarousel = () => {
  return (
    <div
      className="carousel-container -z-10"
      style={{ width: "100vw", maxWidth: "100%" }}
    >
      <AliceCarousel
        items={items}
        responsive={responsive}
        disableButtonsControls
        autoPlay
        autoPlayInterval={3000}
        infinite
      />
    </div>
  );
};

export default MainCarousel;
