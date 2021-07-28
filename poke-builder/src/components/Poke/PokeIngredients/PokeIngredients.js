import React, { Component } from 'react';
import classes from './PokeIngredients.module.css'
import PropTypes from 'prop-types';
import Ingredients from './Ingredients/Ingredients';

class PokeIngredients extends Component {
    
    render() {
        let ingredient = null;
        switch (this.props.type) {
            case ('egg'):
                ingredient = <Ingredients imgName='Egg.png' ingType='protein' numOfIngs={this.props.totalIngs} indx={this.props.indx} />
                break;
            case ('prawn'):
                ingredient = <Ingredients imgName='Prawn.png' ingType='protein' numOfIngs={this.props.totalIngs} indx={this.props.indx} />
                break;
            case ('tofu'):
                ingredient = <Ingredients imgName='Tofu.png' ingType='protein' numOfIngs={this.props.totalIngs} indx={this.props.indx} />
                break;
            case ('lettuce'):
                ingredient = <Ingredients imgName='Lettuce.png' ingType='topping' numOfIngs={this.props.totalIngs} indx={this.props.indx} />
                break;
            case ('peas'):
                ingredient = <Ingredients imgName='Peas.png' ingType='topping' numOfIngs={this.props.totalIngs} indx={this.props.indx} />
                break;
            case ('tomato'):
                ingredient = <Ingredients imgName='Tomato.png' ingType='topping' numOfIngs={this.props.totalIngs} indx={this.props.indx} />
                break;
            case ('quinoa'):
                ingredient = <Ingredients imgName='Quinoa.png' ingType='base' numOfIngs={this.props.totalIngs} indx={this.props.indx} />
                break;
            case ('whiterice'):
                ingredient = <Ingredients imgName='WhiteRice.png' ingType='base' numOfIngs={this.props.totalIngs} indx={this.props.indx} />
                break;
            case ('brownrice'):
                ingredient = <Ingredients imgName='BrownRice.png' ingType='base' numOfIngs={this.props.totalIngs} indx={this.props.indx} />
                break;

            default: ingredient = null;
        }

        return <div className={classes.PokeIngredients}>{ingredient}</div>;

    }
};


PokeIngredients.propTypes = {
    type: PropTypes.string.isRequired
};

export default PokeIngredients;