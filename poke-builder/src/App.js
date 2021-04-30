import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import PokeBuilder from './containers/PokeBuilder/PokeBuilder';
import { Route, Switch, withRouter, Redirect} from 'react-router-dom';
import CheckOut from './containers/CheckOut/CheckOut';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import *  as actions from './store/actions/index';

class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignup();
  }

  render(){
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
          <Route path="/" exact component={PokeBuilder} />
          <Redirect to="/" />
      </Switch>);
      if(this.props.isAuthenticated){
        routes = (
        <Switch>
        <Route path="/logout" component={Logout} />
          <Route path="/checkout" component={CheckOut} />
          <Route path="/orders" component={Orders} />
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={PokeBuilder} />
          <Redirect to="/" />
          {/* <Route path="/" exact render={props => <PokeBuilder/>} /> */}
        </Switch>);
      }

      return (
    <div>
      <Layout>
        {routes}
      </Layout>
    </div>
  );
  }

}

const mapStateToProps = state =>{
  return{
    isAuthenticated:state.auth.token !== null
  };
}


const mapDispatchToProps = dispatch =>{
  return{
    onTryAutoSignup:() => dispatch(actions.authCheckState())
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
