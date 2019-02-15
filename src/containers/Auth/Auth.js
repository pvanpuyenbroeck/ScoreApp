import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import classes from './Auth.css';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router';
import Button from '../../components/UI/Button/Button/Button';
import firebase from '../../firebase-scoreapp';
import * as firebaseui from 'firebaseui';
import Authenticators from '../../components/Auth/authenticators';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
                signin: true,
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
                valid: false,
                touched: false,
                signin: true,
            },
            userName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Gebruikersnaam (Go Crazy)'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                signin: false,
            },
            voornaam: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Voornaam'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                signin: false,
            },
            familienaam: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Familienaam'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                signin: false,
            },
        },
        isSignup: true,
        selectedFile:null,
    }

    componentDidMount() {
        if (this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({ controls: updatedControls });
    }

    submitHandler = (event) => {
        event.preventDefault();
        if (this.state.isSignup) {
            this.props.onAuthSignup(
                this.state.controls.email.value,
                this.state.controls.password.value,
                this.state.controls.userName.value,
                this.state.controls.voornaam.value,
                this.state.controls.familienaam.value,
                this.state.isSignup);
        } else {
            this.props.onAuthLogin(this.state.controls.email.value, this.state.controls.password.value);
        }

    }

    fileSelectedHandler = (event) => {
        this.setState({
            selectedFile: event.target.files[0],
        })
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup };
        });
    }


    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            if (this.state.isSignup) {
                formElementsArray.push({
                    id: key,
                    config: this.state.controls[key]
                });
            }
            else {
                if (this.state.controls[key].signin === true) {
                    formElementsArray.push({
                        id: key,
                        config: this.state.controls[key]
                    });
                };
            }
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ));

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    {/* <input
                        type="file"
                        onChange={this.fileSelectedHandler}
                    />
                    <button onClick={this.fileUploadHandler}>Upload</button> */}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}
                </Button>
                <Authenticators/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.user !== null,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuthLogin: (email, password) => dispatch(actions.authFirebaseLogin(email, password)),
        onAuthSignup: (email, password, userName, voornaam, familienaam) => dispatch(actions.authFirebaseSignup(email, password, userName, voornaam, familienaam)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/selectTeam')),
        onFileUpload: () => dispatch(actions.fileUploadHandler(this.state.selectedFile,)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);