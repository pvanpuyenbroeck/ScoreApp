import React from 'react';
import classes from './MatchPlayerFrame.css';
import defaultProfilePic from '../../../assets/Images/myAvatar.png';
import plus from '../../../assets/Images/plus.png';
import minus from '../../../assets/Images/minus.png';
import moreButton from '../../../assets/Images/MoreButton.png';

const matchPlayerFrame = props => {
    const minusClasses = [classes.AddMinusSymbol, classes.Minus];
    const plusClasses = [classes.AddMinusSymbol, classes.Plus];
    return (
        <div className={classes.MatchPlayerFrame}>
            <div className={classes.PlayerInfo}>
                <div className={classes.Image}>
                    <img alt="profilePic" src={defaultProfilePic} />
                </div>
                <div className={classes.Username}>
                    <p>{props.username}</p>
                </div>
            </div>
            <div className={classes.Scoring}>
                <div className={minusClasses.join(' ')} onClick={props.minClicked}><img alt="minus" src={minus} /></div>
                <div className={classes.GoalsScored}>{props.goals}</div>
                <div className={plusClasses.join(' ')} onClick={props.plusClicked}><img alt="plus" src={plus} /></div>
            </div>
            <div className={classes.MoreButton}><img alt="more button" src={moreButton} /></div>
        </div>
    )
}

export default matchPlayerFrame;