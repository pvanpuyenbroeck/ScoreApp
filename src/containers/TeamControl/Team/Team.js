import React, { Component } from 'react';
import Players from '../../../components/Players/Players/Players';
import Games from '../../../components/Games/Games';
import classes from './Team.css';
import firebase from '../../../firebase-scoreapp';
import Modal from '../../../components/UI/Modal/Modal';
import TeamFunctionMenu from '../../../components/Navigation/TeamFunctionMenu/TeamFunctionMenu';
import Toggle from '../../../components/UI/Toggle/Toggle';
import {connect} from 'react-redux';

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
        showToggle:false,
    }
    pick(obj, keys) {
        return keys.map(k => k in obj ? { [k]: obj[k] } : {})
            .reduce((res, o) => Object.assign(res, o), {});
    }
    componentDidMount() {
        const teamId = this.props.match.params.teamId;
        firebase.database().ref('/Teams/' + teamId).once('value').then(res => {

            const team = res.val();
            if (team.TeamMembers) {
                const players = Object.keys(team.TeamMembers);
                firebase.database().ref('/players').once('value').then(allPlayers => {
                    const allTeamMembers = allPlayers.val();
                    const filteredPlayers = this.pick(allTeamMembers, players);
                    for (let key in filteredPlayers) {
                        filteredPlayers[key] = {
                            ...filteredPlayers[key],
                            playerNumber: team.TeamMembers[key].number,
                        }
                    }
                    this.props.getTeam({
                        ...team,
                        TeamId:teamId,
                        playerDetails: filteredPlayers,
                    });
                    this.setState({
                        team: team,
                        playerDetails: filteredPlayers,
                    })
                })
            }
        })

    }

    showToggle(){
        this.setState({
            showToggle:!this.state.showToggle,
            showModal:!this.state.showModal,
        })
    }
    render() {
        return (
            <div>
                {/* <TeamView
                    // teamName={this.state.team.teamName}
                    team={this.state.team}
                /> */}
                <Toggle toggleClicked={() => this.props.showFunctionMenu()} classtheme="TeamButton">MY TEAM</Toggle>
                <TeamFunctionMenu team={this.state.team}/>
                <Modal show={this.props.showModal} modalClosed={() => this.props.closeModal()}/>
                <Players team={this.state.team} playerDetails={this.state.playerDetails} />
                <Games matches={this.state.team.Matches} teamId={this.state.team.teamId} location={this.props.location}/>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        getTeam: (team) => dispatch({type:"GetTeam", team:team}),
        closeModal: () => dispatch({type:"closeModal"}),
        showFunctionMenu: () => dispatch({type:"showFunctionMenu"}),
        getTeamFirebase: (teamId) => dispatch({type:"getTeamFirebase", teamId:teamId}),
    }
}

const mapStateToProps = state => {
    return{
        team: state.team,
        showModal: state.showModal,
        showfunctionMenu: state.showFunctionMenu,
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Team);