import React from 'react';
import classes from './InvitationButton.css';

const invitationbutton = props => {

    return(
        <div className={classes.InvitationbuttonContainer}>
            <div>{props.children}</div>
        </div>
    )
}

export default invitationbutton;
