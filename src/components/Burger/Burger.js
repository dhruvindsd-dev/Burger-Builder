import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import "./Burger.css";
const Burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((ig) => {
      return [...Array(props.ingredients[ig])].map((_, i) => {
        return <BurgerIngredient type={ig} key={ig + i} />;
      });
    })
    .reduce((accm, next) => {
      return accm.concat(next);
    });
  if (!transformedIngredients.length) {
    transformedIngredients = (
      <p className="title has-text-centered">Add some ingredients</p>
    );
  }
  return (
    <div className="Burger">
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
