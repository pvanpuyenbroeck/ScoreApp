import React from 'react';
import classes from './SeasonSelection.css';


const SeasonSelection = props => {
    let seasons = [];
    for(let key in props.seasons){
        seasons.push(props.seasons[key]);
    }
    const availableSeasons = seasons.map(season =>{
        return(
            <option value={season}>{season}</option>
        )
    })
    const seasonChanged = event => {
        props.seasonChanged(event.target.value);
    }
    return (
        <div className={classes.SeasonSelection}>
        <div className={classes.Title}>Seizoen</div>
            <select onChange={seasonChanged}>
                {availableSeasons}
            </select>
        </div>
    )
}

export default SeasonSelection;
