import React, { Component } from 'react'
import { Card, CardTitle } from 'reactstrap';
import { Draggable } from 'react-beautiful-dnd';
import styled from 
export default class Student extends Component {
  render() {
    return (
      <Draggable draggableId={this.props.student.roll_no} index={this.props.index}>
        {(provided) => (<Card className="block" {...provided.draggableProps}
          {...provided.dragHandleProps}
          innerRef={provided.innerRef}>
          <CardTitle>
            {this.props.student.roll_no + ' ' + this.props.student.name}
          </CardTitle>
        </Card>
        )}
      </Draggable>
    );
  }
}