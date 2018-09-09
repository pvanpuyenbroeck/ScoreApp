import React, { Component } from 'react';
import classes from './AddGame.css';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import firebase from '../../../firebase-scoreapp';


class AddGame extends Component {
    state = {
        gameForm: {
            opponent: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Naam tegenstander',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
            },
            date: {
                elementType: 'date',
                elementConfig: {
                    type: 'date',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
            },
            sporthal: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Naam sporthal',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
            },
            postcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Postcode',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
            },
            straat: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder:'Straat + huisnummer'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
            },
        },
        loading: false,
    }


    inputChangedHandler = (event, inputIdentifier) => {
        const updatedGameForm = {
            ...this.state.gameForm
        }
        const updatedFormElement = {
            ...updatedGameForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        // updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedGameForm[inputIdentifier] = updatedFormElement;
        this.setState({
            gameForm: updatedGameForm,
        })
    }

    gameSubmitHandler = (event) => {
        const refTeamPlayers = firebase.database().ref('/Teams/' + this.props.team.teamId + '/Matches');

        event.preventDefault();
        this.setState({
            loading: true,
        })
        const formData = {};
        for (let formElementIdentifier in this.state.gameForm) {
            formData[formElementIdentifier] = this.state.gameForm[formElementIdentifier].value
        }
        formData["teamId"] = this.props.team.teamId;
        const gameInfo = {
            gameData: formData,
        }
        refTeamPlayers.push(gameInfo)
            .then(response => {
                this.setState({ loading: false, });
                this.props.history.push({
                    pathname: '/Team/' + gameInfo.playerData.teamId,
                });
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
        for (let key in this.state.gameForm) {
            formElementArray.push({
                id: key,
                config: this.state.gameForm[key]
            })
        }
        let form = (
            <form onSubmit={this.gameSubmitHandler}>
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
            <h1>Voeg een match toe aan de agenda</h1>
                {form}
            </div>

        )
    }
}

export default AddGame;