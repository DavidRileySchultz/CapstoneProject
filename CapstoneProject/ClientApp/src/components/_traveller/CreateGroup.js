import React, { Component } from 'react';
import { Button, Form, FormGroup, FormControl, ControlLabel, Col, ListGroupItem, ListGroup, Row, ButtonToolbar } from 'react-bootstrap';
import { Route, Link, Redirect, withRouter, BrowserRouter } from 'react-router-dom';
import { NavMenu } from '../NavMenu';
import { SearchMembers } from './_groups/SearchMembers';
import { MemberList } from './_groups/MemberList';
import _ from 'lodash';

export class CreateGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            groupName: '',
            members: [],
            membersToAdd: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitGroup = this.submitGroup.bind(this);
    }

    submitGroup(event) {
        event.preventDefault();
        var userId = localStorage.getItem('userId');
        var members = this.state.members.map(a => Number(a.value));
        const data = {
            name: this.state.name, city: this.state.city, state: this.state.state, description: this.state.description,
            members: members, userId: userId
        };
        fetch('api/Groups/Create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).catch(function (error) { console.log(error); });
        this.props.returnToEventHome();
    }

    addSelectedMember(selectedMember) {
        let currentMembers = this.state.members.map(a => a.value).slice();
        let selectedExist = currentMembers.indexOf(selectedMember.value);
        if (selectedExist === -1) {
            let editableMembers = this.state.members.slice();
            editableMembers.push(selectedMember);
            this.setState({
                members: editableMembers
            });
        }
        else {
            let editableMembers = this.state.members.slice();
            editableMembers.splice(selectedExist, 1);
            this.setState({
                members: editableMembers
            })
        }
    }

    canSubmit() {
        return this.state.name !== '' && this.state.description !== '';
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    searchTest(term2) {
        let terms = term2.toString().trim().toLowerCase().replace(/[^A-Za-z0-9\s]/g, "");
        let url = `/api/Users/UniversalUserSearch?term1=${terms}`;
        fetch(url).then(response => response.json())
            .then(jsonData => {
                let membersToSelect = jsonData.map(member => { return { value: member.id, display: `${member.name} - ${member.location}` } });
                this.setState({ membersToAdd: membersToSelect });
            })
            .catch(error => console.log(error));
    }

    render() {
        const membersAdded = this.state.members.map((member) => <ListGroupItem key={member.value} bsStyle='success'>{member.display}</ListGroupItem>)
        const memberSearch = _.debounce((term2) => { this.searchTest(term2) }, 1000);
        const addMember = ((selectedMember) => { this.addSelectedMember(selectedMember) });

        return (
            <div>
                <h1> New Group </h1>
                <Row>
                    <Col md={3}>
                        <Form>                        
                            <FormGroup>
                                <ControlLabel>Description</ControlLabel>
                                <FormControl
                                    componentClass="textarea"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.handleChange} />
                            </FormGroup>
                        </Form>
                        <ButtonToolbar>
                            <Button onClick={this.props.returnToEventHome}>Back</Button>
                            <Button disabled={!this.canSubmit()} onClick={(event) => this.submitGroup(event)}>Finish</Button>
                        </ButtonToolbar>
                    </Col>
                    <Col md={3}>
                        <SearchMembers onSearchEnter={memberSearch} />
                        <MemberList membersToAdd={this.state.membersToAdd}
                            onMemberSelect={addMember} existingMembers={this.state.members} />
                    </Col>
                    <Col md={3}>
                        <ControlLabel>Added Members </ControlLabel>
                        <ListGroup>
                            {membersAdded}
                        </ListGroup>
                    </Col>
                </Row>

            </div>
        );
    }
}