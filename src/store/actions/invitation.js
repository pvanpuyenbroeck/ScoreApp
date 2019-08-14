
import firebase from '../../firebase-scoreapp';

const filterTeamInvites = (invites, email) => {
    return invites.filter(invite => invite.email === email);
}

export const getActiveInvites = (userEmail) => {
    let allInvites = [];
    let filteredInvites = firebase.database().ref('/Invites').once('value');
    return filteredInvites.then(res => {
        const receivedInvites = res.val();
        for (let key in receivedInvites) {
            allInvites.push({
                email: receivedInvites[key].email,
                teamId: receivedInvites[key].teamId,
                season: receivedInvites[key].season,
                teamName: receivedInvites[key].teamName
            });
        }
        return filterTeamInvites(allInvites, userEmail);
    }).catch(
        err => {
            console.log(err);
            return [];
        }
    );
}