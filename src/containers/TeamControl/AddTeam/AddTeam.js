import React, { Component } from 'react';
import axios from '../../../axios-scoreapp';
import TeamForm from '../../../components/Team/TeamForm/TeamForm';

class AddTeam extends Component {


    onSubmitHandler = (event) => {
        console.log(this.state.teamToAdd);
        axios.post('/Teams.json', this.state.teamToAdd)
            .then(res => {
                this.setState({
                    loading: false,
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
        return (
            <TeamForm
                addTeam={this.onSubmitHandler}
                change={this.inputChangeHandler}
            />
        )
    }

}

export default AddTeam;
