import React from 'react';
import classes from './TeamForm.css';
import TextInput from '@material-ui/core/TextField';


const teamForm = (props) => {
    return (
        <div className={classes.TeamForm}>
            <h1>Add new team:</h1>
            <form onSubmit={props.addTeam}>
                <TextInput
                    id="standard-uncontrolled"
                    label="Team name"
                    defaultValue=""
                    className={classes.textField}
                    margin="normal"
                    onChange={props.change}
                />
                {/* <label>Team name
                <input type="text" name="teamName" id="teamname" onChange={props.change} />
                </label> */}
                {/* <label>Season
                <input type="text" name="season" id="season" onChange={props.change}/>
                </label> */}
                <input type="submit" value="Add Team" />
            </form>
        </div>
    )
}

export default teamForm;