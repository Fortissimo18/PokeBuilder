import React, { Component } from 'react';
import Auxilliary from '../../hoc/Auxilliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    closeSideDrawerHandler=()=>{
        this.setState({showSideDrawer:false});
    }

    toggleSideDrawerHandler=()=>{
        this.setState((prevState)=>{return{showSideDrawer: !prevState.SideDrawer};});
    }

    render() {
        return (<Auxilliary>
            <div>
                <Toolbar 
                isAuth={this.props.isAuthenticated}
                menuClicked={this.toggleSideDrawerHandler}/>
                <SideDrawer 
                isAuth={this.props.isAuthenticated}
                open = {this.state.showSideDrawer} closed={this.closeSideDrawerHandler}/>
            </div>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Auxilliary>
        );
    }
}

const mapStateToProps=state=>{
    return {
        isAuthenticated: state.auth.token !==null
    };
}

export default connect(mapStateToProps)(Layout);