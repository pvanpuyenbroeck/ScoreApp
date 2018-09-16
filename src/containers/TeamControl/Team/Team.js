import React, { Component } from 'react';
import axios from '../../../axios-scoreapp';
import TeamView from '../../../components/Team/TeamView/TeamView';
import Players from '../../../components/Players/Players/Players';
import Games from '../../../components/Games/Games';
import classes from './Team.css';
import Button from '../../../components/UI/Button/Button';
import firebase from '../../../firebase-scoreapp';

class Team extends Component {

    state = {
        team: {
            teamId: '',
            players: [],
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
    }

    componentDidMount() {
        let matchRef = '';
        console.log(this.props);
        const fetchedPlayers = [];
        let fetchedGames = [];
        let fetchedTeam = {};
        let teamId = "";
        axios.get('/Teams.json')
            .then(response => {
                for (let key in response.data) {
                    if (key === this.props.match.params.teamId) {
                        fetchedTeam = response.data[key];
                        teamId = key;
                    }
                }
                axios.get("/players.json")
                    .then(res => {
                        for (let key in res.data) {
                            if (teamId === res.data[key].playerData.teamId) {
                                fetchedPlayers.push({
                                    ...res.data[key],
                                    id: key,
                                })
                            }
                        }
                        fetchedTeam.players = fetchedPlayers;
                        fetchedTeam.teamId = teamId

                        this.setState({
                            team: fetchedTeam,
                        })
                    })
                console.log(teamId);
                firebase.database().ref('/Teams/' + teamId + '/TeamMembers').once('value').then(res => {
                    let players = [];
                    let updatedTeam = {...this.state.team};
                    players.push(res.val());
                    updatedTeam.players = players;
                    this.setState({
                        team:updatedTeam,
                    })
                }
                )
                matchRef = firebase.database().ref('/Teams/' + teamId + '/Matches').once('value')
                    .then(res => {
                        console.log(res.val());
                        fetchedGames = res.val();
                        
                    });
            }).catch(error => {
                console.log(error)
            })
            
    }
    render() {
        return (
            <div>
                <TeamView
                    // teamName={this.state.team.teamName}
                    team={this.state.team}
                />
                <Players team={this.state.team} />
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