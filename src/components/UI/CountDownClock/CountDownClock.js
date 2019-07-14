import React, { useState, useEffect } from 'react';
import classes from './CountDownClock.css';
import { countDownClock } from '../../../store/utility';
import Spinner from '../Spinner/Spinner';


const countDown = (props) => {

    const [dateTime, setDateTime] = useState({ weekDif: 0, dayDif: 0, minutesDif: 0, hourDif: 0, secondsDif: 0, initiated: false });

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
        if ((date === 0 && titel !== "Seconden") || (titel === "Seconden" && date < 0)) {
            return null;
        }
        else {
            return (
                <div className={[timeDisplayClass, classes.TimeBlock].join(' ')}>
                    <div>{date}</div>
                    <div>{titel}</div>
                </div>
            )
        }
    }

    const ShowCountdownClock = () => {
        if(dateTime.initiated === false){
            return <Spinner/>;
        }
        if (dateTime.weekDif === 0 && dateTime.dayDif === 0 && dateTime.minutesDif === 0 && dateTime.secondsDif === 0 && dateTime.hourDif === 0) {
            return (
                <h1>Countdown is afgelopen</h1>
            )
        }
        else {
            return (<div className={[classes.Countdown].join(' ')}>
                <TimeBlock date={dateTime.weekDif} titel={"Weken"} timeDisplayClass={classes.Weeks} />
                <TimeBlock date={dateTime.dayDif} titel={"Dagen"} timeDisplayClass={classes.Day} />
                <TimeBlock date={dateTime.hourDif} titel={"Uren"} timeDisplayClass={classes.Hour} />
                <TimeBlock date={dateTime.minutesDif} titel={"Minuten"} timeDisplayClass={classes.Minutes} />
                <TimeBlock date={dateTime.secondsDif} titel={"Seconden"} timeDisplayClass={classes.Seconds} />
            </div>
            )
        }
    }



    return (
        <ShowCountdownClock />
    )
}

export default countDown;