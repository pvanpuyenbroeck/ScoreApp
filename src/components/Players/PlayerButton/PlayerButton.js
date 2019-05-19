import React, { Component } from 'react';
import classes from './PlayerButton.css';
// import profilePic from '../../../assets/Images/profilePic.jpg';
import firebase from '../../../firebase-scoreapp';
import Avatar from '@material-ui/core/Avatar';
import CloseButton from '../../../assets/Images/delete-30.png';

class playerButton extends Component {
    state = {
        image: null,
        closeButton: 'hidden',
    }
    // onClickHandler() {
    //     console.log(this.props.playerid);
    //     if (this.props.playerid) {
    //         this.props.clicked(this.props.playerid)
    //     }

    // }

    // const [showCloseButton, setCloseButton] = useState('hidden');

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

    showCloseButtonHandler = () => {
        this.setState({
            closeButton: 'visible',
        })
    }
    hideCloseButtonHandler = () => {
        this.setState({
            closeButton: 'hidden',
        })
    }

    getInitials() {
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

        let playerButtonFunctionsClasses = [classes.HoverOptions]
        playerButtonFunctionsClasses.push(this.state.closeButton === 'hidden' ? classes.HideCloseButton : classes.ShowCloseButton)

        let image = this.getInitials();

        const closeButtonStyle = {
            backgroundImage: `url(${CloseButton})`,
            // visibility: `${this.state.closeButton}`
        }

        // const adminStyle = {
        //     color: 'blue',
        // }


        // if(typeof this.props.user.photoURL !== "undefined"){
        //     image = <img src={this.props.user.avatar} alt="User"/>;
        // }
        // else{
        //     image = this.getInitials();
        // }
        return (
            <div className={classes.PlayerButtonContainer}>
                <div className={playerButtonFunctionsClasses.join(' ')}>
                    <div
                        style={closeButtonStyle}
                        className={classes.CloseButton}
                        onMouseEnter={this.props.admin ? this.showCloseButtonHandler : this.hideCloseButtonHandler}
                        onMouseLeave={this.hideCloseButtonHandler}
                        onClick={() => this.props.removePlayerClicked(this.props.user.userid)}
                    ></div>
                </div>
                <div
                    className={attachedClasses.join(' ')}
                    onClick={this.props.clicked}
                    onMouseEnter={this.props.admin ? this.showCloseButtonHandler : this.hideCloseButtonHandler}
                    onMouseLeave={this.hideCloseButtonHandler}
                >
                    <div className={classes.Image}>
                        {image}
                    </div>
                    <div className={classes.Name}>
                        <div>{this.props.name}</div>
                    </div>
                    <div className={classes.PlayerNumber}>
                        <h1>{this.props.number}</h1>
                    </div>
                </div>
            </div>
        )
    }

}

export default playerButton;