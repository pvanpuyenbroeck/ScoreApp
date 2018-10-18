import React, { Component } from 'react';
import classes from './PlayerButton.css';
import profilePic from '../../../assets/Images/profilePic.jpg';

class playerButton extends Component {

    onClickHandler() {
        console.log(this.props.playerid);
        if (this.props.playerid) {
            this.props.clicked(this.props.playerid)
        }

    }

    render() {
        let attachedClasses = [classes.PlayerButton];
        if(this.props.playerSelect){
        if(this.props.attending){
            attachedClasses.push(classes.Green);
        }
        if(!this.props.attending){
            attachedClasses.push(classes.Red);
        }
    }
        return (
            <div className={attachedClasses.join(' ')} onClick={this.onClickHandler.bind(this)}>
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