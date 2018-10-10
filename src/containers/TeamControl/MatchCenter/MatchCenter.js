import React, {Component} from 'react';
import {connect} from 'react-redux';
import classes from './MatchCenter.css';

class matchCenter extends Component {
    render(){
        return(
            <div className={classes.MatchCenter}>
                <h1>{this.props.match.gameData.opponent}</h1>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        match:state.match.selectedMatch,
    }
}

const mapDispatchToProps = dispatch => {
    return{

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(matchCenter);