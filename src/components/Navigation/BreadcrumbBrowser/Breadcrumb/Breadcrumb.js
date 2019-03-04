import React from 'react';
import classes from './Breadcrumb.css';
import { NavLink } from 'react-router-dom';

const breadcrumb = (props) => {
    let breadCrumbClass = [classes.Breadcrumb];
    if(props.navActive){
        breadCrumbClass.push(classes.Active);
    }
    if(props.breadCrumbHide){
        breadCrumbClass.push(classes.Hide);
    }
    return (
      <NavLink 
        to={props.location} 
        className={breadCrumbClass.join(' ')}
        onClick={() => props.navClicked()}>
            <li>
            {props.children}
                {typeof props.dropdown !== 'undefined' &&
                    <ul>
                        {props.dropdown.map(item => {
                            return (<li key={item.id}><div className={classes.Breadcrumb} onClick={() => props.navClicked(item.id)}>{item.text}</div></li>)
                        })}
                    </ul>
                }
            </li>
        </NavLink>
    )
}

export default breadcrumb;