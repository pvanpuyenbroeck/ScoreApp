import React from 'react';
import classes from './NumberSelection.css';

const numberSelection = (props) => {
    const numbers = [];
    for (let i = 1; i <= props.numbers; i++) {
        numbers.push(i.toString())
    }
    let numbersTaken = []
    for(let key in props.teamMembers){
        numbersTaken.push(props.teamMembers[key].active ? props.teamMembers[key].number : null);
    }

    const playerNumbers = numbers.map(number => {
        let noClick = false;
        const numberClasses = [classes.Number];
        if(numbersTaken.includes(number)){
            numberClasses.push(classes.Taken);
            noClick = true;
        }
        if(props.numberSelected === number){
            numberClasses.push(classes.Selected);
            noClick = true;
        }
        return (
            <div key={number} className={numberClasses.join(' ')} onClick={!noClick ? () => props.numberClicked(number) : null}>{number}</div>
        )
    })

    return (
        <div className={classes.Numbers}>
        <div className={classes.Title}>selecteer spelernummer</div>
            {playerNumbers}
        </div>
    )   
}

export default numberSelection;