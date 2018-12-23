import React from 'react';
import classes from './Breadcrumb.css';

const breadcrumb = (props) => {

    return (
        <div>
            <div className={classes.Breadcrumb}>
                <a href="#">{props.children}</a>
            </div>
            <div className={classes.Arrow}>---></div>
        </div>
    )
}

export default breadcrumb;