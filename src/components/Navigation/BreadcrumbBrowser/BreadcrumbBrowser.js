import React from 'react';
import classes from './BreadcrumbBrowser.css';
import Breadcrumb from './Breadcrumb/Breadcrumb';

const breadcrumbBrowser = (props) => {

    return(
        <div className={classes.Breadcrumb}>
        <ul>
            <li><Breadcrumb>Home</Breadcrumb> </li>
            
            <li><Breadcrumb>Teams</Breadcrumb></li>
            {/* Teamname en matchname moeten opgehaald worden uit de props */}
            {/* <li>{props.team.teamName}</li>
            <li>{props.match.matchName}</li> */}
            <li><Breadcrumb>Teamname</Breadcrumb></li>
            <li><Breadcrumb>Matchname</Breadcrumb></li>
        </ul>
        </div>
    )
}

export default breadcrumbBrowser;