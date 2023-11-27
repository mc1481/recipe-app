import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import HomeButton from './HomeButton';
import BackButton from './BackButton';

function Cuisine() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = "d0f20c3fe5af4078b0d2bb104a92fde9";
  // get cuisine type and diet from url
  const { cuisineType } = useParams();
  const { diet } = useParams();

  useEffect(() => {
      async function fetchCuisineRecipes() {
          try {
              const response = await axios.get(
                  `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&cuisine=${cuisineType}&diet=${diet}&number=12`
              );

              setRecipes(response.data.results);
              setLoading(false);
          } catch (error) {
            setError(error);
            setLoading(false);
          }
      }

      fetchCuisineRecipes();
  }, [apiKey, cuisineType, diet]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <HomeButton />
      <BackButton />
        <h1 className="cuisine-title">{cuisineType} recipes which are {diet}</h1>
        <div className="cuisine-recipes">
            {recipes.map((recipe) => (
                <div key={recipe.id} className="recipe-card">
                    <img src={recipe.image} alt = {recipe.title} />
                    <p>{recipe.title}</p>
                    <Link to={`/cuisineRecipe/${recipe.id}`} className="recipe-details-button">
                        <button>View Recipe Details</button>
                    </Link>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Cuisine;