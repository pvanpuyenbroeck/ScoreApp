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
import Spinner from '../../../components/UI/Spinner/Spinner';

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
    // pick(obj, keys) {
    //     return keys.map(k => k in obj ? { [k]: obj[k] } : {})
    //         .reduce((res, o) => Object.assign(res, o), {});
    // }
    componentDidMount() {
        const teamId = this.props.match.params.teamId;
        this.props.selectedTeam(teamId);


    }

    matchSelected = (matchDetails) => {
        // this.props.selectedTeam(matchDetails);
        //     this.setState({
        //         showMatchControl: true,
        //     })
    }

    showToggle() {
        this.setState({
            showToggle: !this.state.showToggle,
            showModal: !this.state.showModal,
        })
    }
    render() {
        let teamControl = "";
        console.log(this.props.team);
        if(this.props.loading){
            teamControl = <Spinner/>;
        }
        else{
        if (this.state.showMatchControl) {
            teamControl = <MatchCenter />
        } else {
            teamControl = (
                <div>
                    <Toggle toggleClicked={() => this.props.showFunctionMenu()} classtheme="TeamButton">MY TEAM</Toggle>
                    <TeamFunctionMenu team={this.state.team} />
                    <Modal show={this.props.showModal} modalClosed={() => this.props.closeModal()} />
                    <Players team={this.props.team  } playerDetails={this.props.team.filteredPlayers} />
                    <Games 
                    matches={this.state.team.Matches} 
                    teamId={this.state.team.teamId} 
                    matchClicked={(matchId) => this.matchSelected(matchId)} />
                </div>
            )
        }
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
        getTeam: (team) => dispatch(actions.getTeam(team)),
        closeModal: () => dispatch(actions.closeModal()),
        showFunctionMenu: () => dispatch(actions.showFunctionMenu()),
        // getTeamFirebase: (teamId) => dispatch(actions.getTeam(teamId)),
        selectedTeam: (teamId) => dispatch(actions.getTeam(teamId)),
    }
}

const mapStateToProps = state => {
    return {
        team: state.team.selectedTeam,
        showModal: state.navigation.showModal,
        showfunctionMenu: state.navigation.showFunctionMenu,
        loading: state.team.loading,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Team);