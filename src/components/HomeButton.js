import React from 'react';
import { Link } from 'react-router-dom';
import './../CSS/HomePage.css';
import homeButtonImage from './../CSS/home-button-image.jpg';

function HomeButton() {
    return (
        <Link to="/">
            <img src={homeButtonImage} alt="Home" className="home-button" />
        </Link>
    );
}

export default HomeButton;