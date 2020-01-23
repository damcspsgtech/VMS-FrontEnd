import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Col, Badge } from "reactstrap";

const grid = 8;

const colStyle = {
  padding: "3px"
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

export default class Student extends Component {
  render() {
    return (
      <Draggable draggableId={this.props.student.id} index={this.props.index}>
        {provided => (
          <div
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            {" "}
            <Col style={colStyle}>
              <Badge color="info" pill>
                <h5>{this.props.student.roll_no}</h5>
              </Badge>
            </Col>
          </div>
        )}
      </Draggable>
    );
  }
}
