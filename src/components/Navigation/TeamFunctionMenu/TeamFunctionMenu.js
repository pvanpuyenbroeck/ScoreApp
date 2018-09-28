import React, {Component} from 'react';
import classes from './TeamFunctionMenu.css';
import ButtonTeamMenu from '../../UI/ButtonTeamMenu/ButtonTeamMenu';
import {connect} from 'react-redux';

class teamFunctionMenu extends Component {

    render(){
        let attachedClasses = [classes.TeamFunctionMenu]
        if(this.props.showMenu === false){
            attachedClasses.push(classes.Closed);
        }
        return (
            <div className={attachedClasses.join(' ')}>
                <ButtonTeamMenu buttonClicked={() => this.props.showComponent("SelectPlayer")}>             
                    <div>Speler Toevoegen</div>
                </ButtonTeamMenu>

                <ButtonTeamMenu buttonClicked={() => this.props.showComponent("AddMatch")}>
                    Match Toevoegen
                </ButtonTeamMenu>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        team: state.team,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        showComponent: (component) => dispatch({type:"showComponent", navItem:component})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(teamFunctionMenu)