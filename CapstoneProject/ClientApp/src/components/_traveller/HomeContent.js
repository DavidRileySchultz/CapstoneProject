import React, { Component } from 'react';
import image from './TravellerImages/Travel.jpg'

export class HomeContent extends Component {
    constructor(props) {
        super(props);
    }  

    render() {
        const background = {
            height: "89vh",
            backgroundImage: `url(${image}`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
        }

        return (
            <div style={background}></div>
        );
    }
}