import React, {Component} from 'react';
import classes from './SeasonSelection.css';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import firebase from '../../../firebase-scoreapp';


class SeasonSelection extends Component {
    state={
        seasons: [],
    }

    componentDidMount(){
        let seasons = [];
        for(let key in this.props.seasons){
            seasons.push(this.props.seasons[key]);
        }
        this.setState({
            seasons:seasons,
        })
    }


    setSeason = (season) => new Promise(
        (resolve, reject) => {
            
        } 
    )

    seasonChanged = event => {
        const selectedSeason = event.target.value;
        if(typeof this.props.team.Seasons[selectedSeason] === 'undefined'){
            firebase.database().ref("/Teams/" + this.props.team.teamId + "/Seasons/" + selectedSeason).set({
                Matches:false,
                TeamMembers:false,
            }).then(response => {
                this.props.selectedTeam(this.props.team.teamId,this.props.auth.uid, selectedSeason);
                this.props.setSeasonState(selectedSeason);
            }).catch(err => {
                console.log(err);
            })
        }else{
            this.props.selectedTeam(this.props.team.teamId,this.props.auth.uid, selectedSeason);
            this.props.setSeasonState(selectedSeason);
        }
    }

    render(){
        const availableSeasons = this.state.seasons.map(season =>{
            return(
                <option value={season} key={season}>{season}</option>
            )
        })
        return (
            <div className={classes.SeasonSelection}>
            <div className={classes.Title}>Seizoen</div>
                <select onChange={this.seasonChanged} value={this.props.selectedSeason}>
                    {availableSeasons}
                </select>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return{
        seasons: state.team.seasons,
        selectedSeason: state.team.selectedSeason,
        team: state.team.selectedTeam,
        auth:state.auth.user,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        setSeasonState: (season) => dispatch(actions.setSeason(season)),
        selectedTeam: (teamId,uid, season) => dispatch(actions.getTeam(teamId, season, uid)),
        addSeasonToTeam:(season, teamId) => dispatch(actions.addSeasonToTeam(season, teamId))


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeasonSelection);
