import React, { Component } from 'react';
import Aux from '../_Aux/_Aux';
import classes from './Layout.css';
import Header from '../../components/Header/Header';
import BreadcrumbBrowser from '../../components/Navigation/BreadcrumbBrowser/BreadcrumbBrowser';
import {connect} from 'react-redux';


class Layout extends Component {
    render() {
        console.log(this.props);
        const navigation = {
            teamName: (typeof this.props.team.teamName) !== 'undefined' ? this.props.team.teamName : null,
            matchName: this.props.match !== null ? this.props.match.gameData.opponent : null,
        }
        return (
            <Aux>
                <Header isAuthenticated={this.props.isAuthenticated} />
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

const mapDispatchToProps = props => {

}

export default connect(mapStateToProps,mapDispatchToProps)(Layout);

