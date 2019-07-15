import React, { Component } from 'react';
import classes from './landingpage.css';
import MatchButton from '../../Team/SelectedMatchButton/SelectedMatchButton';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';


class landingpage extends Component {
    state = {

    }
    // const getNextMatch = (props.)
    render() {
        return (<div className={classes.LandingPage}>
            <h1>Welkom {this.props.user.displayName}</h1>
            {/* <MatchButton
                match={this.props.game}
                matchButtonClicked={(match) => this.props.matchClicked(match)}
                team={this.props.team}
                showMatchDetailsClicked={(matchId) => this.props.showMatchDetailsClicked(game.matchId)}
                history={props.history}
                admin={props.admin}
            /> */}
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

export default connect(mapStateToProps,mapDispatchToProps)(landingpage);