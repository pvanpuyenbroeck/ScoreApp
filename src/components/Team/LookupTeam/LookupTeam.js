import React, { useState, useEffect } from "react";
import {
  getAllTeams,
  followTeam,
  doesUserFollowTeam
} from "../../../store/utility";
import Input from "../../UI/Input/Input";
import classes from "./LookupTeam.css";
import { cpus } from "os";
import Spinner from "../../UI/Spinner/Spinner";

const TeamComponent = props => {
  const followClickedHandler = () => {
    followTeam(props.team.id, props.user.uid).then(result => {
      console.log(result);
    });
  };

  return (
    <div className={classes.TeamComponent}>
      <div className={classes.TeamName}>{props.team.teamName}</div>
      <div className={classes.FollowButton} onClick={followClickedHandler}>
        Follow
      </div>
    </div>
  );
};

const LookupTeam = props => {
  const [allTeams, setAllTeams] = useState([]);
  const [teamInputValue, setTeamInputValue] = useState("");
  const [filteredTeams, setFilteredTeams] = useState("");
  const [loading, setLoading] = useState(true);
  const [returnValue, setReturnValue] = useState(<Spinner />);

  useEffect(() => {
    setLoading(true);
    getAllTeams()
      .then(result => {
        setAllTeams(result);
        // const setFollowProperty = async () => {
        result.forEach(team => {
          let filteredTeams = [];
          doesUserFollowTeam(team.id, props.user.uid)
            .then(follows => {
              const updatedTeam = {
                ...team,
                following: follows
              };
              filteredTeams.push(updatedTeam);
            })
            .catch(err => {
              console.log(err);
              setLoading(false);
            });
          setFilteredTeams(filteredTeams);
          setLoading(false);
        });
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const inputChangedHandler = event => {
    setTeamInputValue(event.target.value);
    console.log(event.target.value);
    const filteredTeams = allTeams.filter(team => {
      return team.teamName
        .toLowerCase()
        .startsWith(event.target.value.toLowerCase());
    });
    setFilteredTeams(filteredTeams);
  };

  useEffect(() => {
    if (!loading) {
      const value = filteredTeams.length
        ? filteredTeams.map(team => {
            return (
              <TeamComponent
                key={team.id}
                team={team}
                user={props.user}
                following={team.following}
              />
            );
          })
        : setReturnValue(<div>No Teams</div>);
      setReturnValue(value);
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
      <div className={classes.ResultContainer}>{returnValue}</div>
    </div>
  );
};

export default LookupTeam;
