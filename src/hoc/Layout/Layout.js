import React, { Component } from 'react';
import Aux from '../_Aux/_Aux';
import classes from './Layout.css';
import Header from '../../components/Header/Header';
import BreadcrumbBrowser from '../../components/Navigation/BreadcrumbBrowser/BreadcrumbBrowser';
import {connect} from 'react-redux';
import NavPanel from '../../components/Navigation/NavPanel/NavPanel';
import * as actions from '../../store/actions/index';
import SidePanel from '../../components/Navigation/SidePanel/SidePanel';


class Layout extends Component {
    render() {
        console.log(this.props);
        const navigation = {
            names:{
                teamName: (typeof this.props.team.teamName) !== 'undefined' ? this.props.team.teamName : null,
                matchName: this.props.match !== null ? this.props.match.gameData.opponent : null,
            },
            id:{
                teamId: this.props.team !== null ? this.props.team.teamId : null,
                matchId: this.props.match !== null ? this.props.match.matchId : null, 
            }
        }
        return (
            <Aux>
                <Header isAuthenticated={this.props.isAuthenticated} />
                <NavPanel toggleClicked={() => this.props.navToggleClicked()} showToggle={this.props.showToggleNav}/>
                 <SidePanel showToggle={this.props.showSidePanel} showFlexbox={this.props.showFlexBox}/>
                <BreadcrumbBrowser 
                navigation={navigation}
                />
                <main className={classes.Layout}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return{
        team:state.team.selectedTeam,
        match:state.match.selectedMatch,
        // match: state.
    }
}

const mapDispatchToProps = dispatch => {
    return{

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Layout);

