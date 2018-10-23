import React, { Component } from 'react';
import { Button, Form, FormGroup, FormControl, ControlLabel, Col, Row, ButtonToolbar } from 'react-bootstrap';
import { Route, Link, Redirect, withRouter, BrowserRouter } from 'react-router-dom';

export class HomeContent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div> Home Content </div>
        );
    }
}