import React, { Component } from 'react';
import TeamsOverview from '../TeamControl/TeamsOverview/TeamsOverview';
import AddTeam from '../TeamControl/AddTeam/AddTeam';
import { Route, Switch } from 'react-router-dom';
import classes from './TeamControl.css';
import Team from './Team/Team';
import PlayerForm from './Team/PlayerForm/PlayerForm';

class TeamControl extends Component {
    state = {

    }

    render() {
        return (
            <div className={classes.TeamControl}>
                <Switch>
                    <Route path={"/Team/:teamId/addPlayer"} exact component={PlayerForm} />
                    <Route path={"/Team/:teamId"} exact component={Team} />
                    <Route path="/selectTeam" component={TeamsOverview} />
                    <Route path="/addTeam" component={AddTeam} />
                    <Route render={() => <h1>not found</h1>} />
                </Switch>
            </div>
        )
    }
}

export default TeamControl;