import React from 'react';
import classes from './Breadcrumb.css';
import { NavLink } from 'react-router-dom';

const breadcrumb = (props) => {
    return (
        <li>
            <NavLink to={props.location}>{props.children}</NavLink>
            {typeof props.dropdown !== 'undefined' && 
            <ul>
            {props.dropdown.map(item => {
                return(<li><div onClick={() => props.navClicked(item.id)}>{item.text}</div></li>)
            })}
            </ul>
            }
        </li>
    )
}

export default breadcrumb;