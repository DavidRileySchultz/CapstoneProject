﻿import React, { Component } from 'react';
import { Button, Checkbox, Form, FormGroup, FormControl, ControlLabel, Col, Row, ButtonToolbar } from 'react-bootstrap';
import { Route, Link, Redirect, withRouter, BrowserRouter } from 'react-router-dom';

export class SearchMembers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term2: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    onClickingSearch(event) {
        event.preventDefault();

        this.props.onSearchEnter(this.state.filter, this.state.term1, this.state.term2, this.state.term3, this.state.term4)
    }

    onInputChange(term) {
        this.setState({ term2: term });
        this.props.onSearchEnter(this.state.term2);
    }

    render() {
        return (
            <FormGroup>
                <ControlLabel>Search for members to add</ControlLabel>
                <FormControl
                    type="text"
                    name="term2"
                    value={this.state.term2}
                    onChange={(event) => this.onInputChange(event.target.value)}
                />
            </FormGroup>
        );
    }





}