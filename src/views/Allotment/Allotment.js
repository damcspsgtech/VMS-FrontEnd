import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import axios from "axios";
import Guide from "./Guide";
import Student from "./Student";
import Map from "./Map";

const divStyle = {
  overflowY: "auto",
  float: "left",
  maxHeight: "400px",
  position: "relative"
};

const colStyle = {
  maxWidth: "370px",
  float: "left",
};

const allotmentColStyle = {
  maxWidth: "380px",
  float: "left",
  maxHeight: "400px"
};

const studStyle = {
  maxWidth: "300px",
  float: "left"
};

const allotmentStyle = {
  maxWidth: "350px",
  margin: "5px 10px 2px",
  background: "#D3D3D3",
}

// function to help us with reordering the result
const reorder = (start, source, endIndex) => {
  const result = Array.from(start.list);
  const [removed] = result.splice(source.index, 1);
  result.splice(endIndex, 0, removed);

  const newColumn = {
    ...start,

    list: result,
  };

  return newColumn;
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
  const sourceColumn = {
    ...droppableSource,
    list: sourceClone

  }

  const destinationColumn = {
    ...droppableDestination,
    list: destClone
  }

  result[droppableSource.droppableId] = sourceColumn;
  result[droppableDestination.droppableId] = destinationColumn;
  result['removed'] = removed
  
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
      allotment: {},
      columns:{
        "guides": {list: []},
        "students": {list: []}, 
        "allotment1":{list: []},
        "allotment2":{list: []},
      },
      guides: {},
      students: {}
    };

    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount() {
    axios.get("/api/allotment/")
      .then(res => {
          const guides = res.data.result === "success" ? res.data.guides : {};
          const students = res.data.result === "success" ? res.data.student : {};
          const allot = res.data.result === "success" ? res.data.allot : {};
          
          const newGuideColumn = {
            ...this.state.columns["guides"],
            list: res.data.allotment.guide,
          };

          const newAllot1Column = {
            ...this.state.columns["allotment1"],
            list: res.data.allotment.allotment1,
          };

          const newAllot2Column = {
            ...this.state.columns["allotment2"],
            list: res.data.allotment.allotment2,
          };

          const newStudentColumn = {
            ...this.state.columns["students"],
            list: res.data.allotment.student,
          };

          const newState = {
            ...this.state,
            columns: {
              ...this.state.columns,
              "guides": newGuideColumn,
              "students": newStudentColumn,
              "allotment1": newAllot1Column,
              "allotment2": newAllot2Column
            },
            guides : guides,
            students: students,
            allotment: allot
          };
          
          this.setState(newState);
          
        })
    
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
    
    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if(start === this.state.columns[destination.droppableId]){
      const newColumn = reorder(start, source, destination.index)

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [source.droppableId]: newColumn,
        }
      };

      this.setState(newState);
      var snapshotData = {};
      if(source.droppableId === 'guides'){
        snapshotData = {
          students: this.state.columns.students.list,
          allotment1: this.state.columns.allotment1.list,
          allotment2: this.state.columns.allotment2.list,
        }
      }
      else if(source.droppableId === 'students'){
        snapshotData = {
          guides: this.state.columns.guides.list,
          allotment1: this.state.columns.allotment1.list,
          allotment2: this.state.columns.allotment2.list,
        }
      }
      else if(source.droppableId === 'allotment1'){
        snapshotData = {
          guides: this.state.columns.guides.list,
          students: this.state.columns.students.list,
          allotment2: this.state.columns.allotment2.list,
        }
      }
      else{
        snapshotData = {
          guides: this.state.columns.guides.list,
          students: this.state.columns.students.list,
          allotment1: this.state.columns.allotment1.list,
  
        }
      }
      snapshotData[source.droppableId] = newColumn.list
      axios.post('api/allotment/updateSnapshot', {
        snapshot: snapshotData
      }).then(res => {
          return;
        })
      return;

    }

    if ((source.droppableId === "guides" && destination.droppableId === "students") || 
       (source.droppableId === "students" && destination.droppableId === "guides" )){
      return;
    }

    if(
      destination.droppableId === "allotment1" || 
      destination.droppableId === "allotment2" 
    ){
      
      if(finish.list.length === 0){
        if(source.droppableId !== "students"){
          const result = move(start.list, finish.list, source, destination)
          console.log(result)
          var allot = this.state.allotment
          var newState = {
            ...this.state,
            columns: {
              ...this.state.columns,
              [source.droppableId]: result[source.droppableId],
              [destination.droppableId]: result[destination.droppableId],
            },
            allotment: allot
          };
          this.setState(newState);
          
          var snapshotData = {}; 
          if(destination.droppableId === "allotment1"){
            snapshotData['allotment2'] = this.state.columns.allotment2.list
          }
          else{
            snapshotData['allotment1'] = this.state.columns.allotment1.list
          }
          snapshotData['students'] = this.state.columns.students.list
          snapshotData[destination.droppableId] = result[destination.droppableId].list
          snapshotData[source.droppableId] = result[source.droppableId].list          
          axios.post('api/allotment/updateSnapshot', {
            snapshot: snapshotData

          }).then(res => {
              return;
            })

        }
        return;
      }
      else{
        
        if(source.droppableId === "students"){
          
          const guideId = Array.from(finish.list)
          const sourceClone = Array.from(start.list);
          const [removed] = sourceClone.splice(source.index, 1);
          
          const sourceColumn = {
            ...source,
            list: sourceClone
        
          }
          
          const allotmentState = {
            ...this.state.allotment,
            [guideId[0]] : {
              ...this.state.allotment[guideId[0]],
              students_alloted : [
                ...this.state.allotment[guideId[0]].students_alloted,
                removed
              ]
            }
          }
          
          
          var newState = {
            ...this.state,
            columns: {
              ...this.state.columns,
              [source.droppableId]: sourceColumn,
            },
            allotment: allotmentState
          };
         
          this.setState(newState);
          axios.post('api/allotment/updateAllotment', {
            allotment: allotmentState[guideId[0]],
          }).then(res => {
            var snapshotData = {}; 
            
            snapshotData['allotment2'] = this.state.columns.allotment2.list
            snapshotData['allotment1'] = this.state.columns.allotment1.list
            snapshotData['guides'] = this.state.columns.guides.list
            snapshotData[source.droppableId] = sourceColumn.list          
            axios.post('api/allotment/updateSnapshot', {
              snapshot: snapshotData

            }).then(res => {
                return;
              })
            
          })
          
        }
        else{

          axios.post('api/allotment/updateAllotment', {
            allotment: this.state.allotment[finish.list[0]],
          }).then(res => {
            const result = move(start.list, finish.list, source, destination)
            var allot = this.state.allotment
            result[source.droppableId].list = [
              ...result[source.droppableId].list,
              finish.list[0]
            ]
            result[destination.droppableId].list = [result['removed']]
            var newState = {
              ...this.state,
              columns: {
                ...this.state.columns,
                [source.droppableId]: result[source.droppableId],
                [destination.droppableId]: result[destination.droppableId],
              },
              allotment: allot
            };
            this.setState(newState);
            axios.post('api/allotment/updateAllotment', {
              allotment: this.state.allotment[start.list[0]],
            }).then(res => {
              const snapshotData = {}; 
              if(destination.droppableId === "allotment1"){
                snapshotData['allotment2'] = this.state.columns.allotment2.list
              }
              else{
                snapshotData['allotment1'] = this.state.columns.allotment1.list
              }
              snapshotData['students'] = this.state.columns.students.list
              snapshotData[destination.droppableId] = result[destination.droppableId].list
              snapshotData[source.droppableId] = result[source.droppableId].list          
              axios.post('api/allotment/updateSnapshot', {
                snapshot: snapshotData

              }).then(res => {
                  return;
                })
              
            })
          })
          
        }

      }

    }
    
    if(destination.droppableId === 'students'){
      
      var allot = this.state.allotment
      var allotedStudents = allot[start.list[0]].students_alloted
      var index = allotedStudents.indexOf(draggableId)
      allotedStudents.splice(index, 1)
      allot[start.list[0]].students_alloted = allotedStudents
      var destinationClone = Array.from(finish.list)
      destinationClone.unshift(draggableId)
      var destinationColumn = {
        ...destination,
        list: destinationClone
      }
      const newState = {
            ...this.state,
            columns: {
              ...this.state.columns,
              [destination.droppableId]: destinationColumn
            },
            allotment: allot
      };
      
      this.setState(newState);

      const snapshotData = {};
      snapshotData[destination.droppableId] = destinationClone
      snapshotData['guides'] = this.state.columns.guides.list
      snapshotData['allotment1'] = this.state.columns.allotment1.list
      snapshotData['allotment2'] = this.state.columns.allotment2.list

      
      axios.post('api/allotment/updateSnapshot', {
        snapshot: snapshotData

      }).then(res => {
          return;
        })
      
    }


  };

  render() {
    const guides = this.state.columns["guides"];
    const students = this.state.columns["students"];
    const allot = this.state.allotment;
    const allotment1 = this.state.columns["allotment1"].list
    const allotment2 = this.state.columns["allotment2"].list
    const guideDict = this.state.guides;
    const studentDict = this.state.students
    return (
      
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Row>
        
          <Col style={colStyle}>            
            <Card>
              <CardHeader>
                <h2>Guide</h2>
              </CardHeader>
              <Droppable droppableId={"guides"}>
                {provided => (
                  <div
                    style={divStyle}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <CardBody>
                      {guides.list.map((guide, index) => (
                        <Guide key={guideDict[guide].id} guide={guideDict[guide]} index={index} />
                      ))}
                      {provided.placeholder}
                    </CardBody>
                  </div>
                )}
              </Droppable>
            </Card>
          </Col>

          <Col style={allotmentColStyle}>  
            <Card>
              <CardHeader>
                <h2>Allotment</h2>
              </CardHeader>
                
              <Card style={allotmentStyle}>
                <Droppable droppableId={"allotment1"}>
                  { provided => (
                    <div
                      style={divStyle}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <CardBody>
                        {allotment1.length === 1 &&
                          <Map 
                            key={allot[allotment1[0]].id} 
                            map={allot[allotment1[0]]} 
                            guide={guideDict[allotment1[0]]} 
                            student={studentDict} index={0} 
                          />  
                        }
                        {provided.placeholder}
                      </CardBody>
                    </div>
                  )}
                </Droppable>
              </Card>

            <Card style={allotmentStyle}>
              <Droppable droppableId={"allotment2"}>
                {provided => (
                  <div
                    style={divStyle}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <CardBody>
                    {allotment2.length === 1 &&
                        <Map 
                          key={allot[allotment2[0]].id} 
                          map={allot[allotment2[0]]} 
                          guide={guideDict[allotment2[0]]} 
                          student={studentDict} index={0} 
                        />  
                      }
                      {provided.placeholder}
                    </CardBody>
                  </div>
                )}
              </Droppable>
            </Card>

            
          </Card>
            
          </Col>

          <Col style={studStyle}>
            <Card>
              <CardHeader>
                <h2>Students</h2>
              </CardHeader>
              <Droppable droppableId={"students"}>
                {provided => (
                  <div
                    style={divStyle}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <CardBody>
                      {students.list.map((student, index) => (
                        <Student
                          key={studentDict[student].roll_no}
                          student={studentDict[student]}
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

