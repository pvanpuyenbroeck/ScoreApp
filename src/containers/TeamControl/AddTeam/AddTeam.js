import React, { Component } from 'react';
import axios from '../../../axios-scoreapp';
import TeamForm from '../../../components/Team/TeamForm/TeamForm';
import { Redirect } from 'react-router-dom';

class AddTeam extends Component {
    state = {
        teamToAdd: {
            teamId:'',
            teamName: '',
            season: '',
        },
        submitted: false,
    }
    componentDidMount() {
        if (this.state.teamToAdd !== null) {

        }
    }
    onSubmitHandler = (event) => {
        console.log(this.state.teamToAdd);
        axios.post('/Teams.json', this.state.teamToAdd)
            .then(res => {
                this.setState({
                    loading: false,
                    submitted: true,
                })
            });
        event.preventDefault();
    }

    inputChangeHandler = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        const teamToAdd = this.state.teamToAdd;
        teamToAdd.teamName = name === 'teamName' ? value : this.state.teamToAdd.teamName;
        teamToAdd.season = name === 'season' ? value : this.state.teamToAdd.season;
        this.setState({
            teamToAdd: teamToAdd,
        })
    }
    render() {
        let formOrRedirect = null;
        if (this.state.submitted) {
            formOrRedirect = <Redirect to="/selectedTeam" />
        } else {
            formOrRedirect = (
                <TeamForm
                    addTeam={this.onSubmitHandler}
                    change={this.inputChangeHandler}
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

export default AddTeam;
