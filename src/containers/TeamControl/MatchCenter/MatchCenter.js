import React, {Component} from 'react';
import {connect} from 'react-redux';
import classes from './MatchCenter.css';

class matchCenter extends Component {
    state={

    }
    render(){
        return(
            <div className={classes.MatchCenter}>
                <h1>MatchCenter</h1>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        // team:state.team,
    }
}

const mapDispatchToProps = dispatch => {
    return{

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(matchCenter);