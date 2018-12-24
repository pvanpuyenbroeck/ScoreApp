import React from 'react';
import classes from './Breadcrumb.css';
import { NavLink } from 'react-router-dom';

const breadcrumb = (props) => {
    let ShowHideArrow =  classes.Arrow;
    if(props.hideArrow){
        ShowHideArrow = classes.HideArrow;
    }
    return (
        <div className={classes.Breadcrumb}>
                <NavLink to={props.location}>{props.children}</NavLink>
        <div className={ShowHideArrow}></div>
        </div>
    )
}

export default breadcrumb;