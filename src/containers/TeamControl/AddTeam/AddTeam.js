import React, { Component } from 'react';
import TeamForm from '../Team/TeamForm/TeamForm';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import classes from './AddTeam';

class AddTeam extends Component {
    state = {
        teamToAdd: {
            teamName: '',
            admin: '',
            admins: false,
            Seasons: {},
        },
        submitted: false,
    }
    componentDidMount() {
        if (this.state.teamToAdd !== null) {

        }
    }
    onSubmitHandler = (event) => {
        console.log(this.state.teamToAdd);

        this.props.addTeam(this.state.teamToAdd);
        // axios.post('/Teams.json', this.state.teamToAdd)
        //     .then(res => {
        //         this.setState({
        //             loading: false,
        //             submitted: true,
        //         })
        //     });
        event.preventDefault();
    }

    inputChangeHandler = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        const teamToAdd = this.state.teamToAdd;
        teamToAdd.teamName = name === '' ? value : this.state.teamToAdd.teamName;
        // teamToAdd.season = name === 'season' ? value : this.state.teamToAdd.season;
        teamToAdd.admin = this.props.adminUid;
        teamToAdd.Seasons[this.props.selectedSeason] = {
            Matches:false,
            TeamMembers:false, 
        };
        this.setState({
            teamToAdd: teamToAdd,

        })
    }
    render() {
        let formOrRedirect = null;
        if (this.props.submitted) {
            formOrRedirect = <Redirect to="/Team" />
        } else {
            formOrRedirect = (
                <TeamForm
                    className={classes.AddTeam}
                    addTeam={this.onSubmitHandler}
                    change={this.inputChangeHandler}
                    seasons={this.props.seasons}
                />
            )
        }
        return (
            <div>
                {formOrRedirect}
            </div>

        )
    }
}

const mapStateToProps = state => {
    return{
        loading: state.team.loading,
        submitted: state.team.submitted,
        adminUid: state.auth.user.uid,
        seasons: state.team.seasons,
        selectedSeason: state.team.selectedSeason,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        addTeam: (team) => dispatch(actions.addTeam(team)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddTeam);
