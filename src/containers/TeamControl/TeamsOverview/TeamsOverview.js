import React, { Component } from 'react';
import classes from './TeamsOverview.css';
import SelectedTeamButton from '../../../components/Team/SelectTeamButton/SelectTeamButton';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import teamIcon from '../../../assets/Images/team.png';

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
        let teams = <Spinner />;
        if (!this.props.loading) {
            console.log(this.props);
            const teamArray = this.props.teams;
            if(teamArray.length > 0){
                teams = teamArray.map(team => {
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
            }
        }
        return (
            <div className={classes.TeamsOverview}>
                <div className={classes.Teams}>
                    <h1>Teams:</h1>
                    {teams}
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        teamSelectedHandler: (teamId) => dispatch(actions.getTeam(teamId)),
        getAllTeams: (userId, token) => dispatch(actions.getAllTeams(userId, token)),
        changeLocation: () => dispatch(actions.locationChange(2)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamsOverview);