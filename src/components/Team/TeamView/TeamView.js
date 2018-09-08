import React from 'react';
import classes from './TeamView.css';

const TeamView = (props) => {
    const team = props.team;
    return (
        <div className={classes.TeamView}>
            <h1>{team.teamName}</h1>
            <h2>{team.admin}</h2>
        </div>
    )
}

export default TeamView;