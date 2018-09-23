import React, { Component } from 'react';
import axios from '../../../axios-scoreapp';
import TeamView from '../../../components/Team/TeamView/TeamView';
import Players from '../../../components/Players/Players/Players';
import Games from '../../../components/Games/Games';
import classes from './Team.css';
import Button from '../../../components/UI/Button/Button';
import firebase from '../../../firebase-scoreapp';
import Modal from '../../../components/UI/Modal/Modal';

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
    }
    pick(obj, keys) {
        return keys.map(k => k in obj ? { [k]: obj[k] } : {})
            .reduce((res, o) => Object.assign(res, o), {});
    }
    componentDidMount() {
        const teamId = this.props.match.params.teamId;
        firebase.database().ref('/Teams/' + teamId).once('value').then(res => {
            console.log(res.val());
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
                    this.setState({
                        team: team,
                        playerDetails: filteredPlayers,
                    })
                })
            }
        })

    }
    render() {
        return (
            <div>
                {/* <TeamView
                    // teamName={this.state.team.teamName}
                    team={this.state.team}
                /> */}
                <Modal show={this.state.showModal}/>
                <Players team={this.state.team} playerDetails={this.state.playerDetails} />
                <Button
                    path={this.props.match.url + "/selectPlayers"}>
                    <div>Speler Toevoegen</div>
                </Button>
                <Games matches={this.state.team.Matches} teamId={this.state.team.teamId} />
            </div>
        )
    }
}



export default Team;