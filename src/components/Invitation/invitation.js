import React, { useState, useEffect } from 'react';
import classes from './invitation.css';
import axios from 'axios';
import firebase from '../../firebase-scoreapp';
import InvitationButton from './InvitationButton/InvitationButton';

const invitation = (props) => {
    const [emailValue, setEmailValue] = useState('');
    const [message, setMessage] = useState({ message: "", visible: false });
    const [pendingInvitations, setPendingInvitations] = useState([]);

    const filterTeamInvites = (invites) => {
        return invites.filter(invite => invite.teamId === props.team.selectedTeam.teamId);
    }

    const validateEmail = (email) => {
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email.match(mailFormat)) {
            return true
        }
        setMessage({ message: 'Het emailadres is niet correct, controleer het emailadres en probeer opnieuw', visible: true });
    }

    useEffect(() => {
        setEmailValue('');
        setMessage({ message: "", visible: false });
        setPendingInvitations([]);
    }, props.team.selectedTeam)

    const sendEmailHandler = (event) => {
        event.preventDefault();
        if (validateEmail(emailValue)) {
            const emailKey = emailValue.replace(/\./g, "");
            firebase.database().ref('/Invites').once('value', res => {
                const allInvites = res.val() !== null ? Object.keys(res.val()) : [];
                const params = {
                    email: emailValue,
                    teamName: props.team.selectedTeam.teamName,
                    teamId: props.team.selectedTeam.teamId,
                    season: props.team.selectedSeason
                }
                if (allInvites.length === 0 || !allInvites.includes(emailKey)) {
                    axios.get('http://localhost:8888/mail', {params:params})
                        .then(res => {
                            const result = res;
                            if (result.status === 200) {
                                firebase.database().ref(`/Invites/${emailKey}`).set({
                                    ...params
                                }).then(res => {
                                    const updatedInvitations = pendingInvitations.length !== 0 ? pendingInvitations : [];
                                    updatedInvitations.push(params);
                                    setPendingInvitations(filterTeamInvites(updatedInvitations));
                                    setMessage({ message: "Uitnodiging is succesvol verzonden.", visible: true });
                                }
                                ).catch(error => {
                                    setMessage({ message: 'Uitnodiging kon niet verzonden worden, probeer later opnieuw.', visible: true });
                                })
                            }else{
                                setMessage({ message: 'Uitnodiging kon niet verzonden worden, probeer later opnieuw.', visible: true });                                
                            }
                        }).catch(error => {
                            setMessage({ message: 'Uitnodiging kon niet verzonden worden, controleer het emailadres en probeer opnieuw.', visible: true });
                        })
                }
                else {
                    setMessage({ message: "Er is al een actieve uitndoging op dit mailadres.", visible: true });
                }
            });
        }
    }

    useEffect(() => {
        firebase.database().ref('/Invites').once('value').then(res => {
            let allInvites = [];
            const receivedInvites = res.val();
            for (let key in receivedInvites) {
                allInvites.push({
                    email: receivedInvites[key].email,
                    teamId: receivedInvites[key].teamId,
                    season: receivedInvites[key].season,
                    teamName: receivedInvites[key].teamName
                });
                setPendingInvitations(filterTeamInvites(allInvites));
            }
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
                    <button className={classes.SubmitButton} type="submit">Verstuur</button>
                </div>
            </form>
            <div className={classes.PendingContainer}>
            {pendingInvitations.length !== 0 ? <div className={classes.PendingTitle}>Uitstaande uitnodigingen</div> : null}
                {pendingInvitations.map(invite => {
                    return (
                        <InvitationButton>{invite.email}</InvitationButton>
                    )
                })}
            </div>
        </React.Fragment>
    )
}
export default invitation;