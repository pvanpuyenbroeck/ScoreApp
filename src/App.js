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
import TeamsOverview from './containers/TeamControl/TeamsOverview/TeamsOverview';


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
    return (
      <Aux>
      <SidePanel showToggle={this.props.toggleSidePanel} showFlexbox={this.state.showFlexbox}/>
      <Modal modalClosed={() => this.props.ModalClicked()} show={this.props.showModal}/>
      <Layout>
        <Flexbox show={this.props.showFlexbox} navItem={this.props.navItem}></Flexbox>
        <NavPanel toggleClicked={() => this.props.sidePanelToggle()} showToggle={this.state.showToggle}/>
        <Route path="/" component={TeamControl} />
        <Route path="/AddNewPlayer" exact component={AddNewPlayer} />
      </Layout>
      </Aux>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
      sidePanelToggle: () => dispatch({type: "sidePanelToggle"}),
      ModalClicked: () => dispatch({type:"closeModal"}),
  }
};

const mapStateToProps = state => {
  return {
    navItem: state.NavPanelLink,
    toggleSidePanel: state.ToggleSidePanel,
    showFlexbox: state.showFlexItem,
    showModal: state.showModal,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
