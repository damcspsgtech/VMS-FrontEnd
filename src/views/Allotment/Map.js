import React, { Component } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Student from "./Student";
import Guide from "./Guide";
import { Row, Card, CardBody, CardHeader } from "reactstrap";
import styled from "styled-components";

const grid = 8;

const divStyle = {
  overflowY: "auto",
  float: "left",
  maxHeight: "100px",
  position: "relative"
};

const Container = styled.div`
  padding: 8px;
  cmargin-bottom: 8px;
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

export default class Map extends Component {
  render() {
    return (
          <div>
            <Guide key={this.props.guide.id} guide={this.props.guide} index={0} />
            
            {this.props.map.students_alloted.map((student, index) => (
              <Student
                key={student}
                student={this.props.student[student]}
                index={index}
              />
            ))}              
        </div>
    )
  }
}
