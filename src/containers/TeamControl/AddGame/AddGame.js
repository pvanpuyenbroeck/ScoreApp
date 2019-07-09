import React, { Component } from 'react';
import classes from './AddGame.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import TextInput from '@material-ui/core/TextField';
// import DateTimePicker from 'react-datetime-picker';
import DateTimePicker from 'react-datetime';

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
                value: new Date(),
                validation: {
                    required: true,
                },
                valid: false,
            },
            sporthal: {
                id: 'sporthal',
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Sporthal',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
            },
            postcode: {
                id: 'sporthal',
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
                id: 'straat',
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Straat + huisnummer'
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

    gameSubmitHandler = (event) => {
        event.preventDefault();
        console.log(this.props);
        // const refTeamPlayers = firebase.database().ref('/Teams/' + this.props.team.teamId + '/Matches');
        // this.setState({
        //     loading: true,
        // })
        const formData = {};
        for (let formElementIdentifier in this.state.gameForm) {
            formData[formElementIdentifier] = this.state.gameForm[formElementIdentifier].value
        }
        formData["teamId"] = this.props.team.teamId;
        formData.date = formData.date.format();
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
                {formElementArray.map(formElement => {
                    if (formElement.id === 'date') {
                        return <DateTimePicker 
                            value={this.state.gameForm.date.value}
                            onChange={this.onChange}
                            timeFormat={"H : m"}
                        />
                    } else {
                        return (<TextInput
                            className={classes.InputFields}
                            key={formElement.id}
                            id={formElement.id}
                            type={formElement.config.elementType}
                            label={typeof formElement.config.elementConfig.placeholder === 'undefined' ? null : formElement.config.elementConfig.placeholder}
                            // elementConfig={formElement.config.elementConfig}
                            // value={formElement.config.value}
                            defaultValue={formElement.config.value}
                            onChange={(event) => this.inputChangedHandler(event, formElement.id)}
                            autoFocus={false}
                        />)
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