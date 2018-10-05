import React, { Component } from 'react';
import Players from '../../../components/Players/Players/Players';
import Games from '../../../components/Games/Games';
import classes from './Team.css';
import Modal from '../../../components/UI/Modal/Modal';
import TeamFunctionMenu from '../../../components/Navigation/TeamFunctionMenu/TeamFunctionMenu';
import Toggle from '../../../components/UI/Toggle/Toggle';
import { connect } from 'react-redux';
import MatchCenter from '../MatchCenter/MatchCenter';
import * as actions from '../../../store/actions/index';

class Team extends Component {

    state = {
        team: {
            teamId: '',
            players: {},
            teamName: '',
            matches: [{
                matchId: '',
                season: '',
                date: '',
                opponent: '',
                homeGoals: 0,
                opponentGoals: 0,
                matchImage: '',
                participatingPlayers: [{
                    playerId: '',
                    goalsScored: 0,
                }]
            }],
            admin: '',
        },
        playerDetails: {},
        showModal: false,
        showToggle: false,
        showMatchControl: false,
        selectedMatch:{},
    }
    pick(obj, keys) {
        return keys.map(k => k in obj ? { [k]: obj[k] } : {})
            .reduce((res, o) => Object.assign(res, o), {});
    }
    componentDidMount() {
        const teamId = this.props.match.params.teamId;
        this.props.getTeamFirebase(teamId);

    }

    matchSelected = (matchDetails) => {
        this.props.selectedTeam(matchDetails);
            this.setState({
                showMatchControl: true,
            })
    }

    showToggle() {
        this.setState({
            showToggle: !this.state.showToggle,
            showModal: !this.state.showModal,
        })
    }
    render() {
        let teamControl = "";
        if (this.state.showMatchControl) {
            teamControl = <MatchCenter />
        } else {
            teamControl = (
                <div>
                    <Toggle toggleClicked={() => this.props.showFunctionMenu()} classtheme="TeamButton">MY TEAM</Toggle>
                    <TeamFunctionMenu team={this.state.team} />
                    <Modal show={this.props.showModal} modalClosed={() => this.props.closeModal()} />
                    <Players team={this.state.team} playerDetails={this.state.playerDetails} />
                    <Games 
                    matches={this.state.team.Matches} 
                    teamId={this.state.team.teamId} 
                    matchClicked={(matchId) => this.matchSelected(matchId)} />
                </div>
            )
        }
        return (
            <div>
                {teamControl}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getTeam: (team) => dispatch({ type: "GetTeam", team: team }),
        closeModal: () => dispatch({ type: "closeModal" }),
        showFunctionMenu: () => dispatch({ type: "showFunctionMenu" }),
        getTeamFirebase: (teamId) => dispatch(actions.getTeam(teamId)),
        selectedTeam: (selectedTeam) => dispatch({type:"selectedTeam", selectedTeam:selectedTeam}),
    }
}

const mapStateToProps = state => {
    return {
        team: state.team.team,
        showModal: state.navigation.showModal,
        showfunctionMenu: state.navigation.showFunctionMenu,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Team);