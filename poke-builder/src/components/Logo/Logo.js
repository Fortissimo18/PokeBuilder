import React from 'react';
import pokelogo from '../../assets/images/pokeIngredients/LantingPokeLogo.png';
import classes from './Logo.module.css';

const logo=()=>(
<div className={classes.Logo}>
    <img src={pokelogo} alt="MyPoke"/>
</div>
);

export default logo;