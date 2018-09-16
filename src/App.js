import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import TeamControl from './containers/TeamControl/TeamControl';
import NavPanel from './components/Navigation/NavPanel/NavPanel';
import AddNewPlayer from './containers/TeamControl/AddPlayer/AddPlayer';

class App extends Component {
  render() {
    return (
      <Layout>
      <NavPanel/>
      <Route path="/" component={TeamControl}/>      
      <Route path="/AddNewPlayer"  exact component={AddNewPlayer}/>      
      {/*<Route path="/SelectTeam" component={TeamsOverview}/>*/}
      
      </Layout>
    );
  }
}

export default App;
