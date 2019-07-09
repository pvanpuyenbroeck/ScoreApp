import React, { useState, useEffect } from 'react';
import classes from './CountDownClock.css';
import { countDownClock } from '../../../store/utility';


const countDown = (props) => {

    const [dateTime, setDateTime] = useState({ minutesDif: 0, secondsDif: 0, yearDif: 0, monthDif: 0, dayDif: 0, hourDif: 0 });

    useEffect(() => {
        const interval = setInterval(() => {
            const countDown = countDownClock(props.dateTime);
            setDateTime(countDown);
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    });

    return (
        <div className={[classes.Countdown, classes.TimeBlock].join(' ')}>
            <div className={[classes.Year, classes.TimeBlock].join(' ')}>
                <div>Jaren</div>
                <div>{dateTime.yearDif}</div>
            </div>
            <div className={[classes.Month, classes.TimeBlock].join(' ')}>
                <div>Maanden</div>
                <div>{dateTime.monthDif}</div>
            </div>
            <div className={[classes.Day, classes.TimeBlock].join(' ')}>
                <div>Dagen</div>
                <div>{dateTime.dayDif}</div>
            </div>
            <div className={[classes.Hour, classes.TimeBlock].join(' ')}>
                <div>Uren</div>
                <div>{dateTime.hourDif}</div>
            </div>
            <div className={[classes.Minutes, classes.TimeBlock].join(' ')}>
                <div>Minuten</div>
                <div>{dateTime.minutesDif}</div>
            </div>
            <div className={[classes.Seconds, classes.TimeBlock].join(' ')}>
                <div>Seconden</div>
                <div>{dateTime.secondsDif}</div>
            </div>
        </div>
    )
}

export default countDown;