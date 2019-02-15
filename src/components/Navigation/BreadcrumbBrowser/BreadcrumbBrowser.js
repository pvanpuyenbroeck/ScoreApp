import React from 'react';
import classes from './BreadcrumbBrowser.css';
import Breadcrumb from './Breadcrumb/Breadcrumb';

const breadcrumbBrowser = (props) => {
    console.log(props.location);
    console.log(props.navigation);
    let listItems = [
        <Breadcrumb
            location={"/"}
            navClicked={() => props.navClicked({ navNumber: 1 })}
            navActive={props.breadcrumbLocation >= 1 ? true : false}
            breadCrumbHide={false}
            // breadcrumbLocation={props.breadcrumbLocation}
        >Home</Breadcrumb>,
        <Breadcrumb
            location={"/Team"}
            dropdown={[{ text: 'Add team', id: 'AddTeam' }]}
            navClicked={(navItem) => props.navClicked({ navNumber: 2 , navItem: navItem})}
            navActive={props.breadcrumbLocation >= 2 ? true : false} 
            breadCrumbHide={false}           
            // breadcrumbLocation={props.breadcrumbLocation}
        >Teams</Breadcrumb>];
    for (let key in props.navigation.names) {
        if (props.navigation.names[key] !== null) {
            if (key === "teamName" && props.navigation.id.teamId !== null) {
                const dropdown = [{ text: "Speler toevoegen", id: "SelectPlayer" }, { text: "Match toevoegen", id: "AddMatch" }];
                listItems.push(
                    <Breadcrumb
                        location={"/Team/" + props.navigation.id.teamId}
                        dropdown={dropdown}
                        navClicked={(navItem) => props.navClicked({ navNumber: 3, navItem: navItem })}
                        navActive={props.breadcrumbLocation >= 3 ? true : false}
                        breadCrumbHide={false}

                        // breadcrumbLocation={props.breadcrumbLocation}
                    >{props.navigation.names[key]}
                    </Breadcrumb>)
            }
            else if (key === "matchName" && props.navigation.id.matchId !== null) {
                listItems.push(
                    <Breadcrumb
                        location={"/Team/" + props.navigation.id.teamId + "/Match/" + props.navigation.id.matchId}
                        navClicked={(navItem) => props.navClicked({ navNumber: 4, navItem: navItem })}
                        navActive={props.breadcrumbLocation >= 4 ? true : false}
                        breadCrumbHide={props.breadcrumbLocation < 3 ? true : false}
                        // breadcrumbLocation={props.breadcrumbLocation}
                    >{props.navigation.names[key]}
                    </Breadcrumb>)
            }
        }
    }

    return (
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