import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import MealType from './components/MealType';
import VeganSearch from './components/VeganSearch';
import VegetarianSearch from './components/VegetarianSearch';
import VeganRecipe from './components/VeganRecipe';
import VegetarianRecipe from './components/VegetarianRecipe';
import Cuisine from './components/Cuisine';
import CuisineRecipe from './components/CuisineRecipe';
import MealTypeRecipe from './components/MealTypeRecipe';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/veganSearch" component={VeganSearch} />
        <Route path="/cuisine/:cuisineType/:diet" component={Cuisine} />
        <Route path="/vegetarianSearch" component={VegetarianSearch} />
        <Route path="/veganRecipe/:id" component={VeganRecipe} />
        <Route path="/cuisineRecipe/:id" component={CuisineRecipe} />
        <Route path="/vegetarianRecipe/:id" component={VegetarianRecipe} />
        <Route path="/mealtype/:diet/:type" component={MealType} />
        <Route path="/mealtypeRecipe/:id" component={MealTypeRecipe} />
      </Switch>
    </Router>
  );
}

export default App;
