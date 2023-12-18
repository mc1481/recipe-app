import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HomeButton from './HomeButton';
import FetchRecipes from "./FetchRecipe";

function VeganSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);  // recipes rendered to the screen after user enters a search
  const [noResults, setNoResults] = useState(false); // will render an error message if no results from api response
  const [selectedCuisine, setSelectedCuisine] = useState(''); // cuisine variable the user has selected
  const diet = "vegan";
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

  // handling recipes fetched by FetchRecipes component
  const handleRecipesFetched = (recipes) => {
    setRecipes(recipes);
    setNoResults(recipes.length === 0);
  };

  // handling no results found by FetchRecipes component
  const handleNoResults = () => {
    setNoResults(true);
  };

  return (
    <div className="vegan-search-background">
      <div className="search-container">
        <div className="vegan-search">
          <HomeButton />
          <h1>Vegan Recipes</h1>
          {/* input box for users search term */}
          <input
            type="text"
            placeholder="Search for vegan recipes"
            value={searchTerm}
            onChange={onSearchChange}
          />
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
      
      {/* component that will get the recipes from api based on user search term */}
      <FetchRecipes
        diet={diet}
        searchTerm={searchTerm}
        onRecipesFetched={handleRecipesFetched}
        onNoResults={handleNoResults}
        apiKey={apiKey}
      />

      {/* render an error message if no results from api*/}
      {noResults ? (
        <p className="no-results">Sorry, there are no vegan recipes matching your search</p>
      ) : null}

      <div className="recipes-vegan">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <img src={recipe.image} alt={recipe.title} />
            <p>{recipe.title}</p>
            <Link to={`/veganRecipe/${recipe.id}`} className="recipe-details-button">
              <button>View Recipe Details</button>
            </Link>
          </div>
        ))}
      </div>
  </div>
  );
}

export default VeganSearch;