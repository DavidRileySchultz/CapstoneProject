import React, { Component } from 'react';
import { Button, ListGroup, ListGroupItem, FormControl, ControlLabel, Col, Form, FormGroup, Alert, Row, ButtonGroup } from 'react-bootstrap';
import { Members } from './Members';
import { SearchMembers } from './SearchMembers';
import _ from 'lodash';

export class EditMyGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            members: [],
            membersToAdd: [],
            newMembers: [],
            justAddedMember: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.showJustAdded = this.showJustAdded.bind(this);
    }

    showJustAdded(button) {
        if (button === "add" && this.state.justAddedMember === false) {
            this.setState({
                justAddedMember: true
            });
        }
        else if (button === "current" && this.state.justAddedMember === true) {
            this.setState({
                justAddedMember: false
            });
        }
    }

    async submitEdit() {
        var data = {
            groupId: this.props.id,
            name: this.state.name,
            groupName: this.state.groupName,
            members: this.state.newMembers.map(a => a.value)
        }
        await fetch('/api/Groups/EditGroup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).catch(error => console.log(error));
        this.props.returnToEventHome();
    }

    addSelectedMember(selectedMember) {
        let currentNewMembers = this.state.newMembers.map(a => a.value).slice();
        let selectedExist = currentNewMembers.indexOf(selectedMember.value);
        let currentOldMembers = this.state.members.map(a => a.value).slice();
        let selectedOldExist = currentOldMembers.indexOf(selectedMember.value);
        if (selectedExist === -1 && selectedOldExist === -1) {
            let editableMembers = this.state.newMembers.slice();
            editableMembers.push(selectedMember);
            this.setState({
                newMembers: editableMembers,
                justAddedMember: true
            });
        }
        else {
            let editableMembers = this.state.newMembers.slice();
            editableMembers.splice(selectedExist, 1);
            this.setState({
                newMembers: editableMembers
            })
        }

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
    checkForExistingMembers() {
        let fromDBMembers = this.state.members;
        let newMembers = this.state.newMembers;
        return fromDBMembers.concat(newMembers);
    }
    deleteMember(index) {
        let memberToDelete = this.state.members[index];
        let memberId = memberToDelete.value;
        let groupId = this.props.id;
        fetch(`api/Groups/DeleteMember?userId=${memberId}&groupId=${groupId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).catch(error => console.log(error));
        let currentMembers = this.state.members;
        currentMembers.splice(index, 1);
        this.setState({
            members: currentMembers
        })
    }
    render() {
        const style = {
            backgroundColor: "purple",
            height: "85vh",
        };
        const membersBox = {
            backgroundColor: "#c2e6ff",
            height: "60vh",
            paddingLeft: "15px",
            paddingRight: "15px",
            color: "#555",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            overflow: "auto",
            marginBottom: "10px",
            boxShadow: "4px 4px 5px 0px rgba(0,0,0,0.41)",
            borderRadius: "5px"
        }
        if (this.state.members !== undefined) {
            var membersAdded = this.state.members.map((member, index) => <Alert className="dismissable-item" key={member.value} onDismiss={() => this.deleteMember(index)}>{member.display}</Alert>)
        } else { membersAdded = null; }
        var newMembers = this.state.newMembers.map((member) => <ListGroupItem key={member.value} >{member.display}</ListGroupItem>)


        const memberSearch = _.debounce((term2) => { this.searchTest(term2) }, 1000);
        const addMember = ((selectedMember) => { this.addSelectedMember(selectedMember) });
        var membersToShow = <div><h3>Members </h3>
            <ListGroup>
                {membersAdded}
            </ListGroup></div>
        if (this.state.justAddedMember) {
            membersToShow = <div><h3>Members To Add</h3>
                <ListGroup>{newMembers}</ListGroup></div>
        }
        return (
            <div style={style}>
                <Row className="empty-space2percent"> </Row>
                <Row>
                    <Col md={2} mdOffset={1}>
                        <h1 className="page-subtitle"> Edit Group </h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={3} mdOffset={1}>
                        <Form>

                            <FormGroup>
                                <FormControl
                                    placeholder="Group Name"
                                    type="text"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormControl
                                    placeholder="GroupName"
                                    componentClass="textarea"
                                    name="groupName"
                                    value={this.state.groupName}
                                    onChange={this.handleChange} />
                            </FormGroup>
                        </Form>

                    </Col>
                    <Col md={3}>

                        <SearchMembers onSearchEnter={memberSearch} />
                        <Members membersToAdd={this.state.membersToAdd}
                            onMemberSelect={addMember} existingMembers={this.checkForExistingMembers()} />
                    </Col>

                    <Col md={3}>
                        <div style={membersBox}>
                            {membersToShow}
                        </div>
                    </Col>
                    <Col md={1}>
                        <ButtonGroup vertical>
                            <Button active={this.state.justAddedMember} onClick={() => this.showJustAdded("add")}>To Add</Button>
                            <Button active={!this.state.justAddedMember} onClick={() => this.showJustAdded("current")}>Members</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={2} mdOffset={1}>
                        <a className="btn action-button" onClick={(event) => this.submitEdit(event)}>Finish</a>
                    </Col>
                </Row>
            </div>
        );
    }

}