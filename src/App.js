import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import TeamControl from './containers/TeamControl/TeamControl';
import NavPanel from './components/Navigation/NavPanel/NavPanel';
import AddNewPlayer from './containers/TeamControl/AddPlayer/AddPlayer';
import SidePanel from './components/Navigation/SidePanel/SidePanel';
import Modal from './components/UI/Modal/Modal';
import "./components/Navigation/SidePanel/SidePanel.css";
import Aux from './hoc/_Aux/_Aux';
import Flexbox from './components/UI/Flexbox/Flexbox';
import {connect} from 'react-redux';
import AddTeam from './containers/TeamControl/AddTeam/AddTeam';
import AddPlayer from './containers/TeamControl/AddPlayer/AddPlayer';
import SelectPlayer from './containers/TeamControl/SelectPlayers/SelectPlayers';
import AddMatch from './containers/TeamControl/AddGame/AddGame';
import * as actions from './store/actions/index';
import { withRouter } from 'react-router-dom';
import Auth from './containers/Auth/Auth';


class App extends Component {
  state = {
    showToggle: false,
    showFlexbox: false,
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
      <div>
      <Route path="/" component={TeamControl} />
      <Route path="/AddNewPlayer" exact component={AddNewPlayer} />
      </div>
    )
    if(!this.props.isAuthenticated){
      routes = (
        <div>
        <Route path="/" component={Auth} />
        </div>
      )
    }


    if(this.props.navItem === "AddTeam"){flexItem = <AddTeam/>};
    if(this.props.navItem === "AddPlayer"){flexItem = <AddPlayer/>};
    if(this.props.navItem === "SelectPlayer"){flexItem = <SelectPlayer team={this.props.team}/>};
    if(this.props.navItem === "AddMatch"){flexItem = <AddMatch team={this.props.team}/>};


    return (
      <Aux>
      <SidePanel showToggle={this.props.toggleSidePanel} showFlexbox={this.state.showFlexbox}/>
      <Modal modalClosed={() => this.props.ModalClicked()} show={this.props.showModal}/>
      <Layout>
        <Flexbox show={this.props.showFlexbox} navItem={this.props.navItem}>{flexItem}</Flexbox>
        <NavPanel toggleClicked={() => this.props.sidePanelToggle()} showToggle={this.state.showToggle}/>
        {routes}
      </Layout>
      </Aux>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
      sidePanelToggle: () => dispatch(actions.sidepanelToggle()),
      ModalClicked: () => dispatch(actions.closeModal()),
  }
};

const mapStateToProps = state => {
  return {
    navItem: state.navigation.NavPanelLink,
    toggleSidePanel: state.navigation.ToggleSidePanel,
    showFlexbox: state.navigation.showFlexItem,
    showModal: state.navigation.showModal,
    team: state.team.team,
    isAuthenticated: state.auth.token != null,
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
