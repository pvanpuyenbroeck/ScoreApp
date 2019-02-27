import React from 'react';
import classes from './confirm.css';

export const confirm = props => {

    return(
        <div className={classes.ConfirmContainer}>
            <div className={classes.Message}>
                {props.message}
            </div>
            <div className={[classes.Button1, classes.Button].join(' ')}>
            {props.label1}
            </div>
            <div className={[classes.Button2, classes.Button].join(' ')}>
            {props.label2}
            </div>
        </div>
    )
}

export default confirm;