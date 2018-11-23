import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './MatchCenter.css';
import MatchPlayerFrame from '../../../components/Match/MatchPlayerFrame/MatchPlayerFrame';
import * as actions from '../../../store/actions/index';
import AddPlayerstoMatch from '../../../components/Navigation/AddPlayersToMatch/AddPlayersToMatch';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router';


class matchCenter extends Component {
    state = {
        teamMembers: null,
        teamMembersMatch: null,
        showAddPlayersWindow: false,
        matchStats: {
            homeScore: 0,
            oponentScore: 0,
        }
    }

    // componentWillMount(){

    // }
    componentWillMount() {
        if (typeof this.props.team.teamId === 'undefined') {
            this.props.history.push('/selectTeam');
        }
        let updateFilteredPlayer = { ...this.props.team.filteredPlayers };
        const participants = { ...this.props.match.Participants };
        for (let key in this.props.team.filteredPlayers) {
            let attending = false;
            if (typeof participants[key] !== 'undefined') {
                attending = participants[key].attending;
                updateFilteredPlayer[key] = {
                    ...this.props.team.filteredPlayers[key],
                    goals: 0,
                    attending: attending,
                }
            }
        }
        console.log(this.props);
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

    goalHandler = (playerId, addOrDetract) => {
        let updatedTeamMembers = { ...this.state.teamMembers };
        let updatedMatchStats = { ...this.state.matchStats };

        if (addOrDetract === 'add') {
            updatedMatchStats.homeScore++;
            updatedTeamMembers[playerId].goals = updatedTeamMembers[playerId].goals + 1;
            this.setState({
                matchStats: updatedMatchStats,
            })
        } else {
            if (updatedTeamMembers[playerId].goals > 0) {
                updatedMatchStats.homeScore--;
                updatedTeamMembers[playerId].goals = updatedTeamMembers[playerId].goals - 1;
                this.setState({ matchStats: updatedMatchStats });
            }
        }
        this.props.setSelectedPlayers(updatedTeamMembers, this.props.match.teamId, playerId)
        this.setState({
            teamMembers: updatedTeamMembers,
        })
        this.props.setFalseSaveState();
    }

    oponentGoalHandler(addOrDetract) {
        let updatedMatchStats = { ...this.state.matchStats }
        if (addOrDetract === 'add') {
            updatedMatchStats.oponentScore++
        } else {
            if (updatedMatchStats.oponentScore > 0) {
                updatedMatchStats.oponentScore--
            }
        }
        this.props.oponentGoal(updatedMatchStats.oponentScore);
        this.setState({
            matchStats: updatedMatchStats,
        })
    }

    render() {
        let redirect = null
        let matchCenter = null;
        let PlayerFrames = <Spinner />;
        if (!this.props.loading) {
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
                            plusClicked={() => this.goalHandler(playerInfo.userid, 'add')}
                            minClicked={() => this.goalHandler(playerInfo.userid, 'min')}
                            goals={this.state.teamMembers[playerInfo.userid].goals}
                        />
                    )
                })
            }
            if (typeof this.props.team.teamId !== 'undefined') {
                let saveGame = [classes.MenuButtons];
                if(this.props.matchSaved){
                    saveGame.push(classes.Hide);
                }
                matchCenter = (
                    <div className={classes.MatchCenter}>
                        {/* <Button btnType="RedButton" clicked={() => this.showPlayerSelectWindow()}>Selecteer spelers</Button> */}
                        <div className={classes.PlayersField}>
                            <div className={classes.Menu}>
                                <div className={classes.MenuButtons} onClick={() => this.showPlayerSelectWindow()}>
                                    <div>Selecteer Speler</div>
                                </div>
                                
                                <div className={saveGame.join(' ')}>
                                    <div onClick={() => this.props.saveGameStats(this.props.team.teamId,this.props.match.matchId, this.props.match)}>Opslaan</div>
                                </div>
                                <div className={classes.MenuButtons}>
                                    <div></div>
                                    <div onClick={() => this.oponentGoalHandler("add")}><div className={classes.Center}>+</div></div>
                                    <div onClick={() => this.oponentGoalHandler("minus")}><div className={classes.Center}>-</div></div>
                                </div>
                            </div>
                            <div className={classes.PlayersFieldTitle}>
                                <div>
                                    <div className={classes.Score}>{this.state.matchStats.homeScore}</div>
                                    <div className={classes.MatchTitle}><h2>{this.props.team.teamName} - {this.props.match.gameData.opponent}</h2></div>
                                    <div className={classes.Score}>{this.state.matchStats.oponentScore}</div>
                                </div>
                            </div>
                            <div className={classes.PlayersFieldNames}>
                                {PlayerFrames}
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
        matchSaved:state.match.matchSaved,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setSelectedPlayers: (teamMembersMatch, teamId, matchId) => dispatch(actions.setMatchPlayers(teamMembersMatch, teamId, matchId)),
        // getSelectedPlayers: (teamId,matchId) => dispatch(actions.getMatchPlayers(teamId,matchId)), 
        getTeam: (teamId) => dispatch(actions.getTeam(teamId, null, null)),
        saveGameStats:(teamId, matchId,match) => dispatch(actions.saveMatch(teamId, matchId,match)),
        oponentGoal: (oponentGoals) => dispatch(actions.updateOponentGoals(oponentGoals)),
        setFalseSaveState: () => dispatch(actions.setFalseSaveState()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(matchCenter);