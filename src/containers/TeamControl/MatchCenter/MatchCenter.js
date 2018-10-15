import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './MatchCenter.css';
import { Redirect } from 'react-router-dom';
import Button from '../../../components/UI/Button/Button/Button';
import * as actions from '../../../store/actions/index';
import AddPlayerstoMatch from '../../../components/Navigation/AddPlayersToMatch/AddPlayersToMatch';


class matchCenter extends Component {
    state = {
        teamMembers: null,
        teamMembersMatch: null,
    }

    componentDidMount(){
        this.setState({
            teamMembers: this.props.team.filteredPlayers,
        })
    }

    playerButtonClicked(playerId){
        console.log(playerId);
        let updatedTeamMembersMatch = {
            ...this.state.teamMembersMatch,
            [playerId]: playerId,
        };

        this.setState({
            teamMembersMatch: updatedTeamMembersMatch,
        })
    }

    render() {
        let redirect = null
        // if (Object.keys(this.props.match).length === 0) {
        //     redirect = <Redirect to="/selectTeam" />
        // }
        let matchCenter = null;
        if (Object.keys(this.props.match).length !== 0) {
            matchCenter = (
                <div className={classes.MatchCenter}>
                <Button btnType="RedButton" clicked={() => this.props.showPlayerSelectWindow()}>Speler(s) toevoegen </Button>
                    <div className={classes.PlayersField}>
                        <div className={classes.PlayersFieldTitle}>
                            <div>
                                <h2>{this.props.team.teamName} - {this.props.match.gameData.opponent}</h2>
                            </div>
                        </div>
                        <div className={classes.PlayersFieldNames}>
                            <div className={classes.PlayersFieldName}></div>
                            <div className={classes.PlayersFieldName}></div>
                            <div className={classes.PlayersFieldName}></div>

                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div>
                {redirect}
                <AddPlayerstoMatch 
                team={this.props.team} 
                playerDetails={this.state.teamMembers} 
                PlayerButtonClicked={(playerId) => this.playerButtonClicked(playerId)} 
                visible
                addPlayers={() => this.props.setSelectedPlayers(this.state.teamMembersMatch)}/>
                {matchCenter}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        match: state.match.selectedMatch,
        team: state.team.selectedTeam,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setSelectedPlayers: (teamMembersMatch) => dispatch(actions.setPlayersMatch(teamMembersMatch))
        // showPlayerSelectWindow = () => dispatch(actions.)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(matchCenter);