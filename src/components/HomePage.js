import React from 'react';
import { Link } from 'react-router-dom';
import './../CSS/HomePage.css';
import { useState, useEffect } from 'react';
import bowlHandImage from  './../CSS/bowl-hand-3.jpeg';

function HomePage() {

  // option that the user has selected from the dropdown list
  const [selectedMeal, setSelectedMeal] = useState(''); 

  // Function to handle the change in meal type
  const handleMealChange = (event) => {
    setSelectedMeal(event.target.value);
  };

  return (
      <div className="home-page">
        <div className="purple-div">
          <div className="home-title">
            <h1>Welcome to Veggie Bites & Delights</h1>
          </div>

          <Link to="/veganSearch">
            <button className="vegan-button">Vegan Recipes</button>
          </Link>
          <Link to="/vegetarianSearch">
            <button className="vegetarian-button">Vegetarian Recipes</button>
          </Link>

          <div className="meal-dropdown">
            <label htmlFor="mealType">Meal:</label>
            <select
              id="mealType"
              value={selectedMeal}
              onChange={handleMealChange}
            >
              <option value="">Choose meal type</option>
              <option value="vegan/breakfast">vegan breakfast</option>
              <option value="vegan/main course">vegan main course</option>
              <option value="vegan/dessert">vegan dessert</option>
              <option value="vegetarian/breakfast">vegetarian breakfast</option>
              <option value="vegetarian/main course">vegetarian main course</option>
              <option value="vegetarian/dessert">vegetarian dessert</option>
            </select>
          </div>

          {selectedMeal && (
            <Link to={`mealtype/${selectedMeal}`} className='meal-type-button'>
              <button>See {selectedMeal} recipes</button>
            </Link>
          )}

        </div>
        <div className="meal-image-container">
            <img src={bowlHandImage} alt="Meal Image" className="meal-image" />
        </div>
      </div>
  );
}

export default HomePage;