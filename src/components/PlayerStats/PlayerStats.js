import React, {useState, useEffect} from 'react';
// import Playerranking from './PlayerRanking/PlayerRanking';
import GridRank from './GridRank/GridRank';
import classes from './PlayerStats.css';
import Button from '../UI/Button/Button/Button';
import {colors} from '../../constants/colors';


const AttendancePlayerInSeason = (playerId, Matches) => {
    let attendance = 0;

    for(let matchKey in Matches){
        for(let key in Matches[matchKey].Participants){
            if (key === playerId){
                if(Matches[matchKey].Participants[key].attending){
                    attendance++;
                }
            }
        }
    }
    return attendance;
}

const PlayerStats = props => {
    const [statsView, setStatsView] = useState(null)
    const [playersArray, setPlayerArray] = useState([]);

            let players = []
            for (let playerkeys in props.team.TeamMembers) {
                players.push({
                    name: null,
                    goals: 0,
                    attendance: 0,
                    key: playerkeys,
                })
            }
            players.map(player => {
                player.name = player.name === null ? props.team.filteredPlayers[player.key].voornaam + " " + props.team.filteredPlayers[player.key].familienaam : player.name;
                for (let matchKey in props.team.Matches) {
                    if (typeof props.team.Matches[matchKey].Participants !== 'undefined') {
                        if (typeof props.team.Matches[matchKey].Participants[player.key] !== 'undefined') {
                            const participant = props.team.Matches[matchKey].Participants[player.key];
                            player.goals = participant.goals + player.goals;
                            player.attendance = AttendancePlayerInSeason(player.key, props.team.Matches);
                        }
                    }
                }
                return null;
            })

            

            useEffect(() => {
                setPlayerArray(players);
                setStatsView(<GridRank sortedPlayerArray={sortedGoalsArray(players)} rankingType={'Goals'}/>)
                return;
            },[])
        
            const sortedGoalsArray = (players) => {
                players.sort((a,b) => {
                    if(a.goals > b.goals){
                        return -1;
                    }
                    if(a.goals < b.goals){
                        return 1
                    }
                    return 0;
                });
                return players;
            } 


            const sortedAttendanceArray = (players) => {
                players.sort((a,b) => {
                    if(a.attendance > b.attendance){
                        return -1;
                    }
                    if(a.attendance < b.attendance){
                        return 1;
                    }
                    return 0;
                });

                return players;
            } 

            const viewButtonClickedHandler = (view) => {
                switch (view) {
                    case 'goals':
                        setStatsView(<GridRank sortedPlayerArray={sortedGoalsArray(playersArray)} rankingType={'Goals'}/>) 
                        break;
                    case 'attendance':
                        setStatsView(<GridRank sortedPlayerArray={sortedAttendanceArray(playersArray)} rankingType={'Gespeelde matchen'}/>)
                        break;
                    default:
                        break;
                }
            }

            return (
                <div>
                <Button 
                    style={{backgroundColor:colors.blue, height:"50px"}}
                    disabled={false}
                    clicked={() => viewButtonClickedHandler('goals')}
                    >GOALS
                </Button>
                <Button 
                style={{backgroundColor:colors.blue, height:"50px"}}
                disabled={false}
                clicked={() => viewButtonClickedHandler('attendance')}
                >DEELNAMES
            </Button>
                {statsView}
                </div>
            )
}

export default PlayerStats;