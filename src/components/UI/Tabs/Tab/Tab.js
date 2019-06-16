import React from 'react'
import classes from './Tab.css';

const tab = (props) => {
    let tabClasses = [classes.Tab];

    if(props.selected){
        tabClasses.push(classes.Selected);
    }
    return(
    <div className={tabClasses.join(" ")}
    onClick={props.tabClicked}>
        <div>
        {props.title}
        </div>
    </div>
    )
}

export default tab;