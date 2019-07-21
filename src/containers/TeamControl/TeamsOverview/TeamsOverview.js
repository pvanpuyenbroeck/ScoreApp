import React, { Component } from 'react';
import classes from './TeamsOverview.css';
import SelectedTeamButton from '../../../components/Team/SelectTeamButton/SelectTeamButton';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

class TeamsOverview extends Component {
    state = {
        teams: '',
        teamToAdd: {
            teamName: '',
            season: '',
        },
        loading: true,
        uid: null,

    }

    componentWillMount() {
        // if (this.props.isAuthenticated) {
            
        // }
    }

    componentDidMount() {
        this.props.getAllTeams(this.props.userId);
        this.props.changeLocation();
    }

    render() {
        let participantTeams = <Spinner />;
        let managedteams = <Spinner />;
        if (!this.props.loading) {
            const teamArray = this.props.teams;
            if (teamArray.length > 0) {
                managedteams = teamArray.map(team => {
                    console.log(this.props);
                    if (team.admin === this.props.userId) {
                        return (
                            <SelectedTeamButton
                                key={team.id}
                                teamName={team.teamName}
                                id={team.id}
                                buttonClicked={() => this.props.teamSelectedHandler(team.id, this.props.season, this.props.userId)}
                            />
                        );
                    } else {
                        return null;
                    }
                })
                participantTeams = teamArray.map(team => {
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
                    return null;
                })
            }
        }

        return (
            <div className={classes.TeamsOverview}>
                <div className={classes.Teams}>
                    <h1>Managed teams:</h1>
                    {managedteams}
                </div>
                <div className={classes.Teams}>
                    <h1>Team:</h1>
                    {participantTeams}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        team: state.team.selectedTeam,
        token: state.auth.token,
        userId: state.auth.user.uid,
        teams: state.team.teams,
        loading: state.team.loading,
        isAuthenticated: state.auth.user.uid != null,
        season: state.team.selectedSeason,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        teamSelectedHandler: (teamId, season, uid) => dispatch(actions.getTeam(teamId, season, uid)),
        getAllTeams: (userId) => dispatch(actions.getAllTeams(userId)),
        changeLocation: () => dispatch(actions.locationChange(2)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamsOverview);