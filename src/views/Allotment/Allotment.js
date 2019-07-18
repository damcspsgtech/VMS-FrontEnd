import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Row, Col, Card, CardHeader, CardBody, CardColumns } from 'reactstrap'
import axios from 'axios'


const Guide = React.lazy(() => import('./Guide'))
const Student = React.lazy(() => import('./Student'))

export default class Allotment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      guides: [],
      students: [],
    }

    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount() {
    axios.all([
      axios.get('/api/faculty/guide'),
      axios.get('/api/students/')
    ])
      .then(axios.spread((guideRes, studentRes) => {
        this.setState({
          guides: (guideRes.data.result === 'success') ? guideRes.data.guides : [],
          students: (studentRes.data.result === 'success') ? studentRes.data.student_list : [],
        });
      }))

  }

  onDragEnd(result) {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return
    }
    if (destination.droppableId === source.droppabaleId && destination.index === source.index) {
      return;
    }

    const start = this.state.columns[source.draggableId];
    const end = this.state.columns[destination.draggableId]
    if (start !== end) {

    }

    if (start === end) {

    }
  }
  render() {
    return (
      <div class="animated fadeIn" >
        <DragDropContext
          OnDragEnd={this.onDragEnd}
        >
          <Row>
            <Col >
              <Card >
                <CardHeader>
                  Guides
                </CardHeader>
                <Droppable droppableId="Guides">
                  {(provided) => (<CardBody innerRef={provided.innerRef}
                    {...provided.droppableProps}>
                    <React.Suspense>
                      {this.state.guides.map((guide, index) => <Guide key={guide.id} guide={guide} index={index} />)}
                    </React.Suspense>
                    {provided.placeholder}
                  </CardBody>
                  )}
                </Droppable>
              </Card>
            </Col>
            <Col >
              <Card>
                <CardHeader>
                  Map
                </CardHeader>
                <Droppable droppableId="Map">
                  {(provided) => (<CardBody innerRef={provided.innerRef}
                    {...provided.droppableProps}>
                    {provided.placeholder}
                  </CardBody>
                  )}
                </Droppable>
              </Card>
            </Col>
            <Col >
              <Card>
                <CardHeader>
                  Students
                </CardHeader>
                <CardColumns>
                  <Droppable droppableId="Students">
                    {(provided) => (<CardBody innerRef={provided.innerRef}
                      {...provided.droppableProps}>
                      {this.state.students.map((student, index) => <Student key={student.roll_no} student={student} index={index} />)}
                      {provided.placeholder}
                    </CardBody>
                    )}
                  </Droppable>
                </CardColumns>
              </Card>
            </Col>
          </Row>
        </DragDropContext>
      </div >
    );
  }
}