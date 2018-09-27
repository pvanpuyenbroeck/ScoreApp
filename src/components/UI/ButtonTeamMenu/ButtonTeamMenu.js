import React from 'react';
import {Link} from 'react-router-dom';
import classes from './ButtonTeamMenu.css';

const ButtonTeamMenu = (props) => (
    <div className={classes.ButtonTeamMenu}>
    <Link
    to ={{
    pathname:props.path,
    search:props.search,
    hash:props.hash,
    state:props.state,
    }}
    >
    {props.children}
    </Link>
    </div>
)

export default ButtonTeamMenu;