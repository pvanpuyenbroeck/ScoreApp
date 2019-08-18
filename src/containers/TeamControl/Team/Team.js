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
import PlayerMenu from '../../../components/Players/PlayerMenu/PlayerMenu';
import MatchDetails from '../../../components/Games/MatchDetails/MatchDetails';
import DetailsContainer from '../../../components/UI/DetailsContainer/DetailsContainer';
import MatchPlayersOverview from '../../../components/Match/MatchPlayersOverview/MatchPlayersOverview';
import classes from './Team.css';


class Team extends Component {

    state = {
        playerDetails: {},
        showModal: false,
        showToggle: false,
        showMatchControl: false,
        selectedMatch: "",
        teamMembers: {},
        showConfirm: false,
        playeridToRemove: "",
        selectedSeason: null,
        tabs: [
            { title: "Spelers", selected: false },
            { title: "Matchen", selected: true },
            { title: "Ranking", selected: false }],
        showPlayerMenu: false,
        showMatchMenu: false,
        selectedPlayerId: "",
        selectedMatchId: "",
        matchDetailsToggle: false,

    }
    // pick(obj, keys) {
    //     return keys.map(k => k in obj ? { [k]: obj[k] } : {})
    //         .reduce((res, o) => Object.assign(res, o), {});
    // }
    componentDidMount() {
        this.props.selectedTeam(this.props.match.params.teamId, this.props.selectedSeason, this.props.user.uid);
        this.props.changeLocation(3);
        this.setState({
            playerDetails: this.getPlayerDetails(),
        })
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

    removeMatchClickedHandler = (matchId) => {
        //removing a match
        let updatedMatches = { ...this.props.team.Seasons[this.props.selectedSeason].Matches }
        delete updatedMatches[matchId];
        this.props.removeMatchFromTeam(updatedMatches, this.props.team.teamId, this.props.selectedSeason);
    }

    showMatchDetailsHandler(matchId) {
        let selectedMatch = {};
        if (this.state.selectedMatch === "") {
            selectedMatch = this.props.team.Seasons[this.props.selectedSeason].Matches[matchId];
        } else {
            selectedMatch = this.state.selectedMatch;
        }
        this.setState({
            selectedMatchId: matchId,
            showMatchMenu: true,
            selectedMatch: selectedMatch,
        })
        this.props.setMatchInfo(selectedMatch);
        this.props.showModalHandler();
    }

    showToggle() {
        this.setState({
            showToggle: !this.state.showToggle,
            showModal: !this.state.showModal,
        })
    }

    removePlayerClickedHandler(playerId) {
        // alert('Wil je deze speler verwijderen uit uw team?');    
        this.setState({ showConfirm: true, playeridToRemove: playerId, showPlayerMenu: false });
    }

    makePlayerAdminHandler(playerId) {
        let updatedAdmins = { ...this.props.team };
        if (!updatedAdmins.admins) {
            updatedAdmins.admins = [];
        }

        if (!updatedAdmins.admins.includes(playerId)) {
            updatedAdmins.admins.push(playerId);
        }
        this.props.updatePlayerAdmins(updatedAdmins.teamId, updatedAdmins);
    }

    deletePlayerAdminHandler(uid) {
        let updatedAdmins = { ...this.props.team };
        if (!updatedAdmins.admins) {
            return null;
        }
        let filteredAdmins = [];
        if (updatedAdmins.admins.includes(uid)) {
            filteredAdmins = updatedAdmins.admins.filter((updatedAdmins) => {
                return updatedAdmins !== uid;
            })
        }
        updatedAdmins.admins = filteredAdmins;
        this.props.updatePlayerAdmins(updatedAdmins.teamId, updatedAdmins);

    }

    playerClickedHandler(playerId) {
        this.props.showModalHandler();
        console.log(playerId);
        this.setState({
            showPlayerMenu: true,
            selectedPlayerId: playerId,
        })
    }

    closeAllContainers() {
        this.props.closeModal();
        this.setState({
            showPlayerMenu: false,
            showMatchMenu: false,
        })
    }

    confirmHandler(value) {
        if (value) {
            this.props.removePlayerFromTeam(this.state.playeridToRemove, this.props.team.teamId,
                this.props.team.Seasons[this.props.selectedSeason].TeamMembers, this.props.selectedSeason, this.props.team)
            this.props.selectedTeam(this.props.match.params.teamId, this.props.selectedSeason, this.props.user.uid);
        }
        this.props.closeModal();
        this.setState({ showConfirm: false, playeridToRemove: "" });
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
            return null;
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
                            key={tab.title}
                            team={this.getTeam()}
                            playerDetails={this.getPlayerDetails()}
                            user={this.props.user}
                            // removePlayerClicked={(uid) => this.removePlayerClickedHandler(uid)}
                            playerClicked={(uid) => this.playerClickedHandler(uid)}
                            admin={this.props.adminLoggedIn}
                        />;
                    case "Matchen":
                        return <Games
                            key={tab.title}
                            matches={this.getMatches()}
                            teamId={this.getTeamId()}
                            matchClicked={(match) => this.matchSelected(match)}
                            team={this.props.team}
                            showMatchDetailsClicked={(matchId) => this.showMatchDetailsHandler(matchId)}
                            history={this.props.history}
                            admin={this.props.adminLoggedIn}
                        />;
                    case "Ranking":
                        return <PlayerRanking
                            key={tab.title}
                            team={typeof mainProps.team.Seasons[mainProps.selectedSeason] !== "undefined" ? mainProps.team.Seasons[mainProps.selectedSeason] : false}
                        />;
                    default: return null;
                }
            }
            return null;
        })
    )

    joinClickedHandler(match, addOrRemove) {
        let updatedParticipants = { ...match.Participants };
        let updatedMatch = { ...this.props.selectedMatch };
        let updatedTeam = { ...this.props.team };
        const selectedSeason = { ...this.props.team.Seasons[this.props.selectedSeason] };
        if(addOrRemove === 'add'){
        updatedParticipants[this.props.user.uid] = {
            ...selectedSeason.filteredPlayers[this.props.user.uid],
            active: true,
            goals: 0,
            attending: true,
        }}
        else if(addOrRemove === 'remove'){
           delete updatedParticipants[this.props.user.uid];
        }
        updatedMatch.Participants = updatedParticipants;
        this.setState({
            selectedMatch: updatedMatch,
        })
        updatedTeam.Seasons[this.props.selectedSeason].Matches[this.state.selectedMatchId] = updatedMatch;

        this.props.updateSelectedTeam(updatedTeam);
        this.props.setSelectedPlayers(updatedParticipants, this.props.team.teamId, this.state.selectedMatchId, this.props.selectedSeason);
    }

    GetMatchDetailsMenu = () => {
        const match = typeof this.props.team.Seasons !== 'undefined' ? this.props.team.Seasons[this.props.selectedSeason].Matches[this.state.selectedMatchId] : null
        if (this.state.showMatchMenu) {
            if (typeof this.props.team.Seasons !== 'undefined') {
                return (
                    <DetailsContainer closeContainer={() => this.closeAllContainers()} >
                        <div className={classes.MatchNavButtonContainer}>
                            <div
                                onClick={() => this.setState({ matchDetailsToggle: false })}
                                className={[classes.Button, classes.ButtonMatch].join(' ')}
                                style={{opacity:this.state.matchDetailsToggle ? '0.5' : '1'}}
                                >Match</div>
                            <div
                                onClick={() => this.setState({ matchDetailsToggle: true })}
                                className={[classes.Button, classes.ButtonMembers].join(' ')}
                                style={{opacity:!this.state.matchDetailsToggle ? '0.5' : '1'}}                                
                                >Deelnemers</div>
                        </div>
                        {!this.state.matchDetailsToggle ? <MatchDetails
                            removeMatchClicked={() => this.removeMatchClickedHandler(this.state.selectedMatchId)}
                            isAdmin={this.props.adminLoggedIn}
                            matches={match}
                            width={"100%"}
                        // joinMatchClicked={() => this.joinClickedHandler()}
                        /> : <MatchPlayersOverview
                                user={this.props.user}
                                match={this.state.selectedMatch}
                                allTeamMember={this.props.team.Seasons[this.props.selectedSeason].TeamMembers}
                                joinClicked={() => this.joinClickedHandler(match, 'add')}
                                removeClicked={() => this.joinClickedHandler(match,'remove')}
                            />}
                    </DetailsContainer>
                )
            }
            else {
                return null;
            }
        }
        return null;
    }


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
        let playerMenu = null;
        if (this.state.showPlayerMenu) {
            playerMenu = <PlayerMenu
                player={this.props.team.Seasons[this.props.selectedSeason].filteredPlayers[this.state.selectedPlayerId]}
                adminLoggedIn={this.props.adminLoggedIn}
                deletePlayer={(uid) => this.removePlayerClickedHandler(uid)}
                makePlayerAdmin={(uid) => this.makePlayerAdminHandler(uid)}
                deletePlayerAdmin={(uid) => this.deletePlayerAdminHandler(uid)}
                admins={this.props.team.admins}
                adminUid={this.props.team.admin}
                closeContainer={() => this.closeAllContainers()}
            />
        }
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
                        {playerMenu}
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

                        <Modal show={this.props.showModal} modalClosed={() => this.closeAllContainers()} />
                        {selectedTab}
                    </Aux>
                )
            }
        }
        const MatchDetailsMenu = () => this.GetMatchDetailsMenu();
        return (
            <Aux>
                {teamControl}
                <MatchDetailsMenu />
            </Aux>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // getTeam: (team) => dispatch(actions.getTeam(team)),
        updateSelectedTeam: (updatedTeam) => dispatch(actions.updateSelectedTeam(updatedTeam)),
        setMatchInfo: (updatedMatch) => dispatch(actions.setMatchInfo(updatedMatch)),
        setSelectedPlayers: (teamMembersMatch, teamId, matchId, selectedSeason) => dispatch(actions.setMatchPlayers(teamMembersMatch, teamId, matchId, selectedSeason)),
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
        selectedMatch: state.match.selectedMatch,
        showModal: state.navigation.showModal,
        showfunctionMenu: state.navigation.showFunctionMenu,
        loading: state.team.loading,
        token: state.auth.token,
        userId: state.auth.userId,
        user: state.auth.user,
        selectedSeason: state.team.selectedSeason,
        adminLoggedIn: state.team.selectedTeam.isAdmin,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Team);