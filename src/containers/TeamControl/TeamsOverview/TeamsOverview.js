import React, { Component } from 'react';
import classes from './TeamsOverview.css';
import SelectedTeamButton from '../../../components/Team/SelectTeamButton/SelectTeamButton';
import axios from '../../../axios-scoreapp';
import Spinner from '../../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
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

    componentDidMount() {
        axios.get('/Teams.json')
            .then(response => {
                const fetchedTeams = [];
                console.log(response.data);
                for (let key in response.data) {
                    fetchedTeams.push({
                        ...response.data[key],
                        id: key,
                    });
                }

                this.setState({
                    teams: fetchedTeams,
                })
            }).catch(error => {
                console.log(error)
            })
    }
    // teamSelectedHandler = (team) => {
    //     this.setState({
    //         selectedTeam: team,
    //     })
    // }

    render() {
        let teams = null;
        if (this.state.teams) {
            const teamArray = this.state.teams;
            teams = teamArray.map(team => {
                return (
                    <SelectedTeamButton
                        key={team.id}
                        teamName={team.teamName}
                        id={team.id}
                        buttonClicked={() => this.props.teamSelectedHandler(team)} 
                        />
                        
                );
            })
        }else{
            teams = <Spinner/>;
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
        // teamName: state.teamName
    };
};

const mapDispatchToProps = dispatch => {
    return {
        teamSelectedHandler: (team) => dispatch(actions.setSelectedTeam(team)),
    }
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(TeamsOverview));