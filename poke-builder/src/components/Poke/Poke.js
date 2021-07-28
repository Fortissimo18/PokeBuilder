import React from 'react';
import classes1 from './Poke.module.css';
import classes2 from './PokePreview.module.css';
import PokeIngredients from './PokeIngredients/PokeIngredients';


const poke = (props) => {

  //load different css based on display location
  let classes = null;
  switch (props.mode) {
    case ('preview'): classes = classes2; break;
    default: classes = classes1; break;
  }

  let transformedIngredients = [];

  let numofIngreds = 0;
  for (var el in props.ingredients) {
    if (props.ingredients.hasOwnProperty(el)) {
      numofIngreds += parseFloat(props.ingredients[el]);
    }
  }

  let cnt = 0;
  Object.keys(props.ingredients)
    .forEach((igKey, j) => {
      return [...Array(props.ingredients[igKey])].forEach((_, i) => {
        transformedIngredients.push(
          <PokeIngredients
            key={igKey + i} type={igKey} totalIngs={numofIngreds} indx={cnt} />);
        cnt = cnt + 1;
      });
    });

  return (
    <div className={classes.Poke}>
      <div className={classes.IngredientsContainer}> {transformedIngredients}</div>
    </div>
  );

};

export default poke;