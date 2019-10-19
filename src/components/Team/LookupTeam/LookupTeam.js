import React, {useState, useEffect} from 'react';
import {getAllTeams, followTeam} from '../../../store/utility';
import Input from '../../UI/Input/Input';
import classes from './LookupTeam.css';

const TeamComponent = (props) => {

    const followClickedHandler = () => {
        followTeam(props.teamId).then(result => {
            console.log(result);
        })
    }
    return(
        <div className={classes.TeamComponent}>
            <div className={classes.TeamName}>{props.team.teamName}</div>
            <div 
            className={classes.FollowButton}
            onClick={followClickedHandler}
            >Follow</div>
        </div>
    )
}


const  LookupTeam = props => {

    const [allTeams, setAllTeams] = useState([]);
    const [teamInputValue, setTeamInputValue] = useState('');
    const [filteredTeams, setFilteredTeams] = useState('');

    useEffect(() => {
        getAllTeams().then(result => {
            setAllTeams(result);
            setFilteredTeams(result);
        });
    }, [])

    const inputChangedHandler = (event) => {
        setTeamInputValue(event.target.value);
        console.log(event.target.value);
        const filteredTeams = allTeams.filter((team) => {
            return team.teamName.toLowerCase().startsWith(event.target.value.toLowerCase());
        })
        setFilteredTeams(filteredTeams);
    }

    return (
      <div className={classes.Container}>
        <div>Zoek team</div>
        <Input
            elementType="input"
            value={teamInputValue}
            changed={inputChangedHandler}
        />
        <div className={classes.ResultContainer}>
            {filteredTeams.length ? filteredTeams.map(team => {
                return <TeamComponent key={team.id} team={team}/>  
            }): <div>No Teams</div>}
        </div>
      </div>
    );
}

export default LookupTeam;
