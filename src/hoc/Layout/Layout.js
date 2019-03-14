import React, { Component } from 'react';
import Aux from '../_Aux/_Aux';
import classes from './Layout.css';
import Header from '../../components/Header/Header';
import BreadcrumbBrowser from '../../components/Navigation/BreadcrumbBrowser/BreadcrumbBrowser';
import { connect } from 'react-redux';
import NavPanel from '../../components/Navigation/NavPanel/NavPanel';
import * as actions from '../../store/actions/index';
import SidePanel from '../../components/Navigation/SidePanel/SidePanel';
import image from '../../assets/Images/background_1.jpg';


class Layout extends Component {
    breadcrumClicked = (clickedItem) => {
        if(clickedItem.navItem === 3){
            
        }
        if (typeof clickedItem.navItem !== 'undefined') {
            this.props.navItemClicked(clickedItem.navItem);
        }
        this.props.breadcrumbClicked(clickedItem.navNumber);
    }
    render() {        
        const backgroundStyle = {
            // backgroundImage: `url(${image})`,
            // backgroundColor: '#ccc',
            height: '850px',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            position: 'relative',
            backgroundImage: this.props.location === 1 ? `url(${image})` : 'none', 
        }

        
        const navigation = {
            names: {
                teamName: (typeof this.props.team.teamName) !== 'undefined' ? this.props.team.teamName : null,
                matchName: this.props.match !== null ? this.props.match.gameData.opponent : null,
            },
            id: {
                teamId: this.props.team !== null ? this.props.team.teamId : null,
                matchId: this.props.match !== null ? this.props.match.matchId : null,
            }
        }
        return (
            <Aux>
                <div style={backgroundStyle} className={classes.Layout}>
                    <Header isAuthenticated={this.props.isAuthenticated} />
                    <NavPanel className={classes.NavPanel} toggleClicked={() => this.props.navToggleClicked()} showToggle={this.props.showToggleNav} />
                    <SidePanel className={classes.SidePanel} showToggle={this.props.showSidePanel} showFlexbox={this.props.showFlexBox} />
                    <div className={classes.BreadcrumbBrowser}>
                        <BreadcrumbBrowser
                            navigation={navigation}
                            navClicked={(navItem) => this.breadcrumClicked(navItem)}
                            breadcrumbLocation={this.props.navigation.breadcrumbLocation}
                        />
                    </div>
                    <main>
                        {this.props.children}
                    </main>
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        team: state.team.selectedTeam,
        match: state.match.selectedMatch,
        navigation: state.navigation,
        // match: state.
    }
}

const mapDispatchToProps = dispatch => {
    return {
        navItemClicked: (navItem) => dispatch(actions.navpanelSelection(navItem)),
        breadcrumbClicked: (location) => dispatch(actions.locationChange(location)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);

