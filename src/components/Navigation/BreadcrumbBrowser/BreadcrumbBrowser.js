import React from 'react';
import classes from './BreadcrumbBrowser.css';
import Breadcrumb from './Breadcrumb/Breadcrumb';

const breadcrumbBrowser = (props) => {
    console.log(props.navigation);
    let listItems = [<li><Breadcrumb location={"/"}>Home</Breadcrumb> </li>, <li><div className={classes.Arrow}>---></div><Breadcrumb location={"/selectTeam"}>Teams</Breadcrumb></li>];
    for(let key in props.navigation.names){
        if(props.navigation.names[key] !== null){
            if(key === "teamName" && props.navigation.id.teamId !== null){
                listItems.push(<li><div className={classes.Arrow}>---></div><Breadcrumb location={"/Team/" + props.navigation.id.teamId}>{props.navigation.names[key]}</Breadcrumb></li>)
            }
            else if(key === "matchName" && props.navigation.id.matchId !== null){
                listItems.push(<li><div className={classes.Arrow}>---></div>
                    <Breadcrumb location={"/Team/" + props.navigation.id.teamId + "/Match/" + props.navigation.id.matchId}>{props.navigation.names[key]}</Breadcrumb>
                    </li>)
            }
            
        }
    }

    const liItems = listItems.map(item => {
        return item;
    })
    return(
        
        <div className={classes.Breadcrumb}>
        <ul>
            {listItems}
            {/* <li><Breadcrumb>Home</Breadcrumb> </li>
            
            {/* Teamname en matchname moeten opgehaald worden uit de props
            <li><Breadcrumb>{props.navigation.teamName}</Breadcrumb></li>
            <li><Breadcrumb>{props.navigation.matchName}</Breadcrumb></li>
            <li><Breadcrumb>Teamname</Breadcrumb></li>
            <li><Breadcrumb hideArrow={true}>Matchname</Breadcrumb></li> */}
        </ul>
        </div>
    )
}

export default breadcrumbBrowser;