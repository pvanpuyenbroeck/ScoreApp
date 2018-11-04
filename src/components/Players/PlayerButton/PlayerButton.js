import React, { Component } from 'react';
import classes from './PlayerButton.css';
// import profilePic from '../../../assets/Images/profilePic.jpg';
import firebase from '../../../firebase-scoreapp';

class playerButton extends Component {
    state = {
        image: '',
    }
    onClickHandler() {
        console.log(this.props.playerid);
        if (this.props.playerid) {
            this.props.clicked(this.props.playerid)
        }

    }

    componentWillMount() {
        if (this.props.playerid) {
            const storage = firebase.storage().ref();
            const storageRef = storage.child(this.props.playerid);
            storageRef.getDownloadURL().then(url => {
                console.log(url);
                const image = '<img src={' + url + '} alt="Profilepic"></img>';
                this.setState({
                    image: image,
                })
            }).catch(err => {
                return err;
            });
        }
    }

    render() {
        // const pathReference = storageRef.ref('images/IMG_1099.JPG')
        const imageRef = this.state.image;
        let attachedClasses = [classes.PlayerButton];
        if (this.props.playerSelect) {
            if (this.props.attending) {
                attachedClasses.push(classes.Green);
            }
            if (!this.props.attending) {
                attachedClasses.push(classes.Red);
            }
        }
        return (
            <div className={attachedClasses.join(' ')} onClick={this.onClickHandler.bind(this)}>
                <div className={classes.Image}>
                    {imageRef ? { imageRef } : <img src={""} alt="Profilepic"></img>}
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