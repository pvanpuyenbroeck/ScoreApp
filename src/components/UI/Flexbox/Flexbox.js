import React from 'react';
import classes from './Flexbox.css';
import Modal from '../Modal/Modal';

const Flexbox = (props) => {
    let attachedClasses = [classes.Flexbox];
    if (!props.show) {
        attachedClasses.push(classes.Hide)
    }
    return (
        <React.Fragment>
            <div className={attachedClasses.join(' ')}>
                <div>{props.children}</div>
            </div>
        </React.Fragment>
    )
}

export default Flexbox;

// <Modal show={props.show}  modalClosed={props.modalClicked}/>