import React, { Component } from 'react';
import classes from './Carousel.module.css';
import BuildControls from '../../components/Poke/BuildControls/BuildControls';
import Auxilliary from '../../hoc/Auxilliary';

const TOTAL_STEPS = "3";

class Carousel extends Component {

    constructor(props) {
        super(props);
        this.button1 = React.createRef();
        this.button2 = React.createRef();
        this.button3 = React.createRef();

    }

    state = {
        index: "1",
        showCheckoutButton: false,
        goUpDisable: true,
        goDownDisable: false,
        animation: "played"
    };

    componentDidMount() {
        this.button1.current.checked = true;
    }

    toggleSteps = (idx, direction) => {
        if (idx === "1") {
            this.setState({ index: "1", showCheckoutButton: false, goUpDisable: true, goDownDisable: false, animation: direction });
            this.button1.current.checked = true;
            this.button2.current.checked = false;
            this.button3.current.checked = false;
        }
        if (idx === "2") {
            this.setState({ index: "2", showCheckoutButton: false, goUpDisable: false, goDownDisable: false, animation: direction });
            this.button1.current.checked = false;
            this.button2.current.checked = true;
            this.button3.current.checked = false;
        }
        if (idx === "3") {
            this.setState({ index: "3", showCheckoutButton: true, goUpDisable: false, goDownDisable: true, animation: direction });
            this.button1.current.checked = false;
            this.button2.current.checked = false;
            this.button3.current.checked = true;
        }
    }

    loadSteps = (event) => {
        if (Number(event.target.value) > Number(this.state.index)) {
            this.toggleSteps(event.target.value, "down");
        }
        if (Number(event.target.value) < Number(this.state.index)) {
            this.toggleSteps(event.target.value, "up");
        }
    }

    stepsGoDown = () => {
        if (this.state.index !== TOTAL_STEPS) {
            this.toggleSteps(String(Number(this.state.index) + 1), "down");
        }
    }
    stepsGoUp = () => {
        if (this.state.index !== "1") {
            this.toggleSteps(String(Number(this.state.index) - 1), "up");
        }
    }


    resetAnimation = () => {
        this.setState({ animation: "played" });
    }
    render() {

        let step = null;
        if (this.state.index === "1") {
            step = <BuildControls
                ingredientAdded={this.props.ingredientAdded}
                ingredientRemoved={this.props.ingredientRemoved}
                ingredientsReset={this.props.ingredientsReset}
                totalPrice={this.props.totalPrice}
                disable={this.props.disable}
                ings={this.props.ings}
                animationCSS={this.state.animation}
                animationReset={this.resetAnimation}
                category="base" />;
        }
        if (this.state.index === "2") {
            step = <BuildControls
                ingredientAdded={this.props.ingredientAdded}
                ingredientRemoved={this.props.ingredientRemoved}
                ingredientsReset={this.props.ingredientsReset}
                totalPrice={this.props.totalPrice}
                disable={this.props.disable}
                ings={this.props.ings}
                animationCSS={this.state.animation}
                animationReset={this.resetAnimation}
                category="proteins" />;
        }
        if (this.state.index === "3") {
            step = <BuildControls
                ingredientAdded={this.props.ingredientAdded}
                ingredientRemoved={this.props.ingredientRemoved}
                ingredientsReset={this.props.ingredientsReset}
                totalPrice={this.props.totalPrice}
                disable={this.props.disable}
                ings={this.props.ings}
                animationCSS={this.state.animation}
                animationReset={this.resetAnimation}
                category="toppings" />;
        }

        let leftArrowClasses = [classes.ArrowImg, classes.Left];
        let leftArrowDisabledClasses = [classes.ArrowImg, classes.Left, classes.Disabled];
        let rightArrowClasses = [classes.ArrowImg, classes.Right];
        let rightArrowDisabledClasses = [classes.ArrowImg, classes.Right, classes.Disabled];

        return (
            <Auxilliary >
                <div className={classes.Carousel}>
                    <div className={classes.ProgressInner}>

                        <input id={classes.Step1} name="step" type="radio"
                            ref={this.button1} value="1" onClick={event => { this.loadSteps(event) }} />
                        <input id={classes.Step2} name='step' type='radio'
                            ref={this.button2} value="2" onClick={event => { this.loadSteps(event) }} />
                        <input id={classes.Step3} name='step' type='radio'
                            ref={this.button3} value="3" onClick={event => { this.loadSteps(event) }} />

                        <div className={classes.ProgressInnerStep}>
                            <label htmlFor={classes.Step1}>Base</label>
                        </div>
                        <div className={classes.ProgressInnerStep}>
                            <label htmlFor={classes.Step2}>Proteins</label>
                        </div>
                        <div className={classes.ProgressInnerStep}>
                            <label htmlFor={classes.Step3}>Toppings</label>
                        </div>
                        <div className={classes.ProgressInnerBar}></div>
                        <div className={classes.ProgressInnerBarSet}></div>
                    </div>
                    <div className={classes.Card} >
                        <fieldset>
                            {step}
                        </fieldset>
                    </div>
                    {this.state.goUpDisable ?
                        <a href="/#" className={leftArrowDisabledClasses.join(' ')}> </a> :
                        <a href="/#"  className={leftArrowClasses.join(' ')}
                            onClick={event => this.stepsGoUp(event)}
                        > </a>}
                    {this.state.goDownDisable ?
                        <a href="/#" className={rightArrowDisabledClasses.join(' ')}> </a> :
                        <a href="/#" className={rightArrowClasses.join(' ')}
                            onClick={event => this.stepsGoDown(event)}
                        > </a>}
                </div>
                <button
                    className={classes.NeonButton}
                    disabled={!this.props.purchasable}
                    onClick={this.props.ordered}>
                    {this.props.isAuth ? "Order Now" : "Sign In to Order"}
                </button>
            </Auxilliary>
        );
    };
}


export default Carousel;