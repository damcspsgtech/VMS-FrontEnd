import React, { Component } from 'react'
import { Card, CardHeader } from 'reactstrap';
import { Draggable } from 'react-beautiful-dnd';

export default class Guide extends Component {
  render() {
    return (
      <Draggable draggableId={this.props.guide.id} index={this.props.index}>
        {(provided) => (<Card {...provided.draggableProps}
          {...provided.dragHandleProps}
          innerRef={provided.innerRef}>
          <CardHeader>
            {this.props.guide.name}
          </CardHeader>
        </Card>
        )}
      </Draggable>
    );
  }
}