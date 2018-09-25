import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import TeamControl from './containers/TeamControl/TeamControl';
import NavPanel from './components/Navigation/NavPanel/NavPanel';
import AddNewPlayer from './containers/TeamControl/AddPlayer/AddPlayer';
import SidePanel from './components/Navigation/SidePanel/SidePanel';
import "./components/Navigation/SidePanel/SidePanel.css";

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
      <Layout>
        <NavPanel sidePanelToggle={this.NavpanelToggleClickedHandler}/>
        <SidePanel showToggle={this.state.showToggle}/>
        <Route path="/" component={TeamControl} />
        <Route path="/AddNewPlayer" exact component={AddNewPlayer} />
        {/*<Route path="/SelectTeam" component={TeamsOverview}/>*/}

      </Layout>
    );
  }
}

export default App;
