import React, {useState, useEffect} from 'react';
import classes from './Match.css';
import MoreButton from '../../../assets/Images/MoreButton.png';
import {checkIfDateIsInFuture} from '../../../store/utility';


const Match = (props) => {
    // const [showOptions, setShowOptions] = useState(false);
    const [forfait, setForfait] = useState({side:'home', forfait:false});

    useEffect(() => {
        if(typeof props.match.forfait !== 'undefined' || props.match.forfait){
            setForfait({side:'home', forfait:true});
        }
    }, [forfait])
    
    const Score = () => {
    let homeGoals = 0;
    if(typeof props.match !== 'undefined'){
        for (let key in props.match.Participants) {
            homeGoals += props.match.Participants[key].goals;
        }
    }
    return homeGoals;
    }

    const [result,setResult] = useState({
        home:Score(),
        away:props.match.oponentGoals,
    })

    const checkOutcome = (gameInFuture) => {
        if(gameInFuture){
            return 'white';
        }else{
            switch (true) {
                case (result.away < result.home):
                    return '#88bb88';
                case (result.away > result.home):
                    return '#b77070';
                default:
                    return '#ff8731';
            }
        }
    }
    const dateFormat = () => {
        let date = new Date(props.match.gameData.date);
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const hour = date.getHours();
        const minutes = date.getMinutes();
        const months = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];
        return (
            <React.Fragment>
                <div>{day}</div>
                <div>{months[month]}</div>
                <div>{hour}{minutes === 0 ? "u" : "u" + minutes}</div>
                <div className={classes.Year}>{year}</div>
            </React.Fragment>
        )
    }

    const goToMatchPageHandler = () => {
        props.matchButtonClicked(props.match)
        props.history.replace("/Team/" + props.team.teamId + "/Match/" + props.match.matchId);
    }

    const moreButtonStyle = {
        backgroundImage: `url(${MoreButton})`,
    }

    const backgroundStyle = {
        backgroundColor: checkOutcome(checkIfDateIsInFuture(props.match.gameData.date)),

    }

    return (
        <React.Fragment>

            <div
                className={classes.Match}
                style={backgroundStyle}
            >
                <div className={classes.Options}
                >
                </div>
                {/* <div>Afbeelding komt hier</div> */}
                <div className={classes.GameDate} onClick={() => goToMatchPageHandler()}>{dateFormat()}</div>
                <div
                    style={moreButtonStyle}
                    className={classes.MoreButton}
                    onClick={(teamId) => props.showMatchDetailsClicked(teamId)}
                />
                <div className={classes.OpponentName} onClick={() => goToMatchPageHandler()}>
                    {/* <Link to={"/Team/" + props.team.teamId + "/Match/" + props.match.matchId} style={{ textDecoration: 'none' }}> */}
                    <div className={classes.Opponent}>{typeof props.match.gameData.opponent === 'undefined' ? null : props.match.gameData.opponent}</div>
                    {/* </Link> */}
                </div>
                <div className={classes.Score} onClick={() => goToMatchPageHandler()}>{Score()} - {props.match.oponentGoals}</div>

            </div>

        </React.Fragment>
    )
}

export default Match