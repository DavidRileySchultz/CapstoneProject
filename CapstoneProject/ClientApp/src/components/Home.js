import React, { Component } from 'react';
import Background from './WebsiteImages/Background.jpg'

export class Home extends Component {
    displayName = Home.name

    render() {
        const background = {
            height: "89vh",
            backgroundImage: `url(${Background}`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
        }

        return (
            <div style={background}></div>
        );
    }
}