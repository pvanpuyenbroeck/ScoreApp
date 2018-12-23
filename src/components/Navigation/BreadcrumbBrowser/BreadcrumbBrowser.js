import React from 'react';
import classes from './BreadcrumbBrowser.css';
import Breadcrumb from './Breadcrumb/Breadcrumb';

const breadcrumbBrowser = (props) => {
    console.log(props.navigation);
    return(
        <div className={classes.Breadcrumb}>
        <ul>
            <li><Breadcrumb>Home</Breadcrumb> </li>
            
            <li><Breadcrumb>Teams</Breadcrumb></li>
            {/* Teamname en matchname moeten opgehaald worden uit de props */}
            <li>{props.teamName}</li>
            <li>{props.matchName}</li>
            {/* <li><Breadcrumb>Teamname</Breadcrumb></li>
            <li><Breadcrumb hideArrow={true}>Matchname</Breadcrumb></li> */}
        </ul>
        </div>
    )
}

export default breadcrumbBrowser;