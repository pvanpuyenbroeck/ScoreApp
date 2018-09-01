import React, { Component } from 'react';
import axios from '../../../axios-scoreapp';

class Team extends Component {
    state = {
        teamId: '',
    }

    componentDidMount() {
        console.log(this.props);
        axios.get('/Teams'
            // , {
            //     params: {
            //         // id: this.state.teamId,
            //     }
            // }
        )
            .then(response => {
                const fetchedTeam = null;
                console.log(response.data);
                for (let key in response.data) {
                    fetchedTeam.push({
                        ...response.data[key],
                        id: key,
                    });
                }

                this.setState({
                    teams: fetchedTeam,
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
                <h1>Dit is de team pagina van {this.state.teamId}</h1>
            </div>
        )
    }
}

export default Team;