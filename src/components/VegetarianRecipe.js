import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HomeButton from './HomeButton';
import BackButton from './BackButton';
import FetchRecipeData from './FetchRecipeData';

function VegetarianRecipe() {

  const { id } = useParams();
  const apiKey = "d0f20c3fe5af4078b0d2bb104a92fde9";
  const [recipeData, setRecipeData] = useState(null);

  // function for handling data fetched by FetchRecipeData component 
  function handleRecipeDataFetched(data) {
    setRecipeData(data);
  };

  // function for handling error
  function handleError(error) {
    console.error("Error fetching recipe data: ", error);
  };

  return (
    <div>
      <HomeButton />
      <BackButton />
      {recipeData ? (
        <>
          <div className='recipe-div'>
            <h1 className="recipe-title">{recipeData.title}</h1>
            <img src={recipeData.image} alt="Recipe" className="recipe-image" />

            <div className="ingredients-section">
              <b>Ingredients</b>
              {recipeData.ingredients.length >  0 && (
                <ul>
                  {recipeData.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient.name}</li>
                  ))}
                </ul>
              )}
            </div>

            <div className="instructions-section">
              <b>Instructions</b>
              {recipeData.instructions.length > 0 && (
                <ol>
                  {recipeData.instructions[0].steps.map((step, index) => (
                    <li key={index}>{step.step}</li>
                  ))}
                </ol>
              )}
            </div>
          </div>

        </>
      ) : (
        <FetchRecipeData
          id={id}
          apiKey={apiKey}
          onRecipeDataFetched={handleRecipeDataFetched}
          onError={handleError}
        />
      )}
    </div>
  );
}

export default VegetarianRecipe;