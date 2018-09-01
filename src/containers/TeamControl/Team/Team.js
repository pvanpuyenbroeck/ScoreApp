import React, { Component } from 'react';
import axios from '../../../axios-scoreapp';

class Team extends Component {
    
    state = {
        teamId: '',
        teamName: '',
        season:'',
    }

    componentDidMount() {
        console.log(this.props);
        axios.get('/Teams.json')
            .then(response => {
                let fetchedTeam = null;
                console.log(response.data);
                for (let key in response.data) {
                    if (key === this.state.teamId) {
                        fetchedTeam = response.data[key];
                    }
                }

                this.setState({
                    teamName: fetchedTeam.teamName,
                    season: fetchedTeam.season,
                })
            }).catch(error => {
                console.log(error)
            })

        this.setState({
            teamId: this.props.match.params.teamId,
        })
    }
    render() {
        
        return (
            <div>
                <h1>Dit is de team pagina van {this.state.teamName}</h1>
            </div>
        )
    }
}

export default Team;