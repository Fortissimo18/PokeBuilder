import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import classes from './CheckOut.module.css';
import { connect } from 'react-redux';
import Auxilliary from '../../hoc/Auxilliary';
import Poke from '../../components/Poke/Poke';
import CheckOutSuccess from './CheckOutSuccess';
import Modal from '../../components/UI/Modal/Modal';

class CheckOut extends Component {
  render() {

    //redirect to the main page when the user hasn't select any ingredients
    let summary = <Redirect to='/' />;

    if (this.props.ings) {
      const purchaseRedirect = this.props.purchased ?
        <Modal show={true} modalClosed={<Redirect to='/' />}>
          {<CheckOutSuccess />}
        </Modal> : null

      summary = (
        <Auxilliary>
          <div className={classes.CheckOutBG}></div>
          {purchaseRedirect}

          <div className={classes.CardContainer}>
            {window.innerWidth <= 480 ?
              <Auxilliary>
                <h1>Please Enter your Contact Info</h1>
                <div className={classes.Right}><Poke ingredients={this.props.ings} mode='preview' /></div>
                <div className={classes.Left}><ContactData /></div>
              </Auxilliary>
              : <Auxilliary>
                <div className={classes.Left}>
                  <h1>Please Enter your Contact Info</h1>
                  <ContactData />
                </div>
                <div className={classes.Right}><Poke ingredients={this.props.ings} mode='preview' /></div>
              </Auxilliary>}
          </div>
          <div className={classes.CardShadow}></div>
        </Auxilliary>
      )
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.pokeBuilder.ingredients,
    purchased: state.order.purchased
  }
}


export default connect(mapStateToProps)(CheckOut);