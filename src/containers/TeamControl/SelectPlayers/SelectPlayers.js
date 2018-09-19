import React, { Component } from 'react';
import classes from './SelectPlayers.css';
import firebase from '../../../firebase-scoreapp';
import PlayerButton from '../../../components/Players/PlayerButton/PlayerButton';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-scoreapp';
import Input from '../../../components/UI/Input/Input';

class SelectPlayers extends Component {
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
            playerNumber: {
                elementType: 'number',
                elementConfig: {
                    type: 'number',
                    placeholder: 'playerNumber',
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
        players: [],
        teamMembers: [],
        selectedPlayerId: '',
        selectedName:'',
    }
    componentWillMount() {
        let players = [];
        let teamMembers ={} ;
        firebase.database().ref('/players').once('value').then(res => {
            // const playersArray = Object.Array(res.val());
            for (let key in res.val()) {
                const player = {
                    id: key,
                    ...res.val()[key],
                }
                players.push(player);
                console.log(players);
            }
            this.setState({
                players: players,
            })
        });
        firebase.database().ref('/Teams/' + this.props.match.params.teamId + '/TeamMembers').once('value').then(res => {
            teamMembers = res.val();
            console.log(res.val());
            if (teamMembers) {
                this.setState({
                    teamMembers: teamMembers,
                })
            }
        });
    }

    playerSubmitHandler = (event) => {
        event.preventDefault();
        this.setState({
            loading: true,
        })

        const formData = {};
        for (let formElementIdentifier in this.state.playerForm) {
            if (formElementIdentifier === "playerNumber") {
                formData[formElementIdentifier] = this.state.playerForm[formElementIdentifier].value
            }
        }
        formData["playerId"] = this.state.selectedPlayerId;
        const playerInfo = formData;

        let updatedTeamMembers = {
            ...this.state.teamMembers,
            [this.state.selectedPlayerId]: {
                number: playerInfo.playerNumber,
            }
        }; 

        console.log(updatedTeamMembers);

        firebase.database().ref('/Teams/' + this.props.match.params.teamId + '/TeamMembers/').set(updatedTeamMembers)
            .then(response => {
                this.setState({ loading: false, });
                this.props.history.push({
                    pathname: '/Team/' + playerInfo.teamId,
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

    onPlayerButtonClickedHandler = (playerId) => {
        this.setState({ selectedPlayerId: playerId})
        const updatedform = {...this.state.playerForm};
        const name = {...updatedform.name};
        
        this.state.players.map(res => {
            if(res.id === playerId){
                name.value= res.name;
            }
        })
        updatedform.name = name;
        this.setState({
            playerForm:updatedform,
        })
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

            const allPlayers = this.state.players.map(player => {
                const playernameLowercase = player.name.toLowerCase();
                const playernamePropsLowercase = this.state.playerForm.name.value.toLowerCase();
                if (playernameLowercase.startsWith(playernamePropsLowercase) && playernamePropsLowercase !== "") {
                    return (
                        <PlayerButton
                            number={player.playerNumber}
                            name={player.name}
                            key={player.id}
                            playerid={player.id}
                            clicked={(playerId) => this.onPlayerButtonClickedHandler(playerId)}
                        />
                    )
                }
            })

        return (
            <div>
                {form}
                {allPlayers}
            </div>
        )
    }
}

export default SelectPlayers;