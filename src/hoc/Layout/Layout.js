import React, {Component} from 'react';
import Aux from '../_Aux/_Aux';
import classes from './Layout.css';
import Header from '../../components/Header/Header';

class Layout extends Component{
 render(){
     return(
        <Aux>
        <Header isAuthenticated={this.props.isAuthenticated}/>
        <main className={classes.Layout}>
        {this.props.children}
        </main>
        </Aux>
     );
 }
}

export default Layout;

