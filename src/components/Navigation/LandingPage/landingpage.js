import React, { Component } from 'react';
import classes from './landingpage.css';
import MatchButton from '../../Team/SelectedMatchButton/SelectedMatchButton';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { countDownClock, sortOnDate } from '../../../store/utility';
import MatchDetails from '../../Games/MatchDetails/MatchDetails';
import Match from '../../Games/Match/Match';


class landingpage extends Component {
    state = {

    }

    componentDidMount(){
        this.props.selectedTeam(this.props.team.teamId, this.props.selectedSeason,this.props.user.uid);
    }

    matchSelected = (match) => {
        this.props.changeLocation(4);
        this.props.matchSelected(match);
    }

    getNextMatch() {
        if (typeof this.props.team.Seasons !== 'undefined') {
            let allteamMatches = { ...this.props.team.Seasons[this.props.selectedSeason].Matches };

            const allMatchIds = Object.keys(allteamMatches);

            allMatchIds.map(key => {
                allteamMatches[key] = {
                    ...allteamMatches[key],
                    matchId: [key]
                }
            })

            let updatedMatches = Object.values(allteamMatches)

            const allComingMatches = updatedMatches.filter(match => {
                let lastMatch = countDownClock(match.gameData.date);
                return (lastMatch.weekDif !== 0 || lastMatch.dayDif !== 0 || lastMatch.minutesDif !== 0 || lastMatch.secondsDif !== 0 || lastMatch.hourDif !== 0)
            })

            const sortedMatches = sortOnDate(allComingMatches);

            return (
                <div className={classes.MatchDetails}>
                    {typeof sortedMatches[0] != 'undefined' ?
                        <MatchDetails
                            closeContainer={this.props.closeModal}
                            matches={sortedMatches[0]}
                            width={"100%"}
                            title={"Volgende match van " + this.props.team.teamName + ":"}
                            hideRemoveButton={true}
                        /> : null
                    }

                    <Match
                    match={sortedMatches[0]}
                    history={this.props.history}
                    matchButtonClicked={(match) => this.matchSelected(match)}
                    team={this.props.team}
                    admin={this.props.isAdmin}
                    />
                </div>
            )
        }
    }
    // const getNextMatch = (props.)
    render() {
        return (<div className={classes.LandingPage}>
            <div className={classes.Titel}><h1>Welkom {this.props.user.displayName}</h1></div>
            {this.getNextMatch()}
        </div>)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // getTeam: (team) => dispatch(actions.getTeam(team)),
        updatePlayerAdmins: (teamId, updatedAdmins) => dispatch(actions.updatePlayerAdmins(teamId, updatedAdmins)),
        closeModal: () => dispatch(actions.closeModal()),
        showModalHandler: () => dispatch(actions.showModal()),
        showFunctionMenu: () => dispatch(actions.showFunctionMenu()),
        selectedTeam: (teamId, season, uid) => dispatch(actions.getTeam(teamId, season, uid)),
        showComponent: (component) => dispatch(actions.showComponent(component)),
        matchSelected: (match) => dispatch(actions.setSelectedMatchInfo(match)),
        changeLocation: (location) => dispatch(actions.locationChange(location)),
        removePlayerFromTeam: (playerid, teamid, teamMembers, season, team) => dispatch(actions.removePlayerFromTeam(playerid, teamid, teamMembers, season, team)),
        removeMatchFromTeam: (updatedMatches, teamId, selectedSeason) => dispatch(actions.removeMatchFromTeam(updatedMatches, teamId, selectedSeason)),
    }
}

const mapStateToProps = state => {
    return {
        team: state.team.selectedTeam,
        showModal: state.navigation.showModal,
        userId: state.auth.userId,
        user: state.auth.user,
        selectedSeason: state.team.selectedSeason,
        adminLoggedIn: state.team.selectedTeam.isAdmin,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(landingpage);