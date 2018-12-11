import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './MatchCenter.css';
import MatchPlayerFrame from '../../../components/Match/MatchPlayerFrame/MatchPlayerFrame';
import * as actions from '../../../store/actions/index';
import AddPlayerstoMatch from '../../../components/Navigation/AddPlayersToMatch/AddPlayersToMatch';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router';
import Aux from '../../../hoc/_Aux/_Aux';
import Button from '../../../components/UI/Button/Button/Button';


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
    componentDidMount() {
        this.setInitialPlayers();
    }

    setInitialPlayers = () => {
        if (typeof this.props.team.teamId === 'undefined') {
            this.props.history.push('/selectTeam');
        }
        //get all the players from the team
        let updateFilteredPlayer = { ...this.props.team.filteredPlayers };
        //Get all known participants of the match
        const participants = { ...this.props.match.selectedMatch.Participants };

        //Go over all the team players and check there availability
        for (let key in this.props.team.filteredPlayers) {
            let attending = false;
            let goals = 0;
            if (typeof participants[key] !== 'undefined') {
                if (typeof participants[key].goals !== 'undefined') {
                    goals = participants[key].goals;
                }
                attending = participants[key].attending;
                updateFilteredPlayer[key] = {
                    ...this.props.team.filteredPlayers[key],
                    goals: goals,
                    attending: attending,
                }
            } else (updateFilteredPlayer[key] = {
                ...this.props.team.filteredPlayers[key],
                goals: goals,
                attending: attending,
            })
        }
        let homeGoals = 0;
        for (let player in updateFilteredPlayer) {
            if (updateFilteredPlayer[player].attending === true) {
                homeGoals = homeGoals + participants[player].goals;
            }
        }
        console.log(this.props);
        this.props.setSelectedPlayers(updateFilteredPlayer, this.props.team.teamId, this.props.match.selectedMatch.matchId)
        this.setState({
            teamMembers: updateFilteredPlayer,
            matchStats: {
                oponentScore: this.props.match.oponentGoals,
                homeScore: homeGoals,
            }
        })
    }

    playerButtonClicked(playerId) {
        console.log(playerId);
        let updatedTeamMembers = { ...this.state.teamMembers };
        updatedTeamMembers[playerId].attending = !updatedTeamMembers[playerId].attending;
        this.props.setSelectedPlayers(updatedTeamMembers, this.props.team.teamId, this.props.match.selectedMatch.matchId)
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
        this.setInitialPlayers();
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
        this.props.setSelectedPlayers(updatedTeamMembers, this.props.team.teamId, this.props.match.selectedMatch.matchId)
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

    backToTeamViewHandler() {
        this.props.history.push('/Team/' + this.props.team.teamId)
    }

    render() {
        let redirect = null
        let matchCenter = null;
        let PlayerFrames = <Spinner />;
        if (!this.props.loading) {
            PlayerFrames = <div>Nog geen spelers geselecteerd</div>
        }

        let players = [];
        if (Object.keys(this.props.match.selectedMatch).length === 0) {
            this.props.history.replace("/selectTeam");
            redirect = <Redirect to="/selectTeam" />
        }

        for (let key in this.state.teamMembers) {
            if (this.state.teamMembers[key].attending === true) {
                players.push(this.state.teamMembers[key]);
            }
        }
        if (Object.keys(this.props.match.selectedMatch).length !== 0) {
            if (players.length > 0) {
                PlayerFrames = players.map(playerInfo => {
                    console.log(playerInfo);
                    let playerName = playerInfo.username;
                    if(typeof playerName === 'undefined'){
                        playerName = playerInfo.voornaam + ' ' + playerInfo.familienaam;
                    }
                    return (
                        <MatchPlayerFrame
                            username={playerName}
                            plusClicked={() => this.goalHandler(playerInfo.userid, 'add')}
                            minClicked={() => this.goalHandler(playerInfo.userid, 'min')}
                            goals={this.props.match.selectedMatch.Participants[playerInfo.userid].goals}
                        />
                    )
                })
            }
            if (typeof this.props.team.teamId !== 'undefined') {
                let saveGame = [classes.MenuButtons];
                if (this.props.matchSaved) {
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
                                    <div onClick={() => this.props.saveGameStats(this.props.team.teamId, this.props.match.selectedMatch.matchId, this.props.match.selectedMatch)}>Opslaan</div>
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
                                    <div className={classes.MatchTitle}><h2>{this.props.team.teamName} - {this.props.match.selectedMatch.gameData.opponent}</h2></div>
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
            <Aux>
                {redirect}
                <AddPlayerstoMatch
                    team={this.props.team}
                    playerDetails={this.state.teamMembers}
                    PlayerButtonClicked={(playerId) => this.playerButtonClicked(playerId)}
                    addPlayers={() => this.settingSelectedPlayers(MatchPlayers, this.props.team.teamId, this.props.match.selectedMatch.matchId)}
                    visible={this.state.showAddPlayersWindow}
                />
                <Button btnType='Success' clicked={() => this.backToTeamViewHandler()}>Team view</Button>
                {matchCenter}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        match: state.match,
        team: state.team.selectedTeam,
        loading: state.match.loading,
        matchSaved: state.match.matchSaved,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setSelectedPlayers: (teamMembersMatch, teamId, matchId) => dispatch(actions.setMatchPlayers(teamMembersMatch, teamId, matchId)),
        // getSelectedPlayers: (teamId,matchId) => dispatch(actions.getMatchPlayers(teamId,matchId)), 
        getTeam: (teamId) => dispatch(actions.getTeam(teamId, null, null)),
        saveGameStats: (teamId, matchId, match) => dispatch(actions.saveMatch(teamId, matchId, match)),
        oponentGoal: (oponentGoals) => dispatch(actions.updateOponentGoals(oponentGoals)),
        setFalseSaveState: () => dispatch(actions.setFalseSaveState()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(matchCenter);