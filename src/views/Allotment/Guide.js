import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Col, Badge } from "reactstrap";
import styled from "styled-components";

const grid = 8;

const Container = styled.div`
  padding: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  margin-bottom: 8px;
  background-color: white;
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

export default class Guide extends Component {
  render() {
    return (
      <Draggable draggableId={this.props.guide.id} index={this.props.index}>
        {provided => (
          <div
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <Col style={{ padding: "3px" }}>
              <Container>
                <h5 style={{ padding: "4px" }}>{this.props.guide.name}</h5>
              </Container>
            </Col>
          </div>
        )}
      </Draggable>
    );
  }
}
