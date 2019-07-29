import React, { Component } from 'react';
import classes from './AddGame.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import TextInput from '@material-ui/core/TextField';
// import DateTimePicker from 'react-datetime-picker';
import DateTimePicker from 'react-datetime';
import ArenaAutocomplete from '../../../components/Arena/ArenaAutocomplete/arenaAutocomplete';
import moment from 'moment';

class AddGame extends Component {


    state = {
        gameForm: {
            opponent: {
                id: 'opponent',
                elementType: 'standard-required',
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
                id: 'datetime-local',
                elementType: 'datetime-local',
                elementConfig: {
                    type: 'datetime-local',
                    placeholder: null,
                },
                value: moment(),
                validation: {
                    required: true,
                },
                valid: false,
            },
            sporthal: {
                id: "sporthal",
                value: '',
            }
        },
        loading: false,
        selectedArena: "",
        showWarningSporthal: false,
        showWarningOpponentName: false,
    }

    onChange = value => {
        const updatedGameForm = { ...this.state.gameForm };
        const updatedDateForm = { ...updatedGameForm.date };
        updatedDateForm.value = value;
        updatedGameForm.date = updatedDateForm;
        this.setState({
            gameForm: updatedGameForm,
        })
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

    validateInputs() {
        console.log(this.state);
        if (this.state.gameForm.opponent.value === '') {
            this.setState({
                showWarningOpponentName: true,
            })
        }
        if (this.state.selectedArena === "") {
            this.setState({
                showWarningSporthal: true,
            })
        }
        console.log(this.state);
    }

    gameSubmitHandler = (event) => {
        event.preventDefault();
        if (this.props.team.teamId === null || this.state.gameForm.opponent.value === '' || this.state.selectedArena === "") {
            this.validateInputs();
        } else {
            const formData = {};
            for (let formElementIdentifier in this.state.gameForm) {
                formData[formElementIdentifier] = this.state.gameForm[formElementIdentifier].value
            }
            formData["teamId"] = this.props.team.teamId;
            formData.date = formData.date.format();
            formData["locatie"] = this.state.selectedArena.locatie;
            formData["sporthal"] = this.state.selectedArena.sporthal;
            const gameInfo = {
                gameData: formData,
                oponentGoals: 0,
                Participants: [],
            }
            // refTeamPlayers.push(gameInfo)
            //     .then(response => {
            //         this.setState({ loading: false, });
            //         // this.props.history.push({
            //         //     // pathname: '/Team/' + gameInfo.gameData.teamId,

            //         // });
            //     })
            //     .catch(error => {
            //         this.setState({ loading: false });
            //     })
            this.props.AddMatchtoTeam(gameInfo, this.props.team, this.props.selectedSeason, this.props.userid);
            this.props.CloseModal();
        }
    }

    selectedArenaHandler(arena) {
        this.setState({
            selectedArena: arena,
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

        const ValidateWarning = ({ message, display }) => {
            return (
                <div className={classes.ValidateWarning} style={{ display }}>
                    {message}
                </div>
            )
        }

        let form = (
            <form onSubmit={this.gameSubmitHandler}>
                {formElementArray.map(formElement => {
                    if (formElement.id === 'date') {
                        return <DateTimePicker
                            value={this.state.gameForm.date.value}
                            onChange={this.onChange}
                            timeFormat={"H : m"}
                            className={classes.InputFields}
                        />
                    }
                    if (formElement.id === 'sporthal') {
                        return (
                            <React.Fragment>
                                <ValidateWarning
                                    message="* Sporthal selecteren is verplicht!"
                                    display={this.state.showWarningSporthal ? "initial" : "none"}
                                />
                                <ArenaAutocomplete
                                    selectedArena={(arena => this.selectedArenaHandler(arena))}
                                    value={this.state.selectedArena.sporthal}
                                />
                            </React.Fragment>)
                    }
                    else {
                        return (
                            <React.Fragment>
                                <ValidateWarning
                                    message="* Naam van de tegenstander is verplicht!"
                                    display={this.state.showWarningOpponentName ? "initial" : "none"}
                                />
                                <input
                                    className={classes.InputFields}
                                    key={formElement.id}
                                    id={formElement.id}
                                    type={formElement.config.elementType}
                                    placeholder={typeof formElement.config.elementConfig.placeholder === 'undefined' ? null : formElement.config.elementConfig.placeholder}
                                    // elementConfig={formElement.config.elementConfig}
                                    // value={formElement.config.value}
                                    defaultValue={formElement.config.value}
                                    onChange={(event) => this.inputChangedHandler(event, formElement.id)}
                                // autoFocus={false}
                                />
                            </React.Fragment>)
                    }
                })}
                <button type="submit" >Toevoegen</button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.AddGame}>
                <h1>Voeg een match toe aan de agenda</h1>
                {form}
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        team: state.team.selectedTeam,
        selectedSeason: state.team.selectedSeason,
        userid: state.auth.user.uid,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        CloseModal: () => dispatch(actions.closeModal()),
        AddMatchtoTeam: (gamedata, team, season, uid) => dispatch(actions.addMatch(gamedata, team, season, uid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGame);