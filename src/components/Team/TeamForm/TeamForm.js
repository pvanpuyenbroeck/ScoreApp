import React from 'react';
import classes from './TeamForm.css';

const teamForm = (props) => {
    return (
        <div className={classes.TeamForm}>
        <h1>Add new team:</h1>
            <form onSubmit={props.addTeam}>
                <label>Team name
                <input type="text" name="teamName" id="teamname" onChange={props.change}/>
                </label>
                <label>Season
                <input type="text" name="season" id="season" onChange={props.change}/>
                </label>
                <input type="submit" value="Add Team"/>
            </form>
        </div>
    )
}

export default teamForm;