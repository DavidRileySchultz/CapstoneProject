import React, { Component } from 'react';
import { Tooltip, OverlayTrigger, ListGroup, ListGroupItem, ButtonGroup, Button, Col, ColProps, Row, Glyphicon } from 'react-bootstrap';
import { Route, Link, Redirect, withRouter, BrowserRouter } from 'react-router-dom';
import { CreateGroup } from './CreateGroup';
import { EditMyGroup } from './_groups/EditMyGroup';
import { ViewMyGroup } from './_groups/ViewMyGroup';


export class GroupContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createGroup: false,
            groupsIn: [],
            groupsOwn: [],
            editingGroupId: null,
            viewingGroupId: null,
            name: '',
            groupName: '',
            memberIds: [],
            memberNames: [],
            travellerId: null,
            owner: '',
            viewingGroupDetails: "About"

        }
        this.addNewGroup = this.addNewGroup.bind(this);
        this.backToAllGroups = this.backToAllGroups.bind(this);
        this.goEditMyGroup = this.goEditMyGroup.bind(this);
        this.goViewMyGroup = this.goViewMyGroup.bind(this);
        this.changeViewingDetails = this.changeViewingDetails.bind(this);
    }

    changeViewingDetails(tab) {
        this.setState({
            viewingGroupDetails: tab
        });
    }

    goEditMyGroup() {
        let index = this.state.canEditMyGroup;
        var groupId = this.state.groupsOwn[index].id;
        fetch(`/api/Groups/GetGroupDetails?id=${groupId}`).then(response => response.json()).then(data =>
            this.setState({
                name: data.name,
                groupName: data.grouName,
                memberIds: data.members,
                memberNames: data.memberNames,
                owner: data.owner,
                travellerId: data.travellerId,
                editingGroupId: groupId

            }))
            .catch(error => console.log(error));

    }

    goViewMyGroup(index, list) {
        var groupId = (list === "in") ? this.state.groupsIn[index].id : this.state.groupsOwn[index].id;
        var canEdit = (list === "own") ? index : null;
        fetch(`/api/Groups/GetGroupDetails?id=${groupId}`).then(response => response.json()).then(data =>
            this.setState({
                name: data.name,
                groupName: data.groupName,
                memberIds: data.members,
                memberNames: data.memberNames,
                owner: data.owner,
                TravellerId: data.travellerId,
                viewingGroupId: groupId,
                viewingGroupDetails: "About",
                canEditMyGroup: canEdit
            }))
            .catch(error => console.log(error));

    }

    addNewGroup(event) {
        event.preventDefault();
        this.setState({
            createGroup: true,
        })
    }

    async backToAllGroups() {
        let groupsIn;
        let groupsOwn;
        var id = localStorage.getItem('travellerId');
        await fetch(`/api/Groups/GetGroups?id=${id}`).then(response => response.json())
            .then(data => {

                groupsOwn = data.groupsOwn;
                let groupsOwnIds = groupsOwn.map(a => a.id);
                groupsIn = data.groupsIn.filter(a => { return (groupsOwnIds.includes(a.id) === false) });
                this.setState({
                    groupsIn: groupsIn,
                    groupsOwn: groupsOwn,

                })
            }).catch(a => console.log(a));
        this.setState({
            createGroup: false,
            editingGroupId: null,
            viewingGroupId: null
        })

    }

    componentWillMount() {
        let groupsIn;
        let groupsOwn;
        var id = localStorage.getItem('travellerId');
        fetch(`/api/Groups/GetGroups?id=${id}`).then(response => response.json())
            .then(data => {

                groupsOwn = data.groupsOwn;
                let groupsOwnIds = groupsOwn.map(a => a.id);
                groupsIn = data.groupsIn.filter(a => { return (groupsOwnIds.includes(a.id) === false) });
                this.setState({
                    groupsIn: groupsIn,
                    groupsOwn: groupsOwn
                })
            }).catch(a => console.log(a));
    }

    render() {
        const style = {
            backgroundColor: "orange",
            height: "85vh",
        };
        const tooltip = (
            <Tooltip id="tooltip">
                You're the organizer of this group!
            </Tooltip>
        );
        let viewGroup = null;
        let viewGroupButtons = null;
        let editGroup = null;
        if (this.state.viewingGroupId != null) {
            viewGroup = <ViewMyGroup
                name={this.state.name}
                groupName={this.state.groupName}
                memberIds={this.state.memberIds}
                travellerId={this.state.travellerId}
                owner={this.state.owner}
                memberNames={this.state.memberNames}
                id={this.state.editingGroupId}
                viewingGroupDetails={this.state.viewingGroupDetails}
            />
            if (this.state.canEditMyGroup !== null) {
                editGroup = <a className="btn action-button" onClick={() => this.goEditMyGroup()}>Edit Group</a>
            }
            viewGroupButtons = <ButtonGroup vertical>
                <Button onClick={() => this.changeViewingDetails("About")} active={this.state.viewingGroupDetails === "About"}>About</Button>
                <Button onClick={() => this.changeViewingDetails("Members")} active={this.state.viewingGroupDetails === "Members"}>Members</Button>
            </ButtonGroup>
        }
        const returnToEvents = this.backToAllGroups;
        var groupsOwn = this.state.groupsOwn;
        var groupsIn = this.state.groupsIn;
        if (this.state.createGroup) {
            return (
                <div>
                    <CreateGroup returnToEventHome={returnToEvents} />

                </div>);
        }
        else if (this.state.editingGroupId !== null) {
            return (
                <EditMyGroup
                    name={this.state.name}
                    groupName={this.state.groupName}
                    memberIds={this.state.memberIds}
                    travellerId={this.state.travellerId}
                    owner={this.state.owner}
                    memberNames={this.state.memberNames}
                    id={this.state.editingGroupId}/>
            );
        }

        else {
            return (
                <div style={style}>
                    <Row className="empty-space5percent" />
                    <Row>
                        <Col md={2} mdOffset={1} >
                            <a className="btn action-button" onClick={(event) => this.addNewGroup(event)}>Create a Group</a>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4} mdOffset={1}>
                            <h3 className="page-subtitle">Your Groups</h3>
                            <ListGroup>
                                {this.state.groupsOwn.map((a, index) =>
                                    (<ListGroupItem key={index} onClick={() => this.goViewMyGroup(index, "own")} active={this.state.viewingGroupId === a.id} value={a.id}>
                                        {a.name}
                                        <span className="pull-right">
                                            <OverlayTrigger placement="right" overlay={tooltip}>
                                                <Glyphicon glyph="star" />
                                            </OverlayTrigger>
                                        </span>
                                    </ListGroupItem>)
                                )}
                                {this.state.groupsIn.map((a, i) =>
                                    (<ListGroupItem onClick={() => this.goViewMyGroup(i, "in")} key={i} value={a.id} active={this.state.viewingGroupId === a.id}>{a.name}</ListGroupItem>)
                                )}
                            </ListGroup>
                        </Col>
                        <Col md={4} mdOffset={1}>
                            {viewGroup}
                        </Col>
                        <Col md={1}>
                            {viewGroupButtons}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2} mdOffset={7}>
                            {editGroup}
                        </Col></Row>
                </div>
            );
        }
    }
}