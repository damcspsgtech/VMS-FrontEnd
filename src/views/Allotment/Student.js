import React, { Component } from 'react'
import { Card, CardHeader } from 'reactstrap';
import { Draggable } from 'react-beautiful-dnd';

export default class Student extends Component {
  render() {
    return (
      <Draggable draggableId={this.props.student.roll_no} index={this.props.index}>
        {(provided) => (<Card {...provided.draggableProps}
          {...provided.dragHandleProps}
          innerRef={provided.innerRef}>
          <CardHeader>
            {this.props.student.roll_no + ' ' + this.props.student.name}
          </CardHeader>
        </Card>
        )}
      </Draggable>
    );
  }
}