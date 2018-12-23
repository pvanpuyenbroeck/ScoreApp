import React from 'react';
import classes from './Breadcrumb.css';

const breadcrumb = (props) => {
    let ShowHideArrow =  classes.Arrow;
    if(props.hideArrow){
        ShowHideArrow = classes.HideArrow;
    }
    return (
        <div>
            <div className={classes.Breadcrumb}>
                <a href="#">{props.children}</a>
            </div>
            <div className={ShowHideArrow}>---></div>
        </div>
    )
}

export default breadcrumb;