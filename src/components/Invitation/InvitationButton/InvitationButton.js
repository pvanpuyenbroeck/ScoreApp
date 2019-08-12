import React, { useState } from 'react';
import classes from './InvitationButton.css';

const invitationbutton = props => {

    const [buttonActive, setButtonActive] = useState(false);
    const style = {
        width: "100%",
        opacity: !buttonActive ? "0.5" : "1",
    }

    const buttonStyle = {
        backgroundColor: buttonActive ? "#2C8693" : "#F19722"
    }

    const buttonClickedHandler = () => {
        setButtonActive(!buttonActive);
        if (!buttonActive) {
            props.onAccept();
        }
    }

    if (props.accept) {
        return (<div className={classes.InvitationbuttonContainer} style={style} onClick={() => buttonClickedHandler()}>
            <div>{props.children}</div>
            <div className={classes.IndicationCircle} style={buttonStyle} />
        </div>
        )
    } else {
        return (
            <div className={classes.InvitationbuttonContainer}>
                <div>{props.children}</div>
            </div>
        )
    }
}

export default invitationbutton;
