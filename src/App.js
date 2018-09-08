import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import TeamControl from './containers/TeamControl/TeamControl';
import NavPanel from './components/Navigation/NavPanel/NavPanel';

class App extends Component {
  render() {
    return (
      <Layout>
      <NavPanel/>
      <Route path="/"  component={TeamControl}/>      
      {/*<Route path="/SelectTeam" component={TeamsOverview}/>*/}
      </Layout>
    );
  }
}

export default App;
