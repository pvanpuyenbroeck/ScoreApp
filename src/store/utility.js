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
    if (admins.includes(uid)) {
        return true;
    } else {
        return false;
    }
}

export const checkIfOwner = (teamAdminId, uid) => {
    if (teamAdminId === uid) {
        return true;
    }
}
