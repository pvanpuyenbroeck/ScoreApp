import React, { Component } from 'react';
import axios from '../../../../axios-scoreapp';
import PlayerButton from '../../../../components/Players/PlayerButton/PlayerButton';

class Players extends Component {
    state = {
        players: null,
    }
    componentDidMount() {
        axios.get("/players.json")
            .then(res => {
                const fetchedPlayers = [];
                console.log(this.props)
                for (let key in res.data) {
                    
                    if (this.props.teamId === res.data[key].playerData.teamId) {
                        fetchedPlayers.push({
                            ...res.data[key],
                            id: key,
                        })
                    }
                }
                console.log(fetchedPlayers);
                this.setState({
                    players: fetchedPlayers,
                })
            })
    }
    render() {
        let players = "";
        if (this.state.players) {
            players =
                this.state.players.map(player => {
                    return (
                        <PlayerButton 
                        key={player.playerData.id}
                        name={player.playerData.name}
                        />
                    )
                })
        } else {
            players = <h2>Voeg spelers toe</h2>
        }

        return (
            <div>
                <h1>All the players</h1>
                    {players}
            </div>
        )
    }
}

export default Players;