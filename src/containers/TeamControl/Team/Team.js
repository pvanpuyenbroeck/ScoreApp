import React, { Component } from 'react';

class Team extends Component {
    state={
        teamId: '',
    }

    componentDidMount(){
        console.log(this.props);
        this.setState({
            teamId: this.props.match.params.teamId,
        })
    }
    render() {
        return (
            <div>
                <h1>Dit is de team pagina van {this.state.teamId}</h1>
            </div>
        )
    }
}

export default Team;