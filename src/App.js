import React, { Component, Suspense } from 'react';
import { Route } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import TeamControl from './containers/TeamControl/TeamControl';
import AddNewPlayer from './containers/TeamControl/AddPlayer/AddPlayer';
import Modal from './components/UI/Modal/Modal';
import "./components/Navigation/SidePanel/SidePanel.css";
import Flexbox from './components/UI/Flexbox/Flexbox';
import {connect} from 'react-redux';
// import AddTeam from './containers/TeamControl/AddTeam/AddTeam';
import AddPlayer from './containers/TeamControl/AddPlayer/AddPlayer';
import SelectPlayer from './containers/TeamControl/SelectPlayers/SelectPlayers';
import AddMatch from './containers/TeamControl/AddGame/AddGame';
import * as actions from './store/actions/index';
import { withRouter } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import firebase from './firebase-scoreapp';
import Profile from './components/Registration/ProfileInfo';
import Landingpage from './components/Navigation/LandingPage/landingpage';

const AddTeam = React.lazy(() => import('./containers/TeamControl/AddTeam/AddTeam'));

class App extends Component {
  state = {
    showToggle: false,
    showFlexbox: false,
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.props.authSuccess(user);
      }
    })
  }

  NavpanelToggleClickedHandler = () => {
    const toggle = !this.state.showToggle;
    this.setState({
      showToggle: toggle,
    })
  }



  render() {
    let flexItem = "";
    let routes = (
      <React.Fragment>
      <Route path="/" exact render={(props) => <Landingpage {...props} user={this.props.user}/>}/>
      <Route path="/Team" component={TeamControl} />
      <Route path="/AddNewPlayer" exact component={AddNewPlayer} />
      </React.Fragment>
    )
    if(!this.props.isAuthenticated){
      routes = (
        <React.Fragment>
        <Route path="/" component={Auth} />
        </React.Fragment>
      )
    }


    if(this.props.navItem === "AddTeam"){flexItem = <Suspense fallback={<div>...loading</div>}><AddTeam uid={this.props.user.uid}/></Suspense>};
    if(this.props.navItem === "AddPlayer"){flexItem = <AddPlayer/>};
    if(this.props.navItem === "SelectPlayer"){flexItem = <SelectPlayer team={this.props.team}/>};
    if(this.props.navItem === "AddMatch"){flexItem = <AddMatch team={this.props.team}/>};
    if(this.props.navItem === "Profile"){flexItem = <Profile user={this.props.user}/>}; 


    return (
      <React.Fragment>
      <Modal modalClosed={() => this.props.ModalClicked()} show={this.props.showModal}/>
      <Layout 
      isAuthenticated={this.props.isAuthenticated}
      showToggleNav={this.state.showToggle}
      showSidePanel={this.props.toggleSidePanel}
      showFlexBox={this.state.showFlexbox}
      navToggleClicked={() => this.props.sidePanelToggle()}
      location={this.props.location}
      // showBackgroundImage={}
      >      
        <Flexbox show={this.props.showFlexbox} navItem={this.props.navItem}>{flexItem}</Flexbox>
        {routes}
      </Layout>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
      sidePanelToggle: () => dispatch(actions.sidepanelToggle()),
      ModalClicked: () => dispatch(actions.closeModal()),
      authSuccess: (user) => dispatch(actions.authSuccess(user)),
  }
};

const mapStateToProps = state => {
  return {
    navItem: state.navigation.NavPanelLink,
    toggleSidePanel: state.navigation.ToggleSidePanel,
    showFlexbox: state.navigation.showFlexItem,
    showModal: state.navigation.showModal,
    location: state.navigation.breadcrumbLocation,
    team: state.team.team,
    isAuthenticated: state.auth.user !== null,
    user: state.auth.user,
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
