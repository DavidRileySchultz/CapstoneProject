import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { CreateGroup } from './CreateGroup';

export class GroupContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            createGroup: false
        }
        this.addNewGroup = this.addNewGroup.bind(this);
        this.backToAllGroups = this.backToAllGroups.bind(this);
    }

    addNewGroup(event) {
        event.preventDefault();
        this.setState({
            createGroup: true,
        })
    }

    backToAllGroups() {

        this.setState({
            createGroup: false,
        })
    }

    render() {
        const returnToEvents = this.backToAllGroups;
        if (this.state.createGroup) {
            return (
                <div>
                    <CreateGroup returnToEventHome={returnToEvents} />
                </div>);
        }
        else {
            return (
                <div>
                    <Button onClick={(event) => this.addNewGroup(event)}>Create a Group</Button>
                    <div> Travel Groups: </div>
                </div>
            );
        }
    }
}