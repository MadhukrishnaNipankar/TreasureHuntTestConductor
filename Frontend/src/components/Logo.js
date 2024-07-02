import React from "react";

function Logo({ imgSrc, title }) {
  return (
    <div
      style={{
        boxShadow: "10px 10px 10px black",
        backgroundColor: "white",
        maxWidth: "13rem",
        height: "7rem",
        borderRadius: "1rem",
        margin: "1rem",
      }}
    >
      <img
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
          borderRadius: "1rem",
        }}
        src={imgSrc}
        alt={title}
      />
      <p
        style={{
          color: "white",
          fontWeight: "bold",
          textAlign: "center",
          padding: "0.5rem",
        }}
      >
        {title}
      </p>
    </div>
  );
}

export default Logo;
