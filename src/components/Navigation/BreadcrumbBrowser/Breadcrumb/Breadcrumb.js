import React from 'react';
import classes from './Breadcrumb.css';
import { NavLink } from 'react-router-dom';

const breadcrumb = (props) => {
    let ShowHideArrow =  classes.Arrow;
    if(props.hideArrow){
        ShowHideArrow = classes.HideArrow;
    }
    return (
        <li>
            <NavLink to={props.location}>{props.children}</NavLink>
            {typeof props.dropdown !== 'undefined' && 
            <ul>
            {props.dropdown.map(item => {
                return(<li>{item}</li>)
            })}
            </ul>
            }
        </li>
    )
}

export default breadcrumb;