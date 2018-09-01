import React, {Component} from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Header from '../../components/Header/Header';

class Layout extends Component{
 render(){
     return(
        <Aux>
        <Header/>
        <main className={classes.Layout}>
        {this.props.children}
        </main>
        </Aux>
     );
 }
}

export default Layout;

