import React from 'react';
import classes from './Flexbox.css';

const Flexbox = (props) => {
    let attachedClasses = [classes.Flexbox];
    if(!props.show){
        attachedClasses.push(classes.Hide)
    }
    return(
        <div className={attachedClasses.join(' ')}>
            <div>{props.children}</div>
        </div>
    )
}

export default Flexbox;