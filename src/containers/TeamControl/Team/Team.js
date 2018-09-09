import React, { Component } from 'react';
import axios from '../../../axios-scoreapp';
import TeamView from '../../../components/Team/TeamView/TeamView';
import Players from '../../../components/Players/Players/Players';
import { NavLink } from 'react-router-dom';
import Games from '../../../components/Games/Games';

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
        console.log(this.props);
        const fetchedPlayers = [];
        let fetchedTeam = {};
        let teamId = "";
        axios.get('/Teams.json')
            .then(response => {
                for (let key in response.data) {
                    if (key === this.props.match.params.teamId) {
                        fetchedTeam = response.data[key];
                        teamId = key;
                        console.log(fetchedTeam);
                    }
                }
                axios.get("/players.json")
                    .then(res => {
                        console.log(this.props)
                        for (let key in res.data) {
                            console.log(res.data);
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
                            // teamName: fetchedTeam.teamName,
                            // season: fetchedTeam.season,
                            team: fetchedTeam,
                            // teamId: this.props.match.params.teamId,

                        })
                    })
            }).catch(error => {
                console.log(error)
            })

        console.log(this.state.team);
    }
    render() {
        return (
            <div>
                <TeamView
                    // teamName={this.state.team.teamName}
                    team={this.state.team}
                />
                <NavLink
                    to={{
                        pathname: this.props.match.url + "/addPlayer",
                    }}>Add player</NavLink>

                {/* <PlayerForm teamId={this.state.teamId}/> */}
                <Players team={this.state.team} />
                <Games team={this.state.team}/>
            </div>
        )
    }
}

export default Team;