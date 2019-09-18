import React, { Component } from 'react';
import { ListGroupItem, ListGroupItemHeading, Badge, Button } from 'reactstrap';

export default class Course extends Component {
  render() {
    return (
      <div class="animated fadeIn">
        <ListGroupItem color="white">
          <ListGroupItemHeading>
            {this.props.value.name}
            <Badge pill color="primary">{this.props.value.id}</Badge>
            <Button className="float-right" color="danger" onClick={this.props.handleDelete.bind(this, this.props.value.id, this.props.value.name)}>
              Delete
            </Button>
          </ListGroupItemHeading>
        </ListGroupItem>
      </div>
    )
  }
}