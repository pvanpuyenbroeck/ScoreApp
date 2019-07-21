import React from 'react';
import classes from './ButtonStandard.css';

const ButtonStandard = (props) => {
    let buttonClass = [classes.Button];
    switch (props.color) {
        case "red":
            buttonClass.push(classes.Red);
            break;
        case "green":
            buttonClass.push(classes.Green);
            break;
        default:
            break;
    }


    return (
        <div className={buttonClass.join(" ")} onClick={props.buttonClicked} style={props.hide ? {display:"none" }: null}>
            <div>
                {props.children}
            </div>
        </div>
    )
}

export default ButtonStandard;