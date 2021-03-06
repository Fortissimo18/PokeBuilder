import React, { Component } from 'react';
import classes from './Modal.module.css';
import Auxilliary from '../../../hoc/Auxilliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render() {
        return (
            <Auxilliary>
                <Backdrop
                    show={this.props.show}
                    clicked={this.props.modalClosed} />
                <div className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-200vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Auxilliary>);
    };
}

export default Modal;