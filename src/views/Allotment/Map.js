import React, { Component } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Student from "./Student";
import { Card, CardBody, CardHeader } from "reactstrap";

const grid = 8;

const divStyle = {
  overflowY: "auto",
  float: "left",
  maxHeight: "100px",
  position: "relative"
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

export default class Map extends Component {
  render() {
    return (
      <Draggable draggableId={this.props.map.guide} index={this.props.index}>
        {provided => (
          <div
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <Card>
              <CardHeader>{this.props.map.guide}</CardHeader>
              <Droppable droppableId={this.props.map.guide}>
                {provided => (
                  <div
                    style={divStyle}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <CardBody>
                      {this.props.map.students_alloted.map((student, index) => (
                        <Student
                          key={student.id}
                          student={student}
                          index={index}
                        />
                      ))}
                      {provided.placeholder}
                    </CardBody>
                  </div>
                )}
              </Droppable>
            </Card>
          </div>
        )}
      </Draggable>
    );
  }
}
