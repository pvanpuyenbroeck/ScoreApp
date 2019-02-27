import React, { Component } from 'react';
import Players from '../../../components/Players/Players/Players';
import Games from '../../../components/Games/Games';
import Modal from '../../../components/UI/Modal/Modal';
import TeamFunctionMenu from '../../../components/Navigation/TeamFunctionMenu/TeamFunctionMenu';
import Toggle from '../../../components/UI/Toggle/Toggle';
import { connect } from 'react-redux';
import MatchCenter from '../MatchCenter/MatchCenter';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Aux from '../../../hoc/_Aux/_Aux';
import Confirm from '../../../components/Alerts/Confirm/confirm';

class Team extends Component {

    state = {
        team: {
            teamId: '',
            players: {},
            teamName: '',
            matches: [{
                matchId: '',
                season: '',
                date: '',
                opponent: '',
                homeGoals: 0,
                opponentGoals: 0,
                matchImage: '',
                participatingPlayers: [{
                    playerId: '',
                    goalsScored: 0,
                }]
            }],
            admin: '',
        },
        playerDetails: {},
        showModal: false,
        showToggle: false,
        showMatchControl: false,
        selectedMatch: {},
        teamMembers: {},
        showConfirm: false,
        playeridToRemove: "",
    }
    // pick(obj, keys) {
    //     return keys.map(k => k in obj ? { [k]: obj[k] } : {})
    //         .reduce((res, o) => Object.assign(res, o), {});
    // }
    componentDidMount() {
        const teamId = this.props.match.params.teamId;
        this.props.selectedTeam(teamId, this.props.token, this.props.userId);
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
        this.setState({ showConfirm: true, playeridToRemove:playerId });
    }

    confirmHandler(value) {
        if (value) {
            this.props.removePlayerFromTeam(this.state.playeridToRemove, this.props.team.teamId, this.props.team.TeamMembers)
            this.props.selectedTeam(this.props.team.teamId, this.props.token, this.props.userId);
        }
        this.setState({showConfirm:false, playeridToRemove:""});
    }

    render() {
        let teamControl = "";
        if (this.props.loading) {
            teamControl = <Spinner />;
        }
        else {
            if (this.state.showMatchControl) {
                teamControl = <MatchCenter />
            } else {
                teamControl = (
                    <Aux>
                        {/*}<Toggle toggleClicked={() => this.props.showFunctionMenu()} classtheme="TeamButton">MY TEAM</Toggle>*/}
                        <Confirm
                            message={"Weet je zeker dat je deze speler wil verwijderen?"}
                            label1={"YES"}
                            label2={"NO"}
                            label1Clicked={() => this.confirmHandler(true)}
                            label2Clicked={() => this.confirmHandler(false)}
                            showConfirm={this.state.showConfirm}
                        />
                        <TeamFunctionMenu
                            team={this.props.team}
                            showFunctionMenu={this.props.showfunctionMenu}
                            showComponent={(component) => this.props.showComponent(component)}
                        />
                        <Modal show={this.props.showModal} modalClosed={() => this.props.closeModal()} />
                        <Players
                            team={this.props.team}
                            playerDetails={this.props.team.filteredPlayers}
                            user={this.props.user}
                            removePlayerClicked={(uid) => this.removePlayerClickedHandler(uid)}
                        />
                        <Games
                            matches={this.props.team.Matches}
                            teamId={this.props.team.teamId}
                            matchClicked={(match) => this.matchSelected(match)}
                            team={this.props.team}
                        />
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
        getTeam: (team) => dispatch(actions.getTeam(team)),
        closeModal: () => dispatch(actions.closeModal()),
        showFunctionMenu: () => dispatch(actions.showFunctionMenu()),
        selectedTeam: (teamId, token, userId) => dispatch(actions.getTeam(teamId, token, userId)),
        showComponent: (component) => dispatch(actions.showComponent(component)),
        matchSelected: (match) => dispatch(actions.setSelectedMatchInfo(match)),
        changeLocation: (location) => dispatch(actions.locationChange(location)),
        removePlayerFromTeam: (playerid, teamid, teamMembers) => dispatch(actions.removePlayerFromTeam(playerid, teamid, teamMembers))
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
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Team);