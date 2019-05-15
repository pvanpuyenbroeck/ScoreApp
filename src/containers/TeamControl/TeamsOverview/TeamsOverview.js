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

    }

    componentWillMount() {
        if (this.props.isAuthenticated) {
            this.props.getAllTeams(this.props.userId, this.props.token);
        }
    }

    componentDidMount(){
        this.props.changeLocation();
    }

    render() {
        let participantTeams = <Spinner/>;
        let managedteams = <Spinner />;
        if (!this.props.loading) {
            console.log(this.props);
            const teamArray = this.props.teams;
            if(teamArray.length > 0){
                managedteams = teamArray.map(team => {
                    if (team.admin === this.props.userId) {
                        return (
                            <SelectedTeamButton
                                key={team.id}
                                teamName={team.teamName}
                                id={team.id}
                            // buttonClicked={() => this.props.teamSelectedHandler(team.id)} 
                            />
                        );
                    } else {
                        return null;
                    }
                })
                participantTeams = teamArray.map(team => {
                    for(let season in team.Seasons){
                        for(let teamMemberId in team.Seasons[season].TeamMembers){
                            if(teamMemberId === this.props.userId){
                                return(
                                    <SelectedTeamButton
                                        key={team.id}
                                        teamName={team.teamName}
                                        id={team.id}
                                    />
                                )
                            }
                        }
                    }
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
        isAuthenticated: state.auth.user != null,
        season: state.team.selectedSeason,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        teamSelectedHandler: (teamId, season) => dispatch(actions.getTeam(teamId, season)),
        getAllTeams: (userId, token) => dispatch(actions.getAllTeams(userId, token)),
        changeLocation: () => dispatch(actions.locationChange(2)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamsOverview);