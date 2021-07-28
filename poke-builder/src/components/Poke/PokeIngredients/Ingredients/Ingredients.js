import React from 'react';
import classes from './Ingredients.module.css';

const ingredients = (props) => {           
    let ingStyle = {};
    let ingClasses = '';
    if(props.ingType === 'base'){
        ingClasses=classes.IngredientsBase;
    }
    else{
        ingStyle={transform: "rotate("+360*props.indx/props.numOfIngs+"deg) translate("+45+"%) rotate(-"+360*props.indx/props.numOfIngs +"deg)"};
        ingClasses=classes.Ingredients;
    }
    return (
    <li className={ingClasses} style={ingStyle}>
        <img src={require(`../../../../assets/images/pokeIngredients/Ingredients/${props.imgName}`).default} alt=""></img>
    </li>);
}

export default ingredients;