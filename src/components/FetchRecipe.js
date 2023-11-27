import axios from "axios";
import React, { useState, useEffect } from 'react';

// this function is used by VeganSearch.js, VegetarianSearch.js, CuisineRecipe.js and 
function FetchRecipes({ diet, searchTerm, onRecipesFetched, onNoResults, apiKey}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm) {
        fetchRecipes();
    }

    async function fetchRecipes() {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchTerm}&number=24&diet=${diet}`
            );

            if (response.data.results.length === 0) {
                onNoResults();
            } else {
                onRecipesFetched(response.data.results);
            }
        } catch (error) {
            console.error("Error fetching recipes: ". error);
        }
        setLoading(false);
    }
  }, [searchTerm, apiKey, diet, onNoResults, onRecipesFetched]);

  return loading ? <p>Loading...</p> : null;
}

export default FetchRecipes;