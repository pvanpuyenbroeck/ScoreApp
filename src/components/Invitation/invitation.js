import React, { Component, useState, useEffect } from 'react';
import classes from './invitation.css';
import axios from 'axios';
import firebase from '../../firebase-scoreapp';

const invitation = (props) => {
    const [emailValue, setEmailValue] = useState('');
    const [message, setMessage] = useState({ message: "", visible: false });
    const [pendingInvitations, setPendingInvitations] = useState([]);

    const sendEmailHandler = (event) => {
        event.preventDefault();
        const emailKey = emailValue.replace(".", "");
        firebase.database().ref('/Invites').once('value', res => {
            const allInvites = res.val() !== null ? Object.keys(res.val()) : [];
            if (allInvites.length === 0 || !allInvites.includes(emailKey)) {
                axios.get('http://localhost:9000/mail', { params: { email: emailValue, team: props.team.teamName, teamId: props.team.teamId } })
                    .then(res => {
                        firebase.database().ref('/Invites').set({ [emailKey]: { teamId: props.team.teamId } }).then(res => {
                            setMessage({ message: "Uitnodiging is succesvol verzonden.", visible: true });
                        }
                        ).catch(error => {
                            setMessage({ message: 'Uitnodiging kon niet verzonden worden, probeer later opnieuw.', visible: true });
                        })
                    }).catch(error => {
                        setMessage({ message: 'Uitnodiging kon niet verzonden worden, controleer het emailadres en probleer opnieuw.', visible: true });
                    })
            }
            else {
                setMessage({ message: "Er is al een actieve uitndoging op dit mailadres.", visible: true });
            }
        });
    }

    useEffect(() => {
        firebase.database().ref('/Invites').once('value').then(res => {
            console.log(res.val());
        }).catch(
            err => {
                console.log(err);
            }
        )
    }, [])
    
    return (
        <React.Fragment>
            <form onSubmit={(event) => sendEmailHandler(event)}>
                <div className={classes.InvitationContainer}>
                    <div className={classes.Title}>Stuur uitnodiging</div>
                    <input className={classes.EmailField} type="text" value={emailValue} onChange={(value) => setEmailValue(value.target.value)}
                        placeholder={"Email adres"}
                    />
                    <div className={classes.Message} visible={message.visible}>{message.message}</div>
                    <button className={classes.SubmitButton} type="submit">Stuur uitnodiging</button>
                </div>
            </form>
            <div className={classes.PendingContainer}>
                <div className={classes.PendingTitle}>Pending invitations</div>
            </div>
        </React.Fragment>
    )
}
export default invitation;