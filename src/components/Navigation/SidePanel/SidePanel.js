import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import NavPanelLink from '../NavPanel/NavPanelLink/NavPanelLink';
import classes from './SidePanel.css';
import Flexbox from '../../UI/Flexbox/Flexbox';
import AddPlayer from '../../../containers/TeamControl/AddPlayer/AddPlayer';

const sidePanel = (props) => {
    let attachedClasses = [classes.SidePanel]
    if (props.showToggle) {
        attachedClasses.push(classes.SidePanelOpen)
    }
    const flexComponent = <AddPlayer/>;

    return (
        // Pass on our props
        <div>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Bmitem} onClick={this.showAddPlayer}>Add Player</div>
                <NavPanelLink to="/" NavClicked={props.sidePanelToggle}>Home</NavPanelLink>
                <NavPanelLink to="/selectTeam" NavClicked={props.sidePanelToggle}>Teams</NavPanelLink>
                <NavPanelLink to="/AddTeam" NavClicked={props.sidePanelToggle}>Add Team</NavPanelLink>
                <NavPanelLink to="/AddNewPlayer" NavClicked={props.sidePanelToggle}>Add New Player</NavPanelLink>
            </div>
            <Flexbox show={true}>
                <div>
                    {flexComponent}
                </div>
            </Flexbox>

        </div>
    )
}

export default sidePanel;