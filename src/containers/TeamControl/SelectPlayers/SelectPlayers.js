import React, { Component } from 'react';
import firebase from '../../../firebase-scoreapp';
import PlayerButton from '../../../components/Players/PlayerButton/PlayerButton';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import NumberSelection from '../../../components/UI/NumberSelection/NumberSelection';
import classes from './SelectPlayers.css';

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
        },
        loading: true,
        teamId: '',
        players: null,
        teamMembers: [],
        selectedPlayerId: '',
        playerNumbers: null,
        playerNumberSelected: null,
        showValidationMessage: 'none',
    }
    componentDidMount() {
        firebase.database().ref('/Players').once('value').then(res => {
            let players = [];
            for (let key in res.val()) {
                const player = {
                    ...res.val()[key],
                }
                players.push(player);
                console.log(players);
            }
            this.setState({
                players: players,
                loading: false,
            })
        });
    }

    playerSubmitHandler = (event) => {
        event.preventDefault();
        this.setState({
            loading: true,
        })
        if (this.state.playerNumberSelected !== null && this.state.selectedPlayerId !== '') {
            const formData = {};
            for (let formElementIdentifier in this.state.playerForm) {
                if (formElementIdentifier === "playerNumber") {
                    formData[formElementIdentifier] = this.state.playerForm[formElementIdentifier].value
                }
            }
            formData["playerId"] = this.state.selectedPlayerId;
            const playerInfo = formData;
            console.log(playerInfo);
            const TeamMembers = typeof this.props.team.Seasons[this.props.selectedSeason] !== 'undefined' ? this.props.team.Seasons[this.props.selectedSeason].TeamMembers : null;
            let updatedTeamMembers = {
                ...TeamMembers,
                [this.state.selectedPlayerId]: {
                    number: this.state.playerNumberSelected,
                    active: true,
                }
            };
            this.props.addPlayerToTeam(this.props.team, updatedTeamMembers, this.props.selectedSeason)
            this.props.selectedTeam(this.props.team.teamId, this.props.selectedSeason, this.props.user.uid);

            let updatedPlayerForm = { ...this.state.playerForm };
            updatedPlayerForm.name.value = '';
            this.setState({
                loading: false,
                selectedPlayerId: '',
                playerNumberSelected: null,
                playerForm: updatedPlayerForm,
            })
        }
        else {
            this.setState({
                loading: false,
                selectedPlayerId: '',
                playerNumberSelected: null,
                showValidationMessage: 'block',
            })
        }
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
        console.log(playerId);
        this.setState({ selectedPlayerId: playerId })
        const updatedform = { ...this.state.playerForm };
        const name = { ...updatedform.name };

        this.state.players.map(res => {
            console.log(res);
            if (res.userid === playerId) {
                name.value = res.voornaam + " " + res.familienaam;
            }
            return null;
        })
        console.log(name);
        updatedform.name = name;
        this.setState({
            playerForm: updatedform,
        })
    }

    onNumberClickedButton = (number) => {
        this.setState({ playerNumberSelected: number, })
    }

    render() {
        const formElementArray = [];
        for (let key in this.state.playerForm) {
            formElementArray.push({
                id: key,
                config: this.state.playerForm[key]
            })
        }
        let allPlayers = <div></div>
        let form = <Spinner />
        if (!this.state.loading) {
            form = (
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
                    <div 
                    className={classes.Validation} 
                    style={{ display: this.state.showValidationMessage }}
                    
                    >Speler en nummer aangeven is verplicht!*</div>
                    <NumberSelection
                        numbers={20}
                        numberClicked={(number) => this.onNumberClickedButton(number)}
                        teamMembers={typeof this.props.team.Seasons[this.props.selectedSeason] !== 'undefined' ? this.props.team.Seasons[this.props.selectedSeason].TeamMembers : null}
                        numberSelected={this.state.playerNumberSelected}
                    />
                    <button type="submit" className={classes.Button}>Toevoegen</button>
                </form>
            );

            allPlayers = this.state.players.map(player => {
                const playerfirstnameLowercase = player.voornaam.toLowerCase();
                const playerlastnamLowercase = player.familienaam.toLowerCase();
                const playernamePropsLowercase = this.state.playerForm.name.value.toLowerCase();
                if ((playerfirstnameLowercase.startsWith(playernamePropsLowercase) && playernamePropsLowercase !== "") ||
                    (playerlastnamLowercase.startsWith(playernamePropsLowercase) && playernamePropsLowercase !== "")) {
                    return (
                        <PlayerButton
                            name={player.voornaam + " " + player.familienaam}
                            key={player.userid}
                            playerid={player.userid}
                            clicked={() => this.onPlayerButtonClickedHandler(player.userid)}
                            user={this.props.user}
                        />
                    )
                }
                return null;
            })
        }
        return (
            <div>
                {form}
                {allPlayers}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // closeModal: () => dispatch({type:"closeModal"}),
        addPlayerToTeam: (team, updatedTeamMembers, season) => dispatch(actions.addPlayerToTeam(team, updatedTeamMembers, season)),
        selectedTeam: (teamId, season, uid) => dispatch(actions.getTeam(teamId, season, uid)),
    }
}

const mapStateToProps = state => {
    return {
        team: state.team.selectedTeam,
        user: state.auth.user,
        selectedSeason: state.team.selectedSeason,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectPlayers);