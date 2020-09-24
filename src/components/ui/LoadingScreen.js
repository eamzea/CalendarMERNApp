import React from "react";

const LoadingScreen = () => {
  return (
    <div className="load__container">
      <div className="load__container-text">
        <p className="load__text">Loading...</p>
      </div>
      <div className="load__container-spinner">
        <i className="fas fa-circle-notch fa-spin fa-10x load__spinner"></i>
      </div>
    </div>
  );
};

export default LoadingScreen;
