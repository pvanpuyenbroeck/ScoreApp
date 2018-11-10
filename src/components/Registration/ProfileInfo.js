import React from 'react';

export const ProfileInfo = (props) => {
    return(
        <div>
         <div>username:{props.user.displayName}</div>
         <div>profilePic:</div>
        </div>
    )
}

export default ProfileInfo;