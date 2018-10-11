import React from 'react';
import {Link} from 'react-router-dom';
import classes from './Button.css';

const Button = (props) => (
    <button
    disabled={props.disabled}
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick={props.clicked}>
    {props.children}
    </button>
)

export default Button;