import React, { Component } from 'react';
import classes from './PlayerButton.css';
import profilePic from '../../../assets/Images/profilePic.jpg';

class playerButton extends Component {

    onClickHandler() {
        if (this.props.playerid) {
            this.props.clicked(this.props.playerid)
        }

    }

    render() {
        return (
            <div className={classes.PlayerButton} onClick={this.onClickHandler.bind(this)}>
                <div className={classes.Image}>
                    <img src={profilePic} alt="Profilepic"></img>
                </div>
                <div className={classes.Name}>
                    {this.props.name}
                </div>
                <div className={classes.PlayerNumber}>
                    <h1>{this.props.number}</h1>
                </div>
            </div>
        )
    }

}

export default playerButton;