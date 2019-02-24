import React, { Component } from 'react';
import classes from './PlayerButton.css';
// import profilePic from '../../../assets/Images/profilePic.jpg';
import firebase from '../../../firebase-scoreapp';
import Avatar from '@material-ui/core/Avatar';

class playerButton extends Component {
    state = {
        image: null,
    }
    // onClickHandler() {
    //     console.log(this.props.playerid);
    //     if (this.props.playerid) {
    //         this.props.clicked(this.props.playerid)
    //     }

    // }

    componentWillMount() {
        if (this.props.playerid) {
            const storage = firebase.storage().ref();
            const storageRef = storage.child(this.props.playerid);
            storageRef.getDownloadURL().then(url => {
                console.log(url);
                const image = <img src={url} alt="Profilepic"></img>;
                this.setState({
                    image: image,
                })
            }).catch(err => {
                return err;
            });
        }
    }

    getInitials(){
        let initials = this.props.name.match(/\b\w/g) || [];
        initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
        return <Avatar className={classes.Avatar}>{initials}</Avatar>;
    }

    render() {
        // const pathReference = storageRef.ref('images/IMG_1099.JPG')
        let attachedClasses = [classes.PlayerButton];
        if (this.props.playerSelect) {
            if (this.props.attending) {
                attachedClasses.push(classes.Green);
            }
            if (!this.props.attending) {
                attachedClasses.push(classes.Red);
            }
        }

        let image = <img src={this.props.user.photoURL} alt="User"/>;
        if(this.state.image){
            image = this.getInitials();
        }
        return (
            <div className={attachedClasses.join(' ')} onClick={this.props.clicked}>
                <div className={classes.Image}>
                    {image}
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