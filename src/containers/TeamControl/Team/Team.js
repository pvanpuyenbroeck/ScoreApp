import React, { Component } from 'react';
import Players from '../../../components/Players/Players/Players';
import Games from '../../../components/Games/Games';
import Modal from '../../../components/UI/Modal/Modal';
import TeamFunctionMenu from '../../../components/Navigation/TeamFunctionMenu/TeamFunctionMenu';
import { connect } from 'react-redux';
import MatchCenter from '../MatchCenter/MatchCenter';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Aux from '../../../hoc/_Aux/_Aux';
import Confirm from '../../../components/Alerts/Confirm/confirm';
import SeasonSelection from '../../../components/Team/SeasonSelection/SeasonSelection';
import PlayerRanking from '../../../components/PlayerRanking/PlayerRanking';
import Tabs from '../../../components/UI/Tabs/Tabs';


class Team extends Component {

    state = {
        playerDetails: {},
        showModal: false,
        showToggle: false,
        showMatchControl: false,
        selectedMatch: {},
        teamMembers: {},
        showConfirm: false,
        playeridToRemove: "",
        selectedSeason: null,
        tabs: [
            { title: "Spelers", selected: false },
            { title: "Matchen", selected: true },
            { title: "Ranking", selected: false }]

    }
    // pick(obj, keys) {
    //     return keys.map(k => k in obj ? { [k]: obj[k] } : {})
    //         .reduce((res, o) => Object.assign(res, o), {});
    // }
    componentDidMount() {
        const teamId = this.props.match.params.teamId;
        this.props.selectedTeam(teamId, this.props.selectedSeason);
        this.props.changeLocation(3);
    }

    matchSelected = (match) => {
        this.props.changeLocation(4);
        this.props.matchSelected(match);
        // console.log(matchDetails);
        // this.props.history.push('/Team/' + matchDetails.gamedata.teamId + '/Match/' + matchDetails.matchId);
        // this.props.selectedTeam(matchDetails);
        //     this.setState({
        //         showMatchControl: true,
        //     })
    }

    showToggle() {
        this.setState({
            showToggle: !this.state.showToggle,
            showModal: !this.state.showModal,
        })
    }

    removePlayerClickedHandler(playerId) {
        // alert('Wil je deze speler verwijderen uit uw team?');    
        this.setState({ showConfirm: true, playeridToRemove: playerId });
    }

    confirmHandler(value) {
        if (value) {
            this.props.removePlayerFromTeam(this.state.playeridToRemove, this.props.team.teamId,
                this.props.team.Seasons[this.props.selectedSeason].TeamMembers, this.props.selectedSeason, this.props.team)
            this.props.selectedTeam(this.props.match.params.teamId, this.props.selectedSeason);
        }
        this.setState({ showConfirm: false, playeridToRemove: "" });
    }

    removeMatchHandler(matchId) {
        let updatedMatches = { ...this.props.team.Seasons[this.props.selectedSeason].Matches }
        delete updatedMatches[matchId];
        this.props.removeMatchFromTeam(updatedMatches, this.props.team.teamId, this.props.selectedSeason);
    }

    getTeamId() {
        if (typeof this.props.team.Seasons !== 'undefined') {
            return typeof this.props.team.Seasons[this.props.selectedSeason] !== 'undefined' ? this.props.team.Seasons[this.props.selectedSeason].teamId : null
        } else {
            return null;
        }
    }

    getMatches() {
        if (typeof this.props.team.Seasons !== 'undefined') {
            return typeof this.props.team.Seasons[this.props.selectedSeason] !== 'undefined' ? this.props.team.Seasons[this.props.selectedSeason].Matches : null
        } else {
            return null;
        }
    }

    getPlayerDetails() {
        if (typeof this.props.team.Seasons !== 'undefined') {
            return typeof this.props.team.Seasons[this.props.selectedSeason] !== 'undefined' ? this.props.team.Seasons[this.props.selectedSeason].filteredPlayers : null
        } else {
            return null;
        }
    }

    getTeam() {
        if (typeof this.props.team.Seasons !== 'undefined') {
            return typeof this.props.team.Seasons[this.props.selectedSeason] !== 'undefined' ? this.props.team.Seasons[this.props.selectedSeason] : null
        } else {
            return null;
        }
    }

    tabSelectedHandler(titel) {
        let updatedTabs = [];
        this.state.tabs.map(tab => {
            tab.selected = false;
            if (tab.title === titel) {
                tab.selected = true;
            }
            updatedTabs.push(tab);
        })
        this.setState({
            tabs: updatedTabs,
        })
    }

    GetSelectedTab = () => (
        this.state.tabs.map(tab => {
            const mainProps = this.props;
            if (tab.selected) {
                switch (tab.title) {
                    case "Spelers":
                        return <Players
                            team={this.getTeam()}
                            playerDetails={this.getPlayerDetails()}
                            user={this.props.user}
                            removePlayerClicked={(uid) => this.removePlayerClickedHandler(uid)}
                            admin={this.props.adminLoggedIn}
                        />;
                    case "Matchen":
                        return <Games
                            key={tab.title}
                            matches={this.getMatches()}
                            teamId={this.getTeamId()}
                            matchClicked={(match) => this.matchSelected(match)}
                            team={this.props.team}
                            removeMatchClicked={(matchId) => this.removeMatchHandler(matchId)}
                            history={this.props.history}
                            admin={this.props.adminLoggedIn}
                        />;
                    case "Ranking":
                        return <PlayerRanking
                            team={typeof mainProps.team.Seasons[mainProps.selectedSeason] !== "undefined" ? mainProps.team.Seasons[mainProps.selectedSeason] : false}
                        />;
                    default: return null;
                }
            }
        })
    )


    // seasonChangedHandler(season){
    //     this.setState({
    //         selectedSeason:season,
    //     })
    //     this.props.selectedTeam(this.props.team.teamId, season);
    //     this.props.setSeasonState(season);

    // }

    render() {
        let teamControl = "";
        let selectedTab = "";
        if (this.props.loading) {
            teamControl = <Spinner />;
        }
        else {
            if (this.state.showMatchControl) {
                teamControl = <MatchCenter />
            } else {
                selectedTab = this.GetSelectedTab();
                teamControl = (
                    <Aux>
                        {/*}<Toggle toggleClicked={() => this.props.showFunctionMenu()} classtheme="TeamButton">MY TEAM</Toggle>*/}
                        <SeasonSelection />
                        <Tabs
                            tabs={
                                this.state.tabs
                            }
                            tabClicked={(titel) => this.tabSelectedHandler(titel)}
                        />

                        <Confirm
                            message={"Weet je zeker dat je deze speler wilt verwijderen?"}
                            label1={"YES"}
                            label2={"NO"}
                            label1Clicked={() => this.confirmHandler(true)}
                            label2Clicked={() => this.confirmHandler(false)}
                            showConfirm={this.state.showConfirm}
                        />
                        {this.props.adminLoggedIn ? <TeamFunctionMenu
                            team={this.props.team}
                            showFunctionMenu={this.props.showfunctionMenu}
                            showComponent={(component) => this.props.showComponent(component)}
                        /> : null}

                        <Modal show={this.props.showModal} modalClosed={() => this.props.closeModal()} />
                        {selectedTab}
                    </Aux>
                )
            }
        }
        return (
            <Aux>
                {teamControl}
            </Aux>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // getTeam: (team) => dispatch(actions.getTeam(team)),
        closeModal: () => dispatch(actions.closeModal()),
        showFunctionMenu: () => dispatch(actions.showFunctionMenu()),
        selectedTeam: (teamId, season) => dispatch(actions.getTeam(teamId, season)),
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
        showfunctionMenu: state.navigation.showFunctionMenu,
        loading: state.team.loading,
        token: state.auth.token,
        userId: state.auth.userId,
        user: state.auth.user,
        selectedSeason: state.team.selectedSeason,
        adminLoggedIn: state.team.selectedTeam.admin === state.auth.user.uid,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Team);