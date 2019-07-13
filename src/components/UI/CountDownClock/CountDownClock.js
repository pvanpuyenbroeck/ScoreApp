import React, { useState, useEffect } from 'react';
import classes from './CountDownClock.css';
import { countDownClock } from '../../../store/utility';


const countDown = (props) => {

    const [dateTime, setDateTime] = useState({ weekDif: 0, yearDif: 0, monthDif: 0, dayDif: 0, hourDif: 0 });

    useEffect(() => {
        const interval = setInterval(() => {
            const countDown = countDownClock(props.dateTime);
            setDateTime(countDown);
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    });

    const TimeBlock = ({ date, timeDisplayClass, titel }) => {
        if((date === 0 && titel !== "Seconden") || (titel === "Seconden" && date < 0)){
            return null;
        }
        else {
            return (
                <div className={[timeDisplayClass, classes.TimeBlock].join(' ')}>
                    <div>{titel}</div>
                    <div>{date}</div>
                </div>
            )
        }
    }

    return (
        <div className={[classes.Countdown].join(' ')}>
            <TimeBlock date={dateTime.weekDif} titel={"Weken"} timeDisplayClass={classes.Weeks} />
            <TimeBlock date={dateTime.dayDif} titel={"Dagen"} timeDisplayClass={classes.Day} />
            <TimeBlock date={dateTime.hourDif} titel={"Uren"} timeDisplayClass={classes.Hour} />
            <TimeBlock date={dateTime.minutesDif} titel={"Minuten"} timeDisplayClass={classes.Minutes} />
            <TimeBlock date={dateTime.secondsDif} titel={"Seconden"} timeDisplayClass={classes.Seconds} />
        </div>
    )
}

export default countDown;