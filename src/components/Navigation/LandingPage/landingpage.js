import React, { Component } from 'react';
import classes from './landingpage.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { countDownClock, sortOnDate } from '../../../store/utility';
import MatchDetails from '../../Games/MatchDetails/MatchDetails';
import Match from '../../Games/Match/Match';
import SelectedTeamButton from '../../../components/Team/SelectTeamButton/SelectTeamButton';
import TeamsOverview from '../../../containers/TeamControl/TeamsOverview/TeamsOverview';
import Tabs from '../../UI/Tabs/Tabs';


class landingpage extends Component {
    state = {
        tabs: [
            { title: "Volgende match", selected: true },
            { title: "Teams", selected: false }],
    }

    componentDidMount() {
        this.props.selectedTeam(this.props.team.teamId, this.props.selectedSeason, this.props.user.uid);
    }

    matchSelected = (match) => {
        this.props.changeLocation(4);
        this.props.matchSelected(match);
    }

    tabSelectedHandler(titel) {
        let updatedTabs = [];
        this.state.tabs.map(tab => {
            tab.selected = false;
            if (tab.title === titel) {
                tab.selected = true;
            }
            updatedTabs.push(tab);
            return null;
        })
        this.setState({
            tabs: updatedTabs,
        })
    }

    getNextMatch() {
        if (typeof this.props.team.Seasons !== 'undefined' && typeof this.props.team.Seasons[this.props.selectedSeason] !== 'undefined') {
            let allteamMatches = { ...this.props.team.Seasons[this.props.selectedSeason].Matches };

            const allMatchIds = Object.keys(allteamMatches);

            allMatchIds.map(key => {
                allteamMatches[key] = {
                    ...allteamMatches[key],
                    matchId: [key]
                }
                return null;
            })

            let updatedMatches = Object.values(allteamMatches)

            const allComingMatches = updatedMatches.filter(match => {
                let lastMatch = countDownClock(match.gameData.date);
                return (lastMatch.weekDif !== 0 || lastMatch.dayDif !== 0 || lastMatch.minutesDif !== 0 || lastMatch.secondsDif !== 0 || lastMatch.hourDif !== 0)
            })

            const sortedMatches = sortOnDate(allComingMatches);

            return (
                <div className={classes.MatchDetails}>
                    {typeof sortedMatches[0] !== 'undefined' ?
                        <MatchDetails
                            closeContainer={this.props.closeModal}
                            matches={sortedMatches[0]}
                            width={"100%"}
                            title={"Volgende match van " + this.props.team.teamName + ":"}
                            hideRemoveButton={true}
                        /> : <div>Er zijn geen toekomstige matchen.</div>
                    }

                    {typeof sortedMatches[0] !== 'undefined' ?
                        <Match
                            match={sortedMatches[0]}
                            history={this.props.history}
                            matchButtonClicked={(match) => this.matchSelected(match)}
                            team={this.props.team}
                            admin={this.props.isAdmin}
                        />
                        : null}
                </div>
            )
        }
    }
    myTeams() {
        const myTeamsArray = this.props.teams;
        if (myTeamsArray.length > 0) {
            return myTeamsArray.map(team => {
                for (let season in team.Seasons) {
                    for (let teamMemberId in team.Seasons[season].TeamMembers) {
                        if (teamMemberId === this.props.userId) {
                            return (
                                <SelectedTeamButton
                                    key={team.id}
                                    teamName={team.teamName}
                                    id={team.id}
                                    buttonClicked={() => this.props.teamSelectedHandler(team.id, this.props.season)}
                                />
                            )
                        }
                    }
                }
                if (team.admin === this.props.userId) {
                    return (
                        <SelectedTeamButton
                            key={team.id}
                            teamName={team.teamName}
                            id={team.id}
                            buttonClicked={() => this.props.teamSelectedHandler(team.id, this.props.season, this.props.userId)}
                        />
                    );
                }
            });
        } else {
            return null;
        }
    }
    activeTab() {
        return this.state.tabs.map(tab => {
            if (tab.selected) {
                switch (tab.title) {
                    case "Volgende match":
                        return this.getNextMatch();
                    case "Teams":
                        return <TeamsOverview />;
                    default: return null;
                }
            }
            return null;
        });
    }
    render() {
        let activeTab = null;
        activeTab = this.activeTab();
        return (<div className={classes.LandingPage}>
            <Tabs
                tabs={
                    this.state.tabs
                }
                tabClicked={(titel) => this.tabSelectedHandler(titel)}
            />
            {activeTab}
        </div>)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // getTeam: (team) => dispatch(actions.getTeam(team)),
        teamSelectedHandler: (teamId, season, uid) => dispatch(actions.getTeam(teamId, season, uid)),
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
        userId: state.auth.user.uid,
        user: state.auth.user,
        selectedSeason: state.team.selectedSeason,
        adminLoggedIn: state.team.selectedTeam.isAdmin,
        teams: state.team.teams,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(landingpage);