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

class App extends Component {
  state = {
    showToggle: false,
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
      <SidePanel showToggle={this.state.showToggle} sidePanelToggle={this.NavpanelToggleClickedHandler}/>
      <Modal modalClosed={this.NavpanelToggleClickedHandler} show={this.state.showToggle}/>
      <Layout>
        <NavPanel sidePanelToggle={this.NavpanelToggleClickedHandler}/>
        <Route path="/" component={TeamControl} />
        <Route path="/AddNewPlayer" exact component={AddNewPlayer} />
        {/*<Route path="/SelectTeam" component={TeamsOverview}/>*/}
      </Layout>
      </Aux>
    );
  }
}

export default App;
