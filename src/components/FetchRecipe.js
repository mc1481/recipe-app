import axios from "axios";
import React, { useState, useEffect } from 'react';

// this function is used by VeganSearch.js, VegetarianSearch.js, the necessary parameters are passed in
function FetchRecipes({ diet, searchTerm, onRecipesFetched, onNoResults, apiKey}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm) {
        fetchRecipes();
    }

    // fetch recipes based on users search term and whether they want vegan or vegetarian recipes
    async function fetchRecipes() {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchTerm}&number=24&diet=${diet}`
            );

            // if no response, handle this with onNoResults() function, otherwise set the recipes to the api response
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