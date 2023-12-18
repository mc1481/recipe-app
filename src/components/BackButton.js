import React from 'react';
import { useHistory } from 'react-router-dom';
import './../CSS/HomePage.css';
import backButtonImage from './../CSS/back-button-img.jpg';

// allow users to go back a page in the app
function BackButton() {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  return (
    <img src={backButtonImage} alt="Back" className="back-button" onClick={goBack} />
  );
}

export default BackButton;