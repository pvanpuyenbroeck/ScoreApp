import React, { useState, useEffect } from 'react';
import classes from './acceptInvite.css';
import InvitationButton from '../InvitationButton/InvitationButton';
import firebase from '../../../firebase-scoreapp';
import NumberSelection from '../../UI/NumberSelection/NumberSelection';
import { getActiveInvites } from '../../../store/actions/invitation';

const acceptInvite = (props) => {
    const [activeInvites, setActiveInvites] = useState([]);
    const [selectedNumberComponent, setSelectedNumberComponent] = useState("");
    const [selectedNumber, setSelectedNumber] = useState("");
    const [selectedInvite, setSelectedInvite] = useState(null);


    // const filterTeamInvites = (invites) => {
    //     return invites.filter(invite => invite.email === props.user.email);
    // }

    useEffect(() => {
        getActiveInvites(props.user.email).then(res => setActiveInvites(res));
    }, [])

    useEffect(() => {
        if (selectedInvite !== null) {
            firebase.database().ref(`/Teams/${selectedInvite.teamId}`).once('value').then(res => {
                const team = res.val();
                const selectedNumberComponent =
                    (<div className={classes.NumberSelection}>
                        <NumberSelection
                            numbers={20}
                            numberClicked={(number) => setSelectedNumber(number)}
                            teamMembers={typeof team.Seasons[selectedInvite.season].TeamMembers !== 'undefined' ? team.Seasons[selectedInvite.season].TeamMembers : null}
                            numberSelected={selectedNumber}
                        />
                        <div className={classes.ButtonContainer}>
                            <button onClick={() => acceptHandler(true)} className={[classes.Button, classes.Button1].join(' ')}>Accepteer</button>
                            <button onClick={() => acceptHandler(false)} className={[classes.Button, classes.Button2].join(' ')}>Weiger</button>
                        </div>
                    </div>)

                setSelectedNumberComponent(selectedNumberComponent);
            }).catch(err => {
                console.log(err);
            })
        } else {
            setSelectedNumberComponent(null);
        }
    }, [selectedNumber, selectedInvite]);

    const acceptHandler = (accept) => {
        const emailKey = selectedInvite.email.replace(/\./g, "");
        if (accept) {
            const AddUserObj = {
                active: true,
                number: selectedNumber,
            }
            firebase.database().ref(`/Teams/${selectedInvite.teamId}/Seasons/${selectedInvite.season}/TeamMembers/${props.user.uid}`).set(AddUserObj)
                .then(res => {
                    firebase.database().ref(`/Invites/${emailKey}`).remove()
                        .then(res => {
                            props.actionDone("success", selectedInvite.teamId);
                            console.log("removed succesful")
                        })
                        .catch(err => console.log(err));
                }).catch(err => {
                    props.actionDone("fail", selectedInvite.teamId);
                    console.log(err);
                })
        }
        else {
            firebase.database().ref(`/Invites/${emailKey}`).remove()
                .then(res => {
                    props.actionDone("deny", "");
                    console.log("removed succesful")
                })
                .catch(err => console.log(err));
        }
        setActiveInvites([]);
        setSelectedInvite(null);
        setSelectedNumber("");
        setSelectedNumberComponent("");
    }

    return (
        <div className={classes.PendingContainer}>
            <div className={classes.PendingTitle}>Pending invitations</div>
            {typeof activeInvites !== 'undefined' ? activeInvites.map(invite => {
                return (
                    <InvitationButton accept={true} onAccept={() => setSelectedInvite(invite)}>{invite.teamName}</InvitationButton>
                )
            }) : null}
            {selectedNumberComponent}
        </div>
    )
}

export default acceptInvite;