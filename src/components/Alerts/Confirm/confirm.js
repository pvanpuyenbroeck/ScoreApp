import React from 'react';
import classes from './confirm.css';

export const confirm = props => {

    const style = {
        display: `${props.showConfirm ? 'inline-block' : 'none'}`
    }

    return (
        <div className={classes.ConfirmContainer} style={style}>
            <div className={classes.Message}>
                {props.message}
            </div>
            <div className={classes.ButtonContainer}>
                <div className={[classes.Button1, classes.Button].join(' ')}
                onClick={props.label1Clicked}>
                    <h3>{props.label1}</h3>
                </div>
                <div className={[classes.Button2, classes.Button].join(' ')}
                onClick={props.label2Clicked}>
                    <h3>{props.label2}</h3>
                </div>
            </div>
        </div>
    )
}

export default confirm;