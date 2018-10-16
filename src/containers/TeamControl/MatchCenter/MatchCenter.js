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
        let updateFilteredPlayer = {...this.props.team.filteredPlayers}; 
            for(let key in this.props.team.filteredPlayers){
                updateFilteredPlayer[key] = {
                    ...this.props.team.filteredPlayers[key],
                    attending: false,
                } 
        }

        this.setState({

            teamMembers: updateFilteredPlayer,
        })
    }

    playerButtonClicked(playerId){
        console.log(playerId);
        let updatedTeamMembers = {...this.state.teamMembers};
        let available = false;
        updatedTeamMembers[playerId].attending = !updatedTeamMembers[playerId].attending;
        // if updatedTeamMembers[playerId].available === false  {
        //         updatedTeamMembers[playerId] = {
        //             ...this.state.teamMembers[playerId],
        //             attending: false,
        //         }
        //         available = true;
        //     }
        // }
        // if(!available){
        //     updatedTeamMembers[playerId] = {
        //         ...this.state.teamMembers[playerId],
        //         attending: true,
        //     }
        // }

        this.setState({
            teamMembers:updatedTeamMembers,
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

            let MatchPlayers = {};
            for(let key in this.state.teamMembers){
                if(this.state.teamMembers[key].attending){
                    MatchPlayers = {
                        ...MatchPlayers,
                        [key]: this.state.teamMembers[key],
                    }
                }
            }

        return (
            <div>
                {redirect}
                <AddPlayerstoMatch 
                team={this.props.team} 
                playerDetails={this.state.teamMembers} 
                PlayerButtonClicked={(playerId) => this.playerButtonClicked(playerId)} 
                visible
                addPlayers={() => this.props.setSelectedPlayers(MatchPlayers)}/>
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