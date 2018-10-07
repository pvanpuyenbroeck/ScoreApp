import React, {Component} from 'react';
import { slide as Menu } from 'react-burger-menu';
import NavPanelLink from '../NavPanel/NavPanelLink/NavPanelLink';
import classes from './SidePanel.css';
import Flexbox from '../../UI/Flexbox/Flexbox';
import AddPlayer from '../../../containers/TeamControl/AddPlayer/AddPlayer';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../../../store/actions/index';

class sidePanel extends Component {
    render(){
        let attachedClasses = [classes.SidePanel]
        if (this.props.showToggle) {
            attachedClasses.push(classes.SidePanelOpen)
        }
        console.log(this.props);
        const flexComponent = <AddPlayer/>;
    
        return (
            // Pass on our props
            <div>
                <div className={attachedClasses.join(' ')}>
                    <NavPanelLink>
                    <NavLink
                    onClick={() => this.props.closeSidePanel()}
                    className={classes.NavLink}
                    to="/selectTeam"
                    activeClassName={classes.active}>
                    Select Team
                </NavLink>
                    </NavPanelLink>
                        <NavPanelLink NavClicked={() =>  this.props.navItemClicked("AddTeam")}>Add Team</NavPanelLink>
                        <NavPanelLink NavClicked={() =>  this.props.navItemClicked("AddPlayer")}>Add New Player</NavPanelLink>
                </div>
                <Flexbox show={this.props.showFlexbox}>
                    <div>
                        {flexComponent}
                    </div>
                </Flexbox>
    
            </div>
        )
    }
    
}

const mapDispatchToProps = dispatch => {
    return {
        navItemClicked: (navItem) => dispatch(actions.navpanelSelection(navItem)),
        closeSidePanel: () => dispatch(actions.closeModal()),
    }
};

const mapStateToProps = state => {
    return {
      navItem: state.NavPanelLink,
      toggleSidePanel: state.ToggleSidePanel,
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(sidePanel);