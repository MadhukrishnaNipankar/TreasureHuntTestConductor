import React from "react";

const HeroSection = () => {
  return (
    <div
      style={{
        textAlign: "center",
        backgroundColor: "rgb(0 0 0 / 32%)",
        borderRadius: "1rem",
        padding: "1rem",
      }}
    >
      <h1 id="praxis-logo" className="text-9xl text-amber-500 hero-heading">
        Praxis 2024
      </h1>
      <p className="text-xl text-blue-200 font-semibold">Presents</p>
      <h2 id="comp-name" className="text-5xl text-amber-500 hero-heading">
        Treasure Hunt Competition
      </h2>
    </div>
  );
};

export default HeroSection;
