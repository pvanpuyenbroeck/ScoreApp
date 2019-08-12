import React, { useState, useEffect } from 'react';
import classes from './acceptInvite.css';
import InvitationButton from '../InvitationButton/InvitationButton';
import firebase from '../../../firebase-scoreapp';
import NumberSelection from '../../UI/NumberSelection/NumberSelection';
import Modal from '../../UI/Modal/Modal';

const acceptInvite = (props) => {
    const [activeInvites, setActiveInvites] = useState([]);
    const [selectedNumberComponent, setSelectedNumberComponent] = useState("");
    const [selectedNumber, setSelectedNumber] = useState("");
    const [selectedInvite, setSelectedInvite] = useState(null);


    const filterTeamInvites = (invites) => {
        return invites.filter(invite => invite.email === props.user.email);
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
                setActiveInvites(filterTeamInvites(allInvites));
            }
        }).catch(
            err => {
                console.log(err);
            }
        )
    }, [])

    useEffect(() => {
        if (selectedInvite !== null) {
            firebase.database().ref(`/Teams/${selectedInvite.teamId}`).once('value').then(res => {
                const team = res.val();
                const selectedNumberComponent =
                    (<div>
                            <NumberSelection
                                numbers={20}
                                numberClicked={(number) => setSelectedNumber(number)}
                                teamMembers={typeof team.Seasons[selectedInvite.season].TeamMembers !== 'undefined' ? team.Seasons[selectedInvite.season].TeamMembers : null}
                                numberSelected={selectedNumber}
                            />
                            <button onClick={() => acceptHandler()}>Accepteer</button>
                        </div>)

                setSelectedNumberComponent(selectedNumberComponent);
            }).catch(err => {
                console.log(err);
            })
        }
    }, [selectedNumber, selectedInvite]);

    const acceptHandler = () => {
        const emailKey = selectedInvite.email.replace(/\./g, "");
        const AddUserObj = {
            active:true,
            number: selectedNumber,
        }
        firebase.database().ref(`/Teams/${selectedInvite.teamId}/Seasons/${selectedInvite.season}/TeamMembers/${props.user.uid}`).set(AddUserObj)
        .then(res => {
            setActiveInvites([]);
            setSelectedInvite(null);
            setSelectedNumber("");
            setSelectedNumberComponent("");
            firebase.database().ref(`/Invites/${emailKey}`).remove()
            .then(res => {
                console.log("removed succesful")
            })
            .catch(err => console.log(err));
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className={classes.PendingContainer}>
            <div className={classes.PendingTitle}>Pending invitations</div>
            {activeInvites.map(invite => {
                return (
                    <InvitationButton accept={true} onAccept={() => setSelectedInvite(invite)}>{invite.teamName}</InvitationButton>
                )
            })}
            {selectedNumberComponent}
        </div>
    )
}

export default acceptInvite;