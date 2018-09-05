import React from 'react';
import classes from './Header.css';
import { NavLink } from 'react-router-dom';

const header = (props) => (
    <div className={classes.Header}>
        <NavLink
            to="/selectTeam"
            activeClassName={classes.active}>
            <p>Select Team</p>
        </NavLink>
        <NavLink
            to="/addTeam"
            activeClassName={classes.active}>
            <p>Add Team</p>
        </NavLink>
    </div>
)

export default header;