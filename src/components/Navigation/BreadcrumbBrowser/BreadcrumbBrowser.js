import React from 'react';
import classes from './BreadcrumbBrowser.css';
import Breadcrumb from './Breadcrumb/Breadcrumb';

const breadcrumbBrowser = (props) => {
    console.log(props.navigation);
    let listItems = [<Breadcrumb location={"/"}>Home</Breadcrumb>, <Breadcrumb location={"/selectTeam"}>Teams</Breadcrumb>];
    for(let key in props.navigation.names){
        if(props.navigation.names[key] !== null){
            if(key === "teamName" && props.navigation.id.teamId !== null){
                const dropdown = ["Select team", "Add team"];
                listItems.push(
                    <Breadcrumb 
                    location={"/Team/" + props.navigation.id.teamId}
                    dropdown={dropdown}
                    >{props.navigation.names[key]}
                    </Breadcrumb>)
            }
            else if(key === "matchName" && props.navigation.id.matchId !== null){
                const dropdown = ["Speler toevoegen", "Match toevoegen"];
                listItems.push(
                    <Breadcrumb 
                    location={"/Team/" + props.navigation.id.teamId + "/Match/" + props.navigation.id.matchId}
                    dropdown={dropdown}>{props.navigation.names[key]}
                    </Breadcrumb>)
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