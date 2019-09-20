import React from 'react';
import classes from './Button.css';

const Button = (props) => (
    <button
    disabled={props.disabled}
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick={props.clicked}
    style={{...props.style}}
    >
    {props.children}
    </button>
)

export default Button;