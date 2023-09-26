import React, { useRef, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import { Button } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { brakes } from "../../../data/brakes/Brakes";

const HomeSectionCarousel = ({ sectionName }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const responsive = {
    0: {
      items: 1,
    },
    720: { items: 3 },
    1024: { items: 5 },
  };

  const carouselRef = useRef();
  const slidePrev = () => {
    carouselRef.current.slidePrev();
  };

  const slideNext = () => {
    carouselRef.current.slideNext();
  };

  const items = brakes
    .slice(0, brakes.length - 1)
    .map((item) => <HomeSectionCard product={item} />);

  return (
    <div className="relative px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-extrabold text-gray-800 py-5">
        {sectionName}
      </h2>
      <div className="relative border p-5">
        <AliceCarousel
          ref={carouselRef}
          items={items}
          disableButtonsControls
          responsive={responsive}
          autoPlay
          autoPlayInterval={1000}
          disableDotsControls
        />
      </div>

      <Button
        variant="contained"
        className="z-50 bg-white"
        onClick={slideNext}
        sx={{
          position: "absolute",
          top: "8rem",
          right: "0rem",
          transform: "translateX(50%) rotate(90deg)",
          bgcolor: "white",
        }}
        aria-label="Next"
      >
        <KeyboardDoubleArrowLeftIcon
          sx={{ transform: "rotate(90deg)", color: "black" }}
        />
      </Button>

      <Button
        variant="contained"
        className="z-50 bg-white"
        onClick={slidePrev}
        sx={{
          position: "absolute",
          top: "8rem",
          left: "0rem",
          transform: "translateX(-50%) rotate(90deg)",
          bgcolor: "white",
        }}
        aria-label="Next"
      >
        <KeyboardDoubleArrowLeftIcon
          sx={{ transform: "rotate(-90deg)", color: "black" }}
        />
      </Button>
    </div>
    // </div>
  );
};

export default HomeSectionCarousel;
