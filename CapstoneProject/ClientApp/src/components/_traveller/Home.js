import React, { Component } from 'react';
import { Button, ButtonGroup, Form, FormGroup, FormControl, ControlLabel, Col, Row, Alert } from 'react-bootstrap';
import { Route, withRouter } from 'react-router-dom';
import { NavMenu } from '../NavMenu';
import { UserHomeContent } from './UserHomeContent';
import { GroupContent } from './GroupContent';
import { GroupEvent } from './GroupEvent';


export class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shouldGoTo: 'Home'
        }
        this.goToGroups = this.goToGroups.bind(this);
    }

    componentDidMount() {
        if (this.props.location.search !== "") {
            var stravaParams = this.props.location.search.split('&');
            let code = stravaParams[1].slice(5);
            let id = localStorage.getItem('userId');
            let data = { auth_code: code, id: id };
            fetch('api/Users/SendCodeToStrava', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
        }
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
            content = <UserHomeContent />
        }
        else if (goToPage === 'Groups') {
            content = <UserGroupContent />
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