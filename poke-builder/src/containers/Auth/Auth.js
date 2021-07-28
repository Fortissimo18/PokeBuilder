import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { checkValidity } from '../../shared/utility';
import bgImg from '../../assets/images/pokeIngredients/Cinnamon.png';
import { motion } from 'framer-motion';
import Auxilliary from '../../hoc/Auxilliary';
import { default as ErrMsg } from '../../shared/errMsg';
class Auth extends Component {

    state = {
        controls: {
            signUp: {
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Email'
                    },
                    value: '',
                    validation: {
                        required: true,
                        isEmail: true
                    },
                    validity: { value: false, errorMessage: null },
                    touched: false
                },
                password: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder: 'Password'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 6
                    },
                    validity: { value: false, errorMessage: null },
                    touched: false
                },
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'name',
                        placeholder: 'Name'
                    },
                    value: '',
                    validation: {
                        required: true,
                        maxLength: 25
                    },
                    validity: { value: false, errorMessage: null },
                    touched: false
                },
            },
            signIn: {
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Email'
                    },
                    value: '',
                    validation: {
                        required: true,
                        isEmail: true
                    },
                    validity: { value: false, errorMessage: null },
                    touched: false
                },
                password: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder: 'Password'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 6
                    },
                    validity: { value: false, errorMessage: null },
                    touched: false
                },
            },
        },
        isSignUp: true,
    }

    componentDidMount() {
        if (!this.props.buildingPoke && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = (event, controlType, controlName) => {
        const updatedControls = {
            ...this.state.controls[controlType],
            [controlName]: {
                ...this.state.controls[controlType][controlName],
                value: event.target.value,
                validity: checkValidity(event.target.value, this.state.controls[controlType][controlName].validation),
                touched: true
            }
        };
        this.setState(({ controls }) => ({ controls: { ...controls, [controlType]: updatedControls } }));
    }

    submitHandler = (event, type) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls[type].email.value, this.state.controls[type].password.value, this.state.isSignUp);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        });
    }

    //arrange the error message from firebase
    arrangeErrorMessage = (message) => {
        let errorMessage = null;

        if (message) {
            const lower = String(message.message).toLowerCase().replace('_', ' ');
            const msgText = lower.charAt(0).toUpperCase() + lower.slice(1);
            errorMessage = (
                <ErrMsg key={msgText} msg={msgText}>{msgText}</ErrMsg>
            );
        }
        return errorMessage;
    }

    arrangeForm = (type) => {
        const formElementsArray = [];
        for (let key in this.state.controls[type]) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[type][key]
            });
        }
        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                valid={formElement.config.validity}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, type, formElement.id)}
                backgroundImg={bgImg}
                required={formElement.config.validation.required}
            />
        ));
        return form;
    }

    checkFormValidity = (type) => {
        let formValid = true;
        for (let key in this.state.controls[type]) {
            formValid = formValid && this.state.controls[type][key].validity.value
        }

        return formValid;
    }

    render() {

        let signUpForm = this.arrangeForm('signUp');
        let signInForm = this.arrangeForm('signIn');

        if (this.props.loading) {
            if(window.visualViewport.width <= 480){
                signInForm = <Spinner displaytop='0vh' displayleft='23vw' />
                signUpForm = <Spinner displaytop='0vh' displayleft='23vw' />
            }
            else{
                signInForm = <Spinner displaytop='5vh' displayleft='37%' />
                signUpForm = <Spinner displaytop='5vh' displayleft='37%' />
            }
        }

        const signUpErrorMessage = this.arrangeErrorMessage(this.props.signUpError);
        const signInErrorMessage = this.arrangeErrorMessage(this.props.signInError);

        let disableSignUpButton = !this.checkFormValidity('signUp');
        let disableSignInButton = !this.checkFormValidity('signIn');

        let authRedirect = null;

        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }
        
        //set up page transitiont animation style
        const pageTransitionVariant = {
            initial: {
                opacity: 0,
                x: -500,
                scale: 2,
                backgroundColor: 'whitesmoke'
            },
            animate: { opacity: 1, x: 0, scale: 1, backgroundColor: 'whitesmoke' },
            transition: { ease: [0.43, 0.13, 0.23, 0.96], duration: 0.5 },
            exit: {
                opacity: 0.4, x: -500, scale: 2, backgroundColor: 'whitesmoke',
                transition: { ease: [0.43, 0.13, 0.23, 0.96], duration: 0.5, delay: 1 }
            }

        };
        const blockTransitionVariant = {
            initial: {
                opacity: 0
            },
            animate: {
                opacity: 1, transition: { duration: 1, delay: 0.5 }
            },
            exit: { opacity: 0, transition: { delay: 0 } }
        };


        return (
            <Auxilliary>
                {authRedirect}
                <motion.div
                    variants={pageTransitionVariant}
                    initial='initial'
                    animate='animate'
                    transition='transition'
                    exit='exit'
                    className={classes.LoginBG}>
                </motion.div>
                <motion.div
                    variants={blockTransitionVariant}
                    initial='initial'
                    animate='animate'
                    exit='exit'>

                    <div className={classes.Section}>
                        <h1 className={classes.Heading}>
                            <span>Log In</span>
                            <span>Sign Up</span>
                        </h1>

                        <input className={classes.Checkbox} type="checkbox" id="reg-log" name="reg-log" onClick={this.switchAuthModeHandler} />
                        <label htmlFor="reg-log"></label>
                        <div className={classes.Card3dWrap}>
                            <div className={classes.Card3dWrapper}>
                                <form onSubmit={event => { this.submitHandler(event, 'signUp') }} className={classes.CardFront}>
                                    <div className={classes.CenterWrap}>
                                        <h2 >Sign Up</h2>
                                        {signUpForm}
                                        {signUpErrorMessage}
                                        {disableSignUpButton ? <button disabled={true} className={classes.AuthButton}>
                                            <div className={classes.Circle}></div>Submit
                                        </button>
                                            : <button disabled={false} className={[classes.AuthButton, classes.Shadow].join(' ')}>
                                                <div className={classes.Circle}></div>Submit
                                            </button>}
                                    </div>
                                </form>

                                <form onSubmit={event => { this.submitHandler(event, 'signIn') }} className={classes.CardBack}>
                                    <div >
                                        <div className={classes.CenterWrap}>
                                            <h2 >Log In</h2>
                                            {signInForm}
                                            {signInErrorMessage}
                                            {disableSignInButton ? <button disabled={true} className={classes.AuthButton}>
                                                <div className={classes.Circle}></div>Submit
                                            </button>
                                                : <button disabled={false} className={[classes.AuthButton, classes.Shadow].join(' ')}>
                                                    <div className={classes.Circle}></div>Submit
                                                </button>}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </Auxilliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        signInError: state.auth.signInError,
        signUpError: state.auth.signUpError,
        isAuthenticated: state.auth.token !== null,
        buildingPoke: state.pokeBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);