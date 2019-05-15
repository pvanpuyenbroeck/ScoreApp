import React, {Component} from 'react';
import classes from './SeasonSelection.css';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';


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

    seasonChanged = event => {
        const selectedSeason = event.target.value;
        this.props.setSeasonState(selectedSeason);
        this.props.selectedTeam(this.props.teamId, selectedSeason);
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
        teamId: state.team.selectedTeam.teamId,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        setSeasonState: (season) => dispatch(actions.setSeason(season)),
        selectedTeam: (teamId, season) => dispatch(actions.getTeam(teamId, season)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeasonSelection);
