export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkIfAdmin = (admins, loggedInUid, ownerId) => {
    if(loggedInUid === ownerId){
        return true;
    }
    
    if(typeof admins === 'undefined'){
        return false
    }

    if(admins.includes(loggedInUid)){
        return true;
    }else{
        return false;
    }
}