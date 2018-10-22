import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './MatchCenter.css';
import MatchPlayerFrame from '../../../components/Match/MatchPlayerFrame/MatchPlayerFrame';
import Button from '../../../components/UI/Button/Button/Button';
import * as actions from '../../../store/actions/index';
import AddPlayerstoMatch from '../../../components/Navigation/AddPlayersToMatch/AddPlayersToMatch';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router';


class matchCenter extends Component {
    state = {
        teamMembers: null,
        teamMembersMatch: null,
        showAddPlayersWindow: false,
    }

    componentWillMount(){
        if(typeof this.props.team.teamId === 'undefined'){
            this.props.history.push('/selectTeam');
        }
    }
    componentDidMount() {
        let updateFilteredPlayer = { ...this.props.team.filteredPlayers };
        const participants = { ...this.props.match.Participants };
        for (let key in this.props.team.filteredPlayers) {
            let attending = false;
            if (typeof participants[key] !== 'undefined') {
                attending = participants[key].attending;
                updateFilteredPlayer[key] = {
                    ...this.props.team.filteredPlayers[key],
                    attending: attending,
                }
            }
        }
        console.log(this.props);
        // if(Object.keys(this.props.match.Participants).length === 0){
        //     // this.props.location.pathname.replace('/selectTeam');
        // }
        // this.props.getSelectedPlayers(null,this.props.match.matchId);
        this.setState({
            teamMembers: updateFilteredPlayer,
        })
    }

    playerButtonClicked(playerId) {
        console.log(playerId);
        let updatedTeamMembers = { ...this.state.teamMembers };
        updatedTeamMembers[playerId].attending = !updatedTeamMembers[playerId].attending;
        this.setState({
            teamMembers: updatedTeamMembers,
        })
    }
    showPlayerSelectWindow() {
        this.setState({
            showAddPlayersWindow: true,
        })
    }

    settingSelectedPlayers(MatchPlayers, teamId, matchId) {
        this.props.setSelectedPlayers(MatchPlayers, teamId, matchId);
        this.setState({
            showAddPlayersWindow: false,
        })
    }

    render() {
        let redirect = null
        let matchCenter = null;
        let PlayerFrames = <Spinner />;
        if(!this.props.loading){
            PlayerFrames = <div>Nog geen spelers geselecteerd</div>
        }
        
        let players = [];
        if (Object.keys(this.props.match).length === 0) {
            this.props.history.replace("/selectTeam");
            redirect = <Redirect to="/selectTeam" />
        }

        for (let key in this.props.match.Participants) {
            players.push(this.props.match.Participants[key]);
        }
        if (Object.keys(this.props.match).length !== 0) {
            if (players.length > 0) {
                PlayerFrames = players.map(playerInfo => {
                    console.log(playerInfo);
                    return (
                        <MatchPlayerFrame
                            username={playerInfo.username}
                        />
                    )
                })
            }
            if (typeof this.props.team.teamId !== 'undefined') {
                matchCenter = (
                    <div className={classes.MatchCenter}>
                        <Button btnType="RedButton" clicked={() => this.showPlayerSelectWindow()}>Selecteer spelers</Button>
                        <div className={classes.PlayersField}>
                            <div className={classes.PlayersFieldTitle}>
                                <div>
                                    <h2>{this.props.team.teamName} - {this.props.match.gameData.opponent}</h2>
                                </div>
                            </div>
                            <div className={classes.PlayersFieldNames}>
                                {PlayerFrames}
                                {/* <MatchPlayerFrame playerName="Pieter"/> */}

                            </div>
                        </div>
                    </div>
                )
            }
        }

        let MatchPlayers = {};
        for (let key in this.state.teamMembers) {
            if (this.state.teamMembers[key].attending) {
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
                    addPlayers={() => this.settingSelectedPlayers(MatchPlayers, this.props.team.teamId, this.props.match.matchId)}
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
        loading: state.match.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setSelectedPlayers: (teamMembersMatch, teamId, matchId) => dispatch(actions.setMatchPlayers(teamMembersMatch, teamId, matchId)),
        // getSelectedPlayers: (teamId,matchId) => dispatch(actions.getMatchPlayers(teamId,matchId)), 
        getTeam:(teamId) => dispatch(actions.getTeam(teamId,null,null))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(matchCenter);