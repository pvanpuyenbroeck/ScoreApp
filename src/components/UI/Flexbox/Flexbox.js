import React from 'react';
import classes from './Flexbox.css';

const Flexbox = (props) => {

    return(
        <div className={classes.Flexbox}>
            <div>{props.children}</div>
        </div>
    )
}

export default Flexbox;