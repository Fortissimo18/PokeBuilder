import React, { Component } from 'react';
import classes from './CheckOutSuccess.module.css';
import Auxilliary from '../../hoc/Auxilliary';
import successModalBG from '../../assets/images/pokeIngredients/Lemon.jpg';
import { withRouter } from 'react-router-dom';

class CheckOutSuccess extends Component {
    render() {
        return (
            <Auxilliary>
                <div className={classes.Success}>
                    <img src={successModalBG} alt='successBackground'></img>
                    <h1>Enjoy the Freshness!</h1>
                    <div className={classes.SuccessCheckmark}>
                        <div className={classes.CheckIcon}>
                            <span className={[classes.IconLine, classes.LineTip].join(' ')}></span>
                            <span className={[classes.IconLine, classes.LineLong].join(' ')}></span>
                            <div className={classes.IconCircle}></div>
                            <div className={classes.IconFix}></div>
                        </div>
                    </div>
                    <h2>We'll deliver your order to door once ready.</h2>
                    <button onClick={() => { this.props.history.push('/') }}>Got It!</button>
                </div>
            </Auxilliary>
        );
    }
}

export default withRouter(CheckOutSuccess);