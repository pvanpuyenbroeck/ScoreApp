import React from 'react';
import classes from './DetailsContainer.css';

const DetailsContainer = (props) => {

    const boxStyle = {
        color:props.color,
        minHeight:'600px',
        width: "450px",
        backgroundColor:"white",
    }
    return(
        <div style={boxStyle} className={classes.DetailsContainer}>
            {props.children}
        <div className={classes.CloseButton} onClick={props.closeContainer}>Sluiten</div>
        </div>
    )
}

export default DetailsContainer;