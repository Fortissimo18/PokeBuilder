import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import PokeBuilder from './containers/PokeBuilder/PokeBuilder';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import CheckOut from './containers/CheckOut/CheckOut';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import *  as actions from './store/actions/index';
import Cursor from './components/UI/Cursor/Cursor';
import { AnimatePresence } from 'framer-motion';


class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
    window.addEventListener('resize', this.updateDimensions);
  }

  state = { smallScreen: window.matchMedia('(max-device-width: 480px)').matches };

  updateDimensions = () => {
    if (window.matchMedia('(max-device-width: 480px)').matches) {
      this.setState({ smallScreen: true });
    }
    else {
      this.setState({ smallScreen: false });
    }
  }


  render() {
    let routes = (
      <AnimatePresence exitBeforeEnter initial={false}>
        <Switch location={this.props.location} key={this.props.location.pathname}>
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={PokeBuilder} />
          <Redirect to="/" />
        </Switch>
      </AnimatePresence>
    );

    //paths afrer log in
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/checkout" component={CheckOut} />
          <Route path="/orders" component={Orders} />
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={PokeBuilder} />
          <Redirect to="/" />
        </Switch>

      );
    }

    //only load custom cursor on large screen
    let page = (
      <div>
        <Cursor />
        <Layout>
          {routes}
        </Layout>
      </div>);
    if (this.state.smallScreen) {
      page = <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    }
    return (
      <div>{page}</div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
}


const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
