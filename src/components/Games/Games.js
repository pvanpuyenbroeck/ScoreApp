import React, { useState, useEffect } from 'react';
import classes from './Games.css';
import Match from '../Games/Match/Match';
import { sortOnDate, getAllComingMatches } from '../../store/utility';

const games = (props) => {
    let gameArray = [];
    const [nextMatch, setNextMatch] = useState(null);
    const [allGames, setAllGames] = useState(<h1>Er zijn geen geplande matches</h1>);

    useEffect(() => {

        for (let key in props.matches) {
            gameArray.push({
                ...props.matches[key],
                matchId: key,
            });
        }

        const sortedMatchArray = sortOnDate(gameArray);

        if (props.matches) {
            const games = sortedMatchArray.map((game) => {
                return (
                    <div className={classes.Match}
                        key={game.matchId}>

                        <Match
                            match={game}
                            matchButtonClicked={(match) => props.matchClicked(match)}
                            team={props.team}
                            history={props.history}
                            admin={props.admin}
                            showMatchDetailsClicked={(matchId) => props.showMatchDetailsClicked(game.matchId)}
                        />

                    </div>
                )
            })
            setAllGames(games);
            let matchesWithKey = [];
            for (let key in props.matches) {
                let matchObject = {
                    ...props.matches[key],
                    matchId: key,
                }
                matchesWithKey.push(matchObject);
            }
            // const matchArray = Object.values(props.matches);
            const nextMatch = getAllComingMatches(matchesWithKey);
            if(nextMatch.length > 0){
            setNextMatch(<Match
                match={nextMatch[0]}
                matchButtonClicked={() => props.matchClicked(nextMatch[0])}
                history={props.history}
                admin={props.admin}
                team={props.team}
                showMatchDetailsClicked={() => props.showMatchDetailsClicked(nextMatch[0].matchId)}
            />);
            }else{
                setNextMatch("Geen komende matchen");
            }
        }
    }, [])


    return (
        <div className={classes.GamesContainer}>
            <div className={classes.Matches}>
                <div className={classes.NextMatch}>
                    <div>Volgende match:</div>
                    {nextMatch}
                </div>
                <div className={classes.AllMatchestitle}>Alle Matchen:</div>
                {allGames}
            </div>
        </div>
    )
}

export default games;