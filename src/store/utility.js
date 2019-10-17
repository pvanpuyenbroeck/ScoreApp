import firebase from '../firebase-scoreapp';
import { getTeam } from './actions';

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkIfAdmin = (admins, loggedInUid, ownerId) => {
    if (loggedInUid === ownerId) {
        return true;
    }

    if (admins === false) {
        return false;
    }

    if (typeof admins === 'undefined') {
        return false
    }

    if (admins.includes(loggedInUid)) {
        return true;
    } else {
        return false;
    }
}

export const checkIfUidIsAdmin = (admins, uid) => {
    if (typeof admins !== 'undefined' && admins !== false) {
        if (admins.includes(uid)) {
            return true;
        } else {
            return false;
        }
    }
    return false;
}

export const checkIfOwner = (teamAdminId, uid) => {
    if (teamAdminId === uid) {
        return true;
    }
}

export const dateFormatToString = (datum) => {
    let date = new Date(datum);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const months = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];
    return `${day} ${months[month]} ${year}  ${hour}u${minutes}m`
}

// const calculateWeeks = (date, now) => {
//     let diff = (date.getTime() - now.getTime()) / 1000;
//     diff /= (60 * 60 * 24 * 7);
//     const days = Math.floor(7 * diff%Math.floor(diff));
//     return Math.abs(Math.floor(diff));
// }

export const countDownClock = (datum) => {
    const date = new Date(datum);
    const now = new Date(Date.now());
    const result = { weekDif: 0, dayDif: 0, hourDif: 0, minutesDif: 0, secondsDif: 0, initiated: true }
    let diff = (date.getTime() - now.getTime()) / 1000;
    diff /= (60 * 60 * 24 * 7);
    if (diff <= 0) {
        return result
    }
    const dayDifAbso = 7 * (Math.floor(diff) === 0 ? diff : diff % (Math.floor(diff)));
    result.dayDif = Math.floor(dayDifAbso);
    result.weekDif = Math.abs(Math.floor(diff));
    const hourDifAbso = 24 * (Math.floor(dayDifAbso) === 0 ? dayDifAbso : dayDifAbso % result.dayDif);
    result.hourDif = Math.floor(hourDifAbso);
    const minutesDifAbso = 60 * (Math.floor(hourDifAbso) === 0 ? hourDifAbso : hourDifAbso % result.hourDif);
    result.minutesDif = Math.floor(minutesDifAbso);
    const secondsDifAbso = 60 * (result.minutesDif === 0 ? minutesDifAbso : minutesDifAbso % result.minutesDif);
    result.secondsDif = Math.floor(secondsDifAbso);

    return result
}

export const sortOnDate = (dateArray) => dateArray.sort((a, b) => {
    if (a.gameData.date < b.gameData.date) {
        return -1;
    }
    if (a.gameData.date > b.gameData.date) {
        return 1;
    }
    return 0;
})

export const getAllComingMatches = (matches) => {
    const comingMatches = matches.filter(match => {
        let lastMatch = countDownClock(match.gameData.date);
        return (lastMatch.weekDif !== 0 || lastMatch.dayDif !== 0 || lastMatch.minutesDif !== 0 || lastMatch.secondsDif !== 0 || lastMatch.hourDif !== 0)
    });
    return comingMatches;
}

export const checkIfDateIsInFuture = (date) => {
    const dateNow = new Date(Date.now());
    const dateMatch = new Date(date);
    if(dateNow < dateMatch){
        return true;
    }else{
        return false;
    }
}

export const getAllTeams = () => {
    return firebase.database().ref('/Teams').once('value')
        .then(response => {
            const teams = response.val();
            const fetchedTeams = [];
            for (let key in teams) {
                fetchedTeams.push({
                    ...teams[key],
                    id: key,
                });
            }
            return fetchedTeams;
        }).catch(error => {
            console.log(error);
        })
}

export const getFilteredTeams = (input) => {
    return firebase.database().ref('/Teams').once('value')
    .then(response => {
        const teams = response.val();
        const fetchedTeams = [];
        for (let key in teams) {
            fetchedTeams.push({
                ...teams[key],
                id: key,
            });
        }
        return fetchedTeams.filter(value => {
            value.teamName.star
        });
    }).catch(error => {
        console.log(error);
    })
}