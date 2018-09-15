import React, { Component } from 'react';
import classes from './SelectPlayers.css';
import firebase from '../../../firebase-scoreapp';
import PlayerButton from '../../../components/Players/PlayerButton/PlayerButton';

class SelectPlayers extends Component {
    state = {
        players: [],
    }
    componentWillMount() {
        let players = [];
        firebase.database().ref('/players').once('value').then(res => {
            // const playersArray = Object.Array(res.val());
            for (let key in res.val()) {
                const player = {
                    id: key,
                    playerData: res.val()[key].playerData,
                }
                players.push(player);
            }
            console.log(players);
            this.setState({
                players: players,
            })
        });
    }
    render() {
        const allPlayers = this.state.players.map(player => {
            
            if (player.playerData.name.startsWith(this.props.playername)) {
                return (
                    <PlayerButton
                        number={player.playerData.playerNumber}
                        name={player.playerData.name}
                        key={player.id}
                    />
                )
            }
        })

        return (
            <div>
                {allPlayers}
            </div>
        )
    }
}

export default SelectPlayers;