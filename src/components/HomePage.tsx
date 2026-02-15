import React from "react";
import MenuOverlay from "./MenuOverlay";
import WhyUs from "./WhyUs";
import BrowseBy from "./BrowseByState";
import ReadyToList from "./ReadyToList";

const HomePage = () => {
  return (
    <div>
      <MenuOverlay />
      <WhyUs />
      <BrowseBy />
      <ReadyToList />
    </div>
  );
};

export default HomePage;
