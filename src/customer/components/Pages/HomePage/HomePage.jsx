import React from "react";
import MainCarousel from "../../HomeCarousel/MainCarousel";
import HomeSectionCarousel from "../../HomeSectionCarousel/HomeSectionCarousel";
import { brakes } from "../../../../data/brakes/Brakes";
import HomeSectionCard from "../../HomeSectionCard/HomeSectionCard";
import AliceCarousel from "react-alice-carousel";

const testItem = {
  category: "Brake Pads & Shoes",
  image: "https://images.oreillyauto.com/parts/img/medium/bb2/sc1295a.jpg",
  title: "BrakeBest Select Ceramic Front Brake Pads  - SC1295A",
  brand: "BrakeBest",
  partNumber: "SC1295A",
  description:
    "Brake Pads; Ceramic; BrakeBest built its uncompromising reputation for quality by making excellence the minimum standard for castings, rubber, assembly, and testing.",
  price: "$65.99",
  original_price: "Original Price not available",
  discount: "Discount not available",
  attributes: {
    "Installation Hardware Included:": "Yes",
    "Wear Sensor Type:": "Mechanical",
    "Slotted:": "Yes",
    "Anti-Rattle Clip Included:": "No",
    "Brake Pad Material:": "Ceramic",
    "Noise-Reducing Shim Included:": "Yes",
    "Noise-Reducing Chamfers:": "Yes",
    "Integrally Molded:": "Yes",
  },
};

const HomePage = () => {
  return (
    <div>
      <MainCarousel />
      <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">
        <HomeSectionCarousel data={brakes} sectionName={"Brakes"} />
        <HomeSectionCarousel data={brakes} sectionName={"Brakes"} />
        <HomeSectionCarousel data={brakes} sectionName={"Brakes"} />
        <HomeSectionCarousel data={brakes} sectionName={"Brakes"} />
      </div>
    </div>
  );
};

export default HomePage;
