import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HomeButton from './HomeButton';
import FetchRecipes from "./FetchRecipe";

function VegetarianSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);  
  const [noResults, setNoResults] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const diet = "vegetarian";
  const apiKey = "d0f20c3fe5af4078b0d2bb104a92fde9";
  const cuisines = ["Chinese", "French", "Italian", "Mexican", "Indian"];

  // handle the search bar input changing
  function onSearchChange(event) {
    setSearchTerm(event.target.value);
  }

  // handle the drop down menu cuisine selection
  function onCuisineChange(event) {
    setSelectedCuisine(event.target.value);
  }

  // function for hadnling recipes fetched by FetchRecipes component
  const handleRecipesFetched = (recipes) => {
    setRecipes(recipes);
    setNoResults(recipes.length === 0);
  };

  // function for handling no results found by FetchRecipes component
  const handleNoResults = () => {
    setNoResults(true);
  };

  return (
    <div>
      <HomeButton />
      <div className="vegetarian-search">
        <h1>Vegetarian Recipes</h1>
        <input
          type="text"
          placeholder="Search for vegetarian recipes"
          value={searchTerm}
          onChange={onSearchChange}
        />
      </div>
      
      <FetchRecipes
        diet={diet}
        searchTerm={searchTerm}
        onRecipesFetched={handleRecipesFetched}
        onNoResults={handleNoResults}
        apiKey={apiKey}
      />

      {noResults ? (
        <p className="no-results">Sorry, there are no vegetarian recipes matching your search</p>
      ) : null}

      <div className="recipes-vegetarian">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <img src={recipe.image} alt={recipe.title} />
            <p>{recipe.title}</p>
            <Link to={`/vegetarianRecipe/${recipe.id}`} className="recipe-details-button">
                <button>View Recipe Details</button>
            </Link>
          </div>
        ))}
      </div>

      <div className="cuisine-dropdown">
        <label htmlFor="cuisine">Cuisine:</label>
        <select id="cuisine" name="cuisine" onChange={onCuisineChange}>
          <option value="">Select Cuisine</option>
          {cuisines.map((cuisine, index) => (
            <option key={index} value={cuisine}>
              {cuisine}
            </option>
          ))}
        </select>
      </div>

      {selectedCuisine && (
        <Link to={`/cuisine/${selectedCuisine}/${diet}`} className="explore-button-link">
          <button>Explore {selectedCuisine} Cuisine</button>
        </Link>
      )}
    </div>
  );
}

export default VegetarianSearch;