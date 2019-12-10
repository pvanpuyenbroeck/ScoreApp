import React, {useState, useEffect} from 'react';
import {getAllTeams, followTeam, checkIfUserFolowsTeam, unfollowTeam} from '../../../store/utility';
import Input from '../../UI/Input/Input';
import classes from './LookupTeam.css';
import {colors} from '../../../utils/styles/helpers';

const TeamComponent = props => {
  const followClickedHandler = () => {
    followTeam(props.team.id, props.user.uid).then(result => {
      console.log(result);
    });
  };

    const Style ={
        backgroundColor: props.team.following ? colors.green : colors.red,
    }

        return  (
            <div className={classes.TeamComponent} onClick={props.onClicked}>
                <div className={classes.TeamName}>{props.team.teamName}</div>
                <div 
                className={classes.FollowButton}
                onClick={props.followClicked}
                style={Style}
                >{props.team.following ? 'Unfollow' : 'Follow'}</div>
            </div>
        )
}

const  LookupTeam = props => {

    const [allTeams, setAllTeams] = useState([]);
    const [teamInputValue, setTeamInputValue] = useState('');
    const [filteredTeams, setFilteredTeams] = useState([]);


    

    useEffect(() => {
        const filterTeams = async () => {
          const result =  await getAllTeams();
                setAllTeams(result);
                let filteredTeamsUpdated = result;
                filteredTeamsUpdated.length > 0 ? filteredTeamsUpdated = filteredTeamsUpdated.map(async team => {
                const userFollows = await checkIfUserFolowsTeam(props.user.uid, team.id);
                let updatedTeam = {
                        ...team,
                        following: true
                    };
                    if (userFollows) {
                        return updatedTeam;
                    }
                    else {
                    updatedTeam.following = false;
                    return updatedTeam;
                            }
                        }): filteredTeamsUpdated = null;
                    setFilteredTeams(await Promise.all(filteredTeamsUpdated));
        }
        filterTeams();
    }, []);

    const followClickedHandler = (selectedTeam) => {
        if(!selectedTeam.following){
            followTeam(selectedTeam.id, props.user.uid).then(result => {

            })
        }else{
            unfollowTeam(selectedTeam.id, props.user.uid).then(result => {

            })
        }

        const filteredTeamsUpdate = filteredTeams.map(team => {
            if(team.id === selectedTeam.id){
                team.following = !team.following;
            }
            return team;
        })

        const updateAllTeams = allTeams.map(team => {
            if(team.id === selectedTeam.id){
                team.following = team.following;
            }
            return team;
        })
        setAllTeams(updateAllTeams);

        setFilteredTeams(filteredTeamsUpdate);
    }



    const inputChangedHandler = (event) => {
        setTeamInputValue(event.target.value);
        const filteredUpdatedTeams =  allTeams.filter((team) => {
            return team.teamName.toLowerCase().startsWith(event.target.value.toLowerCase());
        })
        setFilteredTeams(filteredUpdatedTeams);
    }
  }, [filteredTeams]);

    return (
      <div className={classes.Container}>
        <div>Zoek team</div>
        <Input
            elementType="input"
            value={teamInputValue}
            changed={inputChangedHandler}
        />
        <div className={classes.ResultContainer}>
            {   filteredTeams.length > 0 ? 
                filteredTeams.filter((team) => {
                    return typeof team !== 'undefined';
                }).map(team  =>  {return <TeamComponent 
                    key={team.id} 
                    team={team} 
                    user={props.user} 
                    followClicked={() => followClickedHandler(team)}
                    onClicked={() => props.onClick(filteredTeams)}
                    />})
            : <div>No Teams</div>}
        </div>
      </div>
    );
}

export default LookupTeam;
