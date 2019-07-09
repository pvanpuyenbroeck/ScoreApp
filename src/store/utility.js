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
    if(typeof admins !== 'undefined'){
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
    return `${day} ${months[month + 1]} ${year}  ${hour}u${minutes}m`
}

export const countDownClock = (datum) => {
    const date = new Date(datum);
    const now = Date.now;
    const yearDif = date.getFullYear() - now.getFullYear();
    const monthDif = date.getMonth() - now.getMonth();
    const dayDif = date.getDate() - now.getDate();
    const hourDif = date.getHours() - now.getHours();
    const minutesDif = date.getMinutes() - now.getMinutes();
    const secondsDif = date.getSeconds() - 60;

    return {yearDif,monthDif,dayDif,hourDif,minutesDif,secondsDif}
}
