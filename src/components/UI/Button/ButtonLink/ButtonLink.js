import React from 'react';
import {Link} from 'react-router-dom';
import classes from './ButtonLink.css';

const Button = (props) => (
    <Link
    className={classes.Button}
    to ={{
    pathname:props.path,
    search:props.search,
    hash:props.hash,
    state:props.state,
    }}
    >
    {props.children}
    </Link>
)

export default Button;