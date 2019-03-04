import React, { Component } from 'react';
import TeamsOverview from '../TeamControl/TeamsOverview/TeamsOverview';
import AddTeam from '../TeamControl/AddTeam/AddTeam';
import { Route, Switch } from 'react-router-dom';
import classes from './TeamControl.css';
import Team from './Team/Team';
import PlayerForm from './Team/PlayerForm/PlayerForm';
import GameForm from './AddGame/AddGame';
import SelectPlayers from './SelectPlayers/SelectPlayers';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'
import MatchCenter from '../TeamControl/MatchCenter/MatchCenter';
import Auth from '../Auth/Auth';


class TeamControl extends Component {
    render() {
        let routes = (
            <Switch>
            <Route path={"/Auth"} component={Auth}/>
            </Switch>
        )
        if(this.props.isAuthenticated){
            routes = (
                <Switch>
                    <Route path={"/Team/:teamId/addPlayer"} exact component={PlayerForm} />
                    <Route path={"/Team/:teamId/addGame"} exact component={GameForm} />
                    <Route path={"/Team/:teamId"} exact component={Team}/>
                    <Route path={"/Team/:teamId/match/:matchId"} exact component={MatchCenter}/>
                    <Route path="/Team" exact component={TeamsOverview} />
                    <Route path="/Team/:teamId/selectPlayers" exact component={SelectPlayers} />
                    <Route path="/addTeam" component={AddTeam} />
                </Switch>
            )
        }
        
        return (
            <div className={classes.TeamControl}>
                {routes}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        team:state.team.selectedTeam,
        isAuthenticated: state.auth.user != null,
    }
}

export default withRouter(connect(mapStateToProps)(TeamControl));