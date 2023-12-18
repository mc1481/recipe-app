import React, { useState, useEffect } from 'react';
import axios from 'axios';

// this function is used by VeganRecipe.js, VegetarianRecipe.js and CuisinesRecipe.js MealTypeRecipe.js
function FetchRecipeData({ id, apiKey, onRecipeDataFetched, onError }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecipeData(id) {
        try {
          const ingredientsResponse = await axios.get(
            `https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${apiKey}` // get ingredients
          );
          const instructionsResponse = await axios.get(
            `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${apiKey}` // get instructions
          );
          const imageResponse = await axios.get(
            `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}` // we can extract the image from this request
          );
          const summaryResponse = await axios.get(
            `https://api.spoonacular.com/recipes/${id}/summary?apiKey=${apiKey}` // we can extract the recipe title from this request
          );

          // set the recipe data variable
          const recipeData = {
            ingredients: ingredientsResponse.data.ingredients,
            instructions: instructionsResponse.data,
            image: imageResponse.data.image,
            title: summaryResponse.data.title,
          };

          onRecipeDataFetched(recipeData);
          setLoading(false);
        } catch (error) {
            onError(error);
            setLoading(false);
        }
    }
    
    fetchRecipeData(id);
  }, [id, apiKey, onRecipeDataFetched, onError]);

  if (loading) {
    return <div className='loading-string'>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return null;
}

export default FetchRecipeData;