import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import TeamControl from './containers/TeamControl/TeamControl';


class App extends Component {
  render() {
    return (
      <Layout>
      <Route path="/"  component={TeamControl}/>      
      {/*<Route path="/SelectTeam" component={TeamsOverview}/>*/}
      </Layout>
    );
  }
}

export default App;
