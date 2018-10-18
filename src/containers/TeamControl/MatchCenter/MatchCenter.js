import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './MatchCenter.css';
import MatchPlayerFrame from '../../../components/Match/MatchPlayerFrame/MatchPlayerFrame';
import Button from '../../../components/UI/Button/Button/Button';
import * as actions from '../../../store/actions/index';
import AddPlayerstoMatch from '../../../components/Navigation/AddPlayersToMatch/AddPlayersToMatch';


class matchCenter extends Component {
    state = {
        teamMembers: null,
        teamMembersMatch: null,
        showAddPlayersWindow: false,
    }

    componentDidMount(){
        let updateFilteredPlayer = {...this.props.team.filteredPlayers}; 
            for(let key in this.props.team.filteredPlayers){
                updateFilteredPlayer[key] = {
                    ...this.props.team.filteredPlayers[key],
                    attending: false,
                } 
        }

        this.setState({

            teamMembers: updateFilteredPlayer,
        })
    }

    playerButtonClicked(playerId){
        console.log(playerId);
        let updatedTeamMembers = {...this.state.teamMembers};
        updatedTeamMembers[playerId].attending = !updatedTeamMembers[playerId].attending;
        this.setState({
            teamMembers:updatedTeamMembers,
        })
    }
    showPlayerSelectWindow(){
        this.setState({
            showAddPlayersWindow:true,
        })
    }

    settingSelectedPlayers(MatchPlayers){
        this.props.setSelectedPlayers(MatchPlayers);
        this.setState({
            showAddPlayersWindow:false,
        })
    }

    render() {
        let redirect = null
        // if (Object.keys(this.props.match).length === 0) {
        //     redirect = <Redirect to="/selectTeam" />
        // }
        let matchCenter = null;
        if (Object.keys(this.props.match).length !== 0) {

            const PlayerFrames =  this.state.teamMembers.map(playerInfo => {
                console.log(playerInfo);
            })
            matchCenter = (
                <div className={classes.MatchCenter}>
                <Button btnType="RedButton" clicked={() => this.showPlayerSelectWindow()}>Speler(s) toevoegen </Button>
                    <div className={classes.PlayersField}>
                        <div className={classes.PlayersFieldTitle}>
                            <div>
                                <h2>{this.props.team.teamName} - {this.props.match.gameData.opponent}</h2>
                            </div>
                        </div>
                        <div className={classes.PlayersFieldNames}>
                        
                            <MatchPlayerFrame playerName="Pieter"/>

                        </div>
                    </div>
                </div>
            )
        }

            let MatchPlayers = {};
            for(let key in this.state.teamMembers){
                if(this.state.teamMembers[key].attending){
                    MatchPlayers = {
                        ...MatchPlayers,
                        [key]: this.state.teamMembers[key],
                    }
                }
            }

        return (
            <div>
                {redirect}
                <AddPlayerstoMatch 
                team={this.props.team} 
                playerDetails={this.state.teamMembers} 
                PlayerButtonClicked={(playerId) => this.playerButtonClicked(playerId)} 
                addPlayers={() => this.settingSelectedPlayers(MatchPlayers)}
                visible={this.state.showAddPlayersWindow}
                />
                {matchCenter}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        match: state.match.selectedMatch,
        team: state.team.selectedTeam,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setSelectedPlayers: (teamMembersMatch) => dispatch(actions.setPlayersMatch(teamMembersMatch))
        // showPlayerSelectWindow = () => dispatch(actions.)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(matchCenter);