import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import axios from "axios";
import Guide from "./Guide";
import Student from "./Student";
import Map from "./Map";
import styled from "styled-components";

const divStyle = {
  overflowY: "auto",
  float: "left",
  maxHeight: "400px",
  position: "relative"
};

const colStyle = {
  maxWidth: "400px",
  float: "left"
};

const studStyle = {
  maxWidth: "200px",
  float: "left"
};

const TaskList = styled.div`
  padding: 8px;
  min-height: 100px;
`;

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const grid = 8;

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

export default class Allotment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      guides: [],
      students: [],
      alloting: [
        {
          guide: "Dr.kaja",
          students_alloted: [
            { roll_no: "14PT06", id: "1" },
            { roll_no: "14PT07", id: "2" }
          ]
        },
        {
          guide: "N Geetha",
          students_alloted: [
            { roll_no: "14PT08", id: "3" },
            { roll_no: "14PT09", id: "4" }
          ]
        }
      ],
      guides_selected: [],
      students_alloted: []
    };

    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount() {
    axios
      .all([axios.get("/api/faculty/guide"), axios.get("/api/students/")])
      .then(
        axios.spread((guideRes, studentRes) => {
          this.setState({
            guides:
              guideRes.data.result === "success" ? guideRes.data.guides : [],
            students:
              studentRes.data.result === "success"
                ? studentRes.data.student_list
                : []
          });
        })
      );
  }

  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Row>
          <Col style={colStyle}>
            <Card>
              <CardHeader>
                <h2>Guide</h2>
              </CardHeader>
              <Droppable droppableId={"Guides"}>
                {provided => (
                  <div
                    style={divStyle}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <CardBody>
                      {this.state.guides.map((guide, index) => (
                        <Guide key={guide.id} guide={guide} index={index} />
                      ))}
                      {provided.placeholder}
                    </CardBody>
                  </div>
                )}
              </Droppable>
            </Card>
          </Col>

          <Col style={colStyle}>
            <Card>
              <CardHeader>
                <h2>Allotment</h2>
              </CardHeader>
              <Droppable droppableId={"Map"}>
                {provided => (
                  <div
                    style={divStyle}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <CardBody>
                      {this.state.alloting.map((map, index) => (
                        <Map key={map.guide} map={map} index={index} />
                      ))}
                      {provided.placeholder}
                    </CardBody>
                  </div>
                )}
              </Droppable>
            </Card>
          </Col>

          <Col style={studStyle}>
            <Card>
              <CardHeader>
                <h2>Students</h2>
              </CardHeader>
              <Droppable droppableId={"Students"}>
                {provided => (
                  <div
                    style={divStyle}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <CardBody>
                      {this.state.students.map((student, index) => (
                        <Student
                          key={student.roll_no}
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
          </Col>
        </Row>
      </DragDropContext>
    );
  }
}
