import React, { Component } from 'react';
import classes from './AddPlayer.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input'
import axios from '../../../axios-scoreapp';
import {connect} from 'react-redux';
import firebase from '../../../firebase-scoreapp';


class AddPlayer extends Component {
    state = {
        playerForm: {
            voornaam: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Voornaam',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
            },
            familienaam: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Familienaam',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
            },
            // image: {
            //     elementType: 'file',
            //     elementConfig: {
            //         type: 'file',
            //     },
            //     value: '',
            //     validation: {
            //         required: false,
            //     },
            //     valid: false,
            // },

        },
        loading: false,
        teamId: '',
        selectedFile:null,
        newPlayerId: null,
    }
    componentDidMount(){
        this.setState({
            newPlayerId:this.makeNewPlayerId(),
        })
    }
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedPlayerForm = {
            ...this.state.playerForm
        }
        const updatedFormElement = {
            ...updatedPlayerForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedPlayerForm[inputIdentifier] = updatedFormElement;
        this.setState({
            playerForm: updatedPlayerForm,
        })
    }

    makeNewPlayerId = () => {
        const playerId = firebase.database().ref('/Players').push().key;
        return playerId;
    }

    playerSubmitHandler = (event) => {
        event.preventDefault();
        this.setState({
            loading: true,
        })
        const formData = {};
        for (let formElementIdentifier in this.state.playerForm) {
            formData[formElementIdentifier] = this.state.playerForm[formElementIdentifier].value
        }
        // formData["teamId"] = this.props.match.params.teamId;
        let playerInfo = formData;
        const playerId = this.state.newPlayerId;
        playerInfo = {
            ...playerInfo,
            userid: playerId,
        }
        const playersRef = firebase.database().ref('/Players/' + playerId).set(playerInfo);
        playersRef.then(res => {
            this.setState({ loading: false,  newPlayerId: playerId});
            this.props.closeModal();
        }).catch(err => {
            this.setState({ loading: false });
        });
        // const playerId = playerRef.key;
        // console.log(playersRef.key);         
        // axios.post('/Players.json', playerInfo)
        //     .then(response => {
        //         this.setState({ loading: false, });
        //         this.props.closeModal();
        //     })
        //     .catch(error => {
        //         this.setState({ loading: false });
        //     })
    }
    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.lenght >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.lenght >= rules.maxLength && isValid;
        }

        return isValid;
    }

    fileUploadHandler = () => {
        const fd = new FormData();
        fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
        fd.append('idFromUser', this.state.newPlayerId);
        axios.post('https://us-central1-score-app-b69dc.cloudfunctions.net/uploadFile', fd, {
            onUploadProgress: ProgressEvent => {
                console.log('Upload progress: ' + Math.round(ProgressEvent.loaded / ProgressEvent.total * 100) + '%');
            }
        })
        .then(res => {
            console.log(res);   
        })
    }

    fileSelectedHandler = (event) => {
        this.setState({
            selectedFile:event.target.files[0],
        })
    }
    render() {
        const formElementArray = [];
        for (let key in this.state.playerForm) {
            formElementArray.push({
                id: key,
                config: this.state.playerForm[key]
            })
        }

        let form = (
            <form onSubmit={this.playerSubmitHandler}>
                {formElementArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
                <input 
                type="file" 
                onChange={this.fileSelectedHandler}
                /> 
                <button onClick={this.fileUploadHandler}>Upload</button>
                <button type="submit">Toevoegen</button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div>
                <div className={classes.ContactData}>
                {form}
                {/* <SelectPlayers
                    playername={this.state.playerForm.name.value}
                /> */}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        showFlexItem: state.showFlexItem,
        showModal: state.showModal,
        auth: state.auth,
    }
}

const mapDispatchToProps = dispatch => {
    return{      
        closeModal: () => dispatch({type:"closeModal"}),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddPlayer);