import React, {Component} from 'react';
import classes from './TeamFunctionMenu.css';
import ButtonTeamMenu from '../../UI/ButtonTeamMenu/ButtonTeamMenu';
import {connect} from 'react-redux';

class teamFunctionMenu extends Component {

    render(){
        let attachedClasses = [classes.TeamFunctionMenu, classes.Closed]
        console.log(this.props.showFunctionMenu);
        if(this.props.showFunctionMenu === true){
            attachedClasses.pop();
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
        showFunctionMenu: state.showFunctionMenu,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        showComponent: (component) => dispatch({type:"showComponent", navItem:component})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(teamFunctionMenu)