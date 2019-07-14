import React from 'react';
import classes from './landingpage.css';
import MatchButton from '../../Team/SelectedMatchButton/SelectedMatchButton';


export const landingpage = props => {

    return(
        <div className={classes.LandingPage}>
            <h1>Welkom {props.user.displayName}</h1>
            <MatchButton />
        </div>
    )
}

export default landingpage;