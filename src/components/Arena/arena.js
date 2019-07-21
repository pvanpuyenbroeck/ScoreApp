import React, { Component } from 'react';
import Classes from './arena.css';
import firebase from '../../firebase-scoreapp';

class arena extends Component {
    state = {
        code: "",
        sporthal: "",
        gemeente: "",
        nummer: "",
        postcode: "",
        straat: "",
        telefoon: "",
    }

    inputChangedHandler(event, inputIdentifier) {
        switch (inputIdentifier) {
            case "code":
                this.setState({ code: event.target.value });
                break;
            case "sporthal":
                this.setState({ sporthal: event.target.value });
                break;
            case "gemeente":
                this.setState({ gemeente: event.target.value });
                break;
            case "postcode":
                this.setState({ postcode: event.target.value });
                break;
            case "straat":
                this.setState({ straat: event.target.value });
                break;
            case "nummer":
                this.setState({ nummer: event.target.value });
                break;
            case "telefoon":
                this.setState({ telefoon: event.target.value });
                break;
            default:
                break;
        }
    }

    arenaSubmitHandler(me) {
        me.setState({ sporthal: "test" });
        console.log(me.state);
        const arenaObject = {
            sporthal: me.state.sporthal,
            telefoon: me.state.telefoon,
            locatie: {
                gemeente: me.state.gemeente,
                postcode: me.state.postcode,
                straat: me.state.straat,
                nummer: me.state.nummer,
            }
        }
        firebase.database().ref("/Arenas").push({ [me.state.code]: { ...arenaObject } })
            .then(team => {
                console.log(team);
            })
            .catch(error => {
                console.log(error);
            }
            )
    }

    render() {

        return (
            <div>
                <form onSubmit={() => this.arenaSubmitHandler(this)}>
                    <div>code</div>
                    <input type="text" onChange={(event) => this.inputChangedHandler(event, "code")} />
                    <div>sporthal</div>
                    <input type="text" onChange={(event) => this.inputChangedHandler(event, "sporthal")} />
                    <div>gemeente</div>
                    <input type="text" onChange={(event) => this.inputChangedHandler(event, "gemeente")} />
                    <div>postcode</div>
                    <input type="text" onChange={(event) => this.inputChangedHandler(event, "postcode")} />
                    <div>straat</div>
                    <input type="text" onChange={(event) => this.inputChangedHandler(event, "straat")} />
                    <div>nummer</div>
                    <input type="text" onChange={(event) => this.inputChangedHandler(event, "nummer")} />
                    <div>telefoon</div>
                    <input type="text" onChange={(event) => this.inputChangedHandler(event, "telefoon")} />

                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default arena;