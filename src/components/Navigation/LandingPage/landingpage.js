import React from 'react';
import classes from './landingpage.css';


export const landingpage = props => {

    return(
        <div className={classes.LandingPage}>
            <h1>Welkom {props.user.displayName}</h1>
        </div>
    )
}

export default landingpage;