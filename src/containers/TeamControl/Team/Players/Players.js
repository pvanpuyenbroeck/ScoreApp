import React, { Component } from 'react';
import axios from '../../../../axios-scoreapp';

class Players extends Component {
componentDidMount(){
    axios.get("/players.json")
    .then(res =>{
        
    })
}
    render() {

        return (
            <div>

            </div>
        )
    }
}

export default Players;