import React from 'react';
import Poke from '../../Poke/Poke';
import Button from '../../UI/Button/Button';
import classes from './CheckOutSummary.module.css';

const checkOutSummary = (props) => {
    return (
        <div className={classes.CheckOutSummary}>
            <h1>
                Eat Healthier Everyday!
            </h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Poke ingredients={props.ingredients} />
            </div>
            <Button
                btnType="Danger"
                clicked={props.checkoutCancelled}> 
                Cancel</Button>
            <Button
                btnType="Success"
                clicked={props.checkoutContinued}>
            Continue</Button>
        </div>
    );
}

export default checkOutSummary;