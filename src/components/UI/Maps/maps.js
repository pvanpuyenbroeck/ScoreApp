import React, { Component } from 'react';
import Classes from './maps.css';
import GoogleMapsLogo from '../../../assets/Images/googleMapsLogo.png';

class maps extends Component {

    mapsSelector = () => {
        const streetandnumber = this.props.street + "+" + this.props.postnumber;
        const postcode = this.props.postcode;
        if /* if we're on iOS, open in Apple Maps */
        ((navigator.platform.indexOf("iPhone") !== -1) ||
        (navigator.platform.indexOf("iPad") !== -1) ||
            (navigator.platform.indexOf("iPod") !== -1))
            window.open(`https://www.google.com/maps/search/?api=1&query=${streetandnumber}%2C${postcode}`);
            // window.open(`maps://maps.google.com/maps/search/?api=1&query=${streetandnumber}%2C${postcode}`);
        else /* else use Google */
            // window.open("https://maps.google.com/maps/?api=1&query=Zuiderlaan+14%2C9000+Gent");
            window.open(`https://www.google.com/maps/search/?api=1&query=${streetandnumber}%2C${postcode}`);
    }


    render() {
        const style = {
            backgroundImage: "url(" + GoogleMapsLogo + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "100px",
            width: "100px"
        }
        return (
            <div className={Classes.locationImage} onClick={() => this.mapsSelector()} >
                <div style={style}></div>
            </div>
        )
    }
}

export default maps;