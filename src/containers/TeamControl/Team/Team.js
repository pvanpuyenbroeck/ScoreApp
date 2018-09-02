import React, { Component } from 'react';
import axios from '../../../axios-scoreapp';
import TeamView from '../../../components/Team/TeamView/TeamView';

class Team extends Component {

    state = {
        team: {
            teamId: '',
            players: ['playerId'],
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
        axios.get('/Teams.json')
            .then(response => {
                let fetchedTeam = null;
                for (let key in response.data) {
                    if (key === this.props.match.params.teamId) {
                        fetchedTeam = response.data[key];
                        console.log(fetchedTeam);
                    }
                }

                this.setState({
                    teamName: fetchedTeam.teamName,
                    season: fetchedTeam.season,
                    team: fetchedTeam,
                })
            }).catch(error => {
                console.log(error)
            })

        // this.setState({
        //     teamId: this.props.match.params.teamId,
        // })
        console.log(this.state.team);
    }
    render() {

        return (
            <TeamView
                // teamName={this.state.team.teamName}
                team={this.state.team}
            />
        )
    }
}

export default Team;