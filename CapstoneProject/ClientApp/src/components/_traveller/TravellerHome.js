import React, { Component } from 'react';
import { Button, ButtonGroup, Form, FormGroup, FormControl, ControlLabel, Col, Row, Alert } from 'react-bootstrap';
import { Route, withRouter } from 'react-router-dom';
import { NavMenu } from '../NavMenu';
import { HomeContent } from './HomeContent';
import { GroupContent } from './GroupContent';


export class TravellerHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shouldGoTo: 'Home'
        }
        this.goToGroups = this.goToGroups.bind(this);
    }

    goToHome(event) {
        event.preventDefault();
        this.setState({
            shouldGoTo: 'Home'
        });
    }

    goToGroups(event) {
        event.preventDefault();
        this.setState({
            shouldGoTo: 'Groups'
        });
    }

    render() {
        const goToPage = this.state.shouldGoTo;
        let content;
        if (goToPage === 'Home') {
            content = <HomeContent />
        }
        else if (goToPage === 'Groups') {
            content = <GroupContent />
        }
        return (
            <div>
                <div className="button-group">
                    <ButtonGroup>
                        <Button onClick={(event) => this.goToHome(event)}>Home</Button>
                        <Button onClick={(event) => this.goToGroups(event)}>Groups</Button>
                    </ButtonGroup>
                </div>
                <div>
                    {content}
                </div>
            </div>
        );
    }
}