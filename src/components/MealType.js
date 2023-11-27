import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import HomeButton from './HomeButton';

function MealType() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiKey = "d0f20c3fe5af4078b0d2bb104a92fde9";

    // get diet and meal type from url
    const { diet } = useParams();
    const { type } = useParams();

    useEffect(() => {
        async function fetchMealTypeRecipes() {
            try {
                const response = await axios.get(
                    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&type=${type}&diet=${diet}&number=24`
                );
  
                setRecipes(response.data.results);
                setLoading(false);
            } catch (error) {
              setError(error);
              setLoading(false);
            }
        }
  
        fetchMealTypeRecipes();
    }, [apiKey, type, diet]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
  
    return (
      <div>
        <HomeButton />
          <h1 className="mealtype-title">See our {diet} {type} recipes</h1>
          <div className="mealtype-recipes">
              {recipes.map((recipe) => (
                  <div key={recipe.id} className="recipe-card">
                      <img src={recipe.image} alt = {recipe.title} />
                      <p>{recipe.title}</p>
                      <Link to={`/mealtypeRecipe/${recipe.id}`} className="recipe-details-button">
                          <button>View Recipe Details</button>
                      </Link>
                  </div>
              ))}
          </div>
      </div>
    )

}

export default MealType;