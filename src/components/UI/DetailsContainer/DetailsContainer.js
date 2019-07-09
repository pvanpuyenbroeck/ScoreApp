import React from 'react';
import classes from './DetailsContainer.css';

const DetailsContainer = (props) => {

    const boxStyle = {
        color:props.color,
        width: "350px",
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