import React, { Component } from 'react';
import classes from './AddPlayer.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input'
import axios from '../../../axios-scoreapp';
import {connect} from 'react-redux';


class AddPlayer extends Component {
    state = {
        playerForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Naam',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
            },

        },
        loading: false,
        teamId: '',
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedPlayerForm = {
            ...this.state.playerForm
        }
        const updatedFormElement = {
            ...updatedPlayerForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedPlayerForm[inputIdentifier] = updatedFormElement;
        this.setState({
            playerForm: updatedPlayerForm,
        })
    }

    playerSubmitHandler = (event) => {
        event.preventDefault();
        this.setState({
            loading: true,
        })
        const formData = {};
        for (let formElementIdentifier in this.state.playerForm) {
            formData[formElementIdentifier] = this.state.playerForm[formElementIdentifier].value
        }
        // formData["teamId"] = this.props.match.params.teamId;
        const playerInfo = formData;
        axios.post('/players.json', playerInfo)
            .then(response => {
                this.setState({ loading: false, });
                this.props.closeModal();
            })
            .catch(error => {
                this.setState({ loading: false });
            })
    }
    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.lenght >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.lenght >= rules.maxLength && isValid;
        }

        return isValid;
    }
    render() {
        const formElementArray = [];
        for (let key in this.state.playerForm) {
            formElementArray.push({
                id: key,
                config: this.state.playerForm[key]
            })
        }

        let form = (
            <form onSubmit={this.playerSubmitHandler}>
                {formElementArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
                <button type="submit">Toevoegen</button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div>
                <div className={classes.ContactData}>
                {form}
                {/* <SelectPlayers
                    playername={this.state.playerForm.name.value}
                /> */}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        showFlexItem: state.showFlexItem,
        showModal: state.showModal,
    }
}

const mapDispatchToProps = dispatch => {
    return{      
        closeModal: () => dispatch({type:"closeModal"}),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddPlayer);