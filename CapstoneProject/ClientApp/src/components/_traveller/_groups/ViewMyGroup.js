import React, { Component } from 'react';
import { Panel, ListGroup, ListGroupItem, FormControl, ControlLabel, Col, Form, FormGroup, Alert, Row, ButtonToolbar } from 'react-bootstrap';
import { Route, Link, Redirect, withRouter, BrowserRouter } from 'react-router-dom';
import { Members } from './Members';
import { MemberListItem } from './MemberListItem';
import { SearchMembers } from './SearchMembers';
import _ from 'lodash';

export class ViewMyGroup extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const style = {
            backgroundColor: "#c2e6ff",
            height: "65vh",
            paddingLeft: "30px",
            paddingRight: "30px",
            color: "#555",
            fontFamily: "sans-serif",
            overflow: "auto",
            marginBottom: "10px",
            boxShadow: "4px 4px 5px 0px rgba(0,0,0,0.41)",
            borderRadius: "5px"
        }
        var contents = null;
        if (this.props.viewingGroupDetails === "About") {
            contents = <div><Row>
                <h2>{this.props.name}</h2>
            </Row>
                <Row>
                    <h4>{this.props.groupName}</h4>
                    <h4>Organizer: {this.props.owner}</h4>
                </Row></div>
        }

        else if (this.props.viewingGroupDetails === "Members") {
            var membersAdded = this.props.memberNames.map((member, index) => <ListGroupItem key={index} >{member}</ListGroupItem>)
            contents = <Row>
                <h2>Members </h2>
                <ListGroup>
                    {membersAdded}
                </ListGroup>
            </Row>
        }

        return (
            <div style={style}>
                {contents}
            </div>
        );
    }
}