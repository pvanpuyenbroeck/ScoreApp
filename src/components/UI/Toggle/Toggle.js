import React from 'react';
import classes from './Toggle.css';

const Toggle = (props) => {
    let attachedClasses = [];
    if(props.classtheme === "TeamButton"){
        attachedClasses.push(classes.TeamToggle);
    }else{
        attachedClasses.push(classes.Toggle);
    }
    return(
        <div className={attachedClasses.join(' ')} onClick={props.toggleClicked}>
        <p>{props.children}</p>
    </div>
    )
}




export default Toggle;