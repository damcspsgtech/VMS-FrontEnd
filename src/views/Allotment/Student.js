import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Col, Badge } from "reactstrap";
import styled from "styled-components";

const grid = 8;

const colStyle = {
  padding: "3px"
};


const Container = styled.div`
  padding: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  margin-bottom: 8px;
  background-color: white;
`;

const Elements = styled.div`
`;

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
              <Container >
                <h5 style={{ padding: "2px" }}>{this.props.student.roll_no}</h5>
                <Elements>{this.props.student.name}</Elements>
                <Elements>{this.props.student.project_domain_keywords}</Elements>
              </Container>
              </Col>
          </div>
        )}
      </Draggable>
    );
  }
}
