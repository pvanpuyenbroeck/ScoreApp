import React, {Component} from 'react';
import Classes from './maps.css';
import GoogleMapsLogo from '../../../assets/Images/googleMapsLogo.png';

class maps extends Component {

    mapsSelector = () => {
        
    }


    render(){
        const style = {
            backgroundImage: "url(" + GoogleMapsLogo + ")",
            backgroundRepeat:"no-repeat",
            backgroundSize: "cover",
            height: "100px",
            width: "100px"
        }
        return(
            <div className={Classes.locationImage}>
                <div onclick={this.mapsSelector()} style={style}></div>
            </div>
        )
    }
}

export default maps;